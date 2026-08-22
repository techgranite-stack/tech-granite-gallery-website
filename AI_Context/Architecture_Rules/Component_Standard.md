# Component & CSS Standard

All UI and Section components must follow the **Locality of Reference** principle to ensure the project remains modular and scalable.

## Folder Structure
Each component must live in its own directory within `src/components/ui/`, `src/components/sections/`, or `src/components/layouts/`.

```bash
ComponentFolder/
├── index.tsx                  # Logic, Types, and Structure
└── ComponentFolder.module.css # Scoped Vanilla CSS (matching parent directory name)
```

## Rules
1. **No Global CSS for Components**: All styles must be in a `.module.css` file.
2. **Standard Exports**: Use named exports or `export default` from `index.tsx`.
3. **Vanilla CSS Focus**: Use CSS Variables defined in `src/styles/variables.css` for colors, spacing, and typography to maintain brand consistency.
4. **Modularity**: A component folder should be "pluggable." Moving the folder to a different project should require minimal configuration.
