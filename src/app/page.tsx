"use client";

import { useState, useMemo } from "react";

function formatMarkdown(text: string): React.ReactNode[] {
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];

  lines.forEach((line, i) => {
    let content: React.ReactNode = line;

    // Convert ### and ## headers to bold
    if (line.startsWith("### ")) {
      content = <strong key={i} className="text-red-600">{line.slice(4)}</strong>;
    } else if (line.startsWith("## ")) {
      content = <strong key={i} className="text-red-600">{line.slice(3)}</strong>;
    } else if (line.startsWith("# ")) {
      content = <strong key={i} className="text-red-600 text-lg">{line.slice(2)}</strong>;
    } else {
      // Convert **bold** to <strong>
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      content = parts.map((part, j) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={j} className="text-gray-900">{part.slice(2, -2)}</strong>;
        }
        return part;
      });
    }

    elements.push(
      <span key={i}>
        {content}
        {i < lines.length - 1 && <br />}
      </span>
    );
  });

  return elements;
}

const PRESET_OBJECTIONS = [
  "Su producto es muy caro, el genérico funciona igual",
  "Ya tengo años recetando otra marca, no veo razón para cambiar",
  "No tengo tiempo para escuchar otra visita médica",
  "Mis pacientes no pueden pagar ese precio",
  "No he visto suficiente evidencia clínica",
  "El otro laboratorio me da mejores condiciones",
];

const SPECIALTIES = [
  { value: "cardiólogo", label: "Cardiólogo" },
  { value: "pediatra", label: "Pediatra" },
  { value: "médico general", label: "Médico General" },
  { value: "oncólogo", label: "Oncólogo" },
  { value: "ginecólogo", label: "Ginecólogo" },
  { value: "internista", label: "Internista" },
];

const SETTINGS = [
  { value: "hospital privado", label: "Hospital Privado" },
  { value: "clínica rural", label: "Clínica Rural" },
  { value: "consultorio particular", label: "Consultorio Particular" },
  { value: "hospital público", label: "Hospital Público" },
  { value: "centro de salud", label: "Centro de Salud" },
];

type Mode = "objection" | "email" | "preparation";

export default function Home() {
  const [objection, setObjection] = useState("");
  const [specialty, setSpecialty] = useState("cardiólogo");
  const [setting, setSetting] = useState("hospital privado");
  const [mode, setMode] = useState<Mode>("objection");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const formattedResponse = useMemo(() => {
    if (!response) return null;
    return formatMarkdown(response);
  }, [response]);

  const handleSubmit = async () => {
    if (!objection.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ objection, specialty, setting, mode }),
      });

      const data = await res.json();
      setResponse(data.response || data.error);
    } catch {
      setResponse("Error de conexión. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handlePresetClick = (preset: string) => {
    setObjection(preset);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Adium Logo Style */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Coach de Ventas IA
                </h1>
                <p className="text-xs text-red-600 font-medium">
                  Powered by Claude
                </p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-red-600 tracking-wide">adium</p>
            <p className="text-xs text-gray-500">Ecuador</p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Mode Tabs */}
        <div className="flex gap-2 mb-8">
          {[
            {
              id: "objection" as Mode,
              label: "Manejar Objeción",
              icon: "💬",
            },
            { id: "email" as Mode, label: "Email Seguimiento", icon: "✉️" },
            { id: "preparation" as Mode, label: "Preparar Visita", icon: "📋" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setMode(tab.id);
                setObjection("");
                setResponse("");
              }}
              className={`px-5 py-3 rounded-lg font-medium transition-all ${
                mode === tab.id
                  ? "bg-red-600 text-white shadow-lg shadow-red-600/20"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <div className="space-y-6">
            {/* Context Selectors (only for objection mode) */}
            {mode === "objection" && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Especialidad del Médico
                  </label>
                  <select
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    {SPECIALTIES.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lugar de Atención
                  </label>
                  <select
                    value={setting}
                    onChange={(e) => setSetting(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    {SETTINGS.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Main Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {mode === "objection" && "¿Qué dijo el médico?"}
                {mode === "email" && "Describe la situación para el email"}
                {mode === "preparation" && "¿A quién visitarás?"}
              </label>
              <textarea
                value={objection}
                onChange={(e) => setObjection(e.target.value)}
                placeholder={
                  mode === "objection"
                    ? 'Ej: "Su producto es muy caro..."'
                    : mode === "email"
                      ? "Ej: Dr. García mostró interés en el producto X pero pidió más información..."
                      : "Ej: Oncólogo en hospital privado, nunca ha recetado nuestros productos..."
                }
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Preset Objections (only for objection mode) */}
            {mode === "objection" && (
              <div>
                <p className="text-sm text-gray-500 mb-3">
                  O selecciona una objeción común:
                </p>
                <div className="flex flex-wrap gap-2">
                  {PRESET_OBJECTIONS.map((preset, i) => (
                    <button
                      key={i}
                      onClick={() => handlePresetClick(preset)}
                      className="px-3 py-2 text-sm rounded-lg bg-white text-gray-600 hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition-all border border-gray-200"
                    >
                      {preset.length > 40
                        ? preset.substring(0, 40) + "..."
                        : preset}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading || !objection.trim()}
              className="w-full py-4 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold text-lg shadow-lg shadow-red-600/20 hover:shadow-red-600/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Pensando...
                </span>
              ) : (
                <>
                  {mode === "objection" && "Generar Respuesta"}
                  {mode === "email" && "Escribir Email"}
                  {mode === "preparation" && "Preparar Visita"}
                </>
              )}
            </button>
          </div>

          {/* Response Panel */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 min-h-[400px] shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-gray-900">
                Respuesta del Coach
              </h2>
            </div>

            {formattedResponse ? (
              <div className="prose max-w-none">
                <div className="text-gray-700 leading-relaxed">
                  {formattedResponse}
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <svg
                    className="w-16 h-16 mx-auto mb-4 opacity-50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  <p>La respuesta aparecerá aquí</p>
                  <p className="text-sm mt-2">
                    Ingresa una objeción y presiona el botón
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Tips */}
        <div className="mt-12 p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-red-600 mb-4">
            Tips para el Demo
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-600">
            <div>
              <p className="font-medium text-gray-900 mb-1">
                Cambia el contexto
              </p>
              <p>
                Misma objeción, diferente especialidad o lugar. Ve cómo la
                respuesta se adapta.
              </p>
            </div>
            <div>
              <p className="font-medium text-gray-900 mb-1">
                Usa objeciones reales
              </p>
              <p>
                Pide al público que compartan las objeciones que más les
                cuesta manejar.
              </p>
            </div>
            <div>
              <p className="font-medium text-gray-900 mb-1">
                No es un reemplazo
              </p>
              <p>
                Es un coach que te prepara. Siempre verifica datos con
                información aprobada.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Built with badge */}
      <footer className="fixed bottom-4 right-4">
        <div className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 text-sm text-gray-500 shadow-lg">
          Built with{" "}
          <span className="text-red-600 font-medium">Claude Code</span> in
          <span className="text-gray-900 font-semibold"> ~7 min</span>
        </div>
      </footer>
    </div>
  );
}
