"use client";

import { useState } from "react";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">
                Coach de Ventas IA
              </h1>
              <p className="text-xs text-cyan-300/70">
                Powered by Claude
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-white/60">Demo para</p>
            <p className="text-lg font-semibold text-white">Adium Ecuador</p>
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
              className={`px-5 py-3 rounded-xl font-medium transition-all ${
                mode === tab.id
                  ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30"
                  : "bg-white/5 text-white/70 hover:bg-white/10"
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
                  <label className="block text-sm font-medium text-cyan-300 mb-2">
                    Especialidad del Médico
                  </label>
                  <select
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  >
                    {SPECIALTIES.map((s) => (
                      <option
                        key={s.value}
                        value={s.value}
                        className="bg-slate-800"
                      >
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-cyan-300 mb-2">
                    Lugar de Atención
                  </label>
                  <select
                    value={setting}
                    onChange={(e) => setSetting(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  >
                    {SETTINGS.map((s) => (
                      <option
                        key={s.value}
                        value={s.value}
                        className="bg-slate-800"
                      >
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Main Input */}
            <div>
              <label className="block text-sm font-medium text-cyan-300 mb-2">
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
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Preset Objections (only for objection mode) */}
            {mode === "objection" && (
              <div>
                <p className="text-sm text-white/50 mb-3">
                  O selecciona una objeción común:
                </p>
                <div className="flex flex-wrap gap-2">
                  {PRESET_OBJECTIONS.map((preset, i) => (
                    <button
                      key={i}
                      onClick={() => handlePresetClick(preset)}
                      className="px-3 py-2 text-sm rounded-lg bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-all border border-white/5"
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
              className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold text-lg shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
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
          <div className="bg-white/5 rounded-2xl border border-white/10 p-6 min-h-[400px]">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
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
              <h2 className="text-lg font-semibold text-white">
                Respuesta del Coach
              </h2>
            </div>

            {response ? (
              <div className="prose prose-invert max-w-none">
                <div className="text-white/90 leading-relaxed whitespace-pre-wrap">
                  {response}
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-white/30">
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
        <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/10">
          <h3 className="text-lg font-semibold text-cyan-300 mb-4">
            Tips para el Demo
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-white/70">
            <div>
              <p className="font-medium text-white mb-1">
                Cambia el contexto
              </p>
              <p>
                Misma objeción, diferente especialidad o lugar. Ve cómo la
                respuesta se adapta.
              </p>
            </div>
            <div>
              <p className="font-medium text-white mb-1">
                Usa objeciones reales
              </p>
              <p>
                Pide al público que compartan las objeciones que más les
                cuesta manejar.
              </p>
            </div>
            <div>
              <p className="font-medium text-white mb-1">
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
        <div className="px-4 py-2 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-sm text-white/50">
          Built with{" "}
          <span className="text-cyan-400 font-medium">Claude Code</span> in
          <span className="text-white font-semibold"> ~7 min</span>
        </div>
      </footer>
    </div>
  );
}
