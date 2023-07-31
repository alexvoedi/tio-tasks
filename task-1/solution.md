# Lösung

Ich kodiere die Zugehörigkeit der Münzen zum entsprechenden Automaten durch ihre Anzahl. Also:

- Automat 1: 1 Münze
- Automat 2: 2 Münzen
- Automat 3: 3 Münzen
- ...#
- Automat 10: 10 Münzen

Dann habe ich 55 Münzen von 10 Automaten, die zusammen eigentlich 5500 Gramm wiegen müssten.

Um herauszufinden, welcher Automat defekt ist, subtrahiere ich die Fehlende Masse von der erwarteten Gesamtmasse:

- Ist Automat 1 defekt: 5500 - 90 = 5410 Gramm
- Ist Automat 2 defekt: 5500 - 180 = 5320 Gramm
- Ist Automat 3 defekt: 5500 - 270 = 5230 Gramm
- ...
- Ist Automat 10 defekt: 5500 - 900 = 4600 Gramm
