---
name: Reservation forecaster
status: Piloting
champion: Jane Smith
venue: Mott 32 Singapore
problem: Managers spend ~6 hours/week forecasting covers by hand in Excel.
impact: Saves ~6 hours/week; forecast accuracy from ±25% to ±10%.
demo_url: https://example.com
last_updated: 2026-04-20
---

## How it works

Reads historical reservation data from Tripleseat, combines with public holiday and weather signals, returns a daily cover estimate with a confidence range. Managers review and adjust; the system learns from those adjustments.

## Who it's for

GMs and venue managers who forecast covers manually every Monday.

## What's next

- Expand beyond Mott 32 to two more venues in Q3
- Add walk-in estimation (currently only counts reservations)
- Scale out of the sandbox if adoption stays above 80% for two consecutive months
