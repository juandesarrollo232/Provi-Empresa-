import { MapPin, Leaf, Fish, Camera, Car, Waves, Sun, TreePine } from 'lucide-react';

export default function RioProvincial() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">

      {/* Hero */}
      <section
        className="relative h-[70vh] flex items-center justify-center text-center"
        style={{
          background: 'linear-gradient(135deg, #0f4c2a 0%, #1a6b3a 40%, #1e7a8c 100%)',
        }}
      >
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative z-10 px-6 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Waves className="w-7 h-7 text-cyan-300" />
            <span className="text-cyan-300 uppercase tracking-widest text-sm font-semibold">Venezuela Natural</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Río Provincial
          </h1>
          <p className="text-lg md:text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Un tesoro natural en el corazón de Venezuela. Aguas cristalinas,
            selva exuberante y una biodiversidad única te esperan.
          </p>
          <a
            href="#ubicacion"
            className="inline-block bg-white text-green-800 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-green-50 transition"
          >
            Explorar
          </a>
        </div>
      </section>

      {/* Descripción */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">Sobre el Río Provincial</h2>
        <p className="text-gray-600 text-lg leading-relaxed text-center max-w-3xl mx-auto">
          El Río Provincial es un curso de agua ubicado en la región central de Venezuela,
          en los límites del estado Guárico con Aragua. Nace en las estribaciones de la Cordillera
          de la Costa y fluye en dirección sur-sureste hasta integrarse con la cuenca del Orinoco.
          Con una longitud aproximada de 180 km, es un río de gran importancia ecológica y cultural
          para las comunidades ribereñas que han habitado sus orillas por generaciones.
        </p>
      </section>

      {/* Cards de secciones */}
      <section className="py-10 px-6 bg-green-50">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <InfoCard
            icon={<MapPin className="w-8 h-8 text-green-700" />}
            title="Ubicación"
            desc="Estado Guárico–Aragua, Venezuela. Coordenadas aprox. 9°N, 67°O."
          />
          <InfoCard
            icon={<Leaf className="w-8 h-8 text-green-700" />}
            title="Flora"
            desc="Galería boscosa tropical con helechos arborescentes, palmas moriche y orquídeas silvestres."
          />
          <InfoCard
            icon={<Fish className="w-8 h-8 text-green-700" />}
            title="Fauna"
            desc="Cachama, coporo, bagre rayado, garzas reales, caimanes del Orinoco y lapas."
          />
          <InfoCard
            icon={<Camera className="w-8 h-8 text-green-700" />}
            title="Turismo"
            desc="Senderismo, pesca artesanal, avistamiento de aves y recorridos en bote."
          />
        </div>
      </section>

      {/* Historia */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Sun className="w-7 h-7 text-yellow-500" />
          <h2 className="text-2xl font-bold text-green-800">Historia y Cultura</h2>
        </div>
        <p className="text-gray-600 leading-relaxed mb-4">
          Las comunidades indígenas de los pueblos Achagua y Jivi utilizaron este río como
          eje de vida durante siglos antes de la colonización española. Sus orillas fueron
          escenario de intercambios comerciales entre los llanos y la cordillera. Hoy, los
          pobladores locales mantienen vivas las tradiciones de pesca artesanal transmitidas
          de generación en generación.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Durante el siglo XIX, el río sirvió como ruta de transporte para los productos
          agrícolas de la región. Pequeños embarcaderos en sus márgenes testimonian aquella
          época de actividad comercial fluvial que conectaba los hatos llaneros con los
          centros urbanos.
        </p>
      </section>

      {/* Geografía */}
      <section id="ubicacion" className="py-16 px-6 bg-blue-50">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="w-7 h-7 text-blue-600" />
            <h2 className="text-2xl font-bold text-blue-800">Ubicación Geográfica</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-600 leading-relaxed mb-4">
                El Río Provincial nace a aproximadamente 700 msnm en las serranías
                del interior, descendiendo por una serie de rápidos y pozos naturales
                hasta alcanzar las sabanas llaneras donde su curso se vuelve más
                sinuoso y tranquilo.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li><span className="font-semibold text-green-700">Longitud:</span> ~180 km</li>
                <li><span className="font-semibold text-green-700">Cuenca:</span> Orinoco</li>
                <li><span className="font-semibold text-green-700">Estados:</span> Guárico, Aragua</li>
                <li><span className="font-semibold text-green-700">Altitud nacimiento:</span> ~700 msnm</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl h-52 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MapPin className="w-12 h-12 mx-auto text-green-600 mb-2" />
                <p className="text-sm">9°N, 67°O — Venezuela</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo llegar */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Car className="w-7 h-7 text-green-700" />
          <h2 className="text-2xl font-bold text-green-800">Cómo Llegar</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <RouteCard
            title="Desde Caracas"
            steps={[
              'Tomar la autopista Regional del Centro (Ruta 1) hacia el suroeste.',
              'En San Juan de los Morros, tomar la vía hacia Valle de La Pascua.',
              'Seguir indicaciones locales hacia el río (aprox. 3.5 h en total).',
            ]}
          />
          <RouteCard
            title="Desde Valencia"
            steps={[
              'Tomar la autopista Valencia–San Juan de los Morros.',
              'En San Juan de los Morros incorporarse a la ruta hacia Zaraza.',
              'Desvío señalizado al río a 15 km antes de Calabozo (aprox. 2 h).',
            ]}
          />
        </div>
      </section>

      {/* Flora y Fauna detalle */}
      <section className="py-16 px-6 bg-green-50">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <TreePine className="w-7 h-7 text-green-700" />
            <h2 className="text-2xl font-bold text-green-800">Flora y Fauna</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-green-700 mb-3">Vegetación ribereña</h3>
              <p className="text-gray-600 leading-relaxed">
                El corredor verde del río alberga más de 200 especies vegetales
                catalogadas, incluyendo el cedro (Cedrela odorata), la ceiba
                (Ceiba pentandra) y numerosas variedades de bromelias y lianas
                que forman un dosel continuo sobre las aguas.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-700 mb-3">Vida acuática</h3>
              <p className="text-gray-600 leading-relaxed">
                Sus aguas albergan más de 45 especies de peces de agua dulce.
                La cachama (Colossoma macropomum) y el coporo (Prochilodus mariae)
                son especialmente valorados por los pescadores artesanales locales
                que sostienen su economía tradicional en el río.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-green-200 py-10 px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Waves className="w-5 h-5 text-cyan-400" />
          <span className="font-semibold text-white">Río Provincial — Venezuela</span>
        </div>
        <p className="text-sm text-green-400">
          Patrimonio natural de Venezuela · Conservación y turismo responsable
        </p>
      </footer>
    </div>
  );
}

function InfoCard({ icon, title, desc }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-100 flex flex-col items-center text-center gap-3">
      {icon}
      <h3 className="font-semibold text-green-800 text-lg">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function RouteCard({ title, steps }) {
  return (
    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
      <h3 className="font-semibold text-green-800 text-lg mb-3">{title}</h3>
      <ol className="space-y-2">
        {steps.map((step, i) => (
          <li key={i} className="flex gap-3 text-gray-600 text-sm">
            <span className="flex-shrink-0 w-5 h-5 bg-green-700 text-white rounded-full flex items-center justify-center text-xs font-bold">
              {i + 1}
            </span>
            {step}
          </li>
        ))}
      </ol>
    </div>
  );
}
