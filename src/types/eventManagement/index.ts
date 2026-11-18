import type { MongoEntity } from "@src/types/common";
import type { PaymentMethod, PaymentStatus } from "@src/types/orderManagement";

export type EventStatus =
  | "UPCOMING"
  | "ON SALE"
  | "SOLD OUT"
  | "PAST SHOW"
  | "CANCELLED"
  | "DRAFT";

export type EventArtist = {
  _id: string;
  name: string;
  stage: string;
  performanceTime: string;
  imageUrl: string;
};

export type TicketTier = {
  _id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  totalQuantity: number;
  soldQuantity: number;
  isActive: boolean;
};

export type EventItem = MongoEntity & {
  title: string;
  slug: string;
  description: string;
  startDate: string;
  endDate?: string;
  dateLabel: string;
  time: string;
  venue: string;
  location: string;
  mapEmbedUrl: string;
  latitude?: number;
  longitude?: number;
  eventType: string;
  status: EventStatus;
  websiteUrl: string;
  organizedBy: string;
  flyerUrl: string;
  artists: EventArtist[];
  ticketTiers: TicketTier[];
  isFeatured: boolean;
  isActive: boolean;
  shareUrl?: string;
};

export type GetAllEventsParams = {
  status?: EventStatus;
  eventType?: string;
  featured?: boolean;
  search?: string;
};

export type TicketOrderStatus =
  | "Processing"
  | "Confirmed"
  | "Checked In"
  | "Cancelled";

export type PurchasedTicketItem = {
  tierId: string;
  tierName: string;
  unitPrice: number;
  quantity: number;
  subtotal: number;
};

export type TicketOrder = MongoEntity & {
  event: string | Pick<EventItem, "_id" | "title" | "slug" | "venue" | "location" | "startDate" | "endDate" | "dateLabel" | "time" | "flyerUrl">;
  user: string;
  attendeeName: string;
  email: string;
  phone: string;
  tickets: PurchasedTicketItem[];
  totalAmount: number;
  currency: string;
  ticketCode: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paypalOrderId: string;
  transactionRef?: string;
  transaction_id?: string | number | Record<string, unknown>;
  status: TicketOrderStatus;
};

export type PurchaseTicketSelection = {
  tierId: string;
  quantity: number;
};

export type PurchaseTicketPayload = {
  eventId: string;
  tickets: PurchaseTicketSelection[];
  attendeeName?: string;
  email?: string;
  phone?: string;
};

export type PurchaseTicketResponseData = {
  ticketOrder: TicketOrder;
  payment: {
    paypalOrderId?: string;
    approvalUrl?: string;
    status?: string;
  };
};

export type ConfirmTicketPaymentPayload = {
  ticketOrderId: string;
  paypalOrderId?: string;
  transactionId?: string;
};
