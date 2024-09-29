/// <reference types="vite/client" />
interface ImportMetaEnv {
  VITE_KITCHEN_BASE_URL: string
  VITE_MENU_BASE_URL: string
  VITE_DINING_BASE_URL: string
  VITE_BFF_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
