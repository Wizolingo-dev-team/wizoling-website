import type { TicketOrder } from "@src/types/eventManagement";

export type TicketStatusConfig = {
  label: string;
  bgClass: string;
  badgeTextClass: string;
  borderClass: string;
  description: string;
  iconName: "check" | "checked-in" | "processing" | "cancelled";
};

export function getTicketStatusConfig(
  status: TicketOrder["status"]
): TicketStatusConfig {
  switch (status) {
    case "Confirmed":
      return {
        label: "CONFIRMED",
        bgClass: "bg-emerald-600",
        badgeTextClass: "text-white",
        borderClass: "border-emerald-600",
        description: "Valid official Wiz Ofuasia pass. Ready for entry.",
        iconName: "check",
      };
    case "Checked In":
      return {
        label: "CHECKED IN",
        bgClass: "bg-blue-600",
        badgeTextClass: "text-white",
        borderClass: "border-blue-600",
        description: "Pass has already been scanned and admitted at the venue.",
        iconName: "checked-in",
      };
    case "Cancelled":
      return {
        label: "CANCELLED",
        bgClass: "bg-[#D70E1D]",
        badgeTextClass: "text-white",
        borderClass: "border-[#D70E1D]",
        description: "This ticket has been cancelled and is no longer valid.",
        iconName: "cancelled",
      };
    case "Processing":
    default:
      return {
        label: "PROCESSING",
        bgClass: "bg-amber-500",
        badgeTextClass: "text-white",
        borderClass: "border-amber-500",
        description: "Payment or confirmation is currently pending.",
        iconName: "processing",
      };
  }
}

