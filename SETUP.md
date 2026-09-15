# Farm Desk — setup

## 1) Open the app (required for PWA)
```bash
cd app
python3 -m http.server 8765
```
Open http://localhost:8765 (http/https required for service worker).

## 2) Install
Add to Home Screen / Install when the browser offers it.

## 3) Clear sample / import your plaas
Demo Plaas Sonder Naam ships as sample. Settings → Export / Import JSON (confirm replace). Practice with `sample/sample-import.json` then replace with your own Export.

## 4) Crops / livestock / admin loops
- Home shows due ProcessRunner items (fert, graze, inject reminder, repair, etc.)
- Completing a stage sets next due — no spreadsheet rebuild
- Store vet WhatsApp / supplier links you already use
- Inject reminders are schedules only — **no dosages**; confirm with your vet

## 5) Notifications & backup
Settings → notifications + quiet hours (alerts only while app is open).  
Settings → Export / Import JSON with confirm replace.

## 6) Weather
Static Highveld seasonal notes in v1 — live weather API is a later add-on, not claimed here.
