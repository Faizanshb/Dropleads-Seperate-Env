import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Types for Notion webhook events
interface NotionWebhookEvent {
  object: string;
  id: string;
  created_time: string;
  last_edited_time: string;
  properties?: Record<string, any>;
  parent?: {
    type: string;
    database_id?: string;
  };
}

interface NotionWebhookPayload {
  object: 'list';
  results: NotionWebhookEvent[];
  next_cursor?: string;
  has_more: boolean;
}

// Global cache invalidation flags
let blogCacheInvalidated = false;
let lastInvalidation = 0;

// Helper to validate webhook signature (if Notion implements it)
function validateWebhookSignature(body: string, signature: string, secret: string): boolean {
  if (!signature || !secret) return true; // Skip validation if not configured
  
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

// Cache invalidation helper
function invalidateBlogCache() {
  const now = Date.now();
  // Prevent rapid cache invalidations (minimum 1 minute between invalidations)
  if (now - lastInvalidation < 60000) return;
  
  blogCacheInvalidated = true;
  lastInvalidation = now;
  
  console.log('Blog cache invalidated due to Notion webhook');
}

// Export a function to check if cache should be invalidated
export function shouldInvalidateCache(): boolean {
  if (blogCacheInvalidated) {
    blogCacheInvalidated = false;
    return true;
  }
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    
    // Validate webhook signature if secret is provided
    const signature = request.headers.get('x-notion-signature') || '';
    const webhookSecret = process.env.NOTION_WEBHOOK_SECRET;
    
    if (webhookSecret && !validateWebhookSignature(body, signature, webhookSecret)) {
      console.error('Invalid webhook signature');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    // Parse the webhook payload
    let payload: NotionWebhookPayload;
    try {
      payload = JSON.parse(body);
    } catch (error) {
      console.error('Invalid JSON payload:', error);
      return NextResponse.json(
        { error: 'Invalid JSON payload' },
        { status: 400 }
      );
    }

    // Validate payload structure
    if (!payload.object || payload.object !== 'list' || !Array.isArray(payload.results)) {
      console.error('Invalid payload structure:', payload);
      return NextResponse.json(
        { error: 'Invalid payload structure' },
        { status: 400 }
      );
    }

    // Process webhook events
    const events = payload.results;
    let shouldInvalidate = false;

    for (const event of events) {
      console.log('Processing Notion webhook event:', {
        id: event.id,
        object: event.object,
        parent: event.parent,
      });

      // Check if this is a database page event (blog post)
      if (event.object === 'page' && event.parent?.type === 'database_id') {
        shouldInvalidate = true;
        console.log('Database page updated, will invalidate cache');
      }

      // Check if this is a database structure change
      if (event.object === 'database') {
        shouldInvalidate = true;
        console.log('Database structure updated, will invalidate cache');
      }
    }

    // Invalidate cache if needed
    if (shouldInvalidate) {
      invalidateBlogCache();
    }

    // Log webhook receipt
    console.log(`Processed ${events.length} Notion webhook events`);

    return NextResponse.json(
      { 
        success: true, 
        processed: events.length,
        cache_invalidated: shouldInvalidate 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing Notion webhook:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint for webhook verification (if Notion implements it)
export async function GET(request: NextRequest) {
  const challenge = request.nextUrl.searchParams.get('challenge');
  
  if (challenge) {
    // Respond with challenge for webhook verification
    return new Response(challenge, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }

  return NextResponse.json(
    { message: 'Notion webhook endpoint is active' },
    { status: 200 }
  );
}
