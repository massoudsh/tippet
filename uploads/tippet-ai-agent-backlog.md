# Tippet — AI Agent UI/UX Backlog

This document contains a ready-to-use backlog for improving **Tippet** with a modern, glassy UI/UX style.

> **Product context:** Tippet is an **AI resale fashion discovery and styling marketplace**. Its existing roadmap includes AI-assisted seller listing, AI discovery based on user taste embeddings, and a simple outfit builder. This backlog focuses on making those flows beautiful, trustworthy, fast, and easy to use. Before implementation, an AI agent should audit the actual frontend stack, routes, components, design system, data model, and backend capabilities.

## How to use

1. Copy each section into a separate GitHub Issue, or let an AI coding agent read this file directly.
2. Implement issues in the recommended order.
3. Keep each pull request small and focused.
4. Preserve existing APIs, AI recommendations, marketplace rules, payments, permissions, and moderation flows.
5. Do not fabricate product data, prices, availability, seller claims, or AI recommendations.

## Recommended implementation order

1. Create a reusable glass UI design system
2. Redesign app shell and navigation
3. Define accessible glass surface recipes
4. Redesign the AI discovery feed
5. Upgrade product cards and item detail pages
6. Improve seller listing with AI suggestions
7. Build a polished outfit builder
8. Improve search, filters, and sorting
9. Improve user closet, likes, and feedback loop
10. Improve cart, checkout, and trust signals
11. Make forms, settings, and errors actionable
12. Improve Persian typography and RTL consistency
13. Add polished light and dark themes
14. Add restrained motion and interaction feedback
15. Meet WCAG AA across primary flows
16. Optimize frontend performance for image-heavy commerce
17. Add quality gates and visual regression checks

## Global rules for AI agents

- Preserve existing functionality, APIs, recommendation behavior, marketplace rules, and permissions.
- Prefer the project’s existing frontend framework, styling system, and component conventions.
- Use design tokens instead of hard-coded colors, spacing, radii, shadows, and blur values.
- Support both Persian/RTL and English/LTR where applicable.
- Maintain WCAG AA contrast and keyboard accessibility.
- Add loading, empty, error, offline, and permission-denied states to new UI.
- Avoid excessive backdrop blur; glassmorphism must not harm readability or performance.
- Clearly distinguish AI-generated suggestions from verified product data.
- Never present AI-extracted attributes as guaranteed facts without seller confirmation.
- Include screenshots or short recordings in pull requests when UI changes are visible.

---

## 1. Create a reusable glass UI design system

**Labels:** `design-system`, `ui/ux`, `glassmorphism`, `frontend`

### Goal

Establish a fashion-forward, premium visual language before changing individual screens.

### Scope

- Add design tokens for:
  - Color
  - Surface and background
  - Blur
  - Border
  - Shadow
  - Radius
  - Spacing
  - Typography
  - Motion
  - Z-index
  - Product status colors
- Create reusable components:
  - `GlassCard`
  - `GlassPanel`
  - `GlassButton`
  - `GlassIconButton`
  - `GlassInput`
  - `GlassTextarea`
  - `GlassSelect`
  - `GlassChip`
  - `GlassBadge`
  - `GlassTabs`
  - `GlassModal`
  - `GlassDrawer`
  - `GlassPopover`
  - `GlassToast`
  - `GlassTooltip`
  - `GlassSidebar`
  - `GlassTopBar`
  - `ProductCard`
  - `ImageCarousel`
  - `SizeSelector`
  - `ConditionBadge`
  - `AISuggestionBadge`
- Support light and dark themes.
- Support RTL/Persian text.

### Acceptance criteria

- [ ] Tokens are defined in a central theme/configuration file.
- [ ] Components use tokens rather than hard-coded styles.
- [ ] Interactive components include hover, focus-visible, active, disabled, loading, and error states.
- [ ] Product condition, availability, and AI-suggestion states are visually consistent.
- [ ] Components work in RTL and LTR layouts.
- [ ] Existing screens do not regress.

### AI-agent prompt

```text
Audit Tippet’s frontend stack, routing structure, component library, and styling approach. Create a token-based glass design system for an AI resale fashion marketplace. Include product, condition, availability, and AI-suggestion states. Prefer CSS variables or the project’s existing theme mechanism.
```

---

## 2. Redesign app shell and navigation

**Labels:** `ui/ux`, `frontend`, `glassmorphism`

### Goal

Make Tippet feel like a modern fashion marketplace while keeping discovery, selling, and account management effortless.

### Requirements

