import { Shield, Clock, Globe, Smartphone, TrendingUp, Headphones } from "lucide-react"

export default function Features() {
  return (
    <section id="features" className="py-16 bg-white">
      <div className="px-6 lg:px-10 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 2xl:px-0 ">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Fitur Unggulan Kami</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Kami menyediakan berbagai fitur untuk memudahkan Anda melacak pengiriman dengan cepat dan akurat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
              <Globe className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Pelacakan Global</h3>
            <p className="text-gray-600">
              Lacak pengiriman Anda di mana saja di seluruh dunia dengan sistem pelacakan global kami.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Pembaruan Real-time</h3>
            <p className="text-gray-600">
              Dapatkan pembaruan status pengiriman secara real-time untuk mengetahui lokasi paket Anda.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Keamanan Terjamin</h3>
            <p className="text-gray-600">
              Sistem keamanan tingkat tinggi untuk melindungi informasi pengiriman dan data pribadi Anda.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
              <Smartphone className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Aplikasi Mobile</h3>
            <p className="text-gray-600">
              Lacak pengiriman Anda di mana saja dan kapan saja dengan aplikasi mobile kami yang mudah digunakan.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Analisis Pengiriman</h3>
            <p className="text-gray-600">
              Dapatkan analisis dan statistik pengiriman untuk membantu Anda mengoptimalkan proses logistik.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
              <Headphones className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Dukungan 24/7</h3>
            <p className="text-gray-600">
              Tim dukungan pelanggan kami siap membantu Anda 24 jam sehari, 7 hari seminggu.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
