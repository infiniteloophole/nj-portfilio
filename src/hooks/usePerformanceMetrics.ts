import { useEffect, useRef, useCallback } from 'react';

declare global {
  interface Window {
    PerformanceEventTiming: typeof PerformanceEventTiming;
  }
}

type LayoutShift = PerformanceEntry & {
  value: number;
  hadRecentInput: boolean;
  lastInputTime: number;
  sources: Array<{
    node: Node;
    previousRect: DOMRectReadOnly;
    currentRect: DOMRectReadOnly;
  }>;
};

interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  tbt?: number; // Total Blocking Time
  tti?: number; // Time to Interactive
}

// Extend Window interface to include Performance types
declare global {
  interface Window {
    PerformanceEventTiming: typeof PerformanceEventTiming;
    // LayoutShift is already defined as a type alias above
  }
}

export const usePerformanceMetrics = (onReport?: (metrics: PerformanceMetrics) => void) => {
  const metrics = useRef<PerformanceMetrics>({});
  const reportSent = useRef(false);
  
  const sendReportIfReady = useCallback(() => {
    if (onReport && !reportSent.current) {
      onReport(metrics.current);
      reportSent.current = true;
    }
  }, [onReport]);

  useEffect(() => {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
      return;
    }

    // Track First Contentful Paint (FCP)
    const fcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
      
      if (fcpEntry) {
        metrics.current.fcp = Math.round(fcpEntry.startTime);
        sendReportIfReady();
      }
    });
    fcpObserver.observe({ entryTypes: ['paint'] });

    // Track Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      
      if (lastEntry) {
        metrics.current.lcp = Math.round(lastEntry.startTime);
        sendReportIfReady();
      }
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // Track Total Blocking Time (TBT)
    let tbtValue = 0;
    const longTaskObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries() as PerformanceEntry[];
      entries.forEach(entry => {
        const blockingTime = entry.duration - 50; // Tasks > 50ms are considered blocking
        if (blockingTime > 0) {
          tbtValue += blockingTime;
          metrics.current.tbt = Math.round(tbtValue);
          sendReportIfReady();
        }
      });
    });
    longTaskObserver.observe({ entryTypes: ['longtask'] });

    // Track First Input Delay (FID)
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries() as PerformanceEventTiming[];
      const firstInput = entries[0];
      
      if (firstInput && firstInput.processingStart - firstInput.startTime < 100) {
        metrics.current.fid = Math.round(firstInput.processingStart - firstInput.startTime);
        sendReportIfReady();
      }
    });
    fidObserver.observe({ entryTypes: ['first-input'] });

    // Track Cumulative Layout Shift (CLS)
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries() as LayoutShift[];
      entries.forEach(entry => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      metrics.current.cls = Math.round(clsValue * 1000) / 1000; // Round to 3 decimal places
      sendReportIfReady();
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });

    // Track Time to Interactive (TTI) and Total Blocking Time (TBT)
    const ttiPolyfill = () => {
      // This is a simplified TTI/TBT calculation
      // In a real app, you might want to use web-vitals library for more accurate results
      interface PerformanceTimingExtended extends PerformanceTiming {
        domInteractive: number;
        navigationStart: number;
      }
      
      const timing = performance.timing as unknown as PerformanceTimingExtended;
      const tti = timing.domInteractive - timing.navigationStart;
      
      // Type for long task entries
      interface LongTaskEntry extends PerformanceEntry {
        startTime: number;
        duration: number;
      }
      
      const tbt = (performance.getEntriesByType('long-task') as LongTaskEntry[])
        .filter(entry => entry.startTime < tti)
        .reduce((sum, entry) => sum + entry.duration - 50, 0);
      
      if (tti > 0) {
        metrics.current.tti = Math.round(tti);
      }
      
      if (tbt > 0) {
        metrics.current.tbt = Math.round(tbt);
      }
      
      sendReportIfReady();
    };

    // Wait for the page to be fully loaded before calculating TTI/TBT
    if (document.readyState === 'complete') {
      ttiPolyfill();
    } else {
      window.addEventListener('load', ttiPolyfill);
    }

    // Clean up observers when component unmounts
    return () => {
      fcpObserver.disconnect();
      lcpObserver.disconnect();
      fidObserver.disconnect();
      clsObserver.disconnect();
      longTaskObserver.disconnect();
      window.removeEventListener('load', ttiPolyfill);
    };
  }, [sendReportIfReady]);

  // sendReportIfReady is now defined at the top level of the hook

  return metrics.current;
};
