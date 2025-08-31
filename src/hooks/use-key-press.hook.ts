import { useEffect } from "react";

export const useKeyPress = (
  targetKey: string,
  handler: (event: KeyboardEvent) => void,
  eventType: "keydown" | "keyup" = "keydown",
) => {
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key === targetKey) {
        handler(event);
      }
    };

    window.addEventListener(eventType, listener);
    return () => {
      window.removeEventListener(eventType, listener);
    };
  }, [targetKey, handler, eventType]);
};
