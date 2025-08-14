// Webhook monitoring and error tracking utility

interface WebhookEvent {
  timestamp: Date;
  event_type: string;
  success: boolean;
  error?: string;
  payload_size?: number;
}

class WebhookMonitor {
  private events: WebhookEvent[] = [];
  private readonly MAX_EVENTS = 100; // Keep last 100 events

  logEvent(event: Omit<WebhookEvent, 'timestamp'>) {
    const fullEvent: WebhookEvent = {
      ...event,
      timestamp: new Date()
    };

    this.events.unshift(fullEvent);
    
    // Keep only the last MAX_EVENTS
    if (this.events.length > this.MAX_EVENTS) {
      this.events = this.events.slice(0, this.MAX_EVENTS);
    }

    // Log to console for debugging
    if (event.success) {
      console.log(`✅ Webhook ${event.event_type} processed successfully`);
    } else {
      console.error(`❌ Webhook ${event.event_type} failed:`, event.error);
    }
  }

  getRecentEvents(limit = 10): WebhookEvent[] {
    return this.events.slice(0, limit);
  }

  getStats() {
    const total = this.events.length;
    const successful = this.events.filter(e => e.success).length;
    const failed = total - successful;
    const successRate = total > 0 ? (successful / total) * 100 : 0;

    const recentEvents = this.events.slice(0, 10);
    const lastHour = new Date(Date.now() - 60 * 60 * 1000);
    const recentCount = this.events.filter(e => e.timestamp > lastHour).length;

    return {
      total_events: total,
      successful_events: successful,
      failed_events: failed,
      success_rate: Math.round(successRate),
      events_last_hour: recentCount,
      last_event: this.events[0]?.timestamp || null,
      recent_errors: recentEvents
        .filter(e => !e.success)
        .slice(0, 5)
        .map(e => ({
          timestamp: e.timestamp,
          error: e.error,
          event_type: e.event_type
        }))
    };
  }

  // Check webhook health
  getHealthStatus() {
    const stats = this.getStats();
    const lastHour = new Date(Date.now() - 60 * 60 * 1000);
    const recentEvents = this.events.filter(e => e.timestamp > lastHour);
    
    if (recentEvents.length === 0) {
      return {
        status: 'no_activity',
        message: 'No webhook events in the last hour',
        color: 'yellow'
      };
    }

    const recentSuccessRate = recentEvents.filter(e => e.success).length / recentEvents.length * 100;

    if (recentSuccessRate >= 95) {
      return {
        status: 'healthy',
        message: 'Webhooks are working normally',
        color: 'green'
      };
    } else if (recentSuccessRate >= 80) {
      return {
        status: 'warning',
        message: 'Some webhook failures detected',
        color: 'yellow'
      };
    } else {
      return {
        status: 'critical',
        message: 'High webhook failure rate',
        color: 'red'
      };
    }
  }

  // Clear old events (useful for cleanup)
  clearEvents() {
    this.events = [];
    console.log('Webhook events history cleared');
  }
}

// Global instance
export const webhookMonitor = new WebhookMonitor();

// Export for use in API routes
export type { WebhookEvent };
export { WebhookMonitor };
