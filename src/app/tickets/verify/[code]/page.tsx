import type { Metadata } from "next";
import TicketVerifyContent from "@src/components/Sections/TicketVerify/TicketVerifyContent";

export const metadata: Metadata = {
  title: "Verify Ticket | Wiz Ofuasia",
  description: "Verify the live status of a Wiz Ofuasia official event ticket.",
};

export default async function VerifyTicketPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  return <TicketVerifyContent code={code} />;
}

