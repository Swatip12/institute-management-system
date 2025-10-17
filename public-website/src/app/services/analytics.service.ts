import { Injectable } from '@angular/core';

export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  location?: string;
}

export interface ConversionEvent {
  type: 'cta_click' | 'form_submission' | 'course_view' | 'page_view';
  action: string;
  location: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private events: ConversionEvent[] = [];
  private isEnabled = true;

  constructor() {
    // Initialize analytics tracking
    this.initializeAnalytics();
  }

  private initializeAnalytics(): void {
    // In a real implementation, this would initialize Google Analytics, Adobe Analytics, etc.
    console.log('Analytics service initialized');
    
    // Track initial page load
    this.trackPageView(window.location.pathname);
  }

  /**
   * Track CTA button clicks for conversion analysis
   */
  trackCtaClick(action: string, location: string, metadata?: Record<string, any>): void {
    if (!this.isEnabled) return;

    const event: ConversionEvent = {
      type: 'cta_click',
      action,
      location,
      timestamp: new Date(),
      metadata
    };

    this.recordEvent(event);

    // Send to analytics platform (placeholder)
    this.sendToAnalytics({
      action: 'cta_click',
      category: 'conversion',
      label: `${action}_from_${location}`,
      location
    });

    console.log(`CTA Click Tracked: ${action} from ${location}`, metadata);
  }

  /**
   * Track form submissions
   */
  trackFormSubmission(formType: string, location: string, success: boolean): void {
    if (!this.isEnabled) return;

    const event: ConversionEvent = {
      type: 'form_submission',
      action: `${formType}_${success ? 'success' : 'error'}`,
      location,
      timestamp: new Date(),
      metadata: { formType, success }
    };

    this.recordEvent(event);

    this.sendToAnalytics({
      action: 'form_submission',
      category: 'conversion',
      label: `${formType}_${success ? 'success' : 'error'}`,
      value: success ? 1 : 0,
      location
    });

    console.log(`Form Submission Tracked: ${formType} - ${success ? 'Success' : 'Error'}`);
  }

  /**
   * Track course page views
   */
  trackCourseView(courseId: number, courseName: string): void {
    if (!this.isEnabled) return;

    const event: ConversionEvent = {
      type: 'course_view',
      action: 'course_viewed',
      location: `/courses/${courseId}`,
      timestamp: new Date(),
      metadata: { courseId, courseName }
    };

    this.recordEvent(event);

    this.sendToAnalytics({
      action: 'course_view',
      category: 'engagement',
      label: courseName,
      value: courseId,
      location: `/courses/${courseId}`
    });

    console.log(`Course View Tracked: ${courseName} (ID: ${courseId})`);
  }

  /**
   * Track page views
   */
  trackPageView(path: string): void {
    if (!this.isEnabled) return;

    const event: ConversionEvent = {
      type: 'page_view',
      action: 'page_viewed',
      location: path,
      timestamp: new Date(),
      metadata: { path }
    };

    this.recordEvent(event);

    this.sendToAnalytics({
      action: 'page_view',
      category: 'navigation',
      label: path,
      location: path
    });

    console.log(`Page View Tracked: ${path}`);
  }

  /**
   * Get conversion metrics for analysis
   */
  getConversionMetrics(): {
    totalCtaClicks: number;
    totalFormSubmissions: number;
    totalCourseViews: number;
    totalPageViews: number;
    conversionsByLocation: Record<string, number>;
    recentEvents: ConversionEvent[];
  } {
    const ctaClicks = this.events.filter(e => e.type === 'cta_click').length;
    const formSubmissions = this.events.filter(e => e.type === 'form_submission').length;
    const courseViews = this.events.filter(e => e.type === 'course_view').length;
    const pageViews = this.events.filter(e => e.type === 'page_view').length;

    const conversionsByLocation: Record<string, number> = {};
    this.events.forEach(event => {
      if (event.type === 'cta_click') {
        conversionsByLocation[event.location] = (conversionsByLocation[event.location] || 0) + 1;
      }
    });

    return {
      totalCtaClicks: ctaClicks,
      totalFormSubmissions: formSubmissions,
      totalCourseViews: courseViews,
      totalPageViews: pageViews,
      conversionsByLocation,
      recentEvents: this.events.slice(-10) // Last 10 events
    };
  }

  /**
   * Enable or disable analytics tracking
   */
  setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
    console.log(`Analytics tracking ${enabled ? 'enabled' : 'disabled'}`);
  }

  private recordEvent(event: ConversionEvent): void {
    this.events.push(event);
    
    // Keep only last 1000 events to prevent memory issues
    if (this.events.length > 1000) {
      this.events = this.events.slice(-1000);
    }
  }

  private sendToAnalytics(event: AnalyticsEvent): void {
    // In a real implementation, this would send to Google Analytics, Adobe Analytics, etc.
    // Example for Google Analytics 4:
    // gtag('event', event.action, {
    //   event_category: event.category,
    //   event_label: event.label,
    //   value: event.value,
    //   custom_parameter_location: event.location
    // });

    // For now, we'll just log to console and store locally
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
        custom_parameter_location: event.location
      });
    }
  }
}