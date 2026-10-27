# legal_tasks.md – Rechtliche Überarbeitung lensonconsulting.de

Stand: 26.10.2026 · Repo: statisches HTML (GitHub → Cloudflare Pages)
Betreiber: Robin Lenson, Lenson Consulting, Carl-Reiß-Platz 15, 68165 Mannheim

## Regeln für den Agenten

1. **Keine Fakten erfinden.** Wo `[HUMAN INPUT]` steht, Aufgabe nur vorbereiten und die offene Frage am Ende in `legal_report.md` auflisten.
2. Zuerst alle `*.html` im Repo erfassen (inkl. `demo-*.html`), nicht nur `index.html`.
3. Nur die genannten Stellen ändern. Design, Layout und Texte außerhalb der Aufgaben bleiben unverändert.
4. Jede Aufgabe einzeln committen: `legal(Txx): <Kurzbeschreibung>`.
5. Nach Abschluss `legal_report.md` schreiben: erledigt / offen / Fragen an Robin.
6. Dies ist keine Rechtsberatung. Vor Livegang durch Anwalt gegenlesen lassen.

Priorität: **P1** = Abmahnrisiko, sofort · **P2** = wichtig · **P3** = sauber machen

---

## P1 – Kritisch

### T01 Testimonial entfernen (P1)
- Datei: `index.html`, Abschnitt „Über mich", Zitat „Seit der neuen Website … fast verdoppelt" (Markus Wagner, „Zum Goldenen Stern").
- Aktion: Block samt Quelle auskommentieren (`<!-- LEGAL T01: entfernt, bis echte Freigabe vorliegt -->`), Layout-Lücke schließen.
- Grund: Erfundene Bewertung = irreführende Werbung (§ 5 UWG, Anhang Nr. 23b).
- `[HUMAN INPUT]`: Existiert ein echter Kunde mit schriftlicher Freigabe? Dann Block wieder aktivieren.

### T02 Unbelegte Werbeaussagen (P1)
Fundstellen in `index.html`, `<meta>`-Tags und Open-Graph-Tags:
- „50+ Restaurant-Websites"
- „10+ Jahre Erfahrung" und „über 10 Jahre Erfahrung in der Geschäftsentwicklung"
- „70 % der Restaurantbesucher nutzen digitale Plattformen"
- „50 % haben bereits online einen Tisch reserviert"
- „In 7 Tagen live" / „Go-Live in 7 Tagen" (meta, Hero, Leistungen)
- Aktion: Jede Aussage entfernen oder durch belegbare Formulierung ersetzen, z. B. „Viele Gäste suchen Restaurants online".
- `[HUMAN INPUT]`: Quelle je Zahl nennen (Studie mit Datum und Link). Mit Quelle: Fußnote ergänzen. Ohne Quelle: entfernen. „50+" nur behalten, wenn belegbar (Anzahl realer Projekte).

### T03 „Rechtssichere Einbindung" (P1)
- Datei: `index.html`, Leistungskarte „Online-Bestellung + Checkout".
- Aktion: „Rechtssichere Einbindung" ersetzen durch „Einbindung nach Ihren Vorgaben".
- Zusatz unter der Karte (klein): „Die rechtliche Ausgestaltung (Preisangaben, Allergene, Verbraucherrechte) liegt beim Betreiber."

---

## P2 – Wichtig

### T04 Impressum korrigieren (P2)
Datei: `impressum.html`
1. „Angaben gemäß § 5 TMG" → „Angaben gemäß § 5 DDG".
2. „Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV" → „… nach § 18 Abs. 2 MStV".
3. Block „Umsatzsteuer … wird nachgereicht" ersetzen durch: „Kleinunternehmer gemäß § 19 UStG. Es wird keine Umsatzsteuer ausgewiesen."
   - `[HUMAN INPUT]`: Falls eine USt-IdNr. vorliegt, stattdessen diese angeben.
4. Block „Streitschlichtung": Link zur EU-OS-Plattform **entfernen** (Plattform eingestellt). Satz „Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen." behalten.
5. Rest unverändert (Name, Anschrift, E-Mail, Telefon).

### T05 Externe Ressourcen lokal hosten (P2)
- Suche in allen HTML/CSS: `fonts.googleapis.com`, `fonts.gstatic.com`, `cdn.jsdelivr.net`, `cdnjs`, `unpkg`, weitere externe Hosts.
- Aktion:
  - Google Fonts als `.woff2` lokal ablegen (`/assets/fonts/`), per `@font-face` einbinden, nur genutzte Schnitte, `font-display: swap`.
  - Bootstrap (CSS/JS) lokal ablegen (`/assets/vendor/`), Links anpassen.
  - Alle externen `<link>`/`<script>`-Verweise entfernen.
- Ergebnis prüfen: `grep -rEi "googleapis|gstatic|jsdelivr|cdnjs|unpkg" .` darf nichts mehr finden (Ausnahme: nichts).
- Danach Cookie-Banner (T06) und Datenschutz (T07) anpassen.

### T06 Cookie-Banner und TDDDG (P2)
- Prüfen, ob irgendein Analytics-/Tracking-Skript existiert (`gtag`, `analytics`, `matomo`, `plausible`, `fbq`, `hotjar`).
- Fall A: **kein Tracking vorhanden** → Kategorien „Google Fonts" und „Analytische Cookies" aus Banner und Einstellungs-Dialog entfernen. Nur technisch notwendige Speicherung bleibt. Banner auf Hinweis reduzieren oder ganz entfernen, wenn nichts Einwilligungspflichtiges übrig ist.
- Fall B: **Tracking vorhanden** → `[HUMAN INPUT]` (Tool, Zweck). Skript erst nach Einwilligung laden. Buttons „Alle akzeptieren" und „Nur erforderliche" gleich prominent, keine vorangekreuzten Kategorien.
- In jedem Fall: Footer-Link „Cookie-Einstellungen" auf allen Seiten, der den Dialog wieder öffnet (Widerruf jederzeit möglich).

### T07 Datenschutzerklärung überarbeiten (P2)
Datei: `datenschutz.html` – Stand-Datum auf aktuellen Monat setzen.
1. **Hosting (Abschnitt 4):** Tatsächlichen Anbieter prüfen (Deploy-Config). Aktuell steht dort GitHub Pages, geplant/vorhanden ist Cloudflare Pages (`/cdn-cgi/` im Quelltext). Den real genutzten Anbieter beschreiben, bei Cloudflare: Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107, USA; Auftragsverarbeitung, Drittlandtransfer auf Basis EU-US Data Privacy Framework bzw. Standardvertragsklauseln. `[HUMAN INPUT]`: Welcher Anbieter ist produktiv? (Cloudflare E-Mail-Verschleierung ebenfalls nennen.)
2. **Logfiles (3.1):** Rechtsgrundlage „Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an Betrieb und Sicherheit)" ergänzen; Speicherdauer nennen; Satz „Ein Rückschluss auf Ihre Person ist mir nicht möglich" **streichen** (IP-Adresse ist personenbezogen).
3. **Kontaktformular (3.2):** Konkrete Speicherdauer („bis zum Abschluss der Anfrage, danach Löschung innerhalb von [6] Monaten, sofern keine gesetzliche Aufbewahrungspflicht entgegensteht"). Satz zur „Einwilligung zur Speicherung widerrufen" bereinigen (Rechtsgrundlage ist lit. b/f). `[HUMAN INPUT]`: Wie wird das Formular verarbeitet (eigener Server, Formspree, Mail-Dienst …)? Dienst als Empfänger nennen.
4. **Neue Abschnitte:**
   - Kontakt per E-Mail und Telefon (Art. 6 Abs. 1 lit. b/f).
   - Kontakt per WhatsApp (Link `wa.me`): Anbieter Meta/WhatsApp Ireland Limited, Hinweis, dass der Kontakt erst bei Klick entsteht.
   - Cookies/TDDDG § 25: Ergebnis aus T06 beschreiben.
5. **Abschnitt 5 (Bootstrap/Google Fonts):** nach T05 ersetzen durch „Schriftarten und Skripte werden lokal von diesem Server ausgeliefert. Es werden keine Daten an Dritte übertragen."
6. **Rechte (Abschnitt 6):** Widerrufsrecht (Art. 7 Abs. 3) ergänzen; Aufsichtsbehörde konkret nennen: Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg.
7. `[HUMAN INPUT]`: Falls weitere Dienste (Karten, Videos, Social-Media-Einbettungen) auf Demo-/Hauptseiten genutzt werden, melden, nicht ergänzen.

### T08 Kontaktformular-Checkbox und Hinweise (P2)
- Datei: `index.html`, Abschnitt Kontakt.
- Checkbox-Text ändern: „Ich habe die Datenschutzerklärung zur Kenntnis genommen." (keine „Zustimmung", keine Einwilligungsformel).
- Unter dem Absende-Button: „Es gelten meine AGB." mit Link auf `agb.html`.