- Responsive application shell.
- Glass bottom navigation on mobile.
- Glass sidebar or top navigation on desktop.
- Sticky glass top bar.
- Global search.
- Discovery, closet, outfit builder, messages, cart, and profile entry points.
- Notifications.
- User/profile menu.
- Theme toggle.
- Clear active-route indication.
- Seller mode or “Sell an item” call to action where supported.

### Acceptance criteria

- [ ] Navigation adapts correctly between mobile and desktop.
- [ ] Primary buyer and seller actions are easy to reach.
- [ ] Active navigation item is visually and programmatically indicated.
- [ ] All navigation is reachable by keyboard.
- [ ] Layout works correctly in RTL.
- [ ] No business logic is changed.

### AI-agent prompt

```text
Refactor Tippet’s app layout into a responsive marketplace shell with glass navigation, sticky top bar, and content area. Preserve existing routes and data behavior. Ensure navigation works with keyboard, screen readers, and RTL.
```

---

## 3. Define accessible glass surface recipes

**Labels:** `ui/ux`, `glassmorphism`, `accessibility`

### Goal

Avoid unreadable text, inconsistent blur, and inaccessible contrast.

### Surface variants

| Variant | Use case |
|---|---|
| `subtle` | Page background layers, quiet containers |
| `medium` | Product cards, panels, filters, forms |
| `elevated` | Modals, drawers, image viewers, checkout, toasts, popovers |

### Requirements

- Use restrained blur and semi-transparent fills.
- Add a subtle 1px light border for definition.
- Guarantee WCAG AA contrast for text, icons, prices, and interactive controls.
- Provide fallbacks when `backdrop-filter` is unavailable.
- Respect `prefers-reduced-motion`.
- Do not reduce readability of product details, prices, sizes, or seller information.

### Acceptance criteria

- [ ] `GlassSurface` component exists with `subtle`, `medium`, and `elevated` variants.
- [ ] Contrast passes WCAG AA in light and dark themes.
- [ ] A no-backdrop-filter fallback is implemented.
- [ ] Focus states are visible on glass surfaces.
- [ ] Product imagery and commerce details remain readable.

### AI-agent prompt

```text
Create a GlassSurface primitive with subtle, medium, and elevated variants. Include hover, focus-visible, disabled, loading, and error states. Add reduced-motion and no-backdrop-filter fallbacks.
```

---

## 4. Redesign the AI discovery feed

**Labels:** `feature`, `ui/ux`, `frontend`, `ai`

### Goal

Make AI-powered fashion discovery feel personal, explainable, and enjoyable.

### Requirements

- Discovery feed with visually rich product cards.
- Explain why an item was recommended where recommendation metadata exists, such as style match, similar items, or user feedback.
- Allow like, dislike, save, hide, and report actions where supported.
- Show feedback state immediately and allow undo where practical.
- Provide discovery controls such as style, category, size, price range, condition, and brand where supported.
- Distinguish sponsored, promoted, or AI-suggested content if such states exist.
- Add compelling empty states for new users and exhausted feeds.
- Avoid manipulative dark patterns or misleading personalization claims.

### Acceptance criteria

- [ ] Users can understand why an item appears when explanation data is available.
- [ ] Like/dislike/save actions provide immediate feedback.
- [ ] Feed states include loading, empty, error, and end-of-feed.
- [ ] Recommendations respect existing backend logic and permissions.
- [ ] AI suggestions are not presented as guaranteed product attributes.
- [ ] The feed remains performant with images.

### AI-agent prompt

```text
Redesign Tippet’s AI discovery feed using the existing recommendation API and data model. Add visually rich product cards, feedback actions, explanation surfaces where metadata exists, and polished loading/empty/error states. Do not change recommendation logic.
```

---

## 5. Upgrade product cards and item detail pages

**Labels:** `feature`, `ui/ux`, `frontend`

### Goal

Make resale fashion items easy to evaluate and desirable to explore.

### Product card requirements

- High-quality image presentation with aspect-ratio stability.
- Title, price, brand, size, condition, and availability.
- Favorite/save action.
- Clear sold, reserved, pending, or unavailable states.
- AI-suggested attribute badges only when clearly labeled.
- Skeleton loading state.

### Item detail requirements

- Image gallery with zoom, swipe, keyboard navigation, and accessible alt text.
- Price, size, condition, brand, category, color, material, and seller information.
- Clear AI-extracted versus seller-confirmed attribute distinction.
- Size guidance and measurement details where available.
- Seller profile, ratings, and related items where supported.
- Add-to-cart, message seller, save, share, and report actions according to permissions.
- Shipping, returns, and authenticity/trust information where applicable.

### Acceptance criteria

