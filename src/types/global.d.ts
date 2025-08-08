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

type ExampleName = 'example-1' | 'example-2' | 'example-3';

type ExampleEvent = 'example-update';

type ExampleState = {
  name: ExampleName;
};

declare global {
  interface Window {
    examples?: {
      onExampleUpdate: (callback: (state: ExampleState) => void) => void
    }
  }
}

export { ExampleState, ExampleName, ExampleEvent } 