### T09 AGB-Seite einbinden (P2)
- Neue Datei `agb.html` im Layout von `impressum.html`; Text liefert Robin als `agb_text.md`. `[HUMAN INPUT]`: Datei bereitstellen. Ohne sie die Seite mit Platzhalter anlegen und im Report melden.
- Footer-Rubrik „Rechtliches": „Impressum | Datenschutz | AGB" auf **allen** Seiten (inkl. Demos).
- Link in Sitemap/robots prüfen (AGB indexierbar, Impressum/Datenschutz wie bisher).

### T10 Demo-Seiten kennzeichnen (P2)
- Dateien: `demo-fine-dining.html`, `demo-italiano.html`, `demo-imbiss.html`, `demo-cafe.html`, `demo-bar.html`, `demo-hana.html`.
- Aktion:
  - Sichtbares Banner oben: „Demo – fiktive Inhalte, kein reales Restaurant."
  - Footer mit Links Impressum/Datenschutz.
  - `<meta name="robots" content="noindex, follow">`.
  - Prüfen: Keine realen Adressen, Telefonnummern, Marken oder Personen. Gefundenes melden, nicht selbst ersetzen.
  - Externe Ressourcen: wie T05.

---

## P3 – Sauber machen

### T11 Connectify-Kennzeichnung (P3)
- Datei: `index.html`, Karte „Social Media Management".
- Aktion: Hinweistext „Leistung wird von Connectify Marketing erbracht." mit Link auf deren Impressum.
- `[HUMAN INPUT]`: Wer ist Vertragspartner des Kunden (Lenson oder Connectify)? AGB § 12 geht von Connectify aus.

