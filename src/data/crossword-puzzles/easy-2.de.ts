import type { CrosswordPuzzleData } from './types'

export const easyPuzzles2: CrosswordPuzzleData[] = [
  // ────────────────────────────────────────────
  // Puzzle 31 — 7x7
  // KALT across (0,0), KOPF down (0,0), TIER across (2,2), TANZ down (2,2)
  // Crossings: K at (0,0), T at (2,2)
  // ────────────────────────────────────────────
  {
    id: 'cw-easy-031',
    difficulty: 'easy',
    width: 7,
    height: 7,
    grid: [
      ['K', 'A', 'L', 'T', '#', '#', '#'],
      ['O', '#', '#', '#', '#', '#', '#'],
      ['P', '#', 'T', 'I', 'E', 'R', '#'],
      ['F', '#', 'A', '#', '#', '#', '#'],
      ['#', '#', 'N', '#', '#', '#', '#'],
      ['#', '#', 'Z', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Gegenteil von warm', answer: 'KALT', row: 0, col: 0 },
      { number: 1, direction: 'down', clue: 'Oben auf dem Körper', answer: 'KOPF', row: 0, col: 0 },
      { number: 2, direction: 'across', clue: 'Lebewesen in der Natur', answer: 'TIER', row: 2, col: 2 },
      { number: 2, direction: 'down', clue: 'Bewegung zur Musik', answer: 'TANZ', row: 2, col: 2 },
    ],
  },

  // ────────────────────────────────────────────
  // Puzzle 32 — 7x7
  // GELD across (0,0), GRAS down (0,0), NASE across (2,1), NETZ down (2,1)
  // Crossings: G at (0,0), N at (2,1)
  // ────────────────────────────────────────────
  {
    id: 'cw-easy-032',
    difficulty: 'easy',
    width: 7,
    height: 7,
    grid: [
      ['G', 'E', 'L', 'D', '#', '#', '#'],
      ['R', '#', '#', '#', '#', '#', '#'],
      ['A', 'N', 'A', 'S', 'E', '#', '#'],
      ['S', 'E', '#', '#', '#', '#', '#'],
      ['#', 'T', '#', '#', '#', '#', '#'],
      ['#', 'Z', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Münzen und Scheine', answer: 'GELD', row: 0, col: 0 },
      { number: 1, direction: 'down', clue: 'Grüner Boden auf der Wiese', answer: 'GRAS', row: 0, col: 0 },
      { number: 2, direction: 'across', clue: 'Riechorgan im Gesicht', answer: 'NASE', row: 2, col: 1 },
      { number: 2, direction: 'down', clue: 'Geflecht zum Fangen', answer: 'NETZ', row: 2, col: 1 },
    ],
  },

  // ────────────────────────────────────────────
  // Puzzle 33 — 8x8
  // MILCH across (0,0), MALER down (0,0), STERN across (2,2), SOFA down (2,5)
  // Crossings: M at (0,0), S at (2,5) — wait, STERN is at row 2 col 2, S-T-E-R-N => (2,2)S (2,3)T (2,4)E (2,5)R (2,6)N
  // SOFA down from (2,5): (2,5)S — but that's R from STERN. Let me fix.
  // Let me use: STERN across (2,1), SAND down (2,1)
  // STERN: (2,1)S (2,2)T (2,3)E (2,4)R (2,5)N
  // SAND down from (2,1): (2,1)S (3,1)A (4,1)N (5,1)D
  // Crossings: M at (0,0), S at (2,1)
  // ────────────────────────────────────────────
  {
    id: 'cw-easy-033',
    difficulty: 'easy',
    width: 8,
    height: 8,
    grid: [
      ['M', 'I', 'L', 'C', 'H', '#', '#', '#'],
      ['A', '#', '#', '#', '#', '#', '#', '#'],
      ['L', 'S', 'T', 'E', 'R', 'N', '#', '#'],
      ['E', 'A', '#', '#', '#', '#', '#', '#'],
      ['R', 'N', '#', '#', '#', '#', '#', '#'],
      ['#', 'D', '#', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Weißes Getränk von der Kuh', answer: 'MILCH', row: 0, col: 0 },
      { number: 1, direction: 'down', clue: 'Künstler mit Pinsel und Farbe', answer: 'MALER', row: 0, col: 0 },
      { number: 2, direction: 'across', clue: 'Leuchtet am Nachthimmel', answer: 'STERN', row: 2, col: 1 },
      { number: 2, direction: 'down', clue: 'Feine Körner am Strand', answer: 'SAND', row: 2, col: 1 },
    ],
  },

  // ────────────────────────────────────────────
  // Puzzle 34 — 7x7
  // OBST across (0,0), OFEN down (0,0), ENTE across (3,1), ESEL down (3,3)
  // OBST: (0,0)O (0,1)B (0,2)S (0,3)T
  // OFEN: (0,0)O (1,0)F (2,0)E (3,0)N
  // ENTE: (3,1)E (3,2)N (3,3)T (3,4)E
  // ESEL: (3,3)E — but ENTE has T at (3,3). Fix: ESEL down from (3,4)
  // ESEL: (3,4)E (4,4)S (5,4)E (6,4)L — ENTE (3,4)E matches E. Good.
  // ────────────────────────────────────────────
  {
    id: 'cw-easy-034',
    difficulty: 'easy',
    width: 7,
    height: 7,
    grid: [
      ['O', 'B', 'S', 'T', '#', '#', '#'],
      ['F', '#', '#', '#', '#', '#', '#'],
      ['E', '#', '#', '#', '#', '#', '#'],
      ['N', 'E', 'N', 'T', 'E', '#', '#'],
      ['#', '#', '#', '#', 'S', '#', '#'],
      ['#', '#', '#', '#', 'E', '#', '#'],
      ['#', '#', '#', '#', 'L', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Äpfel, Birnen und Bananen', answer: 'OBST', row: 0, col: 0 },
      { number: 1, direction: 'down', clue: 'Gerät zum Heizen', answer: 'OFEN', row: 0, col: 0 },
      { number: 2, direction: 'across', clue: 'Vogel, der auf dem Wasser schwimmt', answer: 'ENTE', row: 3, col: 1 },
      { number: 2, direction: 'down', clue: 'Graues Lasttier mit langen Ohren', answer: 'ESEL', row: 3, col: 4 },
    ],
  },

  // ────────────────────────────────────────────
  // Puzzle 35 — 7x7
  // WARM across (0,0), WAND down (0,0), HUND across (2,2), HELD down (2,2)
  // WARM: (0,0)W (0,1)A (0,2)R (0,3)M
  // WAND: (0,0)W (1,0)A (2,0)N (3,0)D
  // HUND: (2,2)H (2,3)U (2,4)N (2,5)D
  // HELD: (2,2)H (3,2)E (4,2)L (5,2)D
  // Crossings: W at (0,0), H at (2,2)
  // ────────────────────────────────────────────
  {
    id: 'cw-easy-035',
    difficulty: 'easy',
    width: 7,
    height: 7,
    grid: [
      ['W', 'A', 'R', 'M', '#', '#', '#'],
      ['A', '#', '#', '#', '#', '#', '#'],
      ['N', '#', 'H', 'U', 'N', 'D', '#'],
      ['D', '#', 'E', '#', '#', '#', '#'],
      ['#', '#', 'L', '#', '#', '#', '#'],
      ['#', '#', 'D', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Angenehme Temperatur', answer: 'WARM', row: 0, col: 0 },
      { number: 1, direction: 'down', clue: 'Senkrechte Fläche im Zimmer', answer: 'WAND', row: 0, col: 0 },
      { number: 2, direction: 'across', clue: 'Bellender Vierbeiner', answer: 'HUND', row: 2, col: 2 },
      { number: 2, direction: 'down', clue: 'Mutiger Retter', answer: 'HELD', row: 2, col: 2 },
    ],
  },

  // ────────────────────────────────────────────
  // Puzzle 36 — 8x8
  // BLUME across (0,0), BIRNE down (0,0), PARK across (3,2), POST down (3,2)
  // BLUME: (0,0)B (0,1)L (0,2)U (0,3)M (0,4)E
  // BIRNE: (0,0)B (1,0)I (2,0)R (3,0)N (4,0)E
  // PARK: (3,2)P (3,3)A (3,4)R (3,5)K
  // POST: (3,2)P (4,2)O (5,2)S (6,2)T
  // Crossings: B at (0,0), P at (3,2)
  // ────────────────────────────────────────────
  {
    id: 'cw-easy-036',
    difficulty: 'easy',
    width: 8,
    height: 8,
    grid: [
      ['B', 'L', 'U', 'M', 'E', '#', '#', '#'],
      ['I', '#', '#', '#', '#', '#', '#', '#'],
      ['R', '#', '#', '#', '#', '#', '#', '#'],
      ['N', '#', 'P', 'A', 'R', 'K', '#', '#'],
      ['E', '#', 'O', '#', '#', '#', '#', '#'],
      ['#', '#', 'S', '#', '#', '#', '#', '#'],
      ['#', '#', 'T', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Bunte Pflanze im Garten', answer: 'BLUME', row: 0, col: 0 },
      { number: 1, direction: 'down', clue: 'Gelbe Frucht in Flaschenform', answer: 'BIRNE', row: 0, col: 0 },
      { number: 2, direction: 'across', clue: 'Grüne Anlage in der Stadt', answer: 'PARK', row: 3, col: 2 },
      { number: 2, direction: 'down', clue: 'Briefe und Pakete verschicken', answer: 'POST', row: 3, col: 2 },
    ],
  },

  // ────────────────────────────────────────────
  // Puzzle 37 — 7x7
  // BUCH across (0,0), BOOT down (0,0), REIS across (2,2), RABE down (2,2)
  // BUCH: (0,0)B (0,1)U (0,2)C (0,3)H
  // BOOT: (0,0)B (1,0)O (2,0)O (3,0)T
  // REIS: (2,2)R (2,3)E (2,4)I (2,5)S
  // RABE: (2,2)R (3,2)A (4,2)B (5,2)E
  // Crossings: B at (0,0), R at (2,2)
  // ────────────────────────────────────────────
  {
    id: 'cw-easy-037',
    difficulty: 'easy',
    width: 7,
    height: 7,
    grid: [
      ['B', 'U', 'C', 'H', '#', '#', '#'],
      ['O', '#', '#', '#', '#', '#', '#'],
      ['O', '#', 'R', 'E', 'I', 'S', '#'],
      ['T', '#', 'A', '#', '#', '#', '#'],
      ['#', '#', 'B', '#', '#', '#', '#'],
      ['#', '#', 'E', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Zum Lesen mit Seiten', answer: 'BUCH', row: 0, col: 0 },
      { number: 1, direction: 'down', clue: 'Fahrzeug auf dem Wasser', answer: 'BOOT', row: 0, col: 0 },
      { number: 2, direction: 'across', clue: 'Weißes Korn aus Asien', answer: 'REIS', row: 2, col: 2 },
      { number: 2, direction: 'down', clue: 'Schwarzer Vogel', answer: 'RABE', row: 2, col: 2 },
    ],
  },

  // ────────────────────────────────────────────
  // Puzzle 38 — 8x8
  // SOFA across (0,0), SEIL down (0,0), GOLD across (2,2), GANS down (2,2)
  // SOFA: (0,0)S (0,1)O (0,2)F (0,3)A
  // SEIL: (0,0)S (1,0)E (2,0)I (3,0)L
  // GOLD: (2,2)G (2,3)O (2,4)L (2,5)D
  // GANS: (2,2)G (3,2)A (4,2)N (5,2)S
  // Crossings: S at (0,0), G at (2,2)
  // Also add: DACH across (5,2)
  // DACH: — wait, let me keep 4 words.
  // ────────────────────────────────────────────
  {
    id: 'cw-easy-038',
    difficulty: 'easy',
    width: 8,
    height: 8,
    grid: [
      ['S', 'O', 'F', 'A', '#', '#', '#', '#'],
      ['E', '#', '#', '#', '#', '#', '#', '#'],
      ['I', '#', 'G', 'O', 'L', 'D', '#', '#'],
      ['L', '#', 'A', '#', '#', '#', '#', '#'],
      ['#', '#', 'N', '#', '#', '#', '#', '#'],
      ['#', '#', 'S', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Bequemes Sitzmöbel', answer: 'SOFA', row: 0, col: 0 },
      { number: 1, direction: 'down', clue: 'Langes Tau zum Klettern', answer: 'SEIL', row: 0, col: 0 },
      { number: 2, direction: 'across', clue: 'Glänzendes Edelmetall', answer: 'GOLD', row: 2, col: 2 },
      { number: 2, direction: 'down', clue: 'Weißer Vogel auf dem Bauernhof', answer: 'GANS', row: 2, col: 2 },
    ],
  },

  // ────────────────────────────────────────────
  // Puzzle 39 — 7x7
  // FEST across (0,0), FACH down (0,0), IGEL across (2,2), IDEE down (2,2)
  // FEST: (0,0)F (0,1)E (0,2)S (0,3)T
  // FACH: (0,0)F (1,0)A (2,0)C (3,0)H
  // IGEL: (2,2)I (2,3)G (2,4)E (2,5)L
  // IDEE: (2,2)I (3,2)D (4,2)E (5,2)E
  // Crossings: F at (0,0), I at (2,2)
  // ────────────────────────────────────────────
  {
    id: 'cw-easy-039',
    difficulty: 'easy',
    width: 7,
    height: 7,
    grid: [
      ['F', 'E', 'S', 'T', '#', '#', '#'],
      ['A', '#', '#', '#', '#', '#', '#'],
      ['C', '#', 'I', 'G', 'E', 'L', '#'],
      ['H', '#', 'D', '#', '#', '#', '#'],
      ['#', '#', 'E', '#', '#', '#', '#'],
      ['#', '#', 'E', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Feier mit Gästen', answer: 'FEST', row: 0, col: 0 },
      { number: 1, direction: 'down', clue: 'Schublade oder Abteilung', answer: 'FACH', row: 0, col: 0 },
      { number: 2, direction: 'across', clue: 'Stacheliges Tier im Garten', answer: 'IGEL', row: 2, col: 2 },
      { number: 2, direction: 'down', clue: 'Einfall oder Gedanke', answer: 'IDEE', row: 2, col: 2 },
    ],
  },

  // ────────────────────────────────────────────
  // Puzzle 40 — 8x8
  // STUHL across (0,0), SALAT down (0,0), KERN across (3,2), KINO down (3,2)
  // STUHL: (0,0)S (0,1)T (0,2)U (0,3)H (0,4)L
  // SALAT: (0,0)S (1,0)A (2,0)L (3,0)A (4,0)T
  // KERN: (3,2)K (3,3)E (3,4)R (3,5)N
  // KINO: (3,2)K (4,2)I (5,2)N (6,2)O
  // Crossings: S at (0,0), K at (3,2)
  // ────────────────────────────────────────────
  {
    id: 'cw-easy-040',
    difficulty: 'easy',
    width: 8,
    height: 8,
    grid: [
      ['S', 'T', 'U', 'H', 'L', '#', '#', '#'],
      ['A', '#', '#', '#', '#', '#', '#', '#'],
      ['L', '#', '#', '#', '#', '#', '#', '#'],
      ['A', '#', 'K', 'E', 'R', 'N', '#', '#'],
      ['T', '#', 'I', '#', '#', '#', '#', '#'],
      ['#', '#', 'N', '#', '#', '#', '#', '#'],
      ['#', '#', 'O', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Sitzmöbel mit vier Beinen', answer: 'STUHL', row: 0, col: 0 },
      { number: 1, direction: 'down', clue: 'Gemischtes Gemüsegericht', answer: 'SALAT', row: 0, col: 0 },
      { number: 2, direction: 'across', clue: 'Inneres Stück einer Frucht', answer: 'KERN', row: 3, col: 2 },
      { number: 2, direction: 'down', clue: 'Ort, um Filme zu sehen', answer: 'KINO', row: 3, col: 2 },
    ],
  },

  // ────────────────────────────────────────────
  // Puzzle 41 — 7x7
  // TUER across (0,0), TOPF down (0,0), HASE across (2,2), HEIM down (2,2)
  // TUER: (0,0)T (0,1)U (0,2)E (0,3)R
  // TOPF: (0,0)T (1,0)O (2,0)P (3,0)F
  // HASE: (2,2)H (2,3)A (2,4)S (2,5)E
  // HEIM: (2,2)H (3,2)E (4,2)I (5,2)M
  // Crossings: T at (0,0), H at (2,2)
  // ────────────────────────────────────────────
  {
    id: 'cw-easy-041',
    difficulty: 'easy',
    width: 7,
    height: 7,
    grid: [
      ['T', 'U', 'E', 'R', '#', '#', '#'],
      ['O', '#', '#', '#', '#', '#', '#'],
      ['P', '#', 'H', 'A', 'S', 'E', '#'],
      ['F', '#', 'E', '#', '#', '#', '#'],
      ['#', '#', 'I', '#', '#', '#', '#'],
      ['#', '#', 'M', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Öffnung zum Hindurchgehen', answer: 'TUER', row: 0, col: 0 },
      { number: 1, direction: 'down', clue: 'Gefäß zum Kochen', answer: 'TOPF', row: 0, col: 0 },
      { number: 2, direction: 'across', clue: 'Langohriges Tier auf der Wiese', answer: 'HASE', row: 2, col: 2 },
      { number: 2, direction: 'down', clue: 'Zuhause, Wohnung', answer: 'HEIM', row: 2, col: 2 },
    ],
  },

  // ────────────────────────────────────────────
  // Puzzle 42 — 7x7
  // BILD across (0,0), BALL down (0,0), MAUS across (2,2), MAIS down (2,2)
  // BILD: (0,0)B (0,1)I (0,2)L (0,3)D
  // BALL: (0,0)B (1,0)A (2,0)L (3,0)L
  // MAUS: (2,2)M (2,3)A (2,4)U (2,5)S
  // MAIS: (2,2)M (3,2)A (4,2)I (5,2)S
  // Crossings: B at (0,0), M at (2,2)
  // ────────────────────────────────────────────
  {
    id: 'cw-easy-042',
    difficulty: 'easy',
    width: 7,
    height: 7,
    grid: [
      ['B', 'I', 'L', 'D', '#', '#', '#'],
      ['A', '#', '#', '#', '#', '#', '#'],
      ['L', '#', 'M', 'A', 'U', 'S', '#'],
      ['L', '#', 'A', '#', '#', '#', '#'],
      ['#', '#', 'I', '#', '#', '#', '#'],
      ['#', '#', 'S', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Foto oder Gemälde an der Wand', answer: 'BILD', row: 0, col: 0 },
      { number: 1, direction: 'down', clue: 'Rundes Spielzeug zum Werfen', answer: 'BALL', row: 0, col: 0 },
      { number: 2, direction: 'across', clue: 'Kleines Nagetier', answer: 'MAUS', row: 2, col: 2 },
      { number: 2, direction: 'down', clue: 'Gelbes Getreide, Kolben', answer: 'MAIS', row: 2, col: 2 },
    ],
  },

  // ────────────────────────────────────────────
  // Puzzle 43 — 8x8
  // KATZE across (0,0), KARTE down (0,0), WEIN across (3,2), WOLF down (3,2)
  // KATZE: (0,0)K (0,1)A (0,2)T (0,3)Z (0,4)E
  // KARTE: (0,0)K (1,0)A (2,0)R (3,0)T (4,0)E
  // WEIN: (3,2)W (3,3)E (3,4)I (3,5)N
  // WOLF: (3,2)W (4,2)O (5,2)L (6,2)F
  // Crossings: K at (0,0), W at (3,2)
  // ────────────────────────────────────────────
  {
    id: 'cw-easy-043',
    difficulty: 'easy',
    width: 8,
    height: 8,
    grid: [
      ['K', 'A', 'T', 'Z', 'E', '#', '#', '#'],
      ['A', '#', '#', '#', '#', '#', '#', '#'],
      ['R', '#', '#', '#', '#', '#', '#', '#'],
      ['T', '#', 'W', 'E', 'I', 'N', '#', '#'],
      ['E', '#', 'O', '#', '#', '#', '#', '#'],
      ['#', '#', 'L', '#', '#', '#', '#', '#'],
      ['#', '#', 'F', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Schnurrendes Haustier', answer: 'KATZE', row: 0, col: 0 },
      { number: 1, direction: 'down', clue: 'Papier mit Bild der Gegend', answer: 'KARTE', row: 0, col: 0 },
      { number: 2, direction: 'across', clue: 'Alkoholisches Getränk aus Trauben', answer: 'WEIN', row: 3, col: 2 },
      { number: 2, direction: 'down', clue: 'Wildes Tier im Wald, heult', answer: 'WOLF', row: 3, col: 2 },
    ],
  },

  // ────────────────────────────────────────────
  // Puzzle 44 — 7x7
  // AUTO across (0,0), ADEL down (0,0), LOCH across (2,2), LUPE down (2,2)
  // AUTO: (0,0)A (0,1)U (0,2)T (0,3)O
  // ADEL: (0,0)A (1,0)D (2,0)E (3,0)L
  // LOCH: (2,2)L (2,3)O (2,4)C (2,5)H
  // LUPE: (2,2)L (3,2)U (4,2)P (5,2)E
  // Crossings: A at (0,0), L at (2,2)
  // ────────────────────────────────────────────
  {
    id: 'cw-easy-044',
    difficulty: 'easy',
    width: 7,
    height: 7,
    grid: [
      ['A', 'U', 'T', 'O', '#', '#', '#'],
      ['D', '#', '#', '#', '#', '#', '#'],
      ['E', '#', 'L', 'O', 'C', 'H', '#'],
      ['L', '#', 'U', '#', '#', '#', '#'],
      ['#', '#', 'P', '#', '#', '#', '#'],
      ['#', '#', 'E', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Fahrzeug mit vier Rädern', answer: 'AUTO', row: 0, col: 0 },
      { number: 1, direction: 'down', clue: 'Hoher gesellschaftlicher Stand', answer: 'ADEL', row: 0, col: 0 },
      { number: 2, direction: 'across', clue: 'Öffnung in einer Fläche', answer: 'LOCH', row: 2, col: 2 },
      { number: 2, direction: 'down', clue: 'Vergrößerungsglas', answer: 'LUPE', row: 2, col: 2 },
    ],
  },

  // ────────────────────────────────────────────
  // Puzzle 45 — 8x8
  // VOGEL across (0,0), VASE down (0,0), LAMPE across (3,1), LACK down (3,1)
  // VOGEL: (0,0)V (0,1)O (0,2)G (0,3)E (0,4)L
  // VASE: (0,0)V (1,0)A (2,0)S (3,0)E
  // LAMPE: (3,1)L (3,2)A (3,3)M (3,4)P (3,5)E
  // LACK: (3,1)L (4,1)A (5,1)C (6,1)K
  // Crossings: V at (0,0), L at (3,1)
  // ────────────────────────────────────────────
  {
    id: 'cw-easy-045',
    difficulty: 'easy',
    width: 8,
    height: 8,
    grid: [
      ['V', 'O', 'G', 'E', 'L', '#', '#', '#'],
      ['A', '#', '#', '#', '#', '#', '#', '#'],
      ['S', '#', '#', '#', '#', '#', '#', '#'],
      ['E', 'L', 'A', 'M', 'P', 'E', '#', '#'],
      ['#', 'A', '#', '#', '#', '#', '#', '#'],
      ['#', 'C', '#', '#', '#', '#', '#', '#'],
      ['#', 'K', '#', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Fliegendes Tier mit Federn', answer: 'VOGEL', row: 0, col: 0 },
      { number: 1, direction: 'down', clue: 'Gefäß für Blumen', answer: 'VASE', row: 0, col: 0 },
      { number: 2, direction: 'across', clue: 'Spendet Licht im Zimmer', answer: 'LAMPE', row: 3, col: 1 },
      { number: 2, direction: 'down', clue: 'Farbe zum Streichen', answer: 'LACK', row: 3, col: 1 },
    ],
  },

  // ────────────────────────────────────────────
  // Puzzle 46 — 7x7
  // HAND across (0,1), HEFT down (0,1), FUSS across (2,2), FUNK down (2,2)
  // HAND: (0,1)H (0,2)A (0,3)N (0,4)D
  // HEFT: (0,1)H (1,1)E (2,1)F (3,1)T
  // FUSS: (2,2)F (2,3)U (2,4)S (2,5)S
  // FUNK: (2,2)F (3,2)U (4,2)N (5,2)K
  // Crossings: H at (0,1), F at (2,2). Check: (2,1)=F from HEFT[2]=F. (2,2) has FUSS[0]=F. No conflict.
  // ────────────────────────────────────────────
  {
    id: 'cw-easy-046',
    difficulty: 'easy',
    width: 7,
    height: 7,
    grid: [
      ['#', 'H', 'A', 'N', 'D', '#', '#'],
      ['#', 'E', '#', '#', '#', '#', '#'],
      ['#', 'F', 'F', 'U', 'S', 'S', '#'],
      ['#', 'T', 'U', '#', '#', '#', '#'],
      ['#', '#', 'N', '#', '#', '#', '#'],
      ['#', '#', 'K', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Greifwerkzeug am Arm', answer: 'HAND', row: 0, col: 1 },
      { number: 1, direction: 'down', clue: 'Dünnes Buch zum Schreiben', answer: 'HEFT', row: 0, col: 1 },
      { number: 2, direction: 'across', clue: 'Unteres Ende des Beins', answer: 'FUSS', row: 2, col: 2 },
      { number: 2, direction: 'down', clue: 'Drahtlose Übertragung', answer: 'FUNK', row: 2, col: 2 },
    ],
  },

  // ────────────────────────────────────────────
  // Puzzle 47 — 7x7
  // MOND across (0,0), MARK down (0,0), WAND across (2,2), WAHL down (2,2)
  // MOND: (0,0)M (0,1)O (0,2)N (0,3)D
  // MARK: (0,0)M (1,0)A (2,0)R (3,0)K
  // WAND: (2,2)W (2,3)A (2,4)N (2,5)D
  // WAHL: (2,2)W (3,2)A (4,2)H (5,2)L
  // Crossings: M at (0,0), W at (2,2)
  // ────────────────────────────────────────────
  {
    id: 'cw-easy-047',
    difficulty: 'easy',
    width: 7,
    height: 7,
    grid: [
      ['M', 'O', 'N', 'D', '#', '#', '#'],
      ['A', '#', '#', '#', '#', '#', '#'],
      ['R', '#', 'W', 'A', 'N', 'D', '#'],
      ['K', '#', 'A', '#', '#', '#', '#'],
      ['#', '#', 'H', '#', '#', '#', '#'],
      ['#', '#', 'L', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Himmelskörper bei Nacht', answer: 'MOND', row: 0, col: 0 },
      { number: 1, direction: 'down', clue: 'Alte deutsche Währung', answer: 'MARK', row: 0, col: 0 },
      { number: 2, direction: 'across', clue: 'Senkrechte Fläche im Raum', answer: 'WAND', row: 2, col: 2 },
      { number: 2, direction: 'down', clue: 'Abstimmung, Entscheidung', answer: 'WAHL', row: 2, col: 2 },
    ],
  },

  // ────────────────────────────────────────────
  // Puzzle 48 — 8x8
  // TISCH across (0,0), TORTE down (0,0), WIND across (3,2), WIRT down (3,2)
  // TISCH: (0,0)T (0,1)I (0,2)S (0,3)C (0,4)H
  // TORTE: (0,0)T (1,0)O (2,0)R (3,0)T (4,0)E
  // WIND: (3,2)W (3,3)I (3,4)N (3,5)D
  // WIRT: (3,2)W (4,2)I (5,2)R (6,2)T
  // Crossings: T at (0,0), W at (3,2)
  // ────────────────────────────────────────────
  {
    id: 'cw-easy-048',
    difficulty: 'easy',
    width: 8,
    height: 8,
    grid: [
      ['T', 'I', 'S', 'C', 'H', '#', '#', '#'],
      ['O', '#', '#', '#', '#', '#', '#', '#'],
      ['R', '#', '#', '#', '#', '#', '#', '#'],
      ['T', '#', 'W', 'I', 'N', 'D', '#', '#'],
      ['E', '#', 'I', '#', '#', '#', '#', '#'],
      ['#', '#', 'R', '#', '#', '#', '#', '#'],
      ['#', '#', 'T', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Möbel zum Essen und Arbeiten', answer: 'TISCH', row: 0, col: 0 },
      { number: 1, direction: 'down', clue: 'Süßes Gebäck mit Sahne', answer: 'TORTE', row: 0, col: 0 },
      { number: 2, direction: 'across', clue: 'Bewegte Luft draußen', answer: 'WIND', row: 3, col: 2 },
      { number: 2, direction: 'down', clue: 'Gastgeber einer Kneipe', answer: 'WIRT', row: 3, col: 2 },
    ],
  },

  // ────────────────────────────────────────────
  // Puzzle 49 — 7x7
  // RING across (0,0), RIND down (0,0), AUGE across (2,2), ARZT down (2,2)
  // RING: (0,0)R (0,1)I (0,2)N (0,3)G
  // RIND: (0,0)R (1,0)I (2,0)N (3,0)D
  // AUGE: (2,2)A (2,3)U (2,4)G (2,5)E
  // ARZT: (2,2)A (3,2)R (4,2)Z (5,2)T
  // Crossings: R at (0,0), A at (2,2)
  // ────────────────────────────────────────────
  {
    id: 'cw-easy-049',
    difficulty: 'easy',
    width: 7,
    height: 7,
    grid: [
      ['R', 'I', 'N', 'G', '#', '#', '#'],
      ['I', '#', '#', '#', '#', '#', '#'],
      ['N', '#', 'A', 'U', 'G', 'E', '#'],
      ['D', '#', 'R', '#', '#', '#', '#'],
      ['#', '#', 'Z', '#', '#', '#', '#'],
      ['#', '#', 'T', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Schmuckstück für den Finger', answer: 'RING', row: 0, col: 0 },
      { number: 1, direction: 'down', clue: 'Kuh oder Ochse', answer: 'RIND', row: 0, col: 0 },
      { number: 2, direction: 'across', clue: 'Sehorgan im Gesicht', answer: 'AUGE', row: 2, col: 2 },
      { number: 2, direction: 'down', clue: 'Doktor, Mediziner', answer: 'ARZT', row: 2, col: 2 },
    ],
  },

  // ────────────────────────────────────────────
  // Puzzle 50 — 8x8
  // PFERD across (0,0), PILZ down (0,0), ROSE across (2,2), RAND down (2,2)
  // PFERD: (0,0)P (0,1)F (0,2)E (0,3)R (0,4)D
  // PILZ: (0,0)P (1,0)I (2,0)L (3,0)Z
  // ROSE: (2,2)R (2,3)O (2,4)S (2,5)E
  // RAND: (2,2)R (3,2)A (4,2)N (5,2)D
  // Crossings: P at (0,0), R at (2,2)
  // ────────────────────────────────────────────
  {
    id: 'cw-easy-050',
    difficulty: 'easy',
    width: 8,
    height: 8,
    grid: [
      ['P', 'F', 'E', 'R', 'D', '#', '#', '#'],
      ['I', '#', '#', '#', '#', '#', '#', '#'],
      ['L', '#', 'R', 'O', 'S', 'E', '#', '#'],
      ['Z', '#', 'A', '#', '#', '#', '#', '#'],
      ['#', '#', 'N', '#', '#', '#', '#', '#'],
      ['#', '#', 'D', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Großes Reittier', answer: 'PFERD', row: 0, col: 0 },
      { number: 1, direction: 'down', clue: 'Gewächs im Wald, kein Tier', answer: 'PILZ', row: 0, col: 0 },
      { number: 2, direction: 'across', clue: 'Duftende Blume mit Dornen', answer: 'ROSE', row: 2, col: 2 },
      { number: 2, direction: 'down', clue: 'Äußere Kante', answer: 'RAND', row: 2, col: 2 },
    ],
  },

  // ────────────────────────────────────────────
  // Puzzle 51 — 7x7
  // MEER across (0,0), MIST down (0,0), DREI across (2,1), DACH down (2,1)
  // MEER: (0,0)M (0,1)E (0,2)E (0,3)R
  // MIST: (0,0)M (1,0)I (2,0)S (3,0)T
  // DREI: (2,1)D (2,2)R (2,3)E (2,4)I
  // DACH: (2,1)D (3,1)A (4,1)C (5,1)H
  // Crossings: M at (0,0), D at (2,1)
  // ────────────────────────────────────────────
  {
    id: 'cw-easy-051',
    difficulty: 'easy',
    width: 7,
    height: 7,
    grid: [
      ['M', 'E', 'E', 'R', '#', '#', '#'],
      ['I', '#', '#', '#', '#', '#', '#'],
      ['S', 'D', 'R', 'E', 'I', '#', '#'],
      ['T', 'A', '#', '#', '#', '#', '#'],
      ['#', 'C', '#', '#', '#', '#', '#'],
      ['#', 'H', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Großes Salzwasser', answer: 'MEER', row: 0, col: 0 },
      { number: 1, direction: 'down', clue: 'Abfall, Schmutz', answer: 'MIST', row: 0, col: 0 },
      { number: 2, direction: 'across', clue: 'Zahl nach Zwei', answer: 'DREI', row: 2, col: 1 },
      { number: 2, direction: 'down', clue: 'Oberer Abschluss des Hauses', answer: 'DACH', row: 2, col: 1 },
    ],
  },

  // ────────────────────────────────────────────
  // Puzzle 52 — 7x7
  // GANS across (0,0), GIFT down (0,0), OHR across (2,2), ORT down (2,2) — OHR only 3 letters
  // OHR: (2,2)O (2,3)H (2,4)R
  // ORT: (2,2)O (3,2)R (4,2)T
  // Crossings: G at (0,0), O at (2,2)
  // ────────────────────────────────────────────
  {
    id: 'cw-easy-052',
    difficulty: 'easy',
    width: 7,
    height: 7,
    grid: [
      ['G', 'A', 'N', 'S', '#', '#', '#'],
      ['I', '#', '#', '#', '#', '#', '#'],
      ['F', '#', 'O', 'H', 'R', '#', '#'],
      ['T', '#', 'R', '#', '#', '#', '#'],
      ['#', '#', 'T', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Weißer Wasservogel', answer: 'GANS', row: 0, col: 0 },
      { number: 1, direction: 'down', clue: 'Schädliche Substanz', answer: 'GIFT', row: 0, col: 0 },
      { number: 2, direction: 'across', clue: 'Hörorgan am Kopf', answer: 'OHR', row: 2, col: 2 },
      { number: 2, direction: 'down', clue: 'Platz oder Stelle', answer: 'ORT', row: 2, col: 2 },
    ],
  },

  // ────────────────────────────────────────────
  // Puzzle 53 — 8x8
  // FISCH across (0,0), FIGUR down (0,0), HEMD across (3,2), HOLZ down (3,2)
  // FISCH: (0,0)F (0,1)I (0,2)S (0,3)C (0,4)H
  // FIGUR: (0,0)F (1,0)I (2,0)G (3,0)U (4,0)R
  // HEMD: (3,2)H (3,3)E (3,4)M (3,5)D
  // HOLZ: (3,2)H (4,2)O (5,2)L (6,2)Z
  // Crossings: F at (0,0), H at (3,2)
  // ────────────────────────────────────────────
  {
    id: 'cw-easy-053',
    difficulty: 'easy',
    width: 8,
    height: 8,
    grid: [
      ['F', 'I', 'S', 'C', 'H', '#', '#', '#'],
      ['I', '#', '#', '#', '#', '#', '#', '#'],
      ['G', '#', '#', '#', '#', '#', '#', '#'],
      ['U', '#', 'H', 'E', 'M', 'D', '#', '#'],
      ['R', '#', 'O', '#', '#', '#', '#', '#'],
      ['#', '#', 'L', '#', '#', '#', '#', '#'],
      ['#', '#', 'Z', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Tier im Wasser mit Flossen', answer: 'FISCH', row: 0, col: 0 },
      { number: 1, direction: 'down', clue: 'Gestalt oder Statue', answer: 'FIGUR', row: 0, col: 0 },
      { number: 2, direction: 'across', clue: 'Kleidungsstück mit Ärmeln', answer: 'HEMD', row: 3, col: 2 },
      { number: 2, direction: 'down', clue: 'Material vom Baum', answer: 'HOLZ', row: 3, col: 2 },
    ],
  },

  // ────────────────────────────────────────────
  // Puzzle 54 — 7x7
  // WALD across (0,0), WURM down (0,0), EILE across (2,2), ECHO down (2,2)
  // WALD: (0,0)W (0,1)A (0,2)L (0,3)D
  // WURM: (0,0)W (1,0)U (2,0)R (3,0)M
  // EILE: (2,2)E (2,3)I (2,4)L (2,5)E
  // ECHO: (2,2)E (3,2)C (4,2)H (5,2)O
  // Crossings: W at (0,0), E at (2,2)
  // ────────────────────────────────────────────
  {
    id: 'cw-easy-054',
    difficulty: 'easy',
    width: 7,
    height: 7,
    grid: [
      ['W', 'A', 'L', 'D', '#', '#', '#'],
      ['U', '#', '#', '#', '#', '#', '#'],
      ['R', '#', 'E', 'I', 'L', 'E', '#'],
      ['M', '#', 'C', '#', '#', '#', '#'],
      ['#', '#', 'H', '#', '#', '#', '#'],
      ['#', '#', 'O', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Viele Bäume zusammen', answer: 'WALD', row: 0, col: 0 },
      { number: 1, direction: 'down', clue: 'Kleines kriechendes Tier in der Erde', answer: 'WURM', row: 0, col: 0 },
      { number: 2, direction: 'across', clue: 'Schnelligkeit, Hast', answer: 'EILE', row: 2, col: 2 },
      { number: 2, direction: 'down', clue: 'Widerhall eines Lauts', answer: 'ECHO', row: 2, col: 2 },
    ],
  },

  // ────────────────────────────────────────────
  // Puzzle 55 — 8x8
  // APFEL across (0,0), AMPEL down (0,0), BERG across (3,2), BROT down (3,2)
  // APFEL: (0,0)A (0,1)P (0,2)F (0,3)E (0,4)L
  // AMPEL: (0,0)A (1,0)M (2,0)P (3,0)E (4,0)L
  // BERG: (3,2)B (3,3)E (3,4)R (3,5)G
  // BROT: (3,2)B (4,2)R (5,2)O (6,2)T
  // Crossings: A at (0,0), B at (3,2)
  // ────────────────────────────────────────────
  {
    id: 'cw-easy-055',
    difficulty: 'easy',
    width: 8,
    height: 8,
    grid: [
      ['A', 'P', 'F', 'E', 'L', '#', '#', '#'],
      ['M', '#', '#', '#', '#', '#', '#', '#'],
      ['P', '#', '#', '#', '#', '#', '#', '#'],
      ['E', '#', 'B', 'E', 'R', 'G', '#', '#'],
      ['L', '#', 'R', '#', '#', '#', '#', '#'],
      ['#', '#', 'O', '#', '#', '#', '#', '#'],
      ['#', '#', 'T', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Runde Frucht vom Baum', answer: 'APFEL', row: 0, col: 0 },
      { number: 1, direction: 'down', clue: 'Lichtsignal an der Kreuzung', answer: 'AMPEL', row: 0, col: 0 },
      { number: 2, direction: 'across', clue: 'Hohe Erhebung in der Natur', answer: 'BERG', row: 3, col: 2 },
      { number: 2, direction: 'down', clue: 'Gebackenes Grundnahrungsmittel', answer: 'BROT', row: 3, col: 2 },
    ],
  },

  // ────────────────────────────────────────────
  // Puzzle 56 — 7x7
  // SALZ across (0,0), SAFT down (0,0), LIED across (2,2), LEIM down (2,2)
  // SALZ: (0,0)S (0,1)A (0,2)L (0,3)Z
  // SAFT: (0,0)S (1,0)A (2,0)F (3,0)T
  // LIED: (2,2)L (2,3)I (2,4)E (2,5)D
  // LEIM: (2,2)L (3,2)E (4,2)I (5,2)M
  // Crossings: S at (0,0), L at (2,2)
  // ────────────────────────────────────────────
  {
    id: 'cw-easy-056',
    difficulty: 'easy',
    width: 7,
    height: 7,
    grid: [
      ['S', 'A', 'L', 'Z', '#', '#', '#'],
      ['A', '#', '#', '#', '#', '#', '#'],
      ['F', '#', 'L', 'I', 'E', 'D', '#'],
      ['T', '#', 'E', '#', '#', '#', '#'],
      ['#', '#', 'I', '#', '#', '#', '#'],
      ['#', '#', 'M', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Weißes Würzmittel', answer: 'SALZ', row: 0, col: 0 },
      { number: 1, direction: 'down', clue: 'Flüssigkeit aus Obst', answer: 'SAFT', row: 0, col: 0 },
      { number: 2, direction: 'across', clue: 'Melodie zum Singen', answer: 'LIED', row: 2, col: 2 },
      { number: 2, direction: 'down', clue: 'Klebstoff', answer: 'LEIM', row: 2, col: 2 },
    ],
  },

  // ────────────────────────────────────────────
  // Puzzle 57 — 8x8
  // HERD across (0,0), HUHN down (0,0), VIER across (2,2), VOLK down (2,2)
  // HERD: (0,0)H (0,1)E (0,2)R (0,3)D
  // HUHN: (0,0)H (1,0)U (2,0)H (3,0)N
  // VIER: (2,2)V (2,3)I (2,4)E (2,5)R
  // VOLK: (2,2)V (3,2)O (4,2)L (5,2)K
  // Crossings: H at (0,0), V at (2,2)
  // ────────────────────────────────────────────
  {
    id: 'cw-easy-057',
    difficulty: 'easy',
    width: 8,
    height: 8,
    grid: [
      ['H', 'E', 'R', 'D', '#', '#', '#', '#'],
      ['U', '#', '#', '#', '#', '#', '#', '#'],
      ['H', '#', 'V', 'I', 'E', 'R', '#', '#'],
      ['N', '#', 'O', '#', '#', '#', '#', '#'],
      ['#', '#', 'L', '#', '#', '#', '#', '#'],
      ['#', '#', 'K', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Kochstelle in der Küche', answer: 'HERD', row: 0, col: 0 },
      { number: 1, direction: 'down', clue: 'Federvieh, legt Eier', answer: 'HUHN', row: 0, col: 0 },
      { number: 2, direction: 'across', clue: 'Zahl nach Drei', answer: 'VIER', row: 2, col: 2 },
      { number: 2, direction: 'down', clue: 'Bevölkerung eines Landes', answer: 'VOLK', row: 2, col: 2 },
    ],
  },

  // ────────────────────────────────────────────
  // Puzzle 58 — 7x7
  // ROCK across (0,0), RUHE down (0,0), TAXI across (2,2), TURM down (2,2)
  // ROCK: (0,0)R (0,1)O (0,2)C (0,3)K
  // RUHE: (0,0)R (1,0)U (2,0)H (3,0)E
  // TAXI: (2,2)T (2,3)A (2,4)X (2,5)I
  // TURM: (2,2)T (3,2)U (4,2)R (5,2)M
  // Crossings: R at (0,0), T at (2,2)
  // ────────────────────────────────────────────
  {
    id: 'cw-easy-058',
    difficulty: 'easy',
    width: 7,
    height: 7,
    grid: [
      ['R', 'O', 'C', 'K', '#', '#', '#'],
      ['U', '#', '#', '#', '#', '#', '#'],
      ['H', '#', 'T', 'A', 'X', 'I', '#'],
      ['E', '#', 'U', '#', '#', '#', '#'],
      ['#', '#', 'R', '#', '#', '#', '#'],
      ['#', '#', 'M', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Kleidungsstück, auch Musikstil', answer: 'ROCK', row: 0, col: 0 },
      { number: 1, direction: 'down', clue: 'Stille, Gelassenheit', answer: 'RUHE', row: 0, col: 0 },
      { number: 2, direction: 'across', clue: 'Mietauto mit Fahrer', answer: 'TAXI', row: 2, col: 2 },
      { number: 2, direction: 'down', clue: 'Hohes Bauwerk, spitz', answer: 'TURM', row: 2, col: 2 },
    ],
  },

  // ────────────────────────────────────────────
  // Puzzle 59 — 8x8
  // SONNE across (0,0), SPORT down (0,0), BETT across (3,2), BAER down (3,2)
  // SONNE: (0,0)S (0,1)O (0,2)N (0,3)N (0,4)E
  // SPORT: (0,0)S (1,0)P (2,0)O (3,0)R (4,0)T
  // BETT: (3,2)B (3,3)E (3,4)T (3,5)T
  // BAER: (3,2)B (4,2)A (5,2)E (6,2)R
  // Crossings: S at (0,0), B at (3,2)
  // ────────────────────────────────────────────
  {
    id: 'cw-easy-059',
    difficulty: 'easy',
    width: 8,
    height: 8,
    grid: [
      ['S', 'O', 'N', 'N', 'E', '#', '#', '#'],
      ['P', '#', '#', '#', '#', '#', '#', '#'],
      ['O', '#', '#', '#', '#', '#', '#', '#'],
      ['R', '#', 'B', 'E', 'T', 'T', '#', '#'],
      ['T', '#', 'A', '#', '#', '#', '#', '#'],
      ['#', '#', 'E', '#', '#', '#', '#', '#'],
      ['#', '#', 'R', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Unser Stern am Himmel', answer: 'SONNE', row: 0, col: 0 },
      { number: 1, direction: 'down', clue: 'Körperliche Aktivität', answer: 'SPORT', row: 0, col: 0 },
      { number: 2, direction: 'across', clue: 'Möbel zum Schlafen', answer: 'BETT', row: 3, col: 2 },
      { number: 2, direction: 'down', clue: 'Großes Tier im Wald, brummt', answer: 'BAER', row: 3, col: 2 },
    ],
  },

  // ────────────────────────────────────────────
  // Puzzle 60 — 7x7
  // DORF across (0,0), DOSE down (0,0), KLAR across (2,2), KNIE down (2,2)
  // DORF: (0,0)D (0,1)O (0,2)R (0,3)F
  // DOSE: (0,0)D (1,0)O (2,0)S (3,0)E
  // KLAR: (2,2)K (2,3)L (2,4)A (2,5)R
  // KNIE: (2,2)K (3,2)N (4,2)I (5,2)E
  // Crossings: D at (0,0), K at (2,2)
  // ────────────────────────────────────────────
  {
    id: 'cw-easy-060',
    difficulty: 'easy',
    width: 7,
    height: 7,
    grid: [
      ['D', 'O', 'R', 'F', '#', '#', '#'],
      ['O', '#', '#', '#', '#', '#', '#'],
      ['S', '#', 'K', 'L', 'A', 'R', '#'],
      ['E', '#', 'N', '#', '#', '#', '#'],
      ['#', '#', 'I', '#', '#', '#', '#'],
      ['#', '#', 'E', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Kleine Siedlung auf dem Land', answer: 'DORF', row: 0, col: 0 },
      { number: 1, direction: 'down', clue: 'Behälter aus Blech', answer: 'DOSE', row: 0, col: 0 },
      { number: 2, direction: 'across', clue: 'Deutlich, durchsichtig', answer: 'KLAR', row: 2, col: 2 },
      { number: 2, direction: 'down', clue: 'Gelenk im Bein', answer: 'KNIE', row: 2, col: 2 },
    ],
  },
]
