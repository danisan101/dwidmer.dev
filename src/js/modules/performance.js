// Performance Monitoring Module
import { log, shouldLog } from '../utils/logger.js';

export function initPerformanceMonitoring() {
    if (!shouldLog()) {
        return;
    }

    if (!('PerformanceObserver' in window)) {
        return;
    }

    // Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        log('LCP:', lastEntry.startTime);
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // Interaction to Next Paint (INP) — replaces deprecated FID
    try {
        const inpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry) => {
                log('INP event:', entry.name, entry.duration);
            });
        });
        inpObserver.observe({ type: 'event', buffered: true, durationThreshold: 16 });
    } catch (e) {
        // 'event' entryType not supported in all browsers
    }

    // Cumulative Layout Shift (CLS)
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
            if (!entry.hadRecentInput) {
                clsValue += entry.value;
            }
        });
        log('CLS:', clsValue);
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });
}
