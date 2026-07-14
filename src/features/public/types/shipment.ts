export interface ShipmentHistoryItem {
    date: string
    location: string
    description: string
    status: "pending" | "in_transit" | "delivered" | "exception"
  }
  
  export interface Shipment {
    id: string
    trackingNumber: string
    status: "pending" | "in_transit" | "delivered" | "exception"
    sender: string
    recipient: string
    origin: string
    destination: string
    shippingDate: string
    estimatedDelivery: string
    service: string
    weight: string
    dimensions: string
    history: ShipmentHistoryItem[]
  }
  