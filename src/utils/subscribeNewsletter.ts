const SUBSCRIBED_KEY = "wiz_newsletter_subscribed";

// Set NEXT_PUBLIC_MAILCHIMP_ACTION_URL and NEXT_PUBLIC_MAILCHIMP_HONEYPOT in .env.local
// once Wiz Ofuasia's Mailchimp embed script is ready.
const MAILCHIMP_ACTION_URL =
  process.env.NEXT_PUBLIC_MAILCHIMP_ACTION_URL ?? "";
const MAILCHIMP_HONEYPOT =
  process.env.NEXT_PUBLIC_MAILCHIMP_HONEYPOT ?? "";

export const isNewsletterSubscribed = (): boolean => {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(SUBSCRIBED_KEY) === "true";
  } catch {
    return false;
  }
};

export const markNewsletterSubscribed = (): void => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(SUBSCRIBED_KEY, "true");
  } catch {
    // ignore storage errors
  }
};

/**
 * Submits an email address to Wiz Ofuasia's Mailchimp Newsletter Audience
 * using the same FormData + no-cors pattern as diaspora-cupid-connect-client.
 */
export const subscribeToNewsletter = async (email: string): Promise<boolean> => {
  if (MAILCHIMP_ACTION_URL) {
    const formData = new FormData();
    formData.append("EMAIL", email);
    if (MAILCHIMP_HONEYPOT) {
      // Mailchimp anti-bot field
      formData.append(MAILCHIMP_HONEYPOT, "");
    }

    await fetch(MAILCHIMP_ACTION_URL, {
      method: "POST",
      mode: "no-cors",
      body: formData,
    });
  }

  markNewsletterSubscribed();
  return true;
};
