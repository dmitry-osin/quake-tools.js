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

type TimerName = 'MH' | 'RA' | 'YA' | 'YA2' | 'YA3';

type TimerEvent = 'timer-tick' | 'timer-stop' | 'timer-reset';

type TimerState = {
  name: TimerName;
  interval: NodeJS.Timeout | null;
  timeLeft: number;
  running: boolean;
};

declare global {
  interface Window {
    timers?: {
      onTimerTick: (callback: (state: TimerState) => void) => void
      onTimerStop: (callback: (state: TimerState) => void) => void
      onTimerReset: (callback: (state: TimerState) => void) => void
    }
  }
}

export { TimerState, TimerName, TimerEvent } 