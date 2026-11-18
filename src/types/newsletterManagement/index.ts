import type { MongoEntity } from "@src/types/common";

export type NewsletterSource = "popup" | "footer" | "checkout" | "admin" | "other";

export type NewsletterStatus = "subscribed" | "unsubscribed";

export type NewsletterSubscriber = MongoEntity & {
  email: string;
  name: string;
  source: NewsletterSource;
  status: NewsletterStatus;
  unsubscribeToken: string;
  subscribedAt: string;
  unsubscribedAt?: string;
};

export type SubscribeNewsletterPayload = {
  email: string;
  name?: string;
  source?: NewsletterSource;
};

export type UnsubscribeNewsletterPayload = {
  email?: string;
  token?: string;
};

