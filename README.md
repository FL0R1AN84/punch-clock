# Punch Clock

A Raycast extension to track your working hours on macOS.

## How it works

1. Run **Start Work Timer** and enter:
   - Your total working time for the day (hours + minutes), e.g. `8h 0m`.
   - Your break length, e.g. `30` minutes.

   <img src="assets/screenshots/start-timer-form.png" alt="Start Work Timer form" width="500" />

2. The countdown (working time + break) starts immediately and shows live in the
   macOS menu bar via the **Work Timer** menu-bar command.
3. Click the menu bar item to see:
   - The time the timer was **started**.
   - The time it is expected to **expire**.
   - The time it was **stopped**, if you paused it.

   <img src="assets/screenshots/menu-bar-running.png" alt="Menu bar dropdown while running" width="260" />

4. Use the dropdown to **Stop**, **Resume**, **Start New Timer**, or **Reset**. Once
   stopped, the menu bar shows a paused icon with the remaining time, and the
   dropdown adds the **Stopped** time and a **Resume Timer** action.

   <img src="assets/screenshots/menu-bar-paused-icon.png" alt="Menu bar paused icon" width="180" />
   <img src="assets/screenshots/menu-bar-paused-dropdown.png" alt="Menu bar dropdown while paused" width="260" />

## Development

```bash
npm install
npm run dev
```

This opens Raycast in development mode and enables both commands:

- `Start Work Timer` (`src/start-timer.tsx`) — a form to configure and start the timer.
- `Work Timer` (`src/menu-bar.tsx`) — the live menu bar countdown.

Timer state is persisted with Raycast's `LocalStorage` so it survives Raycast restarts.