- [ ] Users can quickly assess an item from the card.
- [ ] Item detail presents all available product information clearly.
- [ ] AI-extracted fields are distinguishable from confirmed fields.
- [ ] Images do not cause layout shift.
- [ ] Commerce actions respect permissions and product state.
- [ ] Empty, loading, error, and sold-out states are implemented.

### AI-agent prompt

```text
Upgrade Tippet’s product cards and item detail pages. Create reusable commerce components for images, price, condition, size, availability, seller information, and AI-suggestion labels. Preserve existing product data, marketplace rules, and purchase flows.
```

---

## 6. Improve seller listing with AI suggestions

**Labels:** `feature`, `ux`, `ai`, `frontend`

### Goal

Make listing an item fast while keeping the seller in control.

### Requirements

- Guided listing flow: photos → description → AI suggestions → review → publish.
- Image upload with previews, reorder, remove, upload progress, failure, and retry states.
- AI-suggested category, color, material, brand, condition, and estimated size where supported.
- Present AI suggestions as editable recommendations, not fixed values.
- Clearly indicate which fields are AI-generated, seller-entered, or verified.
- Show confidence or uncertainty only where the backend provides it.
- Prevent publishing incomplete or invalid listings.
- Preserve draft state where supported.

### Acceptance criteria

- [ ] Sellers can review and correct every AI suggestion.
- [ ] AI-generated fields are clearly labeled.
- [ ] Image upload states are clear and resilient.
- [ ] Invalid or incomplete listings cannot be published.
- [ ] Existing listing, moderation, and marketplace rules are preserved.
- [ ] The flow works on mobile and desktop.

### AI-agent prompt

```text
Improve Tippet’s seller listing flow with AI suggestions. Use the existing AI extraction endpoints and data model. Present every AI suggestion as editable, clearly labeled, and reviewable before publishing. Add robust image-upload and validation states.
```

---

## 7. Build a polished outfit builder

**Labels:** `feature`, `ui/ux`, `frontend`, `ai`

### Goal

Turn individual items into complete, editable outfit suggestions.

### Requirements

- Outfit canvas or board showing selected items together.
- Add items from discovery feed, closet, search results, or current item page where supported.
- Show item compatibility or styling rationale where recommendation metadata exists.
- Allow remove, replace, save, share, and add-to-cart actions according to product support.
- Clearly distinguish AI-generated outfit suggestions from user-created outfits.
- Support empty, partial, loading, and error states.
- Avoid implying guaranteed fit, availability, or style correctness.

### Acceptance criteria

- [ ] Users can create or modify an outfit from available items.
- [ ] Outfit items are visually clear and individually actionable.
- [ ] AI suggestions are distinguishable from user choices.
- [ ] Users can save or share outfits where the product supports it.
- [ ] Existing recommendation and cart behavior is preserved.
- [ ] The builder is usable on mobile and desktop.

### AI-agent prompt

```text
Improve Tippet’s outfit builder using existing recommendation and item data. Create an editable outfit board with add, remove, replace, save, and commerce actions where supported. Clearly label AI-generated suggestions and preserve existing backend behavior.
```

---

## 8. Improve search, filters, and sorting

**Labels:** `feature`, `ux`, `frontend`

### Goal

Help shoppers find relevant resale fashion quickly.

### Requirements

- Search with recent searches and suggested corrections where supported.
- Filters for category, size, brand, color, condition, price, seller, and AI style match where supported.
- Sort by relevance, newest, price, popularity, or other existing options.
- Active-filter chips with individual removal and clear-all action.
- URL-synced filters where appropriate.
- Empty and no-results states with helpful next steps.
- Mobile filter drawer and desktop filter panel.

### Acceptance criteria

- [ ] Users can narrow results without losing context.
- [ ] Active filters are visible and removable.
- [ ] Search and filter states handle loading, empty, and error cases.
- [ ] Filters work on mobile and desktop.
- [ ] Existing search and catalog behavior is preserved.

### AI-agent prompt

```text
Improve Tippet’s search, filtering, and sorting experience using existing catalog capabilities. Add clear active-filter management, responsive filter UI, and helpful empty states. Preserve existing search semantics and data permissions.
```

---

## 9. Improve user closet, likes, and feedback loop

**Labels:** `feature`, `ux`, `frontend`, `ai`

### Goal

Make saved items and preference feedback useful for future discovery.

### Requirements

- Closet or saved-items view with product cards, folders/collections where supported, and availability status.
- Likes and dislikes with undo where practical.
- Clear indication when a saved item becomes sold, reserved, or unavailable.
- Feedback history or preference controls where supported.
- Easy movement from saved items to outfit builder or search.
- Empty states that encourage discovery without being pushy.

