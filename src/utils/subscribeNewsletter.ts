import { apiClient } from "@src/lib/apiClient";

const SUBSCRIBED_KEY = "wiz_newsletter_subscribed";

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
 * Submits an email address to the backend newsletter endpoint (/api/newsletter/subscribe).
 */
export const subscribeToNewsletter = async (
  email: string,
  source: "popup" | "footer" | "checkout" | "website" = "website",
  name?: string
): Promise<{ success: boolean; message?: string }> => {
  const response = await apiClient.post<{ success: boolean; message?: string }>(
    "/newsletter/subscribe",
    { email, source, name },
    "Failed to subscribe to newsletter"
  );

  markNewsletterSubscribed();
  return response;
};
