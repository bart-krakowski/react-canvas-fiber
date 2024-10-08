import ReactReconciler from "react-reconciler";
import { renderAll, resizeCanvas, getClickCoordinates, debounce, hitTest } from "./renderUtils";
import { Container, RootState } from "./types";
import { hostConfig } from "./hostConfig";

const reconciler = ReactReconciler(hostConfig);

const handleClick = (container: Container, x: number, y: number) => {
  const hit = hitTest(container, x, y);
  if (hit) {
    hit.props.onClick?.();
  }
};

export const createRoot = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error('Canvas context not found. Aborting render.');
    return null;
  }

  const dpr = window.devicePixelRatio ?? 1;

  const state: RootState = {
    canvas,
    ctx,
    children: [],
    dpr,
    frames: 0,
    invalidate: () => {
      renderAll(state);
    },
  };

  const handleResize = () => {
    resizeCanvas(canvas, state);
    // state.invalidate();
  };

  const root = reconciler.createContainer(
    state,
    0,
    null,
    false,
    null,
    '',
    console.error,
    null
  );

  const handleCanvasClick = (event: MouseEvent) => {
    const { x, y } = getClickCoordinates(canvas, event, state.dpr);
    handleClick(state, x, y);
  };

  const debouncedHandleResize = debounce(handleResize, 200);

  window.addEventListener('resize', debouncedHandleResize);
  canvas.addEventListener('click', handleCanvasClick);

  resizeCanvas(canvas, state);

  return {
    render: (element: React.ReactNode) => {
      reconciler.updateContainer(element, root, null, () => { });
    },
    unmount: () => {
      reconciler.updateContainer(null, root, null, () => { });
      window.removeEventListener('resize', debouncedHandleResize);
      canvas.removeEventListener('click', handleCanvasClick);
    },
    invalidate: state.invalidate,
  };
};
