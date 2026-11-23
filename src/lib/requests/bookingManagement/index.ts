import { apiClient } from "@src/lib/apiClient";
import type { ApiDataResponse } from "@src/types/common";
import type {
  CreateBookingPayload,
  CreateBookingResponseData,
} from "@src/types/bookingManagement";

const BASE_URL = "/bookings";

export const bookingService = {
  createBooking: async (payload: CreateBookingPayload) => {
    return apiClient.post<ApiDataResponse<CreateBookingResponseData>, CreateBookingPayload>(
      `${BASE_URL}/create`,
      payload,
      "Failed to submit booking inquiry"
    );
  },
};

