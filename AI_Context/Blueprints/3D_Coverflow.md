# Blueprint: 3D Coverflow Engine

A sophisticated 3D carousel logic using circular indexing and GSAP.

## Mathematical Core
To ensure the carousel never "jumps" when looping, use **Continuous Indexing**:
```typescript
const normalizedIndex = ((continuousIndex % total) + total) % total;
```

## Transform Calculation
Map the `offset` (distance from center) to 3D properties:
- **X-Translation**: `offset * spacing`
- **RotateY**: `offset * -42` (Adjust for steepness)
- **Scale**: `1.0` (center), `0.78` (flanks), `0.62` (background)
- **Opacity**: `1.0` (center), `0.55` (flanks), `0` (hidden)
- **Z-Index**: `20 - abs(offset)`

## Interaction Rules
1. **Pointer Down**: Save initial `startX`.
2. **Pointer Move**: Calculate `deltaX`. If `> 40px`, trigger `manualGoTo(index + 1)`.
3. **Autoplay**: Set an interval of `3000ms`, but **must reset** on any manual interaction (click/drag/keyboard).
