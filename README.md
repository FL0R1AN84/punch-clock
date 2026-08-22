# Punch Clock

**Punch Clock** helps you track your working hours for the day directly from the
macOS menu bar.

## How it works

1. Run **Start Work Timer** and enter your total working time (hours + minutes)
   and your break length.

   <img src="assets/screenshots/start-timer-form.png" alt="Start Work Timer form" width="500" />

2. A countdown (working time + break) starts immediately and is shown live in
   the menu bar via the **Work Timer** menu-bar command.
3. Click the menu bar item to see the **Started** time and the expected
   **Expires** time.

   <img src="assets/screenshots/menu-bar-running.png" alt="Menu bar dropdown while running" width="260" />

4. **Stop**/**Resume** the timer at any time — the dropdown then also shows the
   **Stopped** time, and the menu bar icon switches to a paused state.

   <img src="assets/screenshots/menu-bar-paused-icon.png" alt="Menu bar paused icon" width="180" />
   <img src="assets/screenshots/menu-bar-paused-dropdown.png" alt="Menu bar dropdown while paused" width="260" />

5. **Start New Timer** or **Reset** to begin again.

Timer state is persisted with Raycast's `LocalStorage`, so it survives Raycast
restarts.

## Development

```bash
npm install
npm run dev
```

This opens Raycast in development mode and enables both commands:

- `Start Work Timer` (`src/start-timer.tsx`) — a form to configure and start the timer.
- `Work Timer` (`src/menu-bar.tsx`) — the live menu bar countdown.

