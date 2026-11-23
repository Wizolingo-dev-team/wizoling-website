"use client";

import { useMutation } from "@tanstack/react-query";
import { bookingService } from "@src/lib/requests/bookingManagement";
import type { CreateBookingPayload } from "@src/types/bookingManagement";

export const useCreateBooking = () => {
  return useMutation({
    mutationFn: (payload: CreateBookingPayload) =>
      bookingService.createBooking(payload),
  });
};
