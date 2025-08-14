# Notion Webhook Integration Setup

This guide explains how to set up real-time webhooks with your Notion workspace for instant blog updates.

## Prerequisites

- Notion workspace with admin access
- Your blog database already connected to your integration
- Deployed application with public URL

## Step 1: Deploy Your Application

Make sure your app is deployed to a public URL (Vercel, Netlify, etc.) so Notion can reach your webhook endpoint.

Your webhook endpoint will be: `https://your-domain.com/api/webhooks/notion`

## Step 2: Set Up Webhook Secret (Optional but Recommended)

1. Generate a secure random string for webhook verification:
   ```bash
   openssl rand -hex 32
   ```

2. Add it to your environment variables:
   ```bash
   NOTION_WEBHOOK_SECRET=your_generated_secret_here
   ```

## Step 3: Configure Notion Integration

### Option A: Using Notion API (Recommended)

Currently, Notion doesn't have public webhook support, but you can simulate it using:

1. **Zapier Integration**:
   - Create a Zapier account
   - Set up a "New Database Item in Notion" trigger
   - Configure webhook action to POST to your endpoint
   - URL: `https://your-domain.com/api/webhooks/notion`

2. **IFTTT Alternative**:
   - Similar setup using IFTTT's Notion triggers

### Option B: Custom Polling Enhancement

If webhooks aren't available, enhance the current polling:

```typescript
// Add to your notion.ts
const POLLING_INTERVAL = 30000; // 30 seconds

setInterval(async () => {
  const now = Date.now();
  if (cachedBlogPosts && now - cachedBlogPosts.timestamp > POLLING_INTERVAL) {
    // Force refresh
    cachedBlogPosts = null;
    await getAllBlogPosts();
  }
}, POLLING_INTERVAL);
```

## Step 4: Test Your Webhook

1. Test the endpoint manually:
   ```bash
   curl -X POST https://your-domain.com/api/webhooks/notion \
     -H "Content-Type: application/json" \
     -d '{"object":"list","results":[],"has_more":false}'
   ```

2. Check your application logs for webhook events

## Step 5: Monitor Webhook Activity

Your webhook endpoint logs all events. Monitor your application logs to see:
- Incoming webhook requests
- Cache invalidation events
- Any errors or validation failures

## Benefits of Webhook Integration

✅ **Instant Updates**: Blog changes appear immediately without waiting for cache expiration

✅ **Reduced API Calls**: Only fetch new data when actually needed

✅ **Better Performance**: Users always see fresh content without delays

✅ **Resource Efficiency**: Eliminates unnecessary polling

## Troubleshooting

### Webhook Not Triggering
- Verify your public URL is accessible
- Check webhook secret configuration
- Review application logs for errors

### Cache Not Invalidating
- Ensure webhook payload is valid JSON
- Check if events include database page updates
- Verify cache invalidation logic is working

### Performance Issues
- Monitor webhook frequency to avoid rate limiting
- Adjust cache invalidation throttling if needed
- Consider batching multiple updates

## Future Enhancements

When Notion releases official webhook support:

1. Replace third-party integrations with direct Notion webhooks
2. Add more granular event filtering
3. Implement database-specific cache invalidation
4. Add webhook retry mechanisms

## Security Considerations

- Always validate webhook signatures
- Use HTTPS for all webhook URLs
- Implement rate limiting on webhook endpoints
- Monitor for suspicious webhook activity
- Keep webhook secrets secure and rotate regularly
