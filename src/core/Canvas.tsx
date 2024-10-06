import { useRef, useEffect } from "react";

import { FrameLoopProvider } from "./FrameLoop";
import { createRoot } from "./createRoot";

interface CanvasProps {
  children?: React.ReactNode;
}

export const Canvas: React.FC<CanvasProps> = ({ children }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rootRef = useRef<ReturnType<typeof createRoot> | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && !rootRef.current) {
      rootRef.current = createRoot(canvas);
      rootRef.current?.render(
        <FrameLoopProvider invalidate={rootRef.current.invalidate}>
          {children}
        </FrameLoopProvider>
      );
    }

    return () => {
      rootRef.current?.unmount();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    rootRef.current?.render(
      <FrameLoopProvider invalidate={rootRef.current.invalidate}>
        {children}
      </FrameLoopProvider>
    );
  }, [children]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
      }}
    />
  );
};