import { NextResponse } from 'next/server';

// Test utility to simulate Notion webhook events
export async function POST() {
  try {
    // Simulate a test webhook payload
    const testPayload = {
      object: 'list',
      results: [
        {
          object: 'page',
          id: 'test-page-123',
          created_time: new Date().toISOString(),
          last_edited_time: new Date().toISOString(),
          parent: {
            type: 'database_id',
            database_id: 'test-database-456'
          },
          properties: {
            Name: {
              title: [
                {
                  plain_text: 'Test Blog Post'
                }
              ]
            }
          }
        }
      ],
      has_more: false
    };

    // Send test webhook to our webhook endpoint
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/webhooks/notion`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testPayload)
    });

    const result = await response.json();

    return NextResponse.json({
      success: true,
      webhook_response: result,
      test_payload: testPayload,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Webhook test failed:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Webhook testing endpoint',
    usage: 'POST to this endpoint to test webhook functionality',
    webhook_url: '/api/webhooks/notion'
  });
}
