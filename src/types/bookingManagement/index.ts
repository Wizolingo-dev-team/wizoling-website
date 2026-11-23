// Booking inquiry types — aligned with wizolingo-server bookings schema
import type { MongoEntity } from "@src/types/common";

export type BookingStatus =
  | "pending"
  | "reviewed"
  | "confirmed"
  | "rejected"
  | "cancelled";

export type BookingEventType =
  | "concert"
  | "festival"
  | "private"
  | "corporate"
  | "tv-radio"
  | "work-with-me"
  | "Work-with-me"
  | "other"
  | (string & {});

export type BookingInquiry = MongoEntity & {
  fullName: string;
  email: string;
  phone?: string;
  phoneNumber?: string;
  eventType: BookingEventType;
  /** ISO date string or human-readable preferred date */
  eventDate?: string;
  country?: string;
  message: string;
  status: BookingStatus;
};

export type CreateBookingPayload = {
  fullName: string;
  name?: string;
  email: string;
  phone?: string;
  phoneNumber?: string;
  eventType: BookingEventType;
  eventDate?: string;
  country?: string;
  message: string;
};

export type CreateBookingResponseData = {
  booking: BookingInquiry;
};

