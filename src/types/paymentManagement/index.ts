export type CreatePayPalOrderPayload = {
  orderId: string;
};

export type PayPalSessionData = {
  paypalOrderId: string;
  approvalUrl?: string;
  status?: string;
};

export type CapturePayPalOrderPayload = {
  orderId: string;
  paypalOrderId?: string;
  transactionId?: string;
};

