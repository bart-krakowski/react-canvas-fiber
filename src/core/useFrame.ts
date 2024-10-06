import { useContext, useEffect } from "react";
import { FrameCallback, FrameLoopContext } from "./FrameLoop";

export const useFrame = (callback: FrameCallback) => {
  const context = useContext(FrameLoopContext);

  useEffect(() => {
    if (!context) {
      throw new Error('useFrame must be used within a FrameLoopProvider');
    }
    context.subscribe(callback);
    return () => {
      context.unsubscribe(callback);
    };
  }, [callback, context]);
};
