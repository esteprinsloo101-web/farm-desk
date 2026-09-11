# Farm Desk

**Farm Desk** is a polished, mobile-first static web demo of a South African **farm operations desk** for a sample Free State / Highveld plaas — **Plaas Sonder Naam**.

Demo / sample data only. **NOT** veterinary advice. **NOT** legal, tax or financial advice. **NOT** an agronomist prescription. Schedules and checklists are educational ops aids — confirm with a qualified vet, agronomist or lawyer.

Shared DNA with [Life Desk](https://esteprinsloo101-web.github.io/life-desk/), [Trade Desk](https://esteprinsloo101-web.github.io/trade-desk/), and [Rental Desk](https://esteprinsloo101-web.github.io/rental-desk/): the app **reminds, prepares, logs**; human **Approves** money / animal health / legal. Installable as a **PWA** (Add to Home Screen) with an offline-ish shell cache.

## Guided processes (not checklists)

Home queue items are **actionable processes** (fertilise, inject reminder log, soil check, stock take, repair close, graze move). Tap → **ProcessRunner** wizard → Done → set next due. Completing a stage **ensures the next ProcessRunner** in the crops / livestock / admin loops. Account links (vet WhatsApp, supplier) open from the wizard. Add/edit in **Settings**.

## Live URL

**https://esteprinsloo101-web.github.io/farm-desk/**

(GitHub Pages from `main`; allow a minute after push for deploy.)

## Modules

| Module | Role |
|--------|------|
| **Home** | Due processes · ops loops · reminders · weather snap · alerts · history |
| **Crops** | Kampe/fields, what-where-when planner, fertiliser **reminders**, user soil/moisture logs |
| **Animals** | Cattle, sheep, pigs, chickens, wildlife; carrying capacity (ha × rate); grazing; feed; **injection reminders + treatment log (no dosages)** |
| **Money** | Income / expense / cash overview (ZAR) |
| **Weather** | Highveld seasonal calendar, frost / rainfall notes (static sample; API placeholder) |
| **Stock** | Inventory, reorder points, purchase log |
| **Monitoring** | Crop/livestock notes + photo stubs, tasks due |
| **Infra** | Fences, pumps, vehicles, sheds; repair tickets |
| **Admin** | Budget sketch, farm KPIs |
| **Contacts** | Vets, suppliers, labour brokers, buyers |
| **Legal** | Licence renewal reminders, POPIA note, compliance checklist (**not legal advice**) |
| **HR** | Roster, skof clock, leave, payroll **Approve** stub |
| **To-do** | Farm-wide auto + manual tasks |
| **Science Desk** | Weekly improve tips (methods + limits) — screening only, **not vet** |
| **Settings** | Processes · quiet hours · notifications · export/import |

Bottom nav: **Home | Crops | Animals | Money | More**

Currency: **ZAR**. Light EN with Afrikaans farm terms where natural (**kamp**, **skof**, **vee**).

## Process loops (ProcessRunner)

- **Crops** — plant/scout → fertilise → soil check
- **Livestock** — graze move → inject reminder log (**no dosages**; user enters product after vet advice)
- **Admin** — stock take → repair close (when an open ticket exists)

## PWA (install + offline shell)

1. Open the live URL or local server in Chrome / Edge / Safari.
2. Use **Install** / **Add to Home Screen** when the banner appears (or browser menu).
3. On iOS Safari: Share → **Add to Home Screen**.
4. The service worker caches the shell: `index.html`, `app.js`, `styles.css`, `manifest.webmanifest` (+ icons). Cache name: **`farm-desk-shell-v1`**. Offline use is **shell-only** — open the app once online first.

## Reminders v1

- **Home → Next reminders** shows the in-app queue for due / lead-window processes (tap to run the wizard).
- **Enable notifications** (or Settings → Request permission). If denied, the UI stays graceful — in-app queue still works.
- **Quiet hours** (default 21:00–07:00) are stored in `localStorage` with app state; alerts are skipped during quiet hours and fire times shift outside them.
- After you finish a process (**Done**), the next reminder is scheduled from the new **next due** (when permission is granted and the tab can run timers).

## Backup (export / import)

In **Settings → Backup**:

1. **Export JSON** — downloads app state (`farm-desk-v4` payload: farm, crops, animals, processes, history, modules, prefs).
2. **Import JSON** — pick a previous export to restore (round-trip). Invalid files toast an error and leave current data alone.

## Hard product rules

- Injection / vaccination module = **due-date reminders** + log that a dose was given (**user enters product name**). No invented drug dosages or medical protocols.
- Soil / crop / animal logs persist in `localStorage`.
- **Reset demo** from header ↺ or Settings.
- COI-safe: no mining / chemicals / industrial environmental advisory content.
- Science Desk tips stay **screening / methods + limits** — not veterinary advice.

## Open locally

Plain static files. No build step. **Serve over http(s)** so the service worker and notifications can register.

```bash
# from this folder
python3 -m http.server 8766
# then open http://127.0.0.1:8766/
```

Files: `index.html` · `styles.css` · `app.js` · `manifest.webmanifest` · `service-worker.js` · `icons/` · `README.md`

Storage key: `farm-desk-v4`

## Verify (local)

1. `python3 -m http.server 8766` then open http://127.0.0.1:8766/
2. **Home** — confirm ops loops (crops · livestock · admin), due processes, reminders, weather snap.
3. Run **Plant/scout** → finish → fertilise follow-on appears; run **Fertilise** → soil unlocks; run **Graze** → inject log unlocks; run **Stock take** → repair close when ticket open.
4. **Animals → Inject** — open a reminder, enter **your** product name, Mark given (no dosage fields).
5. **Settings** — quiet hours; request notifications; **Export JSON** then **Import JSON**.
6. DevTools → Application → Manifest + Service Worker (`farm-desk-shell-v1`); optional: go offline and confirm shell still loads.
7. Keep **Science Desk** screening disclaimers (not vet) + elderly UI (large type / 48px taps) from platform bar.
8. `curl -I https://esteprinsloo101-web.github.io/farm-desk/` after Pages deploy from `main`.

## Related

| App | Live |
|-----|------|
| Life Desk | https://esteprinsloo101-web.github.io/life-desk/ |
| Trade Desk | https://esteprinsloo101-web.github.io/trade-desk/ |
| Rental Desk | https://esteprinsloo101-web.github.io/rental-desk/ |

## Disclaimer

Demo / sample data only. Not veterinary, legal, tax, financial or agronomist advice. Farm Desk does not prescribe medicines, fertiliser rates, or file compliance for you. Confirm real-world decisions with qualified professionals and official channels.

## Update 2026-09-11

Platform bar: Science Desk (not vet), elderly UI, location+purpose onboarding.

**feat/pwa-reminders-export:** PWA manifest + service worker shell cache (`farm-desk-shell-v1`), install affordance, reminders v1 (notifications + quiet hours + post-Done schedule), JSON export/import backup, stronger crops / livestock / admin ProcessRunner loops, Science Desk screening disclaimers kept.
