import { OrderType } from "../types/order.type";


export default function useFetchOrder() {
  const tableData: OrderType[] = [
    {
      id: 101,
      orderId: 1001,
      createOrder: {
        id: 1,
        number: "APL/001/04/25",
        customer: {
          id: 1,
          name: "Zaky Saputra",
        },
        driver: {
          id: 1,
          name: "Doni Saputra",
        },
        vehicle: {
          id: 1,
          type: "Box",
        },
        pickupLocation: "Jl. Melati No.10, Jakarta",
        deliveryLocation: "Jl. Mawar No.5, Bandung",
        deliveryDate: "2025-04-23",
        totalWeight: 1.2,
        totalVolume: 0.6,
      },

      status: "Delivered",

      createdAt: "2025-04-22T07:45:00",
    },
    {
      id: 102,
      orderId: 1002,
      createOrder: {
        id: 2,
        number: "APL/002/04/25",
        customer: {
          id: 1,
          name: "Diana Siregar",
        },
        driver: {
          id: 1,
          name: "Agus Salim",
        },
        vehicle: {
          id: 1,
          type: "Truck",
        },
        pickupLocation: "Jl. Sudirman No.15, Jakarta",
        deliveryLocation: "Jl. Asia Afrika No.22, Bandung",
        deliveryDate: "2025-04-23",
        totalWeight: 3.5,
        totalVolume: 2.5,
      },

      status: "On Delivery",

      createdAt: "2025-04-22T08:30:00",
    },
    {
      id: 103,
      orderId: 1003,
      createOrder: {
        id: 3,
        number: "APL/003/04/25",
        customer: {
          id: 1,
          name: "Joko Susilo",
        },
        driver: {
          id: 1,
          name: "Slamet Riyadi",
        },
        vehicle: {
          id: 1,
          type: "Box",
        },
        pickupLocation: "Jl. Kemuning No.9, Surabaya",
        deliveryLocation: "Jl. Kamboja No.1, Malang",
        deliveryDate: "2025-04-22",
        totalWeight: 6.0,
        totalVolume: 3.2,
      },

      status: "Pending",

      createdAt: "2025-04-22T09:15:00",
    },
    {
      id: 104,
      orderId: 1004,
      createOrder: {
        id: 4,
        number: "APL/004/04/25",
        customer: {
          id: 1,
          name: "Ahmad Hakim",
        },
        driver: {
          id: 1,
          name: "Ridwan Hakim",
        },
        vehicle: {
          id: 1,
          type: "Truck",
        },
        pickupLocation: "Jl. Merdeka No.7, Medan",
        deliveryLocation: "Jl. Gatot Subroto No.3, Pekanbaru",
        deliveryDate: "2025-04-23",
        totalWeight: 8.0,
        totalVolume: 4.2,
      },

      status: "Delivered",

      createdAt: "2025-04-22T11:10:00",
    },
    {
      id: 105,
      orderId: 1005,
      createOrder: {
        id: 5,
        number: "APL/005/04/25",
        customer: {
          id: 1,
          name: "Zainal Abidin",
        },
        driver: {
          id: 1,
          name: "Joko Sembiring",
        },
        vehicle: {
          id: 1,
          type: "Truck",
        },
        pickupLocation: "Jl. Riau No.2, Bandung",
        deliveryLocation: "Jl. Hasanudin No.20, Jakarta",
        deliveryDate: "2025-04-24",
        totalWeight: 12.5,
        totalVolume: 5.5,
      },

      status: "In Transit",

      createdAt: "2025-04-22T12:40:00",
    },
    {
      id: 106,
      orderId: 1006,
      createOrder: {
        id: 6,
        number: "APL/006/04/25",
        customer: {
          id: 1,
          name: "Sutan Priyono",
        },
        driver: {
          id: 1,
          name: "Gusti Arya",
        },
        vehicle: {
          id: 1,
          type: "Truck",
        },
        pickupLocation: "Jl. Teuku Umar No.4, Bali",
        deliveryLocation: "Jl. Diponegoro No.9, Lombok",
        deliveryDate: "2025-04-23",
        totalWeight: 4.3,
        totalVolume: 1.8,
      },

      status: "Pending",

      createdAt: "2025-04-22T14:10:00",
    },
    {
      id: 107,
      orderId: 1007,
      createOrder: {
        id: 7,
        number: "APL/007/04/25",
        customer: {
          id: 1,
          name: "Meli Santika",
        },
        driver: {
          id: 1,
          name: "Riko Satria",
        },
        vehicle: {
          id: 1,
          type: "Box",
        },
        pickupLocation: "Jl. Ahmad Yani No.8, Semarang",
        deliveryLocation: "Jl. Imam Bonjol No.12, Yogyakarta",
        deliveryDate: "2025-04-23",
        totalWeight: 10.2,
        totalVolume: 4.8,
      },

      status: "Delivered",

      createdAt: "2025-04-22T13:15:00",
    },
    {
      id: 108,
      orderId: 1008,
      createOrder: {
        id: 8,
        number: "APL/008/04/25",
        customer: {
          id: 1,
          name: "Purba Daulay",
        },
        driver: {
          id: 1,
          name: "Eka Pratama",
        },
        vehicle: {
          id: 1,
          type: "Motorcyle",
        },
        pickupLocation: "Jl. Cempaka No.3, Palembang",
        deliveryLocation: "Jl. Beringin No.5, Jambi",
        deliveryDate: "2025-04-23",
        totalWeight: 2.1,
        totalVolume: 0.9,
      },

      status: "In Transit",

      createdAt: "2025-04-22T15:40:00",
    },
    {
      id: 109,
      orderId: 1009,
      createOrder: {
        id: 9,
        number: "APL/009/04/25",
        customer: {
          id: 1,
          name: "Dani Permana",
        },
        driver: {
          id: 1,
          name: "Fikri Anwar",
        },
        vehicle: {
          id: 1,
          type: "Motorcyle",
        },
        pickupLocation: "Jl. Sudirman No.99, Makassar",
        deliveryLocation: "Jl. Pattimura No.45, Manado",
        deliveryDate: "2025-04-24",
        totalWeight: 6.8,
        totalVolume: 3.0,
      },

      status: "Pending",

      createdAt: "2025-04-22T17:20:00",
    },
    {
      id: 110,
      orderId: 1010,
      createOrder: {
        id: 10,
        number: "APL/010/04/25",
        customer: {
          id: 1,
          name: "Yahya Hamizan",
        },
        driver: {
          id: 1,
          name: "Andra Putra",
        },
        vehicle: {
          id: 1,
          type: "Motorcyle",
        },
        pickupLocation: "Jl. Pahlawan No.21, Balikpapan",
        deliveryLocation: "Jl. Kalimantan No.8, Samarinda",
        deliveryDate: "2025-04-23",
        totalWeight: 5.0,
        totalVolume: 2.4,
      },

      status: "Delivered",

      createdAt: "2025-04-22T18:20:00",
    },
  ];

  return { tableData };
}
