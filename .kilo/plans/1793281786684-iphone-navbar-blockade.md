# Plan: iPhone Navbar-Blockade beheben

## Problem
Auf dem iPhone (Safari) ist die Navbar dauerhaft sichtbar, blockiert die halbe Bildschirmhöhe und verdeckt den Seiteninhalt von `index.html`.

## Ursachenanalyse

### 1. Konkurrierende Navigationssysteme (Hauptursache)
Alle drei Schlüsselelemente tragen gleichzeitig zwei konkurrierende CSS-Klassen:
- `<header class="nav-header liquid-nav-header">` (index.html:34)
- `<nav class="nav-container liquid-nav-container">` (index.html:35)
- `<ul class="nav-menu liquid-nav-menu">` (index.html:47)

`.nav-header` definiert `position: fixed; background: rgba(11,11,11,0.98); border-bottom: 1px`.
`.liquid-nav-header` überschreibt mit `background: transparent; border-bottom: none; backdrop-filter: none`.
Aufgrund gleicher Spezifität und späterer Position im CSS gewinnen die Liquid-Styles für Farbe/Border, aber `position: fixed` und `z-index: 1000` von `.nav-header` bleiben aktiv. Dies führt zu unvorhersehbarem Layout auf iOS.

### 2. Falscher `top`-Wert für Mobile-Menüs (≤968px)
Sowohl `.nav-menu` als auch `.liquid-nav-pill` verwenden `top: 90px` in `@media (max-width: 968px)`.
Aber in `@media (max-width: 640px)` ist `.nav-container` nur noch `70px` hoch.
Die 90px-Positionierung überlappt auf schmalen Displays den Inhalt unterhalb der NavBar.

### 3. `scroll-padding-top: 100px` passt nicht
`html { scroll-padding-top: 100px; }` (landing-new.css:46) stimmt nicht mit der mobilen NavBar-Höhe (70px) überein. Ankerspringe landen hinter der NavBar.

### 4. `min-height: 100vh` auf Hero (iOS Safari)
`.hero { min-height: 100vh; }` (landing-new.css:275) verursacht auf iPhone Safari Viewport-Sprünge, da `100vh` die Adressleiste mit einberechnet. Dies kann den Eindruck erwecken, die NavBar "wachse" oder bleibe stecken.

## Geplante Änderungen

### index.html
1. **Navigationsklassen entzerren**: Entferne die Liquid-Klassen vom Header, damit nur ein Navigationssystem aktiv ist. Empfehlung: `.nav-header` / `.nav-container` / `.nav-menu` behalten, `.liquid-nav-*` entfernen (da das klassische System vollständige Media-Queries hat).

### css/landing-new.css
2. **`.nav-header` explizite Höhe für Mobile**: Füge `height: 70px` in `@media (max-width: 640px)` hinzu, damit die feste NavBar-Höhe auch auf iPhone korrekt ist.

3. **Mobile `top`-Werte korrigieren**: Ändere `top: 90px` auf `top: 70px` für `.nav-menu` und `.liquid-nav-pill` in `@media (max-width: 640px)` (passt zur tatsächlichen NavBar-Höhe).

4. **`scroll-padding-top` responsiv machen**: Füge in `@media (max-width: 640px)` `html { scroll-padding-top: 70px; }` hinzu.

5. **Hero `min-height` für iOS**: Ersetze `min-height: 100vh` durch `min-height: 100dvh` (dynamic viewport height) oder füge JS-basierte Höhenberechnung hinzu.

6. **Menü bei Scroll schließen**: Erweitere das vorhandene Scroll-Event (index.html:464) so, dass das Mobile-Menü (`.nav-menu.active`) beim Scrollen geschlossen wird.

## Validierung
- iPhone Safari: Navbar darf nicht mehr als 70px hoch sein, Inhalt darf nicht verdeckt werden
- Ankerspringe landen sichtbar, nicht hinter der NavBar
- Mobile-Menü öffnet/schließt korrekt per Toggle
- Keine Layout-Sprünge beim Ein-/Ausblenden der iOS-Adressleiste

## Rollback
`git revert <commit>` falls Probleme auftreten.