### Acceptance criteria

- [ ] Users can manage saved items easily.
- [ ] Item availability changes are visible where data supports them.
- [ ] Feedback actions are consistent with the discovery feed.
- [ ] Users can navigate from saved items to related actions.
- [ ] Existing preference and recommendation behavior is preserved.

### AI-agent prompt

```text
Improve Tippet’s closet, likes, dislikes, and feedback-loop UX. Use existing user preference and item data. Make saved items actionable and clearly communicate availability and feedback states.
```

---

## 10. Improve cart, checkout, and trust signals

**Labels:** `feature`, `ux`, `frontend`, `trust`

### Goal

Make purchasing feel safe, transparent, and friction-free.

### Requirements

- Cart with item summaries, images, prices, sizes, sellers, and availability.
- Clear price breakdown: item price, shipping, fees, discounts, and total where applicable.
- Checkout steps with progress indication and editable prior steps.
- Clear seller, shipping, return, and payment information where supported.
- Trust badges only for claims the platform can substantiate.
- Handle out-of-stock, price-change, and unavailable-item states gracefully.
- Preserve payment, order, and marketplace compliance flows.

### Acceptance criteria

- [ ] Users can review their order before payment.
- [ ] Price and fee information is transparent where available.
- [ ] Checkout state and progress are clear.
- [ ] Inventory or price changes are handled without data loss.
- [ ] Existing payment and order flows are preserved.

### AI-agent prompt

```text
Improve Tippet’s cart and checkout UX without changing payment or order backend behavior. Add clear item summaries, price transparency, progress indication, inventory states, and trust signals only where substantiated by the platform.
```

---

## 11. Make forms, settings, and errors actionable

**Labels:** `ux`, `frontend`, `accessibility`

### Goal

Help users complete profiles, listings, preferences, and account actions confidently.

### Requirements

- Inline field-level validation.
- Summary of validation failures at the top of long forms.
- Links from summary items to the relevant fields.
- Distinct handling for validation errors, permission errors, payment errors, network errors, and system failures.
- Preserve user input after an error.
- Clear save, saving, saved, unsaved-changes, and discard states.
- Group related settings and use progressive disclosure for advanced options.

### Acceptance criteria

- [ ] A shared error-message catalog exists.
- [ ] Error messages are specific and actionable.
- [ ] Users can recover from failed submissions without losing input.
- [ ] Errors are announced accessibly.
- [ ] Persian and English messages are available.

### AI-agent prompt

```text
Standardize Tippet’s form, settings, and API error handling. Create a shared error-message catalog and ensure validation failures are visible, specific, and recoverable.
```

---

## 12. Improve Persian typography and RTL consistency

**Labels:** `i18n`, `ui/ux`, `accessibility`

### Goal

Make the Persian-first fashion marketplace feel native and polished.

### Requirements

- Use a high-quality Persian font with sensible fallbacks.
- Set correct `dir`, alignment, punctuation, numerals, and mixed Persian/English handling.
- Test discovery feed, product pages, outfit builder, checkout, filters, modals, and toasts in RTL.
- Avoid mirroring direction-sensitive icons.
- Prevent clipping or overflow with longer Persian labels.
- Handle brand names, sizes, prices, URLs, and technical values correctly in bidirectional text.

### Acceptance criteria

- [ ] All primary screens render correctly in RTL.
- [ ] Mixed Persian/English content is readable.
- [ ] Icons with directional meaning are not incorrectly mirrored.
- [ ] No major text overflow or clipping.
- [ ] Typography hierarchy is consistent.

### AI-agent prompt

```text
Audit every Tippet screen for RTL and Persian typography issues. Fix layout mirroring, icon direction, number and price formatting, bidirectional text handling, and overflow. Add visual regression checks if the project has a testing setup.
```

---

## 13. Add polished light and dark themes

**Labels:** `ui/ux`, `glassmorphism`, `frontend`

### Goal

Provide a premium fashion-marketplace experience in both themes.

### Requirements

- Theme toggle persisted in user preferences.
- Default to the operating-system preference.
- Use tokens rather than hard-coded colors.
- Tune glass opacity, blur, borders, and shadows separately per theme.
- Ensure product imagery, prices, badges, and status indicators remain legible.

### Acceptance criteria

- [ ] Users can switch between light and dark themes.
- [ ] Theme preference persists across sessions.
- [ ] All major screens are verified in both themes.
- [ ] Hard-coded colors are replaced with tokens.
- [ ] Glass surfaces remain readable in dark mode.

### AI-agent prompt

