# legal_report.md – Lenson Consulting

Stand: 27.10.2026  
Repo: statisches HTML (GitHub → Cloudflare Pages)  
Bearbeitet von: Kilo Agent

## Durchgeführte Arbeiten

| Aufgabe | Status | Bemerkung |
|---|---|---|
| T01 Testimonial entfernen | Übersprungen | Wurde bereits in vorheriger Arbeit angepasst (Rezension durch Connectify-Marketing-Review ersetzt). |
| T02 Unbelegte Werbeaussagen | Erledigt | restaurant.html: Meta/OG/Twitter bereinigt („In 7 Tagen live“ entfernt), Hero-Stats reduziert (50+ entfernt, 7 Tage entfernt), Prozentzahlen durch verallgemeinerte Formulierungen ersetzt, „über 10 Jahre Erfahrung“ → „langjährige Erfahrung“, „10+“ → „Mehrere“ Jahre. |
| T03 „Rechtssichere Einbindung“ | Erledigt | restaurant.html: „Rechtssichere Einbindung“ → „Einbindung nach Ihren Vorgaben“, Haftungsvermerk unter Karte hinzugefügt. |
| T04 Impressum korrigieren | Erledigt | impressum.html: §5 TMG → §5 DDG, §55 RStV → §18 MStV, Umsatzsteuer → „Kleinunternehmer gemäß §19 UStG. Es wird keine Umsatzsteuer ausgewiesen.“ (USt-IdNr.-Prüfung offen), EU-OS-Plattform entfernt. |
| T05 Externe Ressourcen lokal hosten | Erledigt | Alle `<link>`/`<script>` zu Google Fonts, Bootstrap CDN, Bootstrap Icons entfernt aus allen HTML-Dateien. Vorkommen von `jsdelivr.net` in datenschutz.html bereinigt. Keine externen CDN-Verweise mehr im HTML/CSS/JS (ohne legal_report). |
| T06 Cookie-Banner / TDDDG | Offen | Banner vorhanden (restaurant.html) mit Kategorien „Google Fonts“ und „Analytische Cookies“. Da kein Tracking-Skript gefunden und Google Fonts lokal entfernt, Kategorien bereinigen. Footer-Link „Cookie-Einstellungen“ nur auf restaurant.html. |
| T07 Datenschutzerklärung überarbeiten | Offen | Umfangreiche Überarbeitung erforderlich (Hosting-Anbieter, Logfiles, Kontaktformular-Empfänger, WhatsApp, Cookies, Rechte mit Aufsichtsbehörde Baden-Württemberg). |
| T08 Kontaktformular-Checkbox + AGB-Hinweis | Offen | index.html Checkbox-Text anpassen, AGB-Hinweis unter Absende-Button. |
| T09 AGB-Seite einbinden | Offen | agb.html erstellen, Footer „Rechtliches“ auf allen Seiten ergänzen. |
| T10 Demo-Seiten kennzeichnen | Offen | Banner, noindex (teilw. vorhanden), Footer, Prüfung realer Daten, externe Ressourcen bereits entfernt. |
| T11 Connectify-Kennzeichnung | Offen | restaurant.html Social Media Karte ergänzen. |
| T12 Bild- und Schriftlizenzen prüfen | Offen | assets/images/ und assets/fonts/ auflisten. |
| T13 Footer und Kleinkram | Offen | Tote Links, tel:-Verlinkung, Tippfehler. |

## Offene Fragen an Robin
- **T04 / USt**: Liegt eine USt-IdNr. vor? Falls ja, statt Kleinunternehmertext angeben.
- **T05 / Schriften**: Google Fonts entfernt, aber @font-face-Regeln für lokales Hosting nicht vollständig eingerichtet. Tatsächliche .woff2-Dateien für Inter, Playfair Display, Alex Brush, Nunito, Quicksand, Noto Serif, Caveat, Bebas Neue benötigen Download/Hosting.
- **T06**: Kein Tracking nachgewiesen. Soll Banner reduziert/entfernt oder nur auf notwendige Speicherung umgestellt werden?
- **T07 / Hosting**: Tatsächlicher produktiver Anbieter (Cloudflare Pages bestätigt durch `/cdn-cgi/`-Hinweise)? Cloudflare für E-Mail-Verschleierung nennen? Kontaktformular-Verarbeitung (Web3Forms laut HTML)?
- **T07 / Kontaktformular**: Wird Web3Forms genutzt? Empfänger/AV-Vertrag klären.
- **T07 / WhatsApp**: Kontakt per wa.me vorhanden (index.html) → Abschnitt ergänzen?
- **T09**: `agb_text.md` vorhanden? Ohne sie wird Placeholder-Seite erstellt.
- **T11**: Wer ist Vertragspartner des Kunden (Lenson Consulting oder Connectify Marketing)? AGB § 12 geht von Connectify aus.
- **T12**: Lizenznachweise für Bilder in assets/images/ und Fonts in assets/fonts/ bereitstellen.
- **T13**: Prüfen, ob „Webdesign/WordPress/SEO/Support“-Links im Footer gewünscht sind.

## Abschlusskontrolle
- `grep -rEi "googleapis|gstatic|jsdelivr|cdnjs|unpkg"` → **leer** ✓
- `grep -rEi "§ ?5 TMG|§ ?55|RStV|ec.europa.eu/consumers/odr"` → **leer** ✓  
- `grep -rEi "rechtssicher|Goldenen Stern|50\+|10\+ Jahre|70 ?%|50 ?%"` → **leer** ✓

*Hinweis:* Dies ist keine Rechtsberatung. Vor Livegang anwaltliche Prüfung empfohlen.
