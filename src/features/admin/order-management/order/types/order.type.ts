export type OrderType = {
  id: number;
  orderId: number;
  createOrder: {
    id: number;
    number: string;
    customer: {
      id: number;
      name: string;
    };
    driver: {
      id: number;
      name: string;
    };
    vehicle: {
      id: number;
      type: string;
    };
    pickupLocation: string;
    deliveryLocation: string;
    deliveryDate: string;
    totalWeight: number;
    totalVolume: number;
  };

  status: string;

  createdAt: string;
};
