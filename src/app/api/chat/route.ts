import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const anthropic = new Anthropic();

export async function POST(request: NextRequest) {
  try {
    const { objection, specialty, setting, mode } = await request.json();

    let systemPrompt = `Eres un coach de ventas experto para representantes médicos de un laboratorio farmacéutico en Ecuador y Latinoamérica. Tu rol es ayudar a manejar objeciones de médicos de forma profesional, ética y efectiva.

REGLAS IMPORTANTES:
- Sé respetuoso y nunca confrontacional
- Reconoce siempre el punto de vista del médico
- Enfócate en valor clínico, no solo en precio
- Respuestas breves: máximo 4-5 oraciones para decir en persona
- Termina con una pregunta abierta para continuar la conversación
- Nunca inventes datos clínicos específicos (porcentajes, estudios)
- Usa lenguaje profesional pero accesible`;

    let userPrompt = "";

    if (mode === "objection") {
      const specialtyText = specialty || "especialista";
      const settingText = setting || "consultorio";

      userPrompt = `Un ${specialtyText} en un ${settingText} me acaba de decir:

"${objection}"

Dame una respuesta profesional que pueda usar en el momento.`;
    } else if (mode === "email") {
      userPrompt = `Escribe un email de seguimiento profesional basado en esta situación:

${objection}

El email debe ser:
- Profesional pero cálido
- Breve (máximo 150 palabras)
- Con un call-to-action claro`;
    } else if (mode === "preparation") {
      userPrompt = `Voy a visitar a un médico mañana. Esta es la situación:

${objection}

Dame:
1. 3 preguntas clave para entender sus necesidades
2. 3 posibles objeciones que podría tener
3. Puntos de valor para destacar`;
    }

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: userPrompt,
        },
      ],
    });

    const responseText =
      message.content[0].type === "text" ? message.content[0].text : "";

    return NextResponse.json({ response: responseText });
  } catch (error) {
    console.error("Error calling Claude:", error);
    return NextResponse.json(
      { error: "Error procesando la solicitud" },
      { status: 500 }
    );
  }
}
