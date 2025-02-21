# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



<!--  install npm install react-beautiful-dnd --legacy-peer-deps -->
The error occurs because react-beautiful-dnd does not support React 19 yet. It only supports React versions 16, 17, and 18.
Solution: Use --legacy-peer-deps
Run this command to force install:
 
npm install react-beautiful-dnd --legacy-peer-deps 
