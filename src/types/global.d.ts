// Global types for the project

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}

declare global {
  interface Window {
    electronAPI: {
      getSettings: (key: string) => Promise<any>
      setSettings: (key: string, value: any) => Promise<void>
      openFile: () => Promise<string | null>
      saveFile: (data: any) => Promise<void>
      minimize: () => Promise<void>
      maximize: () => Promise<void>
      close: () => Promise<void>
      onSettingsChanged: (callback: (key: string, value: any) => void) => void
    }
  }
}

export { } 