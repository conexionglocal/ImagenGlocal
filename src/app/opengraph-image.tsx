import { ImageResponse } from "next/og"

export const alt = "Conexión Glocal — Imagen Global, Poder Local"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "76px",
          color: "white",
          background: "linear-gradient(135deg, #6d28d9 0%, #c026d3 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 30, letterSpacing: 4, textTransform: "uppercase", opacity: 0.9 }}>
          Conexión Glocal
        </div>
        <div style={{ fontSize: 72, lineHeight: 1.08, fontWeight: 700, maxWidth: 980, marginTop: 28 }}>
          Imagen Global, Poder Local
        </div>
        <div style={{ fontSize: 30, marginTop: 34, opacity: 0.9 }}>
          Estrategia · Creatividad · Tecnología
        </div>
      </div>
    ),
    size,
  )
}
