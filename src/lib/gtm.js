export const sendToDataLayer = (eventData) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(eventData);
  };
  