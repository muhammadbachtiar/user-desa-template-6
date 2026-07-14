import Image from "next/image"

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Masukkan Nomor Pemesanan",
      description: "Masukkan nomor pemesanan Anda pada form pelacakan di halaman utama.",
    },
    {
      number: 2,
      title: "Proses Pelacakan",
      description: "Sistem kami akan memproses permintaan pelacakan dan mencari informasi pemesanan Anda.",
    },
    {
      number: 3,
      title: "Lihat Hasil",
      description: "Lihat informasi detail tentang status dan pemesanan Anda secara real-time.",
    },
  ]

  return (
    <section id="how-it-works" className="py-16 bg-gray-50">
      <div className="px-6 lg:px-10 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 2xl:px-0 ">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Cara Kerja</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Lacak pesanan Anda dengan mudah hanya dalam 3 langkah sederhana.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full text-xl font-bold mb-4">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white p-8 rounded-lg shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Mengapa Memilih Layanan Kami?</h3>
              <p className="text-gray-600 mb-6">
                Kami menyediakan solusi pelacakan pemesanan yang cepat, akurat, dan mudah digunakan. Dengan teknologi
                terkini, kami memastikan Anda selalu mendapatkan informasi terbaru tentang pesanan Anda.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Pelacakan yang akurat dan real-time</span>
                </li>
                {/* <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Dukungan untuk berbagai jasa pengiriman</span>
                </li> */}
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Antarmuka yang mudah digunakan</span>
                </li>
                {/* <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Notifikasi status pesanan</span>
                </li> */}
              </ul>
            </div>
            <div className="flex justify-center">
              <Image
                src="/images/placeholder.svg?height=300&width=400"
                alt="Tracking Illustration"
                width={400}
                height={300}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
