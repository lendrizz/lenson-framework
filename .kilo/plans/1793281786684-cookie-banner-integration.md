# Plan: Cookie-Banner von restaurant.html nach index.html integrieren

## Ziel
Den Cookie-Banner (Banner + Modal) aus `restaurant.html` in `index.html` übernehmen, ohne dass `index.html` `css/style.css` laden muss. Alle notwendigen Styles landen in `css/landing-new.css`.

## Einschränkungen (vom Nutzer vorgegeben)
- `index.html` darf **nicht** `css/style.css` laden (nur `css/landing-new.css`)
- Style-Änderungen erfolgen ausschließlich in `css/landing-new.css`

## Aktueller Zustand (festgestellt)
- `restaurant.html` Zeilen 690–744: Cookie-Banner HTML + Cookie-Modal HTML
- `restaurant.html` Zeilen 746–747: lädt `js/main.js` (bereits in `index.html` geladen)
- `js/main.js` Zeilen 186–229: Cookie-JS-Funktionen (`acceptAllCookies`, `acceptEssentialCookies`, `openCookieSettings`, `saveCookieSettings`) sind bereits als `window.*` verfügbar und werden in `index.html` geladen (Zeile 456)
- `css/style.css` Zeilen 1774–2030: Cookie-Banner-Styles mit hardcodierten Hex-Farben (`#0B0B0B`, `#1A1A1A`, `#C6A86B`, `#9CA3AF`, etc.)
- `css/landing-new.css`: keine Cookie-Styles vorhanden
- `index.html` Zeile 456: `<script src="js/main.js"></script>` ist bereits vorhanden

## Implementierungsschritte

### 1. `index.html` – Cookie-Banner HTML einfügen
Nach `<footer class="footer">` … `</footer>` und vor `<script src="js/main.js"></script>` (Zeile 456) einfügen:

a) Cookie-Banner (Kopie von `restaurant.html` Zeilen 690–703):
```html
<div class="cookie-banner" id="cookieBanner">
    <div class="cookie-container">
        <div class="cookie-text">
            <h4>🍪 Cookie-Einstellungen</h4>
            <p>Wir verwenden Cookies, um Ihnen die bestmögliche Nutzung unserer Website zu ermöglichen. <a href="datenschutz.html">Mehr erfahren</a></p>
        </div>
        <div class="cookie-buttons">
            <button class="cookie-btn cookie-btn-accept" onclick="acceptAllCookies()">Alle akzeptieren</button>
            <button class="cookie-btn cookie-btn-essential" onclick="acceptEssentialCookies()">Nur erforderliche</button>
            <button class="cookie-btn cookie-btn-settings" onclick="openCookieSettings()">Einstellungen</button>
        </div>
    </div>
</div>
```

b) Cookie-Modal (Kopie von `restaurant.html` Zeilen 705–744):
```html
<div class="cookie-modal" id="cookieModal">
    <div class="cookie-modal-card">
        <h3>Cookie-Einstellungen</h3>
        <p>Wählen Sie aus, welche Cookies Sie zulassen möchten. Erforderliche Cookies sind für den Betrieb der Website notwendig.</p>
        <div class="cookie-toggle-group">
            <div class="cookie-toggle">
                <div class="cookie-toggle-info">
                    <h5>Erforderliche Cookies</h5>
                    <p>Notwendig für die Grundfunktionen der Website.</p>
                </div>
                <label class="cookie-switch">
                    <input type="checkbox" checked disabled>
                    <span class="cookie-slider"></span>
                </label>
            </div>
            <div class="cookie-toggle">
                <div class="cookie-toggle-info">
                    <h5>Google Fonts</h5>
                    <p>Lädt Schriftarten von Google-Servern für die Darstellung.</p>
                </div>
                <label class="cookie-switch">
                    <input type="checkbox" id="cookieGoogleFonts" checked>
                    <span class="cookie-slider"></span>
                </label>
            </div>
            <div class="cookie-toggle">
                <div class="cookie-toggle-info">
                    <h5>Analytische Cookies</h5>
                    <p>Helfen uns zu verstehen, wie Besucher die Website nutzen.</p>
                </div>
                <label class="cookie-switch">
                    <input type="checkbox" id="cookieAnalytics">
                    <span class="cookie-slider"></span>
                </label>
            </div>
        </div>
        <button class="cookie-save-btn" onclick="saveCookieSettings()">Einstellungen speichern</button>
    </div>
</div>
```

### 2. `css/landing-new.css` – Cookie-Styles portieren
Die Styles aus `css/style.css` (Zeilen 1774–2030) nach `landing-new.css` übernehmen, mit folgenden Anpassungen:

- Hardcodierte Farben durch CSS-Variablen von `landing-new.css` ersetzen:
  - `#0B0B0B` → `var(--color-black)`
  - `#1A1A1A` → `var(--color-anthrazit)`
  - `#111111` → `var(--color-dark)`
  - `#C6A86B` → `var(--color-accent)`
  - `#D4B87A` → `var(--color-accent-hover)`
  - `#FFFFFF` → `var(--color-white)`
  - `#9CA3AF` → `var(--color-text-secondary)`
  - `#6B7280` → `var(--color-text-tertiary)`
  - `#3A3A3A` → `var(--color-border)` (oder neu definieren)
  - `rgba(198, 168, 107, 0.3)` → `rgba(var(--color-accent-rgb), 0.3)` oder direkt `var(--color-accent)` mit Transparenz

- `background: rgba(11, 11, 11, 0.97)` → `background: var(--color-black)` mit `opacity` oder `rgba(11,11,11,0.97)` beibehalten (keine Variable dafür existiert, kann inline bleiben)

- Animation `@keyframes cookieSlideUp` übernehmen
- Mobile Media Query `@media (max-width: 768px)` für `.cookie-container` übernehmen (flex-direction: column, text-align: center)

Platzierung in `landing-new.css`: am Ende der Datei oder nach dem Footer-Bereich, vor den Media-Queries für Reduced Motion.

### 3. JavaScript
Keine Änderungen nötig. `js/main.js` ist bereits in `index.html` geladen und die Cookie-Funktionen sind als `window.*` globale Funktionen verfügbar, die von den `onclick`-Attributen im HTML aufgerufen werden.

## Validierung
- `index.html` öffnet im Browser: Cookie-Banner erscheint unten (falls kein `localStorage.getItem('cookieConsent')` vorhanden)
- Buttons funktionieren: "Alle akzeptieren", "Nur erforderliche", "Einstellungen" öffnen/schließen Banner und Modal
- Modal: Toggle-Switches für Google Fonts und Analytische Cookies funktionieren, "Einstellungen speichern" schließt Modal und Banner
- `index.html` lädt weiterhin nur `css/landing-new.css` (kein `style.css`)
- Keine CSS-Konflikte mit bestehenden Styles in `landing-new.css`

## Rollback
`git revert <commit>` falls Probleme auftreten.

## Offene Fragen (zur Klärung mit Nutzer)
1. Soll der Cookie-Banner-Text exakt wie in `restaurant.html` bleiben, oder soll er für `index.html` angepasst werden?
2. Soll der Banner standardmäßig sofort angezeigt werden (wie aktuell: bei fehlendem localStorage-Eintrag), oder soll er verzögert erscheinen?