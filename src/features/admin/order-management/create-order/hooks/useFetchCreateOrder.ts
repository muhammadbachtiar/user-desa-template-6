import { CreateOrderType } from "../types/createOrder.type";

export default function useFetchCreateOrder() {
  const tableData: CreateOrderType[] = [
    {
      id: 0,
      trackingNumber: "SHIP123456789",
      status: "delivered",
      sender: "PT Supplier Indonesia",
      recipient: "John Doe",
      origin: "Jakarta, Indonesia",
      destination: "Surabaya, Indonesia",
      shippingDate: "2023-05-01",
      estimatedDelivery: "2023-05-04",
      service: "Express",
      weight: "2.5 kg",
      dimensions: "30 x 20 x 10 cm",
      history: [
        {
          date: "2023-05-04 14:30",
          location: "Surabaya, Indonesia",
          description: "Paket telah diterima oleh John Doe",
          status: "delivered",
        },
        {
          date: "2023-05-04 09:15",
          location: "Surabaya, Indonesia",
          description: "Paket sedang dalam perjalanan untuk pengiriman",
          status: "in_transit",
        },
        {
          date: "2023-05-03 18:45",
          location: "Surabaya, Indonesia",
          description: "Paket telah tiba di pusat distribusi Surabaya",
          status: "in_transit",
        },
        {
          date: "2023-05-02 10:30",
          location: "Jakarta, Indonesia",
          description: "Paket telah dikirim dari Jakarta",
          status: "in_transit",
        },
        {
          date: "2023-05-01 15:20",
          location: "Jakarta, Indonesia",
          description: "Paket telah diproses di pusat sortir",
          status: "in_transit",
        },
        {
          date: "2023-05-01 09:00",
          location: "Jakarta, Indonesia",
          description: "Paket telah diterima oleh kurir",
          status: "pending",
        },
      ],
    },
    {
      id: 1,
      trackingNumber: "SHIP987654321",
      status: "in_transit",
      sender: "Toko Online Shop",
      recipient: "Jane Smith",
      origin: "Bandung, Indonesia",
      destination: "Yogyakarta, Indonesia",
      shippingDate: "2023-05-03",
      estimatedDelivery: "2023-05-06",
      service: "Regular",
      weight: "1.2 kg",
      dimensions: "25 x 15 x 8 cm",
      history: [
        {
          date: "2023-05-05 11:20",
          location: "Semarang, Indonesia",
          description: "Paket dalam perjalanan ke kota tujuan",
          status: "in_transit",
        },
        {
          date: "2023-05-04 16:45",
          location: "Semarang, Indonesia",
          description: "Paket telah tiba di pusat transit Semarang",
          status: "in_transit",
        },
        {
          date: "2023-05-03 14:30",
          location: "Bandung, Indonesia",
          description: "Paket telah dikirim dari Bandung",
          status: "in_transit",
        },
        {
          date: "2023-05-03 10:15",
          location: "Bandung, Indonesia",
          description: "Paket telah diproses di pusat sortir",
          status: "pending",
        },
      ],
    },
    {
      id: 2,
      trackingNumber: "SHIP456789123",
      status: "pending",
      sender: "Marketplace Indonesia",
      recipient: "Ahmad Rizki",
      origin: "Medan, Indonesia",
      destination: "Makassar, Indonesia",
      shippingDate: "2023-05-05",
      estimatedDelivery: "2023-05-09",
      service: "Economy",
      weight: "3.7 kg",
      dimensions: "40 x 30 x 20 cm",
      history: [
        {
          date: "2023-05-05 09:30",
          location: "Medan, Indonesia",
          description: "Paket telah diterima oleh kurir",
          status: "pending",
        },
      ],
    },
  ];

  return { tableData };
}