### T12 Bild- und Schriftlizenzen prüfen (P3)
- Alle Dateien in `/assets/images/` und `/assets/fonts/` auflisten.
- Bericht als Tabelle in `legal_report.md`: Datei · vermutete Quelle · Lizenz bekannt (ja/nein).
- Nichts löschen. `[HUMAN INPUT]`: Lizenznachweise je Bild.

### T13 Footer und Kleinkram (P3)
- Tote Links `#` im Footer („Webdesign", „WordPress", „SEO", „Support") entfernen oder auf `#leistungen` verlinken.
- „Anrufen" mit `tel:+4917662145153` verlinken.
- Tippfehler „Mit für die Gastronomie entwickelt" korrigieren („Mit Leidenschaft für die Gastronomie entwickelt").

---

## Nicht für den Agenten (nur Robin)

- **AV-Vertrag (Art. 28 DSGVO)** als Muster für Kunden (Reservierung, Bestellsystem, Wartung) mit Anwalt erstellen.
- **Anwaltliche Prüfung** der AGB und Datenschutzerklärung.
- **BFSG:** Kleinstunternehmen sind bei Dienstleistungen ausgenommen. Bei Kunden-Shops mit Bestellsystem im Einzelfall prüfen.
- **Berufshaftpflicht** abschließen oder prüfen.
- **Kleinunternehmerstatus** (§ 19 UStG) laufend im Blick behalten (Umsatzgrenzen).

## Abschlusskontrolle

```
grep -rEi "googleapis|gstatic|jsdelivr|cdnjs|unpkg" .
grep -rEi "§ ?5 TMG|§ ?55|RStV|ec.europa.eu/consumers/odr" .
grep -rEi "rechtssicher|Goldenen Stern|50\+|10\+ Jahre|70 ?%|50 ?%" .
```
Alle drei Suchen müssen leer sein oder nur dokumentierte Ausnahmen liefern.
