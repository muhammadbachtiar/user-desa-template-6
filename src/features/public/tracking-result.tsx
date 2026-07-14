import { CheckCircle, Clock, MapPin, Package, Truck } from "lucide-react"
import { Shipment } from "./types/shipment"

export default function TrackingResult({ shipment }: { shipment: Shipment }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "text-green-600"
      case "in_transit":
        return "text-blue-600"
      case "pending":
        return "text-yellow-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-6 w-6 text-green-600" />
      case "in_transit":
        return <Truck className="h-6 w-6 text-blue-600" />
      case "pending":
        return <Clock className="h-6 w-6 text-yellow-600" />
      default:
        return <Package className="h-6 w-6 text-gray-600" />
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl mx-auto">
      <div className="border-b pb-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold">Informasi Pesanan</h2>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(shipment.status)} bg-opacity-10`}
          >
            {shipment.status === "delivered" && "Selesai"}
            {shipment.status === "in_transit" && "Sedangn Diproses"}
            {shipment.status === "pending" && "Menunggu"}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Nomor Pesanan</p>
            <p className="font-medium">{shipment.trackingNumber}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Tanggal Pesanan</p>
            <p className="font-medium">{shipment.shippingDate}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Pemesan</p>
            <p className="font-medium">{shipment.sender}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Penerima</p>
            <p className="font-medium">{shipment.recipient}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Asal/Paket/Category/Permintaan</p>
            <p className="font-medium">{shipment.origin}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Tujuan/Paket/Category/Permintaan</p>
            <p className="font-medium">{shipment.destination}</p>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-4">Riwayat Pesanan</h3>
      <div className="space-y-6">
        {shipment.history.map((item, index) => (
          <div key={index} className="flex">
            <div className="flex-shrink-0 mr-4">{getStatusIcon(item.status)}</div>
            <div className="flex-grow pb-6 border-l-2 border-gray-200 pl-4 -ml-2">
              <div className="flex flex-col sm:flex-row sm:justify-between mb-1">
                <h4 className="font-medium">{item.description}</h4>
                <span className="text-sm text-gray-500">{item.date}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{item.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
