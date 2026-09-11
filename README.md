# Farm Desk

**Farm Desk** is a polished, mobile-first static web demo of a South African **farm operations desk** for a sample Free State / Highveld plaas — **Plaas Sonder Naam**.

Demo / sample data only. **NOT** veterinary advice. **NOT** legal, tax or financial advice. **NOT** an agronomist prescription. Schedules and checklists are educational ops aids — confirm with a qualified vet, agronomist or lawyer.

Shared DNA with [Life Desk](https://esteprinsloo101-web.github.io/life-desk/) and [Garage Desk](https://esteprinsloo101-web.github.io/garage-desk/): the app **reminds, prepares, logs**; human **Approves** money / animal health / legal.

## Guided processes (not checklists)

Home queue items are **actionable processes** (fertilise, inject reminder log, soil check, stock take, repair close, graze move). Tap → **ProcessRunner** wizard → Done → set next due. Account links (vet WhatsApp, supplier) open from the wizard. Add/edit in **Settings**.

## Live URL

**https://esteprinsloo101-web.github.io/farm-desk/**

(GitHub Pages from `main`; allow a minute after push for first deploy.)

## Modules

| Module | Role |
|--------|------|
| **Home** | Weather pattern cards, Today queue (plant / fertilise / graze / inject / repair / HR), alerts |
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

Bottom nav: **Home | Crops | Animals | Money | More**

Currency: **ZAR**. Light EN with Afrikaans farm terms where natural (**kamp**, **skof**, **vee**).

## Hard product rules

- Injection / vaccination module = **due-date reminders** + log that a dose was given (**user enters product name**). No invented drug dosages or medical protocols.
- Soil / crop / animal logs persist in `localStorage`.
- **Reset demo** from header ↺ or Settings.
- COI-safe: no mining / chemicals / industrial environmental advisory content.

## Open locally

Plain static files. No build step.

```bash
# from this folder
python3 -m http.server 8766
# then open http://127.0.0.1:8766/
```

Or open `index.html` directly in a browser.

Files: `index.html` · `styles.css` · `app.js` · `README.md`

## How to try

1. **Home** — Today queue and weather snapshot cards.
2. **Crops → Soil logs** — add a moisture/quality note (persists).
3. **Animals → Capacity** — adjust ha × stocking rate; save rate.
4. **Animals → Inject** — open a reminder, enter **your** product name, Mark given (no dosage fields).
5. **More → HR** — Approve payroll; clock in/out skof.
6. **↺** — reset demo anytime.

## Related

| App | Live |
|-----|------|
| Life Desk | https://esteprinsloo101-web.github.io/life-desk/ |
| Garage Desk | https://esteprinsloo101-web.github.io/garage-desk/ |

## Disclaimer

Demo / sample data only. Not veterinary, legal, tax, financial or agronomist advice. Farm Desk does not prescribe medicines, fertiliser rates, or file compliance for you. Confirm real-world decisions with qualified professionals and official channels.

## Update 2026-09-11
Platform bar 2026-09-11: Science Desk (not vet), elderly UI, location+purpose onboarding. Coming: coach experiments.
