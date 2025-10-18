import { Injectable, ErrorHandler } from '@angular/core';
import { AnalyticsService } from './analytics.service';
import { PerformanceService } from './performance.service';

export interface ErrorReport {
  message: string;
  stack?: string;
  url: string;
  lineNumber?: number;
  columnNumber?: number;
  timestamp: Date;
  userAgent: string;
  userId?: string;
}

export interface PerformanceReport {
  metrics: any;
  url: string;
  timestamp: Date;
  userAgent: string;
  connectionType?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MonitoringService implements ErrorHandler {
  private errorQueue: ErrorReport[] = [];
  private performanceQueue: PerformanceReport[] = [];
  private maxQueueSize = 50;

  constructor(
    private analytics: AnalyticsService,
    private performance: PerformanceService
  ) {
    this.initializeMonitoring();
  }

  private initializeMonitoring(): void {
    // Global error handler
    window.addEventListener('error', (event) => {
      this.handleError({
        message: event.message,
        stack: event.error?.stack,
        url: event.filename || window.location.href,
        lineNumber: event.lineno,
        columnNumber: event.colno,
        timestamp: new Date(),
        userAgent: navigator.userAgent
      });
    });

    // Unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.handleError({
        message: `Unhandled Promise Rejection: ${event.reason}`,
        stack: event.reason?.stack,
        url: window.location.href,
        timestamp: new Date(),
        userAgent: navigator.userAgent
      });
    });

    // Performance monitoring
    this.startPerformanceMonitoring();

    // Send queued data periodically
    setInterval(() => {
      this.flushQueues();
    }, 30000); // Every 30 seconds
  }

  handleError(error: any): void {
    const errorReport: ErrorReport = {
      message: error.message || error.toString(),
      stack: error.stack,
      url: window.location.href,
      timestamp: new Date(),
      userAgent: navigator.userAgent
    };

    this.queueError(errorReport);
    
    // Track in analytics
    this.analytics.trackError(
      errorReport.message,
      errorReport.url,
      this.getErrorSeverity(errorReport.message)
    );

    // Log to console in development
    if (!this.isProduction()) {
      console.error('Error caught by monitoring service:', error);
    }
  }

  private queueError(error: ErrorReport): void {
    this.errorQueue.push(error);
    
    if (this.errorQueue.length > this.maxQueueSize) {
      this.errorQueue.shift(); // Remove oldest error
    }
  }

  private startPerformanceMonitoring(): void {
    // Monitor page load performance
    window.addEventListener('load', () => {
      setTimeout(() => {
        const metrics = this.performance.getMetrics();
        this.queuePerformanceReport({
          metrics,
          url: window.location.href,
          timestamp: new Date(),
          userAgent: navigator.userAgent,
          connectionType: this.getConnectionType()
        });

        // Track key metrics in analytics
        this.analytics.trackPerformance('page_load_time', metrics.loadTime);
        this.analytics.trackPerformance('dom_content_loaded', metrics.domContentLoaded);
        
        if (metrics.firstContentfulPaint) {
          this.analytics.trackPerformance('first_contentful_paint', metrics.firstContentfulPaint);
        }
        
        if (metrics.largestContentfulPaint) {
          this.analytics.trackPerformance('largest_contentful_paint', metrics.largestContentfulPaint);
        }
      }, 1000);
    });

    // Monitor resource performance
    setInterval(() => {
      this.performance.analyzeResourcePerformance();
    }, 60000); // Every minute
  }

  private queuePerformanceReport(report: PerformanceReport): void {
    this.performanceQueue.push(report);
    
    if (this.performanceQueue.length > this.maxQueueSize) {
      this.performanceQueue.shift(); // Remove oldest report
    }
  }

  private flushQueues(): void {
    if (this.errorQueue.length > 0) {
      this.sendErrorReports([...this.errorQueue]);
      this.errorQueue = [];
    }

    if (this.performanceQueue.length > 0) {
      this.sendPerformanceReports([...this.performanceQueue]);
      this.performanceQueue = [];
    }
  }

  private sendErrorReports(errors: ErrorReport[]): void {
    // In a real application, you would send these to your monitoring service
    // For now, we'll just track them in analytics
    errors.forEach(error => {
      this.analytics.trackEvent({
        action: 'error_report',
        category: 'monitoring',
        label: error.message,
        custom_parameters: {
          stack: error.stack,
          url: error.url,
          line_number: error.lineNumber,
          column_number: error.columnNumber,
          timestamp: error.timestamp.toISOString(),
          user_agent: error.userAgent
        }
      });
    });

    console.log(`Sent ${errors.length} error reports to monitoring service`);
  }

  private sendPerformanceReports(reports: PerformanceReport[]): void {
    // In a real application, you would send these to your monitoring service
    reports.forEach(report => {
      this.analytics.trackEvent({
        action: 'performance_report',
        category: 'monitoring',
        label: 'page_performance',
        custom_parameters: {
          metrics: report.metrics,
          url: report.url,
          timestamp: report.timestamp.toISOString(),
          user_agent: report.userAgent,
          connection_type: report.connectionType
        }
      });
    });

    console.log(`Sent ${reports.length} performance reports to monitoring service`);
  }

  private getErrorSeverity(message: string): 'low' | 'medium' | 'high' {
    const highSeverityKeywords = ['uncaught', 'fatal', 'critical', 'security'];
    const mediumSeverityKeywords = ['error', 'exception', 'failed', 'timeout'];

    const lowerMessage = message.toLowerCase();
    
    if (highSeverityKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return 'high';
    }
    
    if (mediumSeverityKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return 'medium';
    }
    
    return 'low';
  }

  private getConnectionType(): string {
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    return connection ? connection.effectiveType || connection.type || 'unknown' : 'unknown';
  }

  private isProduction(): boolean {
    return window.location.hostname !== 'localhost' && !window.location.hostname.includes('127.0.0.1');
  }

  // Public methods for manual tracking
  trackCustomError(message: string, context?: any): void {
    this.handleError({
      message,
      stack: new Error().stack,
      context
    });
  }

  trackPerformanceMetric(name: string, value: number): void {
    this.analytics.trackPerformance(name, value);
  }

  getErrorReports(): ErrorReport[] {
    return [...this.errorQueue];
  }

  getPerformanceReports(): PerformanceReport[] {
    return [...this.performanceQueue];
  }

  clearQueues(): void {
    this.errorQueue = [];
    this.performanceQueue = [];
  }
}