```text
Implement theme tokens and a persisted light/dark toggle for Tippet. Refactor hard-coded colors into tokens. Verify discovery, product, outfit builder, cart, and seller flows in both themes.
```

---

## 14. Add restrained motion and interaction feedback

**Labels:** `ui/ux`, `glassmorphism`, `accessibility`

### Goal

Make browsing fashion feel delightful without distracting from products.

### Requirements

- Subtle transitions for page changes, drawers, modals, image galleries, toasts, and hover states.
- UI feedback animations should generally be 200–300ms or less.
- Loading skeletons for product cards and feeds.
- Success and error toasts.
- Optimistic updates only for safe actions such as save or like, with rollback on failure.
- Respect `prefers-reduced-motion`.

### Acceptance criteria

- [ ] Motion tokens are centralized.
- [ ] Interactive components have consistent transitions.
- [ ] Reduced-motion users receive a non-animated equivalent.
- [ ] Animations do not delay comprehension of price, availability, or product details.
- [ ] No excessive or decorative animation is added.

### AI-agent prompt

```text
Add a motion token set and apply consistent transitions to Tippet’s interactive components. Ensure reduced-motion users get a non-animated equivalent.
```

---

## 15. Meet WCAG AA across primary flows

**Labels:** `accessibility`, `ui/ux`

### Goal

Ensure the marketplace is usable by everyone.

### Requirements

- Visible focus rings on all interactive elements.
- Keyboard-only operation for navigation, product galleries, filters, outfit builder, cart, and checkout.
- Semantic HTML, landmarks, labels, and ARIA only where necessary.
- WCAG AA contrast, including text over glass surfaces and product imagery.
- Meaningful alt text for product images where seller or AI-generated descriptions exist.
- Screen-reader testing for discovery, item detail, outfit builder, and checkout.

### Acceptance criteria

- [ ] All interactive controls are keyboard accessible.
- [ ] Focus is visible and logically managed.
- [ ] Modals, drawers, galleries, and popovers manage focus appropriately.
- [ ] Product status is conveyed with text or icons as well as color.
- [ ] Primary flows pass WCAG AA checks.

### AI-agent prompt

```text
Run an accessibility review of Tippet’s primary pages and flows. Fix issues without changing backend behavior. Prioritize keyboard navigation, focus management, contrast, semantic structure, product-image alt text, and screen-reader compatibility.
```

---

## 16. Optimize frontend performance for image-heavy commerce

**Labels:** `performance`, `frontend`

### Goal

Keep discovery, product browsing, and outfit building fast despite many images.

### Requirements

- Use responsive images, modern formats where supported, lazy loading, and stable aspect ratios.
- Lazy-load below-the-fold product images and heavy components.
- Avoid excessive nested backdrop filters and large blur radii.
- Virtualize long discovery or catalog lists only where justified.
- Cache image and catalog queries where appropriate.
- Add skeleton loaders and avoid layout shift.
- Measure Core Web Vitals before and after changes.

### Acceptance criteria

- [ ] Product images use responsive loading and stable layout.
- [ ] Discovery feed remains smooth while scrolling.
- [ ] Heavy routes, galleries, and outfit builder are code-split or lazy-loaded where appropriate.
- [ ] Glass effects do not cause severe scroll or interaction jank.
- [ ] Before/after performance metrics are documented.
- [ ] No functional regressions are introduced.

### AI-agent prompt

```text
Profile Tippet’s discovery feed, product pages, and outfit builder. Identify image, render, bundle, and blur-performance bottlenecks, then optimize without changing functionality. Document before/after metrics in the pull request.
```

---

## 17. Add quality gates and visual regression checks

**Labels:** `testing`, `ui/ux`, `frontend`

### Goal

Prevent UI regressions as the glass redesign evolves.

### Requirements

- Add or improve linting, type checking, formatting, and test checks.
- Add unit tests for reusable UI components where a test setup exists.
- Add visual regression coverage for light/dark and RTL/LTR states where practical.
- Test primary flows: discovery feed, product detail, seller listing, outfit builder, search, cart, and checkout.
- Document how contributors should run checks locally.

### Acceptance criteria

- [ ] Contributors can run quality checks with a single documented command where practical.
- [ ] Core reusable components have tests or documented manual test steps.
- [ ] Visual checks cover RTL and dark mode where tooling exists.
- [ ] CI fails on meaningful UI, type, lint, or accessibility regressions.
- [ ] Documentation explains the testing workflow.

### AI-agent prompt

```text
Audit Tippet’s existing test and CI setup. Add pragmatic quality gates for UI changes without over-engineering the project. Prioritize type checks, linting, component tests, and visual checks for RTL and dark mode where infrastructure already exists.
```
