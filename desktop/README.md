// Tutorial para abrir el projecto:
1. Descargar la carpeta desktop entera
2. Abrirla en visual studio code
3. En la terminal de Visual, escribir npm install
4. Para hacer build, escribir npm run dev
5. Ir al localhost que indica (deberia ser http://localhost:5173)
6. Scroll down (si aun no lo hemos integrado bien)
7. (enter + h) en consola para acciones vite y (enter + q) para terminar programa

// El codigo principal esta en electron/script.js y src/main.jsx
// El codigo esta en main.jsx para que aparezca en la pagina directamente, pero habra que quitarlo en algun momento

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
