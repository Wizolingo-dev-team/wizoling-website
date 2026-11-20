"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { eventService } from "@src/lib/requests/eventManagement";
import { useToast } from "@src/hooks/useToast";
import { getAuthToken } from "@src/utils/auth";
import type {
  ConfirmTicketPaymentPayload,
  GetAllEventsParams,
  PurchaseTicketPayload,
} from "@src/types/eventManagement";

export const useGetAllEvents = (params?: GetAllEventsParams) => {
  return useQuery({
    queryKey: ["events", params],
    queryFn: async () => {
      const response = await eventService.getAllEvents(params);
      return response.data ?? [];
    },
  });
};

export const useGetEventByIdOrSlug = (idOrSlug: string) => {
  return useQuery({
    queryKey: ["event", idOrSlug],
    queryFn: async () => {
      const response = await eventService.getEventByIdOrSlug(idOrSlug);
      return response.data;
    },
    enabled: Boolean(idOrSlug),
  });
};

export const usePurchaseTicket = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (payload: PurchaseTicketPayload) =>
      eventService.purchaseTicket(payload),
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: ["myTickets"] });
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["event", variables.eventId] });
      toast.success(
        response.message || "Ticket reservation created successfully!"
      );
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to reserve tickets");
    },
  });
};

export const useConfirmTicketPayment = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (payload: ConfirmTicketPaymentPayload) =>
      eventService.confirmTicketPayment(payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["myTickets"] });
      toast.success(response.message || "Ticket payment confirmed!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to confirm ticket payment");
    },
  });
};

export const useGetMyTickets = () => {
  return useQuery({
    queryKey: ["myTickets"],
    queryFn: async () => {
      const response = await eventService.getMyTickets();
      return response.data ?? [];
    },
    enabled: Boolean(getAuthToken()),
  });
};

export const useVerifyTicket = (ticketCode: string) => {
  return useQuery({
    queryKey: ["verifyTicket", ticketCode],
    queryFn: async () => {
      const response = await eventService.verifyTicketByCode(ticketCode);
      return response.data;
    },
    enabled: Boolean(ticketCode),
    retry: false,
  });
};
