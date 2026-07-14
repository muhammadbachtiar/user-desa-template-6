export type CreateOrderType = {
  id: number;
  trackingNumber: string,
  status: string,
  sender: string,
  recipient: string,
  origin: string,
  destination: string,
  shippingDate: string,
  estimatedDelivery: string,
  service: string,
  weight: string,
  dimensions: string,
  history: CreateOrderHistoryType[]
}

export type CreateOrderHistoryType = {
  date: string,
  location: string,
  description: string,
  status: string,
}