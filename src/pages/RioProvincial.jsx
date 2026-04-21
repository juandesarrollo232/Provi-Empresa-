import { useState, useEffect } from 'react';
import { MapPin, Leaf, Fish, Camera, Car, Waves, Sun, TreePine, X, ChevronDown, ChevronUp, Mail, Phone, Shield, FileText, Cookie } from 'lucide-react';

const SITE_NAME = 'Río Provincial Venezuela';
const CONTACT_EMAIL = 'contacto@rioprovincial.com.ve';
const LAST_UPDATED = '21 de abril de 2025';

export default function RioProvincial() {
  const [cookieAccepted, setCookieAccepted] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // 'privacy' | 'terms' | 'cookies' | null

  useEffect(() => {
    const stored = localStorage.getItem('cookie_consent');
    if (stored === 'accepted') setCookieAccepted(true);
  }, []);

  function acceptCookies() {
    localStorage.setItem('cookie_consent', 'accepted');
    setCookieAccepted(true);
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">

      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Waves className="w-5 h-5 text-green-700" />
            <span className="font-bold text-green-800 text-sm md:text-base">{SITE_NAME}</span>
          </div>
          <div className="flex items-center gap-4 text-xs md:text-sm text-gray-500">
            <button onClick={() => setActiveModal('privacy')} className="hover:text-green-700 transition flex items-center gap-1">
              <Shield className="w-3.5 h-3.5" /> Privacidad
            </button>
            <button onClick={() => setActiveModal('terms')} className="hover:text-green-700 transition flex items-center gap-1">
              <FileText className="w-3.5 h-3.5" /> Términos
            </button>
            <button onClick={() => setActiveModal('cookies')} className="hover:text-green-700 transition flex items-center gap-1">
              <Cookie className="w-3.5 h-3.5" /> Cookies
            </button>
            <a href="#contacto" className="hover:text-green-700 transition flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" /> Contacto
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section
        className="relative h-[70vh] flex items-center justify-center text-center"
        style={{ background: 'linear-gradient(135deg, #0f4c2a 0%, #1a6b3a 40%, #1e7a8c 100%)' }}
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
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">Río Provincial</h1>
          <p className="text-lg md:text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Un tesoro natural en el corazón de Venezuela. Aguas cristalinas, selva exuberante y una biodiversidad única te esperan.
          </p>
          <a href="#ubicacion" className="inline-block bg-white text-green-800 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-green-50 transition">
            Explorar
          </a>
        </div>
      </section>

      {/* Descripción */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">Sobre el Río Provincial</h2>
        <p className="text-gray-600 text-lg leading-relaxed text-center max-w-3xl mx-auto">
          El Río Provincial es un curso de agua ubicado en la región central de Venezuela, en los límites del estado
          Guárico con Aragua. Nace en las estribaciones de la Cordillera de la Costa y fluye en dirección sur-sureste
          hasta integrarse con la cuenca del Orinoco. Con una longitud aproximada de 180 km, es un río de gran
          importancia ecológica y cultural para las comunidades ribereñas.
        </p>
      </section>

      {/* Cards */}
      <section className="py-10 px-6 bg-green-50">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <InfoCard icon={<MapPin className="w-8 h-8 text-green-700" />} title="Ubicación" desc="Estado Guárico–Aragua, Venezuela. Coordenadas aprox. 9°N, 67°O." />
          <InfoCard icon={<Leaf className="w-8 h-8 text-green-700" />} title="Flora" desc="Galería boscosa tropical con helechos arborescentes, palmas moriche y orquídeas silvestres." />
          <InfoCard icon={<Fish className="w-8 h-8 text-green-700" />} title="Fauna" desc="Cachama, coporo, bagre rayado, garzas reales, caimanes del Orinoco y lapas." />
          <InfoCard icon={<Camera className="w-8 h-8 text-green-700" />} title="Turismo" desc="Senderismo, pesca artesanal, avistamiento de aves y recorridos en bote." />
        </div>
      </section>

      {/* Historia */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Sun className="w-7 h-7 text-yellow-500" />
          <h2 className="text-2xl font-bold text-green-800">Historia y Cultura</h2>
        </div>
        <p className="text-gray-600 leading-relaxed mb-4">
          Las comunidades indígenas de los pueblos Achagua y Jivi utilizaron este río como eje de vida durante siglos antes
          de la colonización española. Sus orillas fueron escenario de intercambios comerciales entre los llanos y la
          cordillera. Hoy, los pobladores locales mantienen vivas las tradiciones de pesca artesanal transmitidas de
          generación en generación.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Durante el siglo XIX, el río sirvió como ruta de transporte para los productos agrícolas de la región. Pequeños
          embarcaderos en sus márgenes testimonian aquella época de actividad comercial fluvial que conectaba los hatos
          llaneros con los centros urbanos.
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
                El Río Provincial nace a aproximadamente 700 msnm en las serranías del interior, descendiendo por una
                serie de rápidos y pozos naturales hasta alcanzar las sabanas llaneras donde su curso se vuelve más
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
          <RouteCard title="Desde Caracas" steps={[
            'Tomar la autopista Regional del Centro (Ruta 1) hacia el suroeste.',
            'En San Juan de los Morros, tomar la vía hacia Valle de La Pascua.',
            'Seguir indicaciones locales hacia el río (aprox. 3.5 h en total).',
          ]} />
          <RouteCard title="Desde Valencia" steps={[
            'Tomar la autopista Valencia–San Juan de los Morros.',
            'En San Juan de los Morros incorporarse a la ruta hacia Zaraza.',
            'Desvío señalizado al río a 15 km antes de Calabozo (aprox. 2 h).',
          ]} />
        </div>
      </section>

      {/* Flora y Fauna */}
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
                El corredor verde del río alberga más de 200 especies vegetales catalogadas, incluyendo el cedro
                (Cedrela odorata), la ceiba (Ceiba pentandra) y numerosas variedades de bromelias y lianas que forman
                un dosel continuo sobre las aguas.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-700 mb-3">Vida acuática</h3>
              <p className="text-gray-600 leading-relaxed">
                Sus aguas albergan más de 45 especies de peces de agua dulce. La cachama (Colossoma macropomum) y el
                coporo (Prochilodus mariae) son especialmente valorados por los pescadores artesanales locales que
                sostienen su economía tradicional en el río.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="py-16 px-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Mail className="w-7 h-7 text-green-700" />
          <h2 className="text-2xl font-bold text-green-800">Contacto</h2>
        </div>
        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
          <p className="text-gray-600 mb-6">
            Para consultas sobre visitas, información turística, o cualquier asunto relacionado con este sitio web,
            puede comunicarse con nosotros a través de los siguientes medios:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-green-700 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-700 text-sm">Correo electrónico</p>
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-green-700 hover:underline text-sm">{CONTACT_EMAIL}</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-green-700 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-700 text-sm">Teléfono / WhatsApp</p>
                <p className="text-gray-500 text-sm">+58 412-000-0000</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-green-700 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-700 text-sm">Dirección</p>
                <p className="text-gray-500 text-sm">Estado Guárico, Venezuela</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-green-700 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-700 text-sm">Privacidad</p>
                <button onClick={() => setActiveModal('privacy')} className="text-green-700 hover:underline text-sm text-left">
                  Ver Política de Privacidad
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Políticas inline resumidas */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-gray-700 mb-6 text-center">Información Legal</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <PolicyCard
              icon={<Shield className="w-6 h-6 text-green-700" />}
              title="Política de Privacidad"
              summary="Explicamos qué datos recopilamos, cómo los usamos y sus derechos como usuario."
              onOpen={() => setActiveModal('privacy')}
            />
            <PolicyCard
              icon={<FileText className="w-6 h-6 text-green-700" />}
              title="Términos de Uso"
              summary="Condiciones que rigen el uso de este sitio web y sus contenidos."
              onOpen={() => setActiveModal('terms')}
            />
            <PolicyCard
              icon={<Cookie className="w-6 h-6 text-green-700" />}
              title="Política de Cookies"
              summary="Información sobre las cookies que utilizamos y cómo puede gestionarlas."
              onOpen={() => setActiveModal('cookies')}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-green-200 py-10 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Waves className="w-5 h-5 text-cyan-400" />
            <span className="font-semibold text-white">{SITE_NAME}</span>
          </div>
          <p className="text-sm text-green-400 text-center mb-6">
            Patrimonio natural de Venezuela · Conservación y turismo responsable
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-xs text-green-400 border-t border-green-800 pt-6">
            <button onClick={() => setActiveModal('privacy')} className="hover:text-white transition">Política de Privacidad</button>
            <button onClick={() => setActiveModal('terms')} className="hover:text-white transition">Términos de Uso</button>
            <button onClick={() => setActiveModal('cookies')} className="hover:text-white transition">Política de Cookies</button>
            <a href="#contacto" className="hover:text-white transition">Contacto</a>
          </div>
          <p className="text-xs text-green-600 text-center mt-4">
            © {new Date().getFullYear()} {SITE_NAME}. Todos los derechos reservados.
          </p>
        </div>
      </footer>

      {/* Cookie Banner */}
      {!cookieAccepted && (
        <div className="fixed bottom-0 inset-x-0 z-50 bg-gray-900 text-white px-6 py-5 shadow-2xl">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-4">
            <Cookie className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-0.5 md:mt-0" />
            <p className="text-sm text-gray-200 flex-1">
              Este sitio utiliza cookies para mejorar su experiencia de navegación y analizar el tráfico web.
              Al continuar navegando, acepta el uso de cookies conforme a nuestra{' '}
              <button onClick={() => setActiveModal('cookies')} className="underline text-yellow-300 hover:text-yellow-200">
                Política de Cookies
              </button>{' '}
              y{' '}
              <button onClick={() => setActiveModal('privacy')} className="underline text-yellow-300 hover:text-yellow-200">
                Política de Privacidad
              </button>.
            </p>
            <div className="flex gap-3 flex-shrink-0">
              <button
                onClick={acceptCookies}
                className="bg-green-600 hover:bg-green-500 text-white text-sm font-semibold px-5 py-2 rounded-lg transition"
              >
                Aceptar
              </button>
              <button
                onClick={() => setActiveModal('cookies')}
                className="border border-gray-500 hover:border-gray-300 text-gray-300 hover:text-white text-sm px-4 py-2 rounded-lg transition"
              >
                Configurar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modales de políticas */}
      {activeModal && (
        <PolicyModal title={MODAL_TITLES[activeModal]} onClose={() => setActiveModal(null)}>
          {activeModal === 'privacy' && <PrivacyContent />}
          {activeModal === 'terms' && <TermsContent />}
          {activeModal === 'cookies' && <CookiesContent onAccept={() => { acceptCookies(); setActiveModal(null); }} />}
        </PolicyModal>
      )}
    </div>
  );
}

const MODAL_TITLES = {
  privacy: 'Política de Privacidad',
  terms: 'Términos de Uso',
  cookies: 'Política de Cookies',
};

// ─── Sub-components ──────────────────────────────────────────────

/** @param {{ icon: import('react').ReactNode, title: string, desc: string }} props */
function InfoCard({ icon, title, desc }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-100 flex flex-col items-center text-center gap-3">
      {icon}
      <h3 className="font-semibold text-green-800 text-lg">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

/** @param {{ title: string, steps: string[] }} props */
function RouteCard({ title, steps }) {
  return (
    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
      <h3 className="font-semibold text-green-800 text-lg mb-3">{title}</h3>
      <ol className="space-y-2">
        {steps.map((/** @type {string} */ step, /** @type {number} */ i) => (
          <li key={i} className="flex gap-3 text-gray-600 text-sm">
            <span className="flex-shrink-0 w-5 h-5 bg-green-700 text-white rounded-full flex items-center justify-center text-xs font-bold">{i + 1}</span>
            {step}
          </li>
        ))}
      </ol>
    </div>
  );
}

function PolicyCard({ icon, title, summary, onOpen }) {
  return (
    <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm flex flex-col gap-3">
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-500 text-sm leading-relaxed flex-1">{summary}</p>
      <button onClick={onOpen} className="text-green-700 hover:text-green-600 text-sm font-medium text-left hover:underline">
        Leer completo →
      </button>
    </div>
  );
}

function PolicyModal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full md:max-w-2xl md:rounded-2xl shadow-2xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-800 text-lg">{title}</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-full transition">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="overflow-y-auto px-6 py-5 text-sm text-gray-600 leading-relaxed space-y-4">
          {children}
        </div>
        <div className="px-6 py-4 border-t border-gray-100">
          <button onClick={onClose} className="w-full bg-green-700 hover:bg-green-600 text-white font-semibold py-2.5 rounded-xl transition">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition text-left"
      >
        <span className="font-semibold text-gray-700 text-sm">{title}</span>
        {open ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>
      {open && <div className="px-4 py-3 text-sm text-gray-600 space-y-2">{children}</div>}
    </div>
  );
}

// ─── Contenido de políticas ───────────────────────────────────────

function PrivacyContent() {
  return (
    <>
      <p className="text-xs text-gray-400">Última actualización: {LAST_UPDATED}</p>
      <p>
        En <strong>{SITE_NAME}</strong> nos comprometemos a proteger su privacidad. Esta política describe qué
        información recopilamos, cómo la usamos y los derechos que usted tiene sobre sus datos personales,
        en cumplimiento del Reglamento General de Protección de Datos (RGPD), las políticas de privacidad
        de Google y la legislación venezolana aplicable.
      </p>

      <Section title="1. Responsable del tratamiento">
        <p>
          El responsable del tratamiento de sus datos personales es <strong>{SITE_NAME}</strong>,
          con domicilio en el Estado Guárico, Venezuela. Puede contactarnos en:{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-green-700 underline">{CONTACT_EMAIL}</a>.
        </p>
      </Section>

      <Section title="2. Datos que recopilamos">
        <ul className="list-disc pl-4 space-y-1">
          <li><strong>Datos de navegación:</strong> dirección IP, tipo de navegador, páginas visitadas, tiempo de sesión y dispositivo utilizado.</li>
          <li><strong>Datos de geolocalización aproximada:</strong> país y región derivados de la dirección IP, utilizados exclusivamente para personalizar el contenido mostrado.</li>
          <li><strong>Cookies y tecnologías similares:</strong> datos de sesión, preferencias de usuario y métricas de uso (ver Política de Cookies).</li>
          <li><strong>Datos de contacto voluntarios:</strong> nombre y correo electrónico si usted nos escribe directamente.</li>
        </ul>
        <p className="mt-2">No recopilamos datos especialmente sensibles como información financiera, médica o documentos de identidad.</p>
      </Section>

      <Section title="3. Finalidad del tratamiento">
        <ul className="list-disc pl-4 space-y-1">
          <li>Proveer y mejorar los servicios e información turística de este sitio.</li>
          <li>Mostrar contenido adaptado a la ubicación geográfica del visitante.</li>
          <li>Analizar el tráfico web para optimizar la experiencia de usuario.</li>
          <li>Cumplir obligaciones legales aplicables.</li>
          <li>Mostrar publicidad relevante a través de servicios de terceros como Google Ads.</li>
        </ul>
      </Section>

      <Section title="4. Publicidad y Google Ads">
        <p>
          Este sitio puede utilizar Google Ads y Google Analytics para mostrar anuncios personalizados y analizar
          el comportamiento de los usuarios. Google puede usar cookies para mostrar anuncios basados en visitas
          anteriores a este u otros sitios web.
        </p>
        <p>
          Puede optar por no recibir publicidad personalizada de Google visitando{' '}
          <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-green-700 underline">
            google.com/settings/ads
          </a>.
        </p>
        <p>
          También puede desactivar el uso de cookies por parte de terceros visitando{' '}
          <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-green-700 underline">
            aboutads.info/choices
          </a>.
        </p>
      </Section>

      <Section title="5. Base legal del tratamiento">
        <ul className="list-disc pl-4 space-y-1">
          <li><strong>Consentimiento:</strong> para cookies no esenciales y publicidad personalizada.</li>
          <li><strong>Interés legítimo:</strong> para análisis de tráfico y seguridad del sitio.</li>
          <li><strong>Cumplimiento legal:</strong> cuando así lo exija la normativa vigente.</li>
        </ul>
      </Section>

      <Section title="6. Compartición de datos con terceros">
        <p>No vendemos sus datos personales. Podemos compartir información con:</p>
        <ul className="list-disc pl-4 space-y-1">
          <li><strong>Google LLC</strong> (Google Analytics, Google Ads): para análisis y publicidad.</li>
          <li><strong>Proveedores de infraestructura</strong>: servicios de hosting que procesan datos técnicos.</li>
          <li><strong>Autoridades competentes</strong>: cuando sea requerido por ley.</li>
        </ul>
      </Section>

      <Section title="7. Transferencias internacionales">
        <p>
          Algunos de nuestros proveedores, como Google, pueden procesar datos fuera de Venezuela o la Unión Europea.
          En esos casos, nos aseguramos de que existan garantías adecuadas (como cláusulas contractuales tipo o el
          Marco de Privacidad de Datos UE-EE.UU.).
        </p>
      </Section>

      <Section title="8. Conservación de datos">
        <p>
          Los datos de navegación se conservan por un máximo de 26 meses. Los datos de contacto voluntarios se
          conservan hasta que usted solicite su eliminación. Los datos requeridos por obligación legal se conservan
          el tiempo que indique la normativa aplicable.
        </p>
      </Section>

      <Section title="9. Sus derechos">
        <p>Usted tiene derecho a:</p>
        <ul className="list-disc pl-4 space-y-1">
          <li><strong>Acceso:</strong> conocer qué datos tratamos sobre usted.</li>
          <li><strong>Rectificación:</strong> corregir datos inexactos.</li>
          <li><strong>Supresión:</strong> solicitar la eliminación de sus datos ("derecho al olvido").</li>
          <li><strong>Limitación:</strong> restringir el tratamiento en ciertos casos.</li>
          <li><strong>Portabilidad:</strong> recibir sus datos en formato estructurado.</li>
          <li><strong>Oposición:</strong> oponerse al tratamiento basado en interés legítimo.</li>
          <li><strong>Retirar el consentimiento</strong> en cualquier momento, sin efecto retroactivo.</li>
        </ul>
        <p className="mt-2">
          Para ejercer sus derechos, escríbanos a{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-green-700 underline">{CONTACT_EMAIL}</a>.
        </p>
      </Section>

      <Section title="10. Seguridad">
        <p>
          Implementamos medidas técnicas y organizativas adecuadas para proteger sus datos contra acceso no
          autorizado, pérdida o alteración, incluyendo cifrado HTTPS, cabeceras de seguridad HTTP y controles
          de acceso.
        </p>
      </Section>

      <Section title="11. Cambios a esta política">
        <p>
          Podemos actualizar esta política periódicamente. Le notificaremos cambios significativos mediante
          un aviso destacado en este sitio. Le recomendamos revisar esta página con regularidad.
        </p>
      </Section>
    </>
  );
}

function TermsContent() {
  return (
    <>
      <p className="text-xs text-gray-400">Última actualización: {LAST_UPDATED}</p>
      <p>
        Al acceder y utilizar el sitio web <strong>{SITE_NAME}</strong>, usted acepta los presentes Términos
        de Uso. Si no está de acuerdo con alguno de estos términos, le pedimos que no utilice este sitio.
      </p>

      <Section title="1. Objeto">
        <p>
          El presente sitio web tiene como objetivo brindar información turística, ecológica e histórica
          sobre el Río Provincial de Venezuela, sin fines de lucro directo al visitante.
        </p>
      </Section>

      <Section title="2. Uso aceptable">
        <p>Usted se compromete a utilizar este sitio exclusivamente para fines lícitos y a no:</p>
        <ul className="list-disc pl-4 space-y-1">
          <li>Reproducir, distribuir o modificar el contenido sin autorización escrita previa.</li>
          <li>Utilizar el sitio para actividades ilegales, fraudulentas o que vulneren derechos de terceros.</li>
          <li>Intentar acceder a sistemas o datos no autorizados.</li>
          <li>Enviar spam, virus u otro código malicioso.</li>
          <li>Realizar scraping automatizado sin autorización.</li>
        </ul>
      </Section>

      <Section title="3. Propiedad intelectual">
        <p>
          Todos los contenidos de este sitio (textos, imágenes, diseño, logotipos) son propiedad de{' '}
          <strong>{SITE_NAME}</strong> o de sus respectivos titulares y están protegidos por las leyes de
          propiedad intelectual de Venezuela y tratados internacionales aplicables. Queda prohibida su
          reproducción sin autorización expresa.
        </p>
      </Section>

      <Section title="4. Exención de responsabilidad">
        <p>
          La información publicada en este sitio tiene carácter informativo y turístico. No garantizamos
          la exactitud, integridad o actualidad de todos los datos. El operador no se hace responsable de
          daños derivados del uso de la información aquí publicada ni de la interrupción del servicio por
          causas técnicas ajenas a su control.
        </p>
      </Section>

      <Section title="5. Enlaces a terceros">
        <p>
          Este sitio puede contener enlaces a sitios web de terceros. No tenemos control sobre el contenido
          de dichos sitios y no asumimos responsabilidad por sus políticas o prácticas. Los enlaces se
          proporcionan únicamente como referencia informativa.
        </p>
      </Section>

      <Section title="6. Publicidad">
        <p>
          Este sitio puede mostrar publicidad proporcionada por terceros, incluyendo Google Ads. Los anunciantes
          son responsables del contenido de sus anuncios. La aparición de publicidad no implica respaldo ni
          relación comercial con el anunciante por parte de este sitio.
        </p>
      </Section>

      <Section title="7. Disponibilidad del servicio">
        <p>
          Nos esforzamos por mantener el sitio disponible de forma continua, pero no garantizamos la ausencia
          de interrupciones por mantenimiento, actualizaciones técnicas o causas de fuerza mayor. Nos reservamos
          el derecho de suspender o modificar el servicio en cualquier momento sin previo aviso.
        </p>
      </Section>

      <Section title="8. Legislación aplicable">
        <p>
          Estos Términos se rigen por la legislación de la República Bolivariana de Venezuela. Cualquier
          controversia derivada del uso de este sitio será sometida a los tribunales competentes de Venezuela,
          salvo disposición legal que indique lo contrario.
        </p>
      </Section>

      <Section title="9. Modificaciones">
        <p>
          Nos reservamos el derecho de modificar estos Términos en cualquier momento. Los cambios entrarán
          en vigor desde su publicación en esta página. El uso continuado del sitio tras la publicación de
          cambios implica la aceptación de los nuevos términos.
        </p>
      </Section>

      <Section title="10. Contacto">
        <p>
          Para cualquier consulta relacionada con estos Términos, contáctenos en:{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-green-700 underline">{CONTACT_EMAIL}</a>.
        </p>
      </Section>
    </>
  );
}

function CookiesContent({ onAccept }) {
  return (
    <>
      <p className="text-xs text-gray-400">Última actualización: {LAST_UPDATED}</p>
      <p>
        Esta política explica cómo <strong>{SITE_NAME}</strong> utiliza cookies y tecnologías similares
        cuando usted visita nuestro sitio web.
      </p>

      <Section title="¿Qué son las cookies?">
        <p>
          Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita un
          sitio web. Permiten al sitio recordar sus acciones y preferencias durante un período de tiempo,
          para que no tenga que volver a introducirlas.
        </p>
      </Section>

      <Section title="Cookies que utilizamos">
        <div className="space-y-3">
          <div className="bg-green-50 rounded-lg p-3">
            <p className="font-semibold text-green-800 text-xs uppercase tracking-wide mb-1">Cookies esenciales</p>
            <p>Necesarias para el funcionamiento básico del sitio. No pueden desactivarse.</p>
            <ul className="list-disc pl-4 mt-1 space-y-0.5 text-xs">
              <li><code className="bg-gray-100 px-1 rounded">cookie_consent</code> — Guarda su preferencia de consentimiento de cookies.</li>
              <li><code className="bg-gray-100 px-1 rounded">ip_filter_result</code> — Almacena el resultado de verificación de acceso por sesión.</li>
            </ul>
          </div>
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="font-semibold text-blue-800 text-xs uppercase tracking-wide mb-1">Cookies analíticas</p>
            <p>Nos ayudan a entender cómo interactúan los usuarios con el sitio.</p>
            <ul className="list-disc pl-4 mt-1 space-y-0.5 text-xs">
              <li><code className="bg-gray-100 px-1 rounded">_ga</code>, <code className="bg-gray-100 px-1 rounded">_gid</code> — Google Analytics: métricas de uso (duración sesión, páginas vistas).</li>
            </ul>
          </div>
          <div className="bg-yellow-50 rounded-lg p-3">
            <p className="font-semibold text-yellow-800 text-xs uppercase tracking-wide mb-1">Cookies publicitarias</p>
            <p>Utilizadas por Google Ads para mostrar anuncios relevantes.</p>
            <ul className="list-disc pl-4 mt-1 space-y-0.5 text-xs">
              <li><code className="bg-gray-100 px-1 rounded">_gcl_au</code> — Google Ads: seguimiento de conversiones.</li>
              <li><code className="bg-gray-100 px-1 rounded">IDE</code>, <code className="bg-gray-100 px-1 rounded">DSID</code> — Google DoubleClick: publicidad personalizada.</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Cookies de terceros">
        <p>
          Google (como proveedor de Google Ads y Google Analytics) puede colocar cookies en su dispositivo.
          Google tiene sus propias políticas de privacidad y uso de datos:{' '}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-green-700 underline">
            policies.google.com/privacy
          </a>.
        </p>
        <p>
          Para optar por no participar en la publicidad personalizada de Google, visite:{' '}
          <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-green-700 underline">
            google.com/settings/ads
          </a>.
        </p>
      </Section>

      <Section title="Cómo gestionar las cookies">
        <p>Puede controlar y eliminar cookies a través de la configuración de su navegador:</p>
        <ul className="list-disc pl-4 space-y-0.5 text-xs">
          <li><strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies.</li>
          <li><strong>Firefox:</strong> Opciones → Privacidad y seguridad → Cookies.</li>
          <li><strong>Safari:</strong> Preferencias → Privacidad → Gestionar datos del sitio web.</li>
          <li><strong>Edge:</strong> Configuración → Privacidad, búsqueda y servicios → Cookies.</li>
        </ul>
        <p className="mt-2">
          Tenga en cuenta que deshabilitar ciertas cookies puede afectar la funcionalidad del sitio.
        </p>
      </Section>

      <button
        onClick={onAccept}
        className="w-full bg-green-700 hover:bg-green-600 text-white font-semibold py-2.5 rounded-xl transition mt-2"
      >
        Aceptar todas las cookies
      </button>
    </>
  );
}
