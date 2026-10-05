# CombiQuest

A gamified web app for **Discrete Mathematics (7MA206) · ISE-2 · Track A**, covering **Unit IV: Combinatorics & Recurrence**.
Fight monsters across 9 stages. Every correct answer needs real maths, and every mistake shows the working.

## Features
- **Play:** quest map, 9 stages in 3 realms (Counting, Pigeonhole, Recurrence), 5 hearts, boss timers, power-ups, XP, ranks, daily streak.
- **Workshop:** solvers that accept any input and show every step, with one-tap edge cases and validation messages.
- **Theory:** definitions, formulas, numbered algorithms and the architecture diagram.
- **Tests:** 19 test cases (including edge cases and invalid input) running live against the maths engine.

## Run it
No installation needed.
1. Download or clone this repository.
2. Open `index.html` in any modern browser (Chrome, Edge, Firefox, Safari, or a phone browser).

Optional local server: `python -m http.server 8000`, then open http://localhost:8000.

## Run the tests
```
node tests/run-tests.js
```
Expected: `19 / 19 tests passed`. The same cases appear in the app under the **Tests** tab.

## Project structure
```
index.html            page structure
css/style.css         styles (dark blue glass theme)
js/math-engine.js     maths: counting, pigeonhole, recurrence, question generators (no DOM)
js/storage.js         saved progress, XP, ranks, sound
js/game.js            stages, quest map, battle logic, power-ups
js/workshop.js        custom-input solvers
js/docs-ui.js         Theory page, architecture diagram, Tests page
js/app.js             navigation and start-up
tests/test-cases.js   test data
tests/test-runner.js  test runner (browser and Node)
tests/run-tests.js    Node entry point
docs/screenshots/     UI screenshots (add before submission)
```

## Mathematics
- **Counting:** P(n,r) = n!/(n−r)!, C(n,r) = n!/(r!(n−r)!), nʳ, and C(n+r−1, r). Exact with BigInt.
- **Pigeonhole:** some box holds at least ⌈N/k⌉. To force m items in one box, N ≥ k(m−1)+1.
- **Recurrence:** aₙ = c₁aₙ₋₁ + c₂aₙ₋₂. The characteristic equation r² − c₁r − c₂ = 0 and its discriminant D give real, repeated or complex roots. The closed form is checked against the recurrence at n = 5.

## Team: 500 : Internal Chaos
| PRN | Name | Role | Contribution |
|---|---|---|---|
| 256109069 | Akshata Chavan | Game design, quest map and battle system | 25% |
| 256109018 | Isha Dodake | Counting and pigeonhole maths, test cases | 25% |
| 256109008 | Gauri Yelmewad | Recurrence solver, question generators, test runner | 25% |
| 266109205 | Katampalle Sharavani | Workshop, Theory and Tests views, storage, README | 25% |

Class: SY IT B · Walchand College of Engineering, Sangli

## Limitations and future work
Only second-order linear homogeneous recurrences are solved. Non-homogeneous ones (for example Tower of Hanoi) are a planned addition.

## References
Rosen, K. H., *Discrete Mathematics and Its Applications*; course notes for 7MA206.
