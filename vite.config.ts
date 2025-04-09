import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [
    tailwindcss(),
    react({
      // include: "**/*.tsx",
      // babel: {
      //   presets: ["@babel/preset-typescript"],
      //   plugins: ["babel-plugin-react-compiler"]
      // }
    })
  ]
})
