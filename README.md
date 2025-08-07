# 🎯 Wordle - Prueba Técnica

Un clon del popular juego Wordle desarrollado como prueba técnica en **40 minutos**.

## 📝 Descripción

Este proyecto es una implementación del juego Wordle donde los jugadores deben adivinar una palabra de 5 letras en un máximo de 5 intentos. El juego proporciona retroalimentación visual mediante colores:

- 🟦 **Azul**: Letra correcta en la posición correcta
- 🟨 **Amarillo**: Letra correcta pero en posición incorrecta  
- ⬜ **Gris**: Letra no está en la palabra

## 🚀 Tecnologías Utilizadas

- **React 19** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático para JavaScript
- **Vite** - Herramienta de construcción y desarrollo
- **Tailwind CSS 4** - Framework de CSS utilitario
- **ESLint** - Linter para mantener calidad de código

## 🎮 Características Implementadas

- ✅ Grid de 5x5 para ingresar letras
- ✅ Navegación automática entre casillas
- ✅ Validación de letras en tiempo real
- ✅ Sistema de colores para retroalimentación
- ✅ Interfaz responsive y centrada
- ✅ Capitalización automática de letras
- ✅ Límite de un carácter por casilla

## 🛠️ Instalación y Uso

### Prerrequisitos
- Node.js (versión 18 o superior)
- npm, yarn o bun

### Instalación

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd wordle

# Instalar dependencias
npm install
# o
yarn install
# o
bun install
```

### Ejecutar en desarrollo

```bash
npm run dev
# o
yarn dev
# o
bun dev
```


## 🎯 Cómo Jugar

1. Escribe una letra en cada casilla de la primera fila
2. La navegación entre casillas es automática
3. Observa los colores de retroalimentación:
   - **Azul**: Letra correcta en posición correcta
   - **Amarillo**: Letra está en la palabra pero en otra posición
   - **Gris**: Letra no está en la palabra
4. Continúa con las siguientes filas hasta adivinar la palabra

## 📁 Estructura del Proyecto

```
wordle/
├── public/
│   └── vite.svg
├── src/
│   ├── App/
│   │   └── index.tsx      # Componente principal del juego
│   ├── index.css          # Estilos globales con Tailwind
│   ├── main.tsx           # Punto de entrada de la aplicación
│   └── vite-env.d.ts      # Tipos de Vite
├── index.html             # Template HTML
├── package.json           # Dependencias y scripts
├── tsconfig.json          # Configuración de TypeScript
├── vite.config.ts         # Configuración de Vite
└── README.md              # Este archivo
```

## 🔧 Configuración

### Palabra Objetivo
Actualmente la palabra está hardcodeada como `"words"` en el componente principal. Para cambiarla, modifica la variable `word` en `src/App/index.tsx`:

```typescript
const word = "words" // Cambiar por la palabra deseada
```

### Dimensiones del Grid
El juego está configurado para 5 filas y 5 columnas. Para modificar estas dimensiones, ajusta las variables en `src/App/index.tsx`:

```typescript
const rows = 5 // Número de intentos
const cols = 5 // Longitud de la palabra
```
