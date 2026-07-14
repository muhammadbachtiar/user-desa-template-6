"use client"

import { useState } from "react"
import { Shipment } from "../types/shipment"
import { dummyShipments } from "../data/dummy-shipments"

export function useTracking() {
  const [trackingResult, setTrackingResult] = useState<Shipment | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const trackShipment = (trackingNumber: string) => {
    setIsLoading(true)
    setError(null)

    // Simulate API call with setTimeout
    setTimeout(() => {
      const shipment = dummyShipments.find((s) => s.trackingNumber.toLowerCase() === trackingNumber.toLowerCase())

      if (shipment) {
        setTrackingResult(shipment)
        setError(null)
      } else {
        setTrackingResult(null)
        setError("Nomor resi tidak ditemukan. Silakan periksa kembali nomor resi Anda.")
      }

      setIsLoading(false)
    }, 1500) // Simulate network delay
  }

  return {
    trackShipment,
    trackingResult,
    isLoading,
    error,
  }
}
