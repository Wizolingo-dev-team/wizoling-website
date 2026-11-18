import { apiClient } from "@src/lib/apiClient";
import type { ApiDataResponse, ApiResponse } from "@src/types/common";
import type {
  ConfirmTicketPaymentPayload,
  EventItem,
  GetAllEventsParams,
  PurchaseTicketPayload,
  PurchaseTicketResponseData,
  TicketOrder,
} from "@src/types/eventManagement";

const BASE_URL = "/events";

export const eventService = {
  getAllEvents: async (params?: GetAllEventsParams) => {
    return apiClient.get<ApiDataResponse<EventItem[]>>(
      `${BASE_URL}/get-all-events`,
      "Failed to fetch events",
      { params }
    );
  },

  getEventByIdOrSlug: async (idOrSlug: string) => {
    return apiClient.get<ApiDataResponse<EventItem>>(
      `${BASE_URL}/get-event/${idOrSlug}`,
      "Failed to fetch event details"
    );
  },

  purchaseTicket: async (payload: PurchaseTicketPayload) => {
    return apiClient.post<ApiDataResponse<PurchaseTicketResponseData>>(
      `${BASE_URL}/purchase-ticket`,
      payload,
      "Failed to reserve event tickets"
    );
  },

  confirmTicketPayment: async (payload: ConfirmTicketPaymentPayload) => {
    return apiClient.post<ApiResponse<TicketOrder>>(
      `${BASE_URL}/confirm-ticket-payment`,
      payload,
      "Failed to confirm ticket payment"
    );
  },

  getMyTickets: async () => {
    return apiClient.get<ApiDataResponse<TicketOrder[]>>(
      `${BASE_URL}/my-tickets`,
      "Failed to fetch your event tickets"
    );
  },
};
