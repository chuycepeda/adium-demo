# Coach de Ventas IA | Demo Adium

> **Construido en ~7 minutos con Claude Code**
>
> Desde leer [adium.com.ec](https://adium.com.ec) hasta una app funcionando:
> - Analicé el sitio web para entender el negocio (farmacéutica, equipos comerciales, LATAM)
> - Diseñé un guión de demo para 250 representantes de ventas
> - Construí la app completa en Next.js con integración a Claude API
> - Creé 3 modos: manejador de objeciones, redactor de emails, preparación de visitas
>
> Tiempo total: **~7 minutos** (incluyendo investigación, planificación y código)

### Prompts Usados para Construir Esto

| # | Prompt | Tipo |
|---|--------|------|
| 1 | "Estoy dando un curso de IA a 250 personas... de esta empresa: adium.com.ec ¿Qué experimento rápido podría mostrarles?" | Investigación |
| 2 | "prepara un guión para el demo del manejador de objeciones" | Guión |
| 3 | "¿puedes construir una app web donde pueda poner estos inputs y seguir el guión que creaste?" | Construcción |
| 4 | "agrega el tiempo que te tomó crear esto en el badge flotante" | Mejora |
| 5 | "¿puedes mejorar cómo se muestra el markdown en las respuestas del coach?" | Mejora |
| 6 | "puedes ponerle a nuestro coach de ventas el branding de la marca adium" | Branding |

**Total: 6 prompts** — 1 investigación, 1 guión, 1 construcción, 2 mejoras, 1 branding.

---

## ¿Qué es esto?

Una app de demo para el curso de IA de Adium Ecuador. Muestra a los equipos comerciales cómo la IA puede ayudarles a manejar objeciones de médicos, escribir emails de seguimiento y preparar visitas.

## Funcionalidades

- **Manejador de Objeciones** — Ingresa lo que dijo el médico, obtén una respuesta profesional
- **Consciente del Contexto** — Selecciona especialidad (cardiólogo, pediatra, etc.) y lugar (hospital privado, clínica rural)
- **Redactor de Emails** — Genera emails de seguimiento desde notas de reuniones
- **Preparación de Visitas** — Obtén preguntas, objeciones anticipadas y puntos clave
- **Ejemplos Predefinidos** — Objeciones comunes como botones de acceso rápido

## Configuración

```bash
# Instalar dependencias
npm install

# Agregar tu API key de Anthropic
echo "ANTHROPIC_API_KEY=sk-ant-tu-llave" > .env.local

# Correr localmente
npm run dev
```

Abrir http://localhost:3000

## Desplegar en Vercel

```bash
vercel
# Configurar ANTHROPIC_API_KEY en las variables de entorno de Vercel
```

## Guión del Demo

Ver [demo-script.md](./demo-script.md) para el guión completo del presentador con tiempos, puntos de conversación y prompts de respaldo.

## Stack Tecnológico

- Next.js 15 + TypeScript
- Tailwind CSS
- Claude API (Sonnet)

---

## Para el Equipo de Adium

Esta herramienta está diseñada para ustedes. Algunas ideas de cómo usarla en el día a día:

1. **Antes de una visita** — Usa el modo "Preparar Visita" para anticipar objeciones
2. **Después de una visita** — Usa el modo "Email Seguimiento" para redactar el correo de follow-up
3. **Practicar** — Usa el modo "Manejar Objeción" para ensayar respuestas a objeciones difíciles

Recuerden: La IA es un **coach**, no un reemplazo. Siempre verifiquen datos clínicos con la información aprobada por el laboratorio.
