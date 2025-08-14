import { NextResponse } from 'next/server';
import { webhookMonitor } from '@/lib/webhook-monitor';

export async function GET() {
  try {
    const stats = webhookMonitor.getStats();
    const health = webhookMonitor.getHealthStatus();
    const recentEvents = webhookMonitor.getRecentEvents(20);

    return NextResponse.json({
      health_status: health,
      statistics: stats,
      recent_events: recentEvents,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error fetching webhook status:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch webhook status',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

// POST endpoint to clear webhook history (for maintenance)
export async function POST() {
  try {
    webhookMonitor.clearEvents();
    
    return NextResponse.json({
      success: true,
      message: 'Webhook history cleared',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error clearing webhook history:', error);
    return NextResponse.json(
      { 
        error: 'Failed to clear webhook history',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
