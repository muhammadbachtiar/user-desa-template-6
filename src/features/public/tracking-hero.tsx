"use client"

import type React from "react"

import { useState } from "react"
import { Search, Package, Truck } from "lucide-react"
import { useTracking } from "./hooks/use-tracking"
import TrackingResult from "./tracking-result"

export default function TrackingHero() {
  const [trackingNumber, setTrackingNumber] = useState("")
  const { trackShipment, trackingResult, isLoading, error } = useTracking()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (trackingNumber.trim()) {
      trackShipment(trackingNumber)
    }
  }

  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
      <div className="px-6 lg:px-10 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 2xl:px-0 ">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Lacak Pesanan Anda dengan Mudah
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Masukkan nomor resi pesanan Anda untuk melacak status secara real-time.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-xl mx-auto">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Package className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Masukkan nomor resi pesanan"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Mencari...
                </span>
              ) : (
                <>
                  <Search className="mr-2 h-5 w-5" />
                  Lacak
                </>
              )}
            </button>
          </form>

          {error && <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>}
        </div>

        {trackingResult && <TrackingResult shipment={trackingResult} />}

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
              <Search className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Lacak dengan Mudah</h3>
            <p className="text-gray-600">Cukup masukkan nomor resi dan dapatkan informasi pesanan secara instan.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
              <Truck className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Pantau Real-time</h3>
            <p className="text-gray-600">Dapatkan pembaruan lokasi dan status pesanan Anda secara real-time.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
              <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Notifikasi</h3>
            <p className="text-gray-600">Dapatkan notifikasi saat status pesanan Anda berubah.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
