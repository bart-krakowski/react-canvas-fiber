import { createContext, useRef, useCallback, useEffect } from "react";

export type FrameCallback = (delta: number) => void;

export const FrameLoopContext = createContext<{
  subscribe: (callback: FrameCallback) => void;
  unsubscribe: (callback: FrameCallback) => void;
} | null>(null);

export const FrameLoopProvider: React.FC<{ children: React.ReactNode; invalidate: () => void }> = ({
  children,
  invalidate,
}) => {
  const subscribers = useRef<Set<FrameCallback>>(new Set());
  const lastTime = useRef(performance.now());
  const animationFrameId = useRef<number | null>(null);

  const startLoop = useCallback(() => {
    if (animationFrameId.current === null) {
      const animate = () => {
        const now = performance.now();
        const delta = now - lastTime.current;
        lastTime.current = now;
        subscribers.current.forEach((callback) => {
          const result = callback(delta);
          if (result === null) {
            subscribers.current.delete(callback);
          }
        });
        invalidate();

        animationFrameId.current = requestAnimationFrame(animate);
      };

      animationFrameId.current = requestAnimationFrame(animate);
    }
  }, [invalidate]);

  const stopLoop = useCallback(() => {
    if (animationFrameId.current !== null) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }
  }, []);

  const subscribe = useCallback((callback: FrameCallback) => {
    subscribers.current.add(callback);
    if (subscribers.current.size === 1) {
      startLoop();
    }
  }, [startLoop]);

  const unsubscribe = useCallback((callback: FrameCallback) => {
    subscribers.current.delete(callback);
    if (subscribers.current.size === 0) {
      stopLoop();
    }
  }, [stopLoop]);

  useEffect(() => {
    return () => {
      stopLoop();
    };
  }, [stopLoop]);

  return (
    <FrameLoopContext.Provider value={{ subscribe, unsubscribe }}>
      {children}
    </FrameLoopContext.Provider>
  );
};


