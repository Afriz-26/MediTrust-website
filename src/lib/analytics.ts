import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_MEASUREMENT_ID = 
  import.meta.env.VITE_GA_MEASUREMENT_ID || 
  import.meta.env.VITE_GA_TRACKING_ID || 
  '';

let isInitialized = false;

export function initGA(): void {
  if (isInitialized || typeof window === 'undefined' || !GA_MEASUREMENT_ID || GA_MEASUREMENT_ID.includes('MEDYNEX123')) {
    return;
  }

  try {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      send_page_view: false,
      anonymize_ip: true,
      cookie_flags: 'SameSite=None;Secure'
    });

    isInitialized = true;
    console.log(`[GA4] Initialized Google Analytics 4 with ID: ${GA_MEASUREMENT_ID}`);
  } catch (err) {
    console.warn('[GA4] Failed to initialize Google Analytics:', err);
  }
}

export function trackPageView(path: string, title?: string): void {
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID.includes('MEDYNEX123')) return;
  if (!isInitialized) initGA();

  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title || document.title,
      page_location: window.location.href
    });
  }
}

export function trackEvent(action: string, category: string, label?: string, value?: number): void {
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID.includes('MEDYNEX123')) return;
  if (!isInitialized) initGA();

  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    });
  }
}

export function trackButtonClick(buttonName: string, location?: string): void {
  trackEvent('click', 'Button', `${buttonName}${location ? ` (${location})` : ''}`);
}

export function trackFormSubmit(formName: string, isSuccess: boolean = true): void {
  trackEvent('submit', 'Form', `${formName} - ${isSuccess ? 'Success' : 'Failure'}`);
}

export function trackExternalLink(url: string): void {
  trackEvent('click', 'ExternalLink', url);
}

export function trackDownload(fileName: string): void {
  trackEvent('download', 'File', fileName);
}

export const AnalyticsTracker: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    initGA();
  }, []);

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  useEffect(() => {
    // Event delegation for tracking external links and download links automatically
    const handleGlobalClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement)?.closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (!href) return;

      if (href.startsWith('http') && !href.includes(window.location.hostname)) {
        trackExternalLink(href);
      } else if (href.match(/\.(pdf|zip|doc|docx|xls|xlsx|csv|jpg|png)$/i)) {
        trackDownload(href);
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  return null;
};
