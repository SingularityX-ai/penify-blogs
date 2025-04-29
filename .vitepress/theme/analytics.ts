import { Dict } from "mixpanel-browser";

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    gtag: any;
  }
}

// Helper to check if code is running in browser environment
const isBrowser = (): boolean => {
  return typeof window !== 'undefined' && window.document !== undefined;
};

export function inHouseAnalytics(event: string, eventRef: Dict) {
  if (!isBrowser()) {
    console.log('Analytics not sent: Not in browser environment');
    return;
  }
  
  // Debug logs (remove in production)
  // console.log(`Analytics event: ${event}`, eventRef);
  
  // Skip tracking on localhost unless in debug mode
  const isLocalhost = window.location.hostname === "localhost";
  event = "docs_"+event
  const cId = localStorage.getItem("cId");
  let email = localStorage.getItem("email");
  
  if(!email) {
    // Generate a unique anonymous ID if email doesn't exist
    let anonymousId = getQueryParameter("aId")  || localStorage.getItem("aId");
    
    if (!anonymousId) {
      // Create unique ID combining timestamp and random string
      anonymousId = `an_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
      // localStorage.setItem("aId", anonymousId);
    }
    localStorage.setItem("aId", anonymousId);
    email = anonymousId; // Use this as the identifier instead of email
  }
  
  const campaignId = getQueryParameter("oid") || "-1";
  const campaignType = getQueryParameter("ot") || "-1";
  const cIdInt = parseInt(cId || "-1");
  const eId = parseInt(getQueryParameter("eid") || "-1");
  const data = {
    eventType: event,
    cId: cIdInt,
    email,
    eventRef: JSON.stringify(eventRef),
    campaignId,
    campaignType,
    meta: JSON.stringify({
      url: isBrowser() ? window.location.href : '',
      referrer: isBrowser() ? document.referrer : '',
      eId: eId,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent
    }),
  };

  try {
    // console.log('Sending analytics data:', data);
    let url = "https://production-gateway.snorkell.ai/api/v1/analytics/track";
    if (isLocalhost) {
      url = "https://staging-gateway.snorkell.ai/api/v1/analytics/track";
    }
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      // Add these options for better cross-origin support
      mode: 'cors',
      credentials: 'omit'
    })
    .then(response => {
      // console.log('Analytics response status:', response.status);
      if (!response.ok) {
        // console.error('Analytics API error:', response.status);
      }
      return response.text();
    })
    .then(text => {
      if (text) {
        try {
          const json = JSON.parse(text);
          // console.log('Analytics API response:', json);
        } catch (e) {
          // console.log('Analytics API response (text):', text);
        }
      }
    })
    .catch(error => {
      console.error('Analytics fetch error:', error);
    });
  } catch (error) {
    console.error('Analytics error:', error);
  }
}

export const pageView = (url: string) => {
  inHouseAnalytics("pageView", {url});
};

export const getQueryParameter = (name: string) => {
  if (!isBrowser()){
    console.log("Server side rendering - can't access URL parameters");
    return null
  };
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
};

export const trackLinkClick = (url: string, email: string = "", cId: string = "") => {
  inHouseAnalytics("linkClick", { 
    url,
    referrer: document.referrer || window.location.href 
  });
};

export const trackScroll = (value: number) => {
  inHouseAnalytics("scroll", {
    depth: `${value}%`,
    url: window.location.href
  });
};

export const trackFormSubmission = (value: [string]) => {
  inHouseAnalytics("formSubmission", {
    event: "contact us form submission",
    formData: value
  });
};

export const trackVideoStart = (value: boolean) => {
  inHouseAnalytics("videoView", {
    event: "Penify.dev video tuts",
    play: value
  });
};


// Initialize analytics on page load
if (isBrowser()) {
  // Auto-initialize
  window.addEventListener('load', () => {
    console.log('Analytics initialized on page load');
    pageView(window.location.href);
  });
}