# Custom Canvas Renderer for React

This project is a custom renderer that leverages React's flexibility to render shapes on a canvas. It demonstrates how to build a React renderer from scratch, focusing on rendering basic shapes (rectangles, circles, and text) onto an HTML `<canvas>` element.

## Key Features

- Custom Shapes: Supports rendering rectangles, circles, and text with customizable properties (e.g., color, size, position).
- Event Handling: Implements click event detection on shapes rendered in the canvas.
- Dynamic Rendering: Renders React components directly onto a canvas using a custom renderer built with react-reconciler.
- Frame Loop for Animations: Uses requestAnimationFrame to support frame-based animations.

## Installation

To use this project in your application, follow these steps:

1. Install React and React Reconciler:
```bash
npm install react react-reconciler
``` 
2. Clone the repository or copy the files into your project directory.
3. Import the necessary components to start rendering shapes on a canvas.

## Usage
Here’s how you can use the Canvas component to render shapes:

Step 1: Setup a Canvas
Import the Canvas component and wrap your shapes within it:

```tsx
import React from 'react';
import { Canvas } from './CanvasRenderer';

export const App = () => (
  <Canvas>
    {/* Your canvas shapes go here */}
  </Canvas>
);
```

Step 2: Add Shapes
You can render shapes like rectangles, circles, and text inside the canvas. Each shape supports various properties for customization, such as `x`, `y`, `color`, and specific properties for each shape type.

```tsx
<Canvas>
  <rect x={50} y={50} width={100} height={100} fillStyle="blue" />
  <circle x={200} y={200} radius={50} fillStyle="green" />
  <text x={100} y={300} text="Hello, Canvas!" color="black" />
</Canvas>
```

Step 3: Handle Events
You can also assign event handlers like `onClick` to shapes:

```tsx
<rect x={50} y={50} width={100} height={100} fillStyle="blue" onClick={() => alert('Rectangle clicked!')} />
```

Step 4: Animations
By using the `useFrame` hook, you can subscribe to the animation loop to create frame-based updates. This enables you to create animations within the canvas.

```tsx
useFrame((delta) => {
  // Animate shapes based on delta time
});
```

## API Reference

### Components

- `Canvas`: The root component that wraps your shapes and renders them onto an HTML `<canvas>`.
- `rect`: A rectangle shape with properties:
  - `x, y`: Position coordinates.
  - `width, height`: Dimensions.
  - `fillStyle, strokeStyle`: Fill and stroke colors.
- `circle`: A circle shape with properties:
  - `x, y`: Position coordinates (top-left corner of the bounding box).
  - `radius`: Radius of the circle.
fillStyle, strokeStyle: Fill and stroke colors.
- `text`: A text element with properties:
  - `x, y`: Position coordinates.
  - `text`: The string to render.
  - `font`: Optional font styling.
color: Text color.

### Hooks

- `useFrame`: A hook that lets you subscribe to the frame loop for animations. The callback function is called with a delta value representing the time between frames.

### Event Handling

All shapes support standard event handlers like `onClick`. Event detection is implemented based on the canvas coordinates and shape bounds.

## License

MIT License.
