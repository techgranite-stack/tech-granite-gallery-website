# Blueprint: Magic Bento (Spotlight)

This component provides a premium "illuminated" card effect that follows the user's cursor.

## Technical Implementation
1. **State**: Track mouse `x` and `y` relative to the component bounds.
2. **Radial Gradients**:
   - `spotlight`: A soft `radial-gradient` centered at cursor `(x, y)`.
   - `borderGlow`: A high-opacity `radial-gradient` masked by the card border.
3. **CSS Variables**: Pass colors via `--glow-color` (e.g., `192, 133, 82`).

## Component Structure (TypeScript)
```tsx
const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
};

return (
  <div onMouseMove={handleMouseMove} className={styles.bento}>
    {/* The visible gradient */}
    <div 
      className={styles.spotlight} 
      style={{ 
        background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(var(--glow-color), 0.25), transparent 40%)` 
      }} 
    />
    <div className={styles.content}>{children}</div>
  </div>
);
```
