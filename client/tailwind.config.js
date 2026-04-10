/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef4ff",
          100: "#dbe8ff",
          200: "#bfd4ff",
          300: "#93b7ff",
          400: "#5f8eff",
          500: "#3867ff",
          600: "#2248f5",
          700: "#1c37e1",
          800: "#202fb6",
          900: "#212f8f"
        }
      },
      boxShadow: {
        glow: "0 10px 30px rgba(56, 103, 255, 0.25)"
      },
      backgroundImage: {
        hero:
          "radial-gradient(circle at top left, rgba(56,103,255,0.28), transparent 30%), radial-gradient(circle at top right, rgba(14,165,233,0.18), transparent 25%), linear-gradient(to bottom right, #020617, #0f172a, #111827)"
      }
    }
  },
  plugins: []
};