# UI scaffold and Figma-to-code flow

## Folder layout
- `app/`: Expo Router route files only. Keep screens thin and import UI from `src/`.
- `src/theme/`: Tokenized design system (`theme`, colors, radii, typography).
- `src/components/`: Reusable primitives and layout helpers shared across features.
  - `layout/`: Containers such as `Screen` and future layout helpers (Section, Stack).
  - `ui/`: Visual primitives (buttons, cards, chips, form controls, typography).
- `src/features/<feature>/`: Feature-specific components and hooks.
- `src/hooks/`, `src/utils/`: Shared logic as it emerges.
- `assets/`: Figma exports (images/icons/fonts/design-tokens.json).

## Using the scaffold
1) **Start with tokens**  
   - Align Figma styles to `assets/design-tokens.json` and mirror changes in `src/theme/tokens.ts`.  
   - Keep primitives consuming tokens so design changes stay centralized.
2) **Build primitives in `src/components/ui`**  
   - Example: create `Button.tsx` that reads colors/radius/typography from the theme and uses `AppText` for labels.
3) **Add layout helpers in `src/components/layout`**  
   - Wrap screens with `Screen` to get safe areas, padding, and consistent backgrounds.
4) **Compose feature UI**  
   - Create `src/features/<feature>/components` for reusable pieces in that domain.  
   - Hook them up inside the Expo route files under `app/` (e.g., `app/index.tsx` imports `features/home/screens/HomeScreen`).
5) **Assets**  
   - Drop exported SVG/PNGs into `assets/`.  
   - Keep names kebab-cased (e.g., `cta-primary.svg`) and group by feature if the folder grows.

## Quick examples
- Typography: use `AppText` and choose a `variant` (`display-md`, `title-sm`, `body-md`, etc.) and `tone` (`primary`, `muted`, `inverse`, `primaryAccent`).
- Screen wrapper: use `Screen` to get safe-area handling and consistent padding/background.

## PR hygiene
- Keep route files minimal; push logic and layout to `src/`.
- Add Storybook-style playgrounds or simple example screens when introducing new primitives to validate spacing/typography against Figma.
