/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_FIREBASE: string;
  readonly VITE_MESSAGEID: string;
  readonly VITE_APPID: string;
  // 다른 환경 변수가 있으면 여기에 추가
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
