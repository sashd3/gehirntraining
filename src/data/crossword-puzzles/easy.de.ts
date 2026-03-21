import type { CrosswordPuzzleData } from './types'

export const easyPuzzles: CrosswordPuzzleData[] = [
  // ────────────────────────────────────────────
  // Puzzle 1 — 7x7
  // HAUS across (0,0), HUT down (0,0), BAUM across (2,2), BROT down (2,2)
  // Crossings: H at (0,0), B at (2,2)
  // ────────────────────────────────────────────
  {
    id: 'cw-easy-001',
    difficulty: 'easy',
    width: 7,
    height: 7,
    grid: [
      ['H', 'A', 'U', 'S', '#', '#', '#'],
      ['U', '#', '#', '#', '#', '#', '#'],
      ['T', '#', 'B', 'A', 'U', 'M', '#'],
      ['#', '#', 'R', '#', '#', '#', '#'],
      ['#', '#', 'O', '#', '#', '#', '#'],
      ['#', '#', 'T', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Gebäude zum Wohnen', answer: 'HAUS', row: 0, col: 0 },
      { number: 1, direction: 'down', clue: 'Bedeckung für den Kopf', answer: 'HUT', row: 0, col: 0 },
      { number: 2, direction: 'across', clue: 'Wächst im Wald, hat Blätter', answer: 'BAUM', row: 2, col: 2 },
      { number: 2, direction: 'down', clue: 'Nahrungsmittel vom Bäcker', answer: 'BROT', row: 2, col: 2 },
    ],
  },

  // ────────────────────────────────────────────
  // Puzzle 2 — 7x7
  // ROSE across (0,0), RING down (0,0), MEER across (2,2), MOND down (2,2)
  // Crossings: R at (0,0), M at (2,2)
  // ────────────────────────────────────────────
  {
    id: 'cw-easy-002',
    difficulty: 'easy',
    width: 7,
    height: 7,
    grid: [
      ['R', 'O', 'S', 'E', '#', '#', '#'],
      ['I', '#', '#', '#', '#', '#', '#'],
      ['N', '#', 'M', 'E', 'E', 'R', '#'],
      ['G', '#', 'O', '#', '#', '#', '#'],
      ['#', '#', 'N', '#', '#', '#', '#'],
      ['#', '#', 'D', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Schöne Blume mit Dornen', answer: 'ROSE', row: 0, col: 0 },
      { number: 1, direction: 'down', clue: 'Schmuckstück am Finger', answer: 'RING', row: 0, col: 0 },
      { number: 2, direction: 'across', clue: 'Großes Salzwasser', answer: 'MEER', row: 2, col: 2 },
      { number: 2, direction: 'down', clue: 'Leuchtet am Nachthimmel', answer: 'MOND', row: 2, col: 2 },
    ],
  },

  // ────────────────────────────────────────────
  // Puzzle 3 — 7x7
  // BERG across (0,0), BETT down (0,0), REIS down (0,2), SALZ across (3,2)
  // Crossings: B at (0,0), R at (0,2), S at (3,2)
  // ────────────────────────────────────────────
  {
    id: 'cw-easy-003',
    difficulty: 'easy',
    width: 7,
    height: 7,
    grid: [
      ['B', 'E', 'R', 'G', '#', '#', '#'],
      ['E', '#', 'E', '#', '#', '#', '#'],
      ['T', '#', 'I', '#', '#', '#', '#'],
      ['T', '#', 'S', 'A', 'L', 'Z', '#'],
      ['#', '#', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Hohe Erhebung in der Landschaft', answer: 'BERG', row: 0, col: 0 },
      { number: 1, direction: 'down', clue: 'Möbel zum Schlafen', answer: 'BETT', row: 0, col: 0 },
      { number: 2, direction: 'down', clue: 'Weißes Korn aus Asien', answer: 'REIS', row: 0, col: 2 },
      { number: 3, direction: 'across', clue: 'Würzmittel, weiße Körner', answer: 'SALZ', row: 3, col: 2 },
    ],
  },

  // ────────────────────────────────────────────
  // Puzzle 4 — 8x8
  // LAMPE across (0,0), LIED down (0,0), EIS down (0,4), APFEL across (3,2)
  // Crossings: L at (0,0), E at (0,4)
  // ────────────────────────────────────────────
  {
    id: 'cw-easy-004',
    difficulty: 'easy',
    width: 8,
    height: 8,
    grid: [
      ['L', 'A', 'M', 'P', 'E', '#', '#', '#'],
      ['I', '#', '#', '#', 'I', '#', '#', '#'],
      ['E', '#', '#', '#', 'S', '#', '#', '#'],
      ['D', '#', 'A', 'P', 'F', 'E', 'L', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Spendet Licht im Zimmer', answer: 'LAMPE', row: 0, col: 0 },
      { number: 1, direction: 'down', clue: 'Musik zum Mitsingen', answer: 'LIED', row: 0, col: 0 },
      { number: 2, direction: 'down', clue: 'Gefrorenes Dessert im Sommer', answer: 'EIS', row: 0, col: 4 },
      { number: 3, direction: 'across', clue: 'Runde Frucht vom Baum', answer: 'APFEL', row: 3, col: 2 },
    ],
  },

  // ────────────────────────────────────────────
  // Puzzle 5 — 7x7
  // WALD across (0,0), WEIN down (0,0), PILZ across (2,2), LAND down (2,4)
  // Crossings: W at (0,0), L at (2,4)
  // ────────────────────────────────────────────
  {
    id: 'cw-easy-005',
    difficulty: 'easy',
    width: 7,
    height: 7,
    grid: [
      ['W', 'A', 'L', 'D', '#', '#', '#'],
      ['E', '#', '#', '#', '#', '#', '#'],
      ['I', '#', 'P', 'I', 'L', 'Z', '#'],
      ['N', '#', '#', '#', 'A', '#', '#'],
      ['#', '#', '#', '#', 'N', '#', '#'],
      ['#', '#', '#', '#', 'D', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Viele Bäume zusammen', answer: 'WALD', row: 0, col: 0 },
      { number: 1, direction: 'down', clue: 'Getränk aus Trauben', answer: 'WEIN', row: 0, col: 0 },
      { number: 2, direction: 'across', clue: 'Wächst im Wald am Boden', answer: 'PILZ', row: 2, col: 2 },
      { number: 3, direction: 'down', clue: 'Fester Boden, Erde', answer: 'LAND', row: 2, col: 4 },
    ],
  },

  // ────────────────────────────────────────────
  // Puzzle 6 — 8x8
  // FISCH across (0,0), FEST down (0,0), STERN down (0,2), EIS across (2,2)
  // Crossings: F at (0,0), S at (0,2), E at (2,2)
  // ────────────────────────────────────────────
  {
    id: 'cw-easy-006',
    difficulty: 'easy',
    width: 8,
    height: 8,
    grid: [
      ['F', 'I', 'S', 'C', 'H', '#', '#', '#'],
      ['E', '#', 'T', '#', '#', '#', '#', '#'],
      ['S', '#', 'E', 'I', 'S', '#', '#', '#'],
      ['T', '#', 'R', '#', '#', '#', '#', '#'],
      ['#', '#', 'N', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Tier, das im Wasser lebt', answer: 'FISCH', row: 0, col: 0 },
      { number: 1, direction: 'down', clue: 'Feier, Veranstaltung', answer: 'FEST', row: 0, col: 0 },
      { number: 2, direction: 'down', clue: 'Funkelt am Nachthimmel', answer: 'STERN', row: 0, col: 2 },
      { number: 3, direction: 'across', clue: 'Gefrorenes Wasser', answer: 'EIS', row: 2, col: 2 },
    ],
  },

  // ────────────────────────────────────────────
  // Puzzle 7 — 8x8
  // KATZE across (0,0), KALT down (0,0), TISCH down (0,2), SEE across (2,2)
  // Crossings: K at (0,0), T at (0,2), S at (2,2)
  // ────────────────────────────────────────────
  {
    id: 'cw-easy-007',
    difficulty: 'easy',
    width: 8,
    height: 8,
    grid: [
      ['K', 'A', 'T', 'Z', 'E', '#', '#', '#'],
      ['A', '#', 'I', '#', '#', '#', '#', '#'],
      ['L', '#', 'S', 'E', 'E', '#', '#', '#'],
      ['T', '#', 'C', '#', '#', '#', '#', '#'],
      ['#', '#', 'H', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Haustier, das schnurrt', answer: 'KATZE', row: 0, col: 0 },
      { number: 1, direction: 'down', clue: 'Niedrige Temperatur', answer: 'KALT', row: 0, col: 0 },
      { number: 2, direction: 'down', clue: 'Möbel mit Platte und Beinen', answer: 'TISCH', row: 0, col: 2 },
      { number: 3, direction: 'across', clue: 'Kleiner Wasserkörper in der Natur', answer: 'SEE', row: 2, col: 2 },
    ],
  },

  // ────────────────────────────────────────────
  // Puzzle 8 — 7x7
  // GOLD across (0,0), GELD down (0,0), OBST across (4,1), TAG down (4,4)
  // Crossings: G at (0,0), T at (4,4)
  // ────────────────────────────────────────────
  {
    id: 'cw-easy-008',
    difficulty: 'easy',
    width: 7,
    height: 7,
    grid: [
      ['G', 'O', 'L', 'D', '#', '#', '#'],
      ['E', '#', '#', '#', '#', '#', '#'],
      ['L', '#', '#', '#', '#', '#', '#'],
      ['D', '#', '#', '#', '#', '#', '#'],
      ['#', 'O', 'B', 'S', 'T', '#', '#'],
      ['#', '#', '#', '#', 'A', '#', '#'],
      ['#', '#', '#', '#', 'G', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Wertvolles gelbes Metall', answer: 'GOLD', row: 0, col: 0 },
      { number: 1, direction: 'down', clue: 'Münzen und Scheine', answer: 'GELD', row: 0, col: 0 },
      { number: 2, direction: 'across', clue: 'Äpfel, Birnen, Bananen', answer: 'OBST', row: 4, col: 1 },
      { number: 3, direction: 'down', clue: 'Zeitraum von 24 Stunden', answer: 'TAG', row: 4, col: 4 },
    ],
  },

  // ────────────────────────────────────────────
  // Puzzle 9 — 8x8
  // BLUME across (0,0), BUCH down (0,0), UHR down (0,2), MILCH across (4,1)
  // Crossings: B at (0,0), U at (0,2)
  // ────────────────────────────────────────────
  {
    id: 'cw-easy-009',
    difficulty: 'easy',
    width: 8,
    height: 8,
    grid: [
      ['B', 'L', 'U', 'M', 'E', '#', '#', '#'],
      ['U', '#', 'H', '#', '#', '#', '#', '#'],
      ['C', '#', 'R', '#', '#', '#', '#', '#'],
      ['H', '#', '#', '#', '#', '#', '#', '#'],
      ['#', 'M', 'I', 'L', 'C', 'H', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Wächst im Garten und duftet', answer: 'BLUME', row: 0, col: 0 },
      { number: 1, direction: 'down', clue: 'Hat viele Seiten zum Lesen', answer: 'BUCH', row: 0, col: 0 },
      { number: 2, direction: 'down', clue: 'Zeigt die Zeit an', answer: 'UHR', row: 0, col: 2 },
      { number: 3, direction: 'across', clue: 'Weißes Getränk von der Kuh', answer: 'MILCH', row: 4, col: 1 },
    ],
  },

  // ────────────────────────────────────────────
  // Puzzle 10 — 7x7
  // HUND across (0,0), HAND down (0,0), DACH down (0,3), RAD across (4,1)
  // Crossings: H at (0,0), D at (0,3)
  // ────────────────────────────────────────────
  {
    id: 'cw-easy-010',
    difficulty: 'easy',
    width: 7,
    height: 7,
    grid: [
      ['H', 'U', 'N', 'D', '#', '#', '#'],
      ['A', '#', '#', 'A', '#', '#', '#'],
      ['N', '#', '#', 'C', '#', '#', '#'],
      ['D', '#', '#', 'H', '#', '#', '#'],
      ['#', 'R', 'A', 'D', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Haustier, das bellt', answer: 'HUND', row: 0, col: 0 },
      { number: 1, direction: 'down', clue: 'Teil des Körpers mit fünf Fingern', answer: 'HAND', row: 0, col: 0 },
      { number: 2, direction: 'down', clue: 'Oberer Teil des Hauses', answer: 'DACH', row: 0, col: 3 },
      { number: 3, direction: 'across', clue: 'Dreht sich am Fahrrad', answer: 'RAD', row: 4, col: 1 },
    ],
  },

  // ────────────────────────────────────────────
  // Puzzle 11 — 8x8
  // SONNE across (0,0), STUHL down (0,0), NASE down (0,2), SCHUH across (5,1)
  // Crossings: S at (0,0), N at (0,2)
  // ────────────────────────────────────────────
  {
    id: 'cw-easy-011',
    difficulty: 'easy',
    width: 8,
    height: 8,
    grid: [
      ['S', 'O', 'N', 'N', 'E', '#', '#', '#'],
      ['T', '#', 'A', '#', '#', '#', '#', '#'],
      ['U', '#', 'S', '#', '#', '#', '#', '#'],
      ['H', '#', 'E', '#', '#', '#', '#', '#'],
      ['L', '#', '#', '#', '#', '#', '#', '#'],
      ['#', 'S', 'C', 'H', 'U', 'H', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Scheint am Tag vom Himmel', answer: 'SONNE', row: 0, col: 0 },
      { number: 1, direction: 'down', clue: 'Sitzmöbel mit Lehne', answer: 'STUHL', row: 0, col: 0 },
      { number: 2, direction: 'down', clue: 'Körperteil zum Riechen', answer: 'NASE', row: 0, col: 2 },
      { number: 3, direction: 'across', clue: 'Kleidung für den Fuß', answer: 'SCHUH', row: 5, col: 1 },
    ],
  },

  // ────────────────────────────────────────────
  // Puzzle 12 — 7x7
  // ARZT across (0,0), AUTO down (0,0), PARK across (3,2), RAD down (3,4)
  // Crossings: A at (0,0), R at (3,4)
  // ────────────────────────────────────────────
  {
    id: 'cw-easy-012',
    difficulty: 'easy',
    width: 7,
    height: 7,
    grid: [
      ['A', 'R', 'Z', 'T', '#', '#', '#'],
      ['U', '#', '#', '#', '#', '#', '#'],
      ['T', '#', '#', '#', '#', '#', '#'],
      ['O', '#', 'P', 'A', 'R', 'K', '#'],
      ['#', '#', '#', '#', 'A', '#', '#'],
      ['#', '#', '#', '#', 'D', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Doktor, Mediziner', answer: 'ARZT', row: 0, col: 0 },
      { number: 1, direction: 'down', clue: 'Fahrzeug mit vier Rädern', answer: 'AUTO', row: 0, col: 0 },
      { number: 2, direction: 'across', clue: 'Grüne Anlage in der Stadt', answer: 'PARK', row: 3, col: 2 },
      { number: 3, direction: 'down', clue: 'Dreht sich, Teil vom Fahrrad', answer: 'RAD', row: 3, col: 4 },
    ],
  },

  // ────────────────────────────────────────────
  // Puzzle 13 — 8x8
  // BRIEF across (0,0), BANK down (0,0), NACHT across (2,0), BIER across (5,1)
  // Crossings: B at (0,0), N at (2,0)
  // ────────────────────────────────────────────
  {
    id: 'cw-easy-013',
    difficulty: 'easy',
    width: 8,
    height: 8,
    grid: [
      ['B', 'R', 'I', 'E', 'F', '#', '#', '#'],
      ['A', '#', '#', '#', '#', '#', '#', '#'],
      ['N', 'A', 'C', 'H', 'T', '#', '#', '#'],
      ['K', '#', '#', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
      ['#', 'B', 'I', 'E', 'R', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Nachricht im Umschlag', answer: 'BRIEF', row: 0, col: 0 },
      { number: 1, direction: 'down', clue: 'Sitzplatz im Park oder Geldinstitut', answer: 'BANK', row: 0, col: 0 },
      { number: 2, direction: 'across', clue: 'Die dunkle Zeit nach dem Tag', answer: 'NACHT', row: 2, col: 0 },
      { number: 3, direction: 'across', clue: 'Hopfengetränk', answer: 'BIER', row: 5, col: 1 },
    ],
  },

  // ────────────────────────────────────────────
  // Puzzle 14 — 7x7
  // TUER across (0,0), TURM down (0,0), RAD down (0,3), KLAR across (4,1)
  // Crossings: T at (0,0), R at (0,3)
  // ────────────────────────────────────────────
  {
    id: 'cw-easy-014',
    difficulty: 'easy',
    width: 7,
    height: 7,
    grid: [
      ['T', 'U', 'E', 'R', '#', '#', '#'],
      ['U', '#', '#', 'A', '#', '#', '#'],
      ['R', '#', '#', 'D', '#', '#', '#'],
      ['M', '#', '#', '#', '#', '#', '#'],
      ['#', 'K', 'L', 'A', 'R', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Eingang zum Zimmer', answer: 'TUER', row: 0, col: 0 },
      { number: 1, direction: 'down', clue: 'Hoher Teil einer Burg', answer: 'TURM', row: 0, col: 0 },
      { number: 2, direction: 'down', clue: 'Dreht sich am Fahrrad', answer: 'RAD', row: 0, col: 3 },
      { number: 3, direction: 'across', clue: 'Deutlich, durchsichtig', answer: 'KLAR', row: 4, col: 1 },
    ],
  },

  // ────────────────────────────────────────────
  // Puzzle 15 — 8x8
  // KOCH across (0,0), OHR down (0,1), TOPF across (2,3), OBST down (2,4)
  // Crossings: O at (0,1), O at (2,4)
  // ────────────────────────────────────────────
  {
    id: 'cw-easy-015',
    difficulty: 'easy',
    width: 8,
    height: 8,
    grid: [
      ['K', 'O', 'C', 'H', '#', '#', '#', '#'],
      ['#', 'H', '#', '#', '#', '#', '#', '#'],
      ['#', 'R', '#', 'T', 'O', 'P', 'F', '#'],
      ['#', '#', '#', '#', 'B', '#', '#', '#'],
      ['#', '#', '#', '#', 'S', '#', '#', '#'],
      ['#', '#', '#', '#', 'T', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Bereitet Essen zu', answer: 'KOCH', row: 0, col: 0 },
      { number: 2, direction: 'down', clue: 'Körperteil zum Hören', answer: 'OHR', row: 0, col: 1 },
      { number: 3, direction: 'across', clue: 'Gefäß zum Kochen auf dem Herd', answer: 'TOPF', row: 2, col: 3 },
      { number: 4, direction: 'down', clue: 'Äpfel, Birnen, Kirschen', answer: 'OBST', row: 2, col: 4 },
    ],
  },

  // ────────────────────────────────────────────
  // Puzzle 16 — 7x7
  // POST across (0,0), PELZ down (0,0), TANZ down (0,3), BIRNE across (4,1)
  // Crossings: P at (0,0), T at (0,3)
  // ────────────────────────────────────────────
  {
    id: 'cw-easy-016',
    difficulty: 'easy',
    width: 7,
    height: 7,
    grid: [
      ['P', 'O', 'S', 'T', '#', '#', '#'],
      ['E', '#', '#', 'A', '#', '#', '#'],
      ['L', '#', '#', 'N', '#', '#', '#'],
      ['Z', '#', '#', 'Z', '#', '#', '#'],
      ['#', 'B', 'I', 'R', 'N', 'E', '#'],
      ['#', '#', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Briefe und Pakete verschicken', answer: 'POST', row: 0, col: 0 },
      { number: 1, direction: 'down', clue: 'Warmer Tiermantel', answer: 'PELZ', row: 0, col: 0 },
      { number: 2, direction: 'down', clue: 'Bewegung zur Musik', answer: 'TANZ', row: 0, col: 3 },
      { number: 3, direction: 'across', clue: 'Grüne Frucht, ähnlich wie Apfel', answer: 'BIRNE', row: 4, col: 1 },
    ],
  },

  // ────────────────────────────────────────────
  // Puzzle 17 — 8x8
  // STADT across (0,0), SALZ down (0,0), AUGE down (0,2), TANZ across (4,1)
  // Crossings: S at (0,0), A at (0,2)
  // ────────────────────────────────────────────
  {
    id: 'cw-easy-017',
    difficulty: 'easy',
    width: 8,
    height: 8,
    grid: [
      ['S', 'T', 'A', 'D', 'T', '#', '#', '#'],
      ['A', '#', 'U', '#', '#', '#', '#', '#'],
      ['L', '#', 'G', '#', '#', '#', '#', '#'],
      ['Z', '#', 'E', '#', '#', '#', '#', '#'],
      ['#', 'T', 'A', 'N', 'Z', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Großer Ort mit vielen Häusern', answer: 'STADT', row: 0, col: 0 },
      { number: 1, direction: 'down', clue: 'Weißes Gewürz zum Essen', answer: 'SALZ', row: 0, col: 0 },
      { number: 2, direction: 'down', clue: 'Körperteil zum Sehen', answer: 'AUGE', row: 0, col: 2 },
      { number: 3, direction: 'across', clue: 'Bewegung zur Musik auf dem Fest', answer: 'TANZ', row: 4, col: 1 },
    ],
  },

  // ────────────────────────────────────────────
  // Puzzle 18 — 8x8
  // GARTEN across (0,0), GLAS down (0,0), TIER down (0,3), NEST across (4,1)
  // Crossings: G at (0,0), T at (0,3)
  // ────────────────────────────────────────────
  {
    id: 'cw-easy-018',
    difficulty: 'easy',
    width: 8,
    height: 8,
    grid: [
      ['G', 'A', 'R', 'T', 'E', 'N', '#', '#'],
      ['L', '#', '#', 'I', '#', '#', '#', '#'],
      ['A', '#', '#', 'E', '#', '#', '#', '#'],
      ['S', '#', '#', 'R', '#', '#', '#', '#'],
      ['#', 'N', 'E', 'S', 'T', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Grüner Bereich hinter dem Haus', answer: 'GARTEN', row: 0, col: 0 },
      { number: 1, direction: 'down', clue: 'Gefäß zum Trinken', answer: 'GLAS', row: 0, col: 0 },
      { number: 2, direction: 'down', clue: 'Lebewesen wie Hund oder Katze', answer: 'TIER', row: 0, col: 3 },
      { number: 3, direction: 'across', clue: 'Vogelhaus aus Zweigen', answer: 'NEST', row: 4, col: 1 },
    ],
  },

  // ────────────────────────────────────────────
  // Puzzle 19 — 8x8
  // ZUCKER across (0,0), ZELT down (0,0), KERN down (0,3), ENGEL across (4,1)
  // Crossings: Z at (0,0), K at (0,3)
  // ────────────────────────────────────────────
  {
    id: 'cw-easy-019',
    difficulty: 'easy',
    width: 8,
    height: 8,
    grid: [
      ['Z', 'U', 'C', 'K', 'E', 'R', '#', '#'],
      ['E', '#', '#', 'E', '#', '#', '#', '#'],
      ['L', '#', '#', 'R', '#', '#', '#', '#'],
      ['T', '#', '#', 'N', '#', '#', '#', '#'],
      ['#', 'E', 'N', 'G', 'E', 'L', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Süßes weißes Pulver', answer: 'ZUCKER', row: 0, col: 0 },
      { number: 1, direction: 'down', clue: 'Unterkunft beim Camping', answer: 'ZELT', row: 0, col: 0 },
      { number: 2, direction: 'down', clue: 'Inneres einer Frucht', answer: 'KERN', row: 0, col: 3 },
      { number: 3, direction: 'across', clue: 'Himmlisches Wesen mit Flügeln', answer: 'ENGEL', row: 4, col: 1 },
    ],
  },

  // ────────────────────────────────────────────
  // Puzzle 20 — 8x8
  // FLUSS across (0,0), FACH down (0,0), SEIL down (0,3), INSEL across (4,1)
  // Crossings: F at (0,0), S at (0,3)
  // ────────────────────────────────────────────
  {
    id: 'cw-easy-020',
    difficulty: 'easy',
    width: 8,
    height: 8,
    grid: [
      ['F', 'L', 'U', 'S', 'S', '#', '#', '#'],
      ['A', '#', '#', 'E', '#', '#', '#', '#'],
      ['C', '#', '#', 'I', '#', '#', '#', '#'],
      ['H', '#', '#', 'L', '#', '#', '#', '#'],
      ['#', 'I', 'N', 'S', 'E', 'L', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Fließendes Wasser in der Landschaft', answer: 'FLUSS', row: 0, col: 0 },
      { number: 1, direction: 'down', clue: 'Abteilung, Schublade', answer: 'FACH', row: 0, col: 0 },
      { number: 2, direction: 'down', clue: 'Dicke Schnur zum Binden', answer: 'SEIL', row: 0, col: 3 },
      { number: 3, direction: 'across', clue: 'Land umgeben von Wasser', answer: 'INSEL', row: 4, col: 1 },
    ],
  },

  // ────────────────────────────────────────────
  // Puzzle 21 — 8x8
  // WOLKE across (0,0), WURM down (0,0), LEER down (0,2), KALB across (4,1)
  // Crossings: W at (0,0), L at (0,2)
  // ────────────────────────────────────────────
  {
    id: 'cw-easy-021',
    difficulty: 'easy',
    width: 8,
    height: 8,
    grid: [
      ['W', 'O', 'L', 'K', 'E', '#', '#', '#'],
      ['U', '#', 'E', '#', '#', '#', '#', '#'],
      ['R', '#', 'E', '#', '#', '#', '#', '#'],
      ['M', '#', 'R', '#', '#', '#', '#', '#'],
      ['#', 'K', 'A', 'L', 'B', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Schwebt am Himmel, bringt Regen', answer: 'WOLKE', row: 0, col: 0 },
      { number: 1, direction: 'down', clue: 'Kleines Tier in der Erde', answer: 'WURM', row: 0, col: 0 },
      { number: 2, direction: 'down', clue: 'Ohne Inhalt, nichts drin', answer: 'LEER', row: 0, col: 2 },
      { number: 3, direction: 'across', clue: 'Junges Rind', answer: 'KALB', row: 4, col: 1 },
    ],
  },

  // ────────────────────────────────────────────
  // Puzzle 22 — 7x7
  // DOSE across (0,0), DORF down (0,0), REIS across (2,0), OFEN across (4,1)
  // Crossings: D at (0,0), R at (2,0)
  // ────────────────────────────────────────────
  {
    id: 'cw-easy-022',
    difficulty: 'easy',
    width: 7,
    height: 7,
    grid: [
      ['D', 'O', 'S', 'E', '#', '#', '#'],
      ['O', '#', '#', '#', '#', '#', '#'],
      ['R', 'E', 'I', 'S', '#', '#', '#'],
      ['F', '#', '#', '#', '#', '#', '#'],
      ['#', 'O', 'F', 'E', 'N', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Behälter aus Blech', answer: 'DOSE', row: 0, col: 0 },
      { number: 1, direction: 'down', clue: 'Kleine Ortschaft auf dem Land', answer: 'DORF', row: 0, col: 0 },
      { number: 2, direction: 'across', clue: 'Weißes Korn, oft zu Gerichten', answer: 'REIS', row: 2, col: 0 },
      { number: 3, direction: 'across', clue: 'Heizt die Wohnung', answer: 'OFEN', row: 4, col: 1 },
    ],
  },

  // ────────────────────────────────────────────
  // Puzzle 23 — 8x8
  // TANNE across (0,0), TASSE down (0,0), NADEL down (0,2), ENTE down (0,4)
  // Crossings: T at (0,0), N at (0,2), E at (0,4)
  // ────────────────────────────────────────────
  {
    id: 'cw-easy-023',
    difficulty: 'easy',
    width: 8,
    height: 8,
    grid: [
      ['T', 'A', 'N', 'N', 'E', '#', '#', '#'],
      ['A', '#', 'A', '#', 'N', '#', '#', '#'],
      ['S', '#', 'D', '#', 'T', '#', '#', '#'],
      ['S', '#', 'E', '#', 'E', '#', '#', '#'],
      ['E', '#', 'L', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Nadelbaum, oft als Weihnachtsbaum', answer: 'TANNE', row: 0, col: 0 },
      { number: 1, direction: 'down', clue: 'Gefäß für Kaffee oder Tee', answer: 'TASSE', row: 0, col: 0 },
      { number: 2, direction: 'down', clue: 'Dünnes Werkzeug zum Nähen', answer: 'NADEL', row: 0, col: 2 },
      { number: 3, direction: 'down', clue: 'Vogel auf dem Wasser', answer: 'ENTE', row: 0, col: 4 },
    ],
  },

  // ────────────────────────────────────────────
  // Puzzle 24 — 8x8
  // HAFEN across (0,0), HELM down (0,0), FEDER down (0,2), NAGEL down (0,4)
  // Crossings: H at (0,0), F at (0,2), N at (0,4)
  // ────────────────────────────────────────────
  {
    id: 'cw-easy-024',
    difficulty: 'easy',
    width: 8,
    height: 8,
    grid: [
      ['H', 'A', 'F', 'E', 'N', '#', '#', '#'],
      ['E', '#', 'E', '#', 'A', '#', '#', '#'],
      ['L', '#', 'D', '#', 'G', '#', '#', '#'],
      ['M', '#', 'E', '#', 'E', '#', '#', '#'],
      ['#', '#', 'R', '#', 'L', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Ort für Schiffe am Meer', answer: 'HAFEN', row: 0, col: 0 },
      { number: 1, direction: 'down', clue: 'Schutz für den Kopf', answer: 'HELM', row: 0, col: 0 },
      { number: 2, direction: 'down', clue: 'Leichtes Ding vom Vogel', answer: 'FEDER', row: 0, col: 2 },
      { number: 3, direction: 'down', clue: 'Spitzer Metallstift zum Hämmern', answer: 'NAGEL', row: 0, col: 4 },
    ],
  },

  // ────────────────────────────────────────────
  // Puzzle 25 — 8x8
  // TAFEL across (0,0), TOPF down (0,0), FARBE down (0,2), ALTER across (5,1)
  // Crossings: T at (0,0), F at (0,2)
  // ────────────────────────────────────────────
  {
    id: 'cw-easy-025',
    difficulty: 'easy',
    width: 8,
    height: 8,
    grid: [
      ['T', 'A', 'F', 'E', 'L', '#', '#', '#'],
      ['O', '#', 'A', '#', '#', '#', '#', '#'],
      ['P', '#', 'R', '#', '#', '#', '#', '#'],
      ['F', '#', 'B', '#', '#', '#', '#', '#'],
      ['#', '#', 'E', '#', '#', '#', '#', '#'],
      ['#', 'A', 'L', 'T', 'E', 'R', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Schreibfläche in der Schule', answer: 'TAFEL', row: 0, col: 0 },
      { number: 1, direction: 'down', clue: 'Gefäß zum Kochen auf dem Herd', answer: 'TOPF', row: 0, col: 0 },
      { number: 2, direction: 'down', clue: 'Rot, Blau, Grün zum Beispiel', answer: 'FARBE', row: 0, col: 2 },
      { number: 3, direction: 'across', clue: 'Wie alt jemand ist', answer: 'ALTER', row: 5, col: 1 },
    ],
  },

  // ────────────────────────────────────────────
  // Puzzle 26 — 8x8
  // SAND across (0,0), SUPPE down (0,0), DECKE down (0,3), AST across (5,1)
  // Crossings: S at (0,0), D at (0,3)
  // ────────────────────────────────────────────
  {
    id: 'cw-easy-026',
    difficulty: 'easy',
    width: 8,
    height: 8,
    grid: [
      ['S', 'A', 'N', 'D', '#', '#', '#', '#'],
      ['U', '#', '#', 'E', '#', '#', '#', '#'],
      ['P', '#', '#', 'C', '#', '#', '#', '#'],
      ['P', '#', '#', 'K', '#', '#', '#', '#'],
      ['E', '#', '#', 'E', '#', '#', '#', '#'],
      ['#', 'A', 'S', 'T', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Feine Körner am Strand', answer: 'SAND', row: 0, col: 0 },
      { number: 1, direction: 'down', clue: 'Warmes Gericht mit Brühe', answer: 'SUPPE', row: 0, col: 0 },
      { number: 2, direction: 'down', clue: 'Liegt auf dem Bett und wärmt', answer: 'DECKE', row: 0, col: 3 },
      { number: 3, direction: 'across', clue: 'Zweig am Baum', answer: 'AST', row: 5, col: 1 },
    ],
  },

  // ────────────────────────────────────────────
  // Puzzle 27 — 7x7
  // KORB across (0,0), KUSS down (0,0), ROSE down (0,2), BART across (4,1)
  // Crossings: K at (0,0), R at (0,2)
  // ────────────────────────────────────────────
  {
    id: 'cw-easy-027',
    difficulty: 'easy',
    width: 7,
    height: 7,
    grid: [
      ['K', 'O', 'R', 'B', '#', '#', '#'],
      ['U', '#', 'O', '#', '#', '#', '#'],
      ['S', '#', 'S', '#', '#', '#', '#'],
      ['S', '#', 'E', '#', '#', '#', '#'],
      ['#', 'B', 'A', 'R', 'T', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Geflochtener Behälter', answer: 'KORB', row: 0, col: 0 },
      { number: 1, direction: 'down', clue: 'Zeichen der Zuneigung', answer: 'KUSS', row: 0, col: 0 },
      { number: 2, direction: 'down', clue: 'Rote Blume mit Dornen', answer: 'ROSE', row: 0, col: 2 },
      { number: 3, direction: 'across', clue: 'Haare im Gesicht des Mannes', answer: 'BART', row: 4, col: 1 },
    ],
  },

  // ────────────────────────────────────────────
  // Puzzle 28 — 8x8
  // MARKT across (0,0), MAUS down (0,0), RUHE down (0,2), KERZE across (4,1)
  // Crossings: M at (0,0), R at (0,2)
  // ────────────────────────────────────────────
  {
    id: 'cw-easy-028',
    difficulty: 'easy',
    width: 8,
    height: 8,
    grid: [
      ['M', 'A', 'R', 'K', 'T', '#', '#', '#'],
      ['A', '#', 'U', '#', '#', '#', '#', '#'],
      ['U', '#', 'H', '#', '#', '#', '#', '#'],
      ['S', '#', 'E', '#', '#', '#', '#', '#'],
      ['#', 'K', 'E', 'R', 'Z', 'E', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Platz zum Einkaufen in der Stadt', answer: 'MARKT', row: 0, col: 0 },
      { number: 1, direction: 'down', clue: 'Kleines graues Nagetier', answer: 'MAUS', row: 0, col: 0 },
      { number: 2, direction: 'down', clue: 'Stille, Entspannung', answer: 'RUHE', row: 0, col: 2 },
      { number: 3, direction: 'across', clue: 'Brennt mit einer kleinen Flamme', answer: 'KERZE', row: 4, col: 1 },
    ],
  },

  // ────────────────────────────────────────────
  // Puzzle 29 — 8x8
  // PFERD across (0,0), PUPPE down (0,0), FEST down (0,1), GABEL across (2,2)
  // Crossings: P at (0,0), F at (0,1)
  // ────────────────────────────────────────────
  {
    id: 'cw-easy-029',
    difficulty: 'easy',
    width: 8,
    height: 8,
    grid: [
      ['P', 'F', 'E', 'R', 'D', '#', '#', '#'],
      ['U', 'E', '#', '#', '#', '#', '#', '#'],
      ['P', 'S', 'G', 'A', 'B', 'E', 'L', '#'],
      ['P', 'T', '#', '#', '#', '#', '#', '#'],
      ['E', '#', '#', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Großes Tier zum Reiten', answer: 'PFERD', row: 0, col: 0 },
      { number: 1, direction: 'down', clue: 'Spielzeug für kleine Kinder', answer: 'PUPPE', row: 0, col: 0 },
      { number: 2, direction: 'down', clue: 'Feier, Veranstaltung', answer: 'FEST', row: 0, col: 1 },
      { number: 3, direction: 'across', clue: 'Besteck zum Essen', answer: 'GABEL', row: 2, col: 2 },
    ],
  },

  // ────────────────────────────────────────────
  // Puzzle 30 — 8x8
  // WIESE across (0,0), WAND down (0,0), ECKE down (0,2), IGEL across (4,1)
  // Crossings: W at (0,0), E at (0,2)
  // ────────────────────────────────────────────
  {
    id: 'cw-easy-030',
    difficulty: 'easy',
    width: 8,
    height: 8,
    grid: [
      ['W', 'I', 'E', 'S', 'E', '#', '#', '#'],
      ['A', '#', 'C', '#', '#', '#', '#', '#'],
      ['N', '#', 'K', '#', '#', '#', '#', '#'],
      ['D', '#', 'E', '#', '#', '#', '#', '#'],
      ['#', 'I', 'G', 'E', 'L', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Grüne Fläche mit Gras', answer: 'WIESE', row: 0, col: 0 },
      { number: 1, direction: 'down', clue: 'Fläche im Zimmer, senkrecht', answer: 'WAND', row: 0, col: 0 },
      { number: 2, direction: 'down', clue: 'Winkel im Raum', answer: 'ECKE', row: 0, col: 2 },
      { number: 3, direction: 'across', clue: 'Stacheliges Tier im Garten', answer: 'IGEL', row: 4, col: 1 },
    ],
  },
]
