import type { CrosswordPuzzleData } from './types'

export const mediumPuzzles: CrosswordPuzzleData[] = [
  // Puzzle 1 (9x9): SOMMER, STEIN, NACHT (across) + MEISE, EIGEN, SEEN, NEST (down)
  {
    id: 'cw-med-001',
    difficulty: 'medium',
    width: 9,
    height: 9,
    grid: [
      ['S', 'O', 'M', 'M', 'E', 'R', '#', '#', '#'],
      ['#', '#', 'E', '#', 'I', '#', '#', '#', '#'],
      ['#', '#', 'I', '#', 'G', '#', '#', '#', '#'],
      ['#', '#', 'S', '#', 'E', '#', '#', '#', '#'],
      ['S', 'T', 'E', 'I', 'N', '#', '#', '#', '#'],
      ['E', '#', '#', '#', 'E', '#', '#', '#', '#'],
      ['E', '#', '#', '#', 'S', '#', '#', '#', '#'],
      ['N', 'A', 'C', 'H', 'T', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Warme Jahreszeit', answer: 'SOMMER', row: 0, col: 0 },
      { number: 2, direction: 'across', clue: 'Hartes Material in der Natur', answer: 'STEIN', row: 4, col: 0 },
      { number: 3, direction: 'across', clue: 'Dunkle Tageszeit', answer: 'NACHT', row: 7, col: 0 },
      { number: 4, direction: 'down', clue: 'Kleiner Singvogel', answer: 'MEISE', row: 0, col: 2 },
      { number: 5, direction: 'down', clue: 'Selbstständig, unabhängig', answer: 'EIGEN', row: 0, col: 4 },
      { number: 6, direction: 'down', clue: 'Gewässer (Mehrzahl)', answer: 'SEEN', row: 4, col: 0 },
      { number: 7, direction: 'down', clue: 'Zuhause eines Vogels', answer: 'NEST', row: 4, col: 4 },
    ],
  },

  // Puzzle 2 (9x9): GARTEN, INSEL, ABEND (across) + AHORN, TASSE, ENGEL, LIED (down)
  {
    id: 'cw-med-002',
    difficulty: 'medium',
    width: 9,
    height: 9,
    grid: [
      ['#', '#', '#', '#', '#', '#', '#', '#', '#'],
      ['G', 'A', 'R', 'T', 'E', 'N', '#', '#', '#'],
      ['#', 'H', '#', 'A', 'N', '#', '#', '#', '#'],
      ['#', 'O', '#', 'S', 'G', '#', '#', '#', '#'],
      ['#', 'R', '#', 'S', 'E', '#', '#', '#', '#'],
      ['I', 'N', 'S', 'E', 'L', '#', '#', '#', '#'],
      ['#', '#', '#', '#', 'I', '#', '#', '#', '#'],
      ['#', '#', '#', '#', 'E', '#', '#', '#', '#'],
      ['A', 'B', 'E', 'N', 'D', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Bereich mit Pflanzen hinter dem Haus', answer: 'GARTEN', row: 1, col: 0 },
      { number: 2, direction: 'across', clue: 'Von Wasser umgebenes Land', answer: 'INSEL', row: 5, col: 0 },
      { number: 3, direction: 'across', clue: 'Tageszeit vor der Nacht', answer: 'ABEND', row: 8, col: 0 },
      { number: 4, direction: 'down', clue: 'Laubbaum mit geflügelten Früchten', answer: 'AHORN', row: 1, col: 1 },
      { number: 5, direction: 'down', clue: 'Trinkgefäß mit Untertasse', answer: 'TASSE', row: 1, col: 3 },
      { number: 6, direction: 'down', clue: 'Himmlisches Wesen mit Flügeln', answer: 'ENGEL', row: 1, col: 4 },
      { number: 7, direction: 'down', clue: 'Kurzes Musikstück zum Singen', answer: 'LIED', row: 5, col: 4 },
    ],
  },

  // Puzzle 3 (9x9): SCHULE, FARBE, TRAUM (across) + HUMOR, LIEBE, FEST, ROSA (down)
  {
    id: 'cw-med-003',
    difficulty: 'medium',
    width: 9,
    height: 9,
    grid: [
      ['S', 'C', 'H', 'U', 'L', 'E', '#', '#', '#'],
      ['#', '#', 'U', '#', 'I', '#', '#', '#', '#'],
      ['#', '#', 'M', '#', 'E', '#', '#', '#', '#'],
      ['#', '#', 'O', '#', 'B', '#', '#', '#', '#'],
      ['F', 'A', 'R', 'B', 'E', '#', '#', '#', '#'],
      ['E', '#', 'O', '#', '#', '#', '#', '#', '#'],
      ['S', '#', 'S', '#', '#', '#', '#', '#', '#'],
      ['T', 'R', 'A', 'U', 'M', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Ort, an dem Kinder lernen', answer: 'SCHULE', row: 0, col: 0 },
      { number: 2, direction: 'across', clue: 'Bunte Eigenschaft eines Objekts', answer: 'FARBE', row: 4, col: 0 },
      { number: 3, direction: 'across', clue: 'Etwas, das man im Schlaf erlebt', answer: 'TRAUM', row: 7, col: 0 },
      { number: 4, direction: 'down', clue: 'Sinn für das Komische', answer: 'HUMOR', row: 0, col: 2 },
      { number: 5, direction: 'down', clue: 'Tiefes Gefühl der Zuneigung', answer: 'LIEBE', row: 0, col: 4 },
      { number: 6, direction: 'down', clue: 'Feier oder Veranstaltung', answer: 'FEST', row: 4, col: 0 },
      { number: 7, direction: 'down', clue: 'Blassrote Farbe', answer: 'ROSA', row: 4, col: 2 },
    ],
  },

  // Puzzle 4 (9x9): MORGEN, WASSER, LICHT (across) + OPERA, ERNTE, APFEL, RECHT (down)
  {
    id: 'cw-med-004',
    difficulty: 'medium',
    width: 9,
    height: 9,
    grid: [
      ['M', 'O', 'R', 'G', 'E', 'N', '#', '#', '#'],
      ['#', 'P', '#', '#', 'R', '#', '#', '#', '#'],
      ['#', 'E', '#', '#', 'N', '#', '#', '#', '#'],
      ['#', 'R', '#', '#', 'T', '#', '#', '#', '#'],
      ['W', 'A', 'S', 'S', 'E', 'R', '#', '#', '#'],
      ['#', 'P', '#', '#', '#', 'E', '#', '#', '#'],
      ['#', 'F', '#', '#', '#', 'C', '#', '#', '#'],
      ['#', 'E', '#', '#', '#', 'H', '#', '#', '#'],
      ['#', 'L', 'I', 'C', 'H', 'T', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Tageszeit nach der Nacht', answer: 'MORGEN', row: 0, col: 0 },
      { number: 2, direction: 'across', clue: 'Klare Flüssigkeit zum Trinken', answer: 'WASSER', row: 4, col: 0 },
      { number: 3, direction: 'across', clue: 'Das Gegenteil von Dunkelheit', answer: 'LICHT', row: 8, col: 1 },
      { number: 4, direction: 'down', clue: 'Musikalisches Bühnenwerk', answer: 'OPERA', row: 0, col: 1 },
      { number: 5, direction: 'down', clue: 'Einbringen der Feldfrüchte', answer: 'ERNTE', row: 0, col: 4 },
      { number: 6, direction: 'down', clue: 'Beliebte Frucht, rot oder grün', answer: 'APFEL', row: 4, col: 1 },
      { number: 7, direction: 'down', clue: 'Gesetz oder Anspruch', answer: 'RECHT', row: 4, col: 5 },
    ],
  },

  // Puzzle 5 (9x9): ARBEIT, FEUER, ABEND (across) + ROSE, BIENE, TIGER, ERDE (down)
  {
    id: 'cw-med-005',
    difficulty: 'medium',
    width: 9,
    height: 9,
    grid: [
      ['#', '#', '#', '#', '#', '#', '#', '#', '#'],
      ['A', 'R', 'B', 'E', 'I', 'T', '#', '#', '#'],
      ['#', 'O', 'I', '#', '#', 'I', '#', '#', '#'],
      ['#', 'S', 'E', '#', '#', 'G', '#', '#', '#'],
      ['#', 'E', 'N', '#', '#', 'E', '#', '#', '#'],
      ['#', 'F', 'E', 'U', 'E', 'R', '#', '#', '#'],
      ['#', '#', 'R', '#', '#', '#', '#', '#', '#'],
      ['#', '#', 'D', '#', '#', '#', '#', '#', '#'],
      ['A', 'B', 'E', 'N', 'D', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Tägliche Beschäftigung im Beruf', answer: 'ARBEIT', row: 1, col: 0 },
      { number: 2, direction: 'across', clue: 'Heiße Flamme', answer: 'FEUER', row: 5, col: 1 },
      { number: 3, direction: 'across', clue: 'Tageszeit vor der Nacht', answer: 'ABEND', row: 8, col: 0 },
      { number: 4, direction: 'down', clue: 'Beliebte Gartenblume mit Dornen', answer: 'ROSE', row: 1, col: 1 },
      { number: 5, direction: 'down', clue: 'Insekt, das Honig sammelt', answer: 'BIENE', row: 1, col: 2 },
      { number: 6, direction: 'down', clue: 'Großes Raubtier mit Streifen', answer: 'TIGER', row: 1, col: 5 },
      { number: 7, direction: 'down', clue: 'Unser Planet', answer: 'ERDE', row: 5, col: 2 },
    ],
  },

  // Puzzle 6 (10x10): KIRCHE, STRAND, FREUND (across) + KREIS, ELEND, TENOR, RUINE (down)
  {
    id: 'cw-med-006',
    difficulty: 'medium',
    width: 10,
    height: 10,
    grid: [
      ['K', 'I', 'R', 'C', 'H', 'E', '#', '#', '#', '#'],
      ['R', '#', '#', '#', '#', 'L', '#', '#', '#', '#'],
      ['E', '#', '#', '#', '#', 'E', '#', '#', '#', '#'],
      ['I', '#', '#', '#', '#', 'N', '#', '#', '#', '#'],
      ['S', 'T', 'R', 'A', 'N', 'D', '#', '#', '#', '#'],
      ['#', 'E', 'U', '#', '#', '#', '#', '#', '#', '#'],
      ['#', 'N', 'I', '#', '#', '#', '#', '#', '#', '#'],
      ['#', 'O', 'N', '#', '#', '#', '#', '#', '#', '#'],
      ['F', 'R', 'E', 'U', 'N', 'D', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Gotteshaus im Dorf', answer: 'KIRCHE', row: 0, col: 0 },
      { number: 2, direction: 'across', clue: 'Sandiger Bereich am Meer', answer: 'STRAND', row: 4, col: 0 },
      { number: 3, direction: 'across', clue: 'Person, die man gern hat', answer: 'FREUND', row: 8, col: 0 },
      { number: 4, direction: 'down', clue: 'Runde geometrische Form', answer: 'KREIS', row: 0, col: 0 },
      { number: 5, direction: 'down', clue: 'Großes Leid oder Not', answer: 'ELEND', row: 0, col: 5 },
      { number: 6, direction: 'down', clue: 'Hohe Singstimme bei Männern', answer: 'TENOR', row: 4, col: 1 },
      { number: 7, direction: 'down', clue: 'Verfallenes altes Gebäude', answer: 'RUINE', row: 4, col: 2 },
    ],
  },

  // Puzzle 7 (9x9): WINTER, BLUME, NACHT (across) + INSEL, ELITE, LOHN, RECHT (down)
  {
    id: 'cw-med-007',
    difficulty: 'medium',
    width: 9,
    height: 9,
    grid: [
      ['W', 'I', 'N', 'T', 'E', 'R', '#', '#', '#'],
      ['#', 'N', '#', '#', 'L', 'E', '#', '#', '#'],
      ['#', 'S', '#', '#', 'I', 'C', '#', '#', '#'],
      ['#', 'E', '#', '#', 'T', 'H', '#', '#', '#'],
      ['B', 'L', 'U', 'M', 'E', 'T', '#', '#', '#'],
      ['#', 'O', '#', '#', '#', '#', '#', '#', '#'],
      ['#', 'H', '#', '#', '#', '#', '#', '#', '#'],
      ['#', 'N', 'A', 'C', 'H', 'T', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Kalte Jahreszeit mit Schnee', answer: 'WINTER', row: 0, col: 0 },
      { number: 2, direction: 'across', clue: 'Einzelne Pflanze im Garten', answer: 'BLUME', row: 4, col: 0 },
      { number: 3, direction: 'across', clue: 'Zeit der Dunkelheit', answer: 'NACHT', row: 7, col: 1 },
      { number: 4, direction: 'down', clue: 'Von Wasser umgebenes Land', answer: 'INSEL', row: 0, col: 1 },
      { number: 5, direction: 'down', clue: 'Ausgewählte Spitzengruppe', answer: 'ELITE', row: 0, col: 4 },
      { number: 6, direction: 'down', clue: 'Monatliches Gehalt', answer: 'LOHN', row: 4, col: 1 },
      { number: 7, direction: 'down', clue: 'Anspruch nach dem Gesetz', answer: 'RECHT', row: 0, col: 5 },
    ],
  },

  // Puzzle 8 (9x9): HERBST, LEHRER, TURM (across) + HAGEL, RAUCH, BAUER (down)
  // HERBST(1,0): H(1,0) E(1,1) R(1,2) B(1,3) S(1,4) T(1,5)
  // LEHRER(5,0): L(5,0) E(5,1) H(5,2) R(5,3) E(5,4) R(5,5)
  // TURM(8,0): T(8,0) U(8,1) R(8,2) M(8,3)
  // HAGEL(1,0)dn: H(1,0) A(2,0) G(3,0) E(4,0) L(5,0) — H=HERBST[0]✓, L=LEHRER[0]✓
  // RAUCH(1,2)dn: R(1,2) A(2,2) U(3,2) C(4,2) H(5,2) — R=HERBST[2]✓, H=LEHRER[2]✓
  // BAUER(1,3)dn: B(1,3) A(2,3) U(3,3) E(4,3) R(5,3) — B=HERBST[3]✓, R=LEHRER[3]✓
  // LEHR->TURM: col 0: L(5,0)...T(8,0) = LOST? L O S T? L(5,0) O(6,0) S(7,0) T(8,0) ✓
  // So add LOST down — but that's English. Use TORT? No.
  // Simpler: TURM at (8,2): T(8,2) U(8,3) R(8,4) M(8,5)
  //   col 2: H(5,2)...T(8,2) = 4: H??T — HORT! H(5,2) O(6,2) R(7,2) T(8,2) ✓
  // Now: HERBST, LEHRER, TURM (3 across) + HAGEL, RAUCH, BAUER, HORT (4 down) = 7 ✓
  // Verify HORT: H(5,2)=LEHRER[2]✓, T(8,2)=TURM[0]✓
  {
    id: 'cw-med-008',
    difficulty: 'medium',
    width: 9,
    height: 9,
    grid: [
      ['#', '#', '#', '#', '#', '#', '#', '#', '#'],
      ['H', 'E', 'R', 'B', 'S', 'T', '#', '#', '#'],
      ['A', '#', 'A', 'A', '#', '#', '#', '#', '#'],
      ['G', '#', 'U', 'U', '#', '#', '#', '#', '#'],
      ['E', '#', 'C', 'E', '#', '#', '#', '#', '#'],
      ['L', 'E', 'H', 'R', 'E', 'R', '#', '#', '#'],
      ['#', '#', 'O', '#', '#', '#', '#', '#', '#'],
      ['#', '#', 'R', '#', '#', '#', '#', '#', '#'],
      ['#', '#', 'T', 'U', 'R', 'M', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Jahreszeit mit bunten Blättern', answer: 'HERBST', row: 1, col: 0 },
      { number: 2, direction: 'across', clue: 'Person, die Wissen vermittelt', answer: 'LEHRER', row: 5, col: 0 },
      { number: 3, direction: 'across', clue: 'Hoher Bau einer Burg', answer: 'TURM', row: 8, col: 2 },
      { number: 4, direction: 'down', clue: 'Gefrorener Regen', answer: 'HAGEL', row: 1, col: 0 },
      { number: 5, direction: 'down', clue: 'Aufsteigender Qualm', answer: 'RAUCH', row: 1, col: 2 },
      { number: 6, direction: 'down', clue: 'Landwirt auf dem Hof', answer: 'BAUER', row: 1, col: 3 },
      { number: 7, direction: 'down', clue: 'Sicherer Aufbewahrungsort', answer: 'HORT', row: 5, col: 2 },
    ],
  },

  // Puzzle 9 (9x9): SOMMER, DOKTOR, NATUR (across) + STAND, MUSIK, MARKT (down)
  // Dropped DORN and KOST to get 3 across + 3 down = 6. Need one more.
  // Add KOST back for 3+4=7. Actually wait — let me check:
  // STAND(1,0), MUSIK(1,2), MARKT(1,3), DORN(5,0), KOST(5,2) = 5 down.
  // Drop DORN and KOST: 3+3=6. Under minimum of 6? No, 6 is ok (spec says 6-9).
  // But I need 3-4 down. 3 is fine. Let me keep just STAND, MUSIK, MARKT = 3 down.
  // Actually let me add one back. Keep KOST (3+4=7, 4 down ✓). Drop DORN.
  {
    id: 'cw-med-009',
    difficulty: 'medium',
    width: 9,
    height: 9,
    grid: [
      ['#', '#', '#', '#', '#', '#', '#', '#', '#'],
      ['S', 'O', 'M', 'M', 'E', 'R', '#', '#', '#'],
      ['T', '#', 'U', 'A', '#', '#', '#', '#', '#'],
      ['A', '#', 'S', 'R', '#', '#', '#', '#', '#'],
      ['N', '#', 'I', 'K', '#', '#', '#', '#', '#'],
      ['D', 'O', 'K', 'T', 'O', 'R', '#', '#', '#'],
      ['#', '#', 'O', '#', '#', '#', '#', '#', '#'],
      ['#', '#', 'S', '#', '#', '#', '#', '#', '#'],
      ['N', 'A', 'T', 'U', 'R', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Warme Jahreszeit mit Sonne', answer: 'SOMMER', row: 1, col: 0 },
      { number: 2, direction: 'across', clue: 'Arzt mit Titel', answer: 'DOKTOR', row: 5, col: 0 },
      { number: 3, direction: 'across', clue: 'Die uns umgebende Welt', answer: 'NATUR', row: 8, col: 0 },
      { number: 4, direction: 'down', clue: 'Verkaufsplatz auf dem Markt', answer: 'STAND', row: 1, col: 0 },
      { number: 5, direction: 'down', clue: 'Kunst der Töne und Klänge', answer: 'MUSIK', row: 1, col: 2 },
      { number: 6, direction: 'down', clue: 'Handelsplatz in der Stadt', answer: 'MARKT', row: 1, col: 3 },
      { number: 7, direction: 'down', clue: 'Einfache Nahrung, Verpflegung', answer: 'KOST', row: 5, col: 2 },
    ],
  },

  // Puzzle 10 (10x10): GARTEN, MUTTER, REISE (across) + RECHT, TROST, EBENE, TIER (down)
  // Dropped TORE to get 3+4=7 (was 3+5=8)
  {
    id: 'cw-med-010',
    difficulty: 'medium',
    width: 10,
    height: 10,
    grid: [
      ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
      ['G', 'A', 'R', 'T', 'E', 'N', '#', '#', '#', '#'],
      ['#', '#', 'E', 'R', 'B', '#', '#', '#', '#', '#'],
      ['#', '#', 'C', 'O', 'E', '#', '#', '#', '#', '#'],
      ['#', '#', 'H', 'S', 'N', '#', '#', '#', '#', '#'],
      ['M', 'U', 'T', 'T', 'E', 'R', '#', '#', '#', '#'],
      ['#', '#', 'I', '#', '#', '#', '#', '#', '#', '#'],
      ['#', '#', 'E', '#', '#', '#', '#', '#', '#', '#'],
      ['#', '#', 'R', 'E', 'I', 'S', 'E', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Bereich mit Pflanzen beim Haus', answer: 'GARTEN', row: 1, col: 0 },
      { number: 2, direction: 'across', clue: 'Weibliches Elternteil', answer: 'MUTTER', row: 5, col: 0 },
      { number: 3, direction: 'across', clue: 'Fahrt in ein anderes Land', answer: 'REISE', row: 8, col: 2 },
      { number: 4, direction: 'down', clue: 'Anspruch nach dem Gesetz', answer: 'RECHT', row: 1, col: 2 },
      { number: 5, direction: 'down', clue: 'Aufmunterung in schwerer Zeit', answer: 'TROST', row: 1, col: 3 },
      { number: 6, direction: 'down', clue: 'Flache Landschaft', answer: 'EBENE', row: 1, col: 4 },
      { number: 7, direction: 'down', clue: 'Lebewesen mit vier Beinen', answer: 'TIER', row: 5, col: 2 },
    ],
  },

  // Puzzle 11 (9x9): BLUMEN, FRIEDE, NARBE (across) + BRIEF, LASER, MEISE, ELEND (down)
  // Original had 2 across + 5 down. Fix: keep 4 down, use NARBE as across word.
  // BLUMEN(1,0): B L U M E N
  // FRIEDE(5,0): F R I E D E
  // BRIEF(1,0)dn, LASER(1,1)dn, MEISE(1,3)dn, ELEND(1,4)dn = 4 down
  // Need 3rd across. Row 3 has: I(3,0) from BRIEF, S(3,1) from LASER, I(3,3) from MEISE, E(3,4) from ELEND.
  // NARBE was 5th down. Instead let me add across word at row 8.
  // BRIEF(1,0)dn: B(1,0) R(2,0) I(3,0) E(4,0) F(5,0) ✓
  // LASER(1,1)dn: L(1,1) A(2,1) S(3,1) E(4,1) R(5,1) ✓
  // MEISE(1,3)dn: M(1,3) E(2,3) I(3,3) S(4,3) E(5,3) ✓
  // ELEND(1,4)dn: E(1,4) L(2,4) E(3,4) N(4,4) D(5,4) ✓
  // Add REGAL across (8,0): R E G A L — no crossings, that's weak.
  // Better: add a word on row 3 crossing existing down words.
  // Row 3: I(3,0) S(3,1) ?(3,2) I(3,3) E(3,4) — IS?IE — no word.
  // Row 2: R(2,0) A(2,1) ?(2,2) E(2,3) L(2,4) — RA?EL — RATEL? RASEL? RABEL? no.
  //   RA?EL — RAVEL? no German. RAGEL? no.
  // Hmm. Let me use a slightly different structure.
  // Drop LASER and ELEND (now 2 across + 2 down = 4, too few).
  // New approach:
  // BLUMEN(1,0), FRIEDE(5,0), WOLKE(8,0) = 3 across
  // BRIEF(1,0)dn: B(1,0) R(2,0) I(3,0) E(4,0) F(5,0) ✓
  // MEISE(1,3)dn: M(1,3) E(2,3) I(3,3) S(4,3) E(5,3) ✓
  // NARBE(1,5)dn: N(1,5) A(2,5) R(3,5) B(4,5) E(5,5) ✓ — N=BLUMEN[5]✓, E=FRIEDE[5]✓
  // WOLKE(8,0): W(8,0) O(8,1) L(8,2) K(8,3) E(8,4)
  // Need down connecting FRIEDE to WOLKE.
  //   col 0: F(5,0)...W(8,0) = 4: F??W — no.
  //   col 3: E(5,3)...K(8,3) = 4: E??K — no.
  //   col 4: D(5,4)...E(8,4) = 4: D??E — DOSE! D(5,4) O(6,4) S(7,4) E(8,4) ✓
  // BLUMEN, FRIEDE, WOLKE (3 across) + BRIEF, MEISE, NARBE, DOSE (4 down) = 7 ✓
  {
    id: 'cw-med-011',
    difficulty: 'medium',
    width: 9,
    height: 9,
    grid: [
      ['#', '#', '#', '#', '#', '#', '#', '#', '#'],
      ['B', 'L', 'U', 'M', 'E', 'N', '#', '#', '#'],
      ['R', '#', '#', 'E', '#', 'A', '#', '#', '#'],
      ['I', '#', '#', 'I', '#', 'R', '#', '#', '#'],
      ['E', '#', '#', 'S', '#', 'B', '#', '#', '#'],
      ['F', 'R', 'I', 'E', 'D', 'E', '#', '#', '#'],
      ['#', '#', '#', '#', 'O', '#', '#', '#', '#'],
      ['#', '#', '#', '#', 'S', '#', '#', '#', '#'],
      ['W', 'O', 'L', 'K', 'E', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Bunte Pflanzen im Garten', answer: 'BLUMEN', row: 1, col: 0 },
      { number: 2, direction: 'across', clue: 'Zustand ohne Krieg', answer: 'FRIEDE', row: 5, col: 0 },
      { number: 3, direction: 'across', clue: 'Weiße Form am Himmel', answer: 'WOLKE', row: 8, col: 0 },
      { number: 4, direction: 'down', clue: 'Nachricht auf Papier', answer: 'BRIEF', row: 1, col: 0 },
      { number: 5, direction: 'down', clue: 'Kleiner Singvogel', answer: 'MEISE', row: 1, col: 3 },
      { number: 6, direction: 'down', clue: 'Zeichen einer verheilten Wunde', answer: 'NARBE', row: 1, col: 5 },
      { number: 7, direction: 'down', clue: 'Behälter mit Deckel', answer: 'DOSE', row: 5, col: 4 },
    ],
  },

  // Puzzle 12 (9x9): SCHNEE, QUELLE, WAGEN (across) + HALBE, NAGEL, ENKEL, EBEN (down)
  {
    id: 'cw-med-012',
    difficulty: 'medium',
    width: 9,
    height: 9,
    grid: [
      ['#', '#', '#', '#', '#', '#', '#', '#', '#'],
      ['S', 'C', 'H', 'N', 'E', 'E', '#', '#', '#'],
      ['#', '#', 'A', 'A', 'N', '#', '#', '#', '#'],
      ['#', '#', 'L', 'G', 'K', '#', '#', '#', '#'],
      ['#', '#', 'B', 'E', 'E', '#', '#', '#', '#'],
      ['Q', 'U', 'E', 'L', 'L', 'E', '#', '#', '#'],
      ['#', '#', '#', '#', '#', 'B', '#', '#', '#'],
      ['#', '#', '#', '#', '#', 'E', '#', '#', '#'],
      ['#', 'W', 'A', 'G', 'E', 'N', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Weiße Flocken im Winter', answer: 'SCHNEE', row: 1, col: 0 },
      { number: 2, direction: 'across', clue: 'Ursprung eines Flusses', answer: 'QUELLE', row: 5, col: 0 },
      { number: 3, direction: 'across', clue: 'Fahrzeug auf Rädern', answer: 'WAGEN', row: 8, col: 1 },
      { number: 4, direction: 'down', clue: 'Nicht ganz, sondern nur ...', answer: 'HALBE', row: 1, col: 2 },
      { number: 5, direction: 'down', clue: 'Metallstift zum Aufhängen', answer: 'NAGEL', row: 1, col: 3 },
      { number: 6, direction: 'down', clue: 'Kind des eigenen Kindes', answer: 'ENKEL', row: 1, col: 4 },
      { number: 7, direction: 'down', clue: 'Flach und gleichmäßig', answer: 'EBEN', row: 5, col: 5 },
    ],
  },

  // Puzzle 13 (9x9): FEUER, WASSER, STEIN (across) + EXTRA, RUINE, ANIS, REIN (down)
  {
    id: 'cw-med-013',
    difficulty: 'medium',
    width: 9,
    height: 9,
    grid: [
      ['#', '#', '#', '#', '#', '#', '#', '#', '#'],
      ['F', 'E', 'U', 'E', 'R', '#', '#', '#', '#'],
      ['#', 'X', '#', '#', 'U', '#', '#', '#', '#'],
      ['#', 'T', '#', '#', 'I', '#', '#', '#', '#'],
      ['#', 'R', '#', '#', 'N', '#', '#', '#', '#'],
      ['W', 'A', 'S', 'S', 'E', 'R', '#', '#', '#'],
      ['#', 'N', '#', '#', '#', 'E', '#', '#', '#'],
      ['#', 'I', '#', '#', '#', 'I', '#', '#', '#'],
      ['#', 'S', 'T', 'E', 'I', 'N', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Heiße Flamme zum Wärmen', answer: 'FEUER', row: 1, col: 0 },
      { number: 2, direction: 'across', clue: 'Lebensnotwendige Flüssigkeit', answer: 'WASSER', row: 5, col: 0 },
      { number: 3, direction: 'across', clue: 'Hartes Material in der Natur', answer: 'STEIN', row: 8, col: 1 },
      { number: 4, direction: 'down', clue: 'Besonders, außergewöhnlich', answer: 'EXTRA', row: 1, col: 1 },
      { number: 5, direction: 'down', clue: 'Verfallenes altes Gebäude', answer: 'RUINE', row: 1, col: 4 },
      { number: 6, direction: 'down', clue: 'Gewürz mit Lakritzgeschmack', answer: 'ANIS', row: 5, col: 1 },
      { number: 7, direction: 'down', clue: 'Sauber und klar', answer: 'REIN', row: 5, col: 5 },
    ],
  },

  // Puzzle 14 (9x9): ZIMMER, VATER, MALER (across) + MARKT, MEISE, EINER, ENGE (down)
  {
    id: 'cw-med-014',
    difficulty: 'medium',
    width: 9,
    height: 9,
    grid: [
      ['#', '#', '#', '#', '#', '#', '#', '#', '#'],
      ['Z', 'I', 'M', 'M', 'E', 'R', '#', '#', '#'],
      ['#', '#', 'A', 'E', 'I', '#', '#', '#', '#'],
      ['#', '#', 'R', 'I', 'N', '#', '#', '#', '#'],
      ['#', '#', 'K', 'S', 'E', '#', '#', '#', '#'],
      ['V', 'A', 'T', 'E', 'R', '#', '#', '#', '#'],
      ['#', '#', '#', 'N', '#', '#', '#', '#', '#'],
      ['#', '#', '#', 'G', '#', '#', '#', '#', '#'],
      ['M', 'A', 'L', 'E', 'R', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Raum in einer Wohnung', answer: 'ZIMMER', row: 1, col: 0 },
      { number: 2, direction: 'across', clue: 'Männliches Elternteil', answer: 'VATER', row: 5, col: 0 },
      { number: 3, direction: 'across', clue: 'Künstler mit Pinsel', answer: 'MALER', row: 8, col: 0 },
      { number: 4, direction: 'down', clue: 'Handelsplatz in der Stadt', answer: 'MARKT', row: 1, col: 2 },
      { number: 5, direction: 'down', clue: 'Kleiner Singvogel', answer: 'MEISE', row: 1, col: 3 },
      { number: 6, direction: 'down', clue: 'Zahlwort: ein einzelner', answer: 'EINER', row: 1, col: 4 },
      { number: 7, direction: 'down', clue: 'Schmaler, beengter Raum', answer: 'ENGE', row: 5, col: 3 },
    ],
  },

  // Puzzle 15 (10x10): NACHBAR, SCHLOSS, REISE (across) + HOTEL, ATLAS, LAMPE, SORGE (down)
  {
    id: 'cw-med-015',
    difficulty: 'medium',
    width: 10,
    height: 10,
    grid: [
      ['N', 'A', 'C', 'H', 'B', 'A', 'R', '#', '#', '#'],
      ['#', '#', '#', 'O', '#', 'T', '#', '#', '#', '#'],
      ['#', '#', '#', 'T', '#', 'L', '#', '#', '#', '#'],
      ['#', '#', '#', 'E', '#', 'A', '#', '#', '#', '#'],
      ['S', 'C', 'H', 'L', 'O', 'S', 'S', '#', '#', '#'],
      ['#', '#', '#', 'A', '#', '#', 'O', '#', '#', '#'],
      ['#', '#', '#', 'M', '#', '#', 'R', '#', '#', '#'],
      ['#', '#', '#', 'P', '#', '#', 'G', '#', '#', '#'],
      ['#', '#', 'R', 'E', 'I', 'S', 'E', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Person, die nebenan wohnt', answer: 'NACHBAR', row: 0, col: 0 },
      { number: 2, direction: 'across', clue: 'Großes historisches Gebäude', answer: 'SCHLOSS', row: 4, col: 0 },
      { number: 3, direction: 'across', clue: 'Fahrt in ein anderes Land', answer: 'REISE', row: 8, col: 2 },
      { number: 4, direction: 'down', clue: 'Unterkunft für Reisende', answer: 'HOTEL', row: 0, col: 3 },
      { number: 5, direction: 'down', clue: 'Buch mit Landkarten', answer: 'ATLAS', row: 0, col: 5 },
      { number: 6, direction: 'down', clue: 'Leuchtmittel auf dem Tisch', answer: 'LAMPE', row: 4, col: 3 },
      { number: 7, direction: 'down', clue: 'Kummer oder Besorgnis', answer: 'SORGE', row: 4, col: 6 },
    ],
  },

  // Puzzle 16 (9x9): WOLKE, RING, GRABEN, KANTE (across) + OTTER, ERNTE, ENGE (down)
  {
    id: 'cw-med-016',
    difficulty: 'medium',
    width: 9,
    height: 9,
    grid: [
      ['#', '#', '#', '#', '#', '#', '#', '#', '#'],
      ['W', 'O', 'L', 'K', 'E', '#', '#', '#', '#'],
      ['#', 'T', '#', '#', 'R', '#', '#', '#', '#'],
      ['#', 'T', 'R', 'I', 'N', 'G', '#', '#', '#'],
      ['#', 'E', '#', '#', 'T', '#', '#', '#', '#'],
      ['G', 'R', 'A', 'B', 'E', 'N', '#', '#', '#'],
      ['#', '#', '#', '#', 'N', '#', '#', '#', '#'],
      ['#', '#', '#', '#', 'G', '#', '#', '#', '#'],
      ['K', 'A', 'N', 'T', 'E', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Weiße Form am Himmel', answer: 'WOLKE', row: 1, col: 0 },
      { number: 2, direction: 'across', clue: 'Schmaler Rundschmuck am Finger', answer: 'RING', row: 3, col: 2 },
      { number: 3, direction: 'across', clue: 'Vertiefung im Boden', answer: 'GRABEN', row: 5, col: 0 },
      { number: 4, direction: 'across', clue: 'Scharfer Rand eines Gegenstands', answer: 'KANTE', row: 8, col: 0 },
      { number: 5, direction: 'down', clue: 'Wasserlebewesen mit Fell', answer: 'OTTER', row: 1, col: 1 },
      { number: 6, direction: 'down', clue: 'Einbringen der Feldfrüchte', answer: 'ERNTE', row: 1, col: 4 },
      { number: 7, direction: 'down', clue: 'Schmaler, beengter Raum', answer: 'ENGE', row: 5, col: 4 },
    ],
  },

  // Puzzle 17 (9x9): FENSTER, RICHTER, DANK (across) + FEDER, TROST, EBENE, RIND (down)
  {
    id: 'cw-med-017',
    difficulty: 'medium',
    width: 9,
    height: 9,
    grid: [
      ['#', '#', '#', '#', '#', '#', '#', '#', '#'],
      ['F', 'E', 'N', 'S', 'T', 'E', 'R', '#', '#'],
      ['E', '#', '#', '#', 'R', 'B', '#', '#', '#'],
      ['D', '#', '#', '#', 'O', 'E', '#', '#', '#'],
      ['E', '#', '#', '#', 'S', 'N', '#', '#', '#'],
      ['R', 'I', 'C', 'H', 'T', 'E', 'R', '#', '#'],
      ['I', '#', '#', '#', '#', '#', '#', '#', '#'],
      ['N', '#', '#', '#', '#', '#', '#', '#', '#'],
      ['D', 'A', 'N', 'K', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Glasöffnung in der Wand', answer: 'FENSTER', row: 1, col: 0 },
      { number: 2, direction: 'across', clue: 'Person, die im Gericht urteilt', answer: 'RICHTER', row: 5, col: 0 },
      { number: 3, direction: 'across', clue: 'Ausdruck der Dankbarkeit', answer: 'DANK', row: 8, col: 0 },
      { number: 4, direction: 'down', clue: 'Schreibgerät eines Vogels', answer: 'FEDER', row: 1, col: 0 },
      { number: 5, direction: 'down', clue: 'Aufmunterung in schwerer Zeit', answer: 'TROST', row: 1, col: 4 },
      { number: 6, direction: 'down', clue: 'Flache Landschaft', answer: 'EBENE', row: 1, col: 5 },
      { number: 7, direction: 'down', clue: 'Großes Nutztier auf dem Bauernhof', answer: 'RIND', row: 5, col: 0 },
    ],
  },

  // Puzzle 18 (9x9): KINDER, STRAND, KRAFT (across) + KREBS, DELTA, EIGEN, DUFT (down)
  {
    id: 'cw-med-018',
    difficulty: 'medium',
    width: 9,
    height: 9,
    grid: [
      ['#', '#', '#', '#', '#', '#', '#', '#', '#'],
      ['K', 'I', 'N', 'D', 'E', 'R', '#', '#', '#'],
      ['R', '#', '#', 'E', 'I', '#', '#', '#', '#'],
      ['E', '#', '#', 'L', 'G', '#', '#', '#', '#'],
      ['B', '#', '#', 'T', 'E', '#', '#', '#', '#'],
      ['S', 'T', 'R', 'A', 'N', 'D', '#', '#', '#'],
      ['#', '#', '#', '#', '#', 'U', '#', '#', '#'],
      ['#', '#', '#', '#', '#', 'F', '#', '#', '#'],
      ['#', 'K', 'R', 'A', 'F', 'T', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Junge Menschen', answer: 'KINDER', row: 1, col: 0 },
      { number: 2, direction: 'across', clue: 'Sandiger Bereich am Meer', answer: 'STRAND', row: 5, col: 0 },
      { number: 3, direction: 'across', clue: 'Große Stärke und Energie', answer: 'KRAFT', row: 8, col: 1 },
      { number: 4, direction: 'down', clue: 'Meerestier mit Scheren', answer: 'KREBS', row: 1, col: 0 },
      { number: 5, direction: 'down', clue: 'Dreieckiges Flussgebiet', answer: 'DELTA', row: 1, col: 3 },
      { number: 6, direction: 'down', clue: 'Selbstständig, unabhängig', answer: 'EIGEN', row: 1, col: 4 },
      { number: 7, direction: 'down', clue: 'Angenehmer Geruch', answer: 'DUFT', row: 5, col: 5 },
    ],
  },

  // Puzzle 19 (9x9): FREUDE, MARKT, ELTERN (across) + RAUM, MEHL, ERST, DOCK (down)
  {
    id: 'cw-med-019',
    difficulty: 'medium',
    width: 9,
    height: 9,
    grid: [
      ['#', '#', '#', '#', '#', '#', '#', '#', '#'],
      ['F', 'R', 'E', 'U', 'D', 'E', '#', '#', '#'],
      ['#', 'A', '#', '#', 'O', 'R', '#', '#', '#'],
      ['#', 'U', '#', '#', 'C', 'S', '#', '#', '#'],
      ['#', 'M', 'A', 'R', 'K', 'T', '#', '#', '#'],
      ['#', 'E', '#', '#', '#', '#', '#', '#', '#'],
      ['#', 'H', '#', '#', '#', '#', '#', '#', '#'],
      ['E', 'L', 'T', 'E', 'R', 'N', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Großes Glücksgefühl', answer: 'FREUDE', row: 1, col: 0 },
      { number: 2, direction: 'across', clue: 'Handelsplatz in der Stadt', answer: 'MARKT', row: 4, col: 1 },
      { number: 3, direction: 'across', clue: 'Mutter und Vater zusammen', answer: 'ELTERN', row: 7, col: 0 },
      { number: 4, direction: 'down', clue: 'Platz in einer Wohnung', answer: 'RAUM', row: 1, col: 1 },
      { number: 5, direction: 'down', clue: 'Gemahlenes Getreide zum Backen', answer: 'MEHL', row: 4, col: 1 },
      { number: 6, direction: 'down', clue: 'Zuerst, am Anfang', answer: 'ERST', row: 1, col: 5 },
      { number: 7, direction: 'down', clue: 'Anlegeplatz für Schiffe', answer: 'DOCK', row: 1, col: 4 },
    ],
  },

  // Puzzle 20 (10x10): KLANG, PLATZ, HAFEN (across) + LEGAL, AORTA, NACHT, TASSE (down)
  {
    id: 'cw-med-020',
    difficulty: 'medium',
    width: 10,
    height: 10,
    grid: [
      ['K', 'L', 'A', 'N', 'G', '#', '#', '#', '#', '#'],
      ['#', 'E', 'O', 'A', '#', '#', '#', '#', '#', '#'],
      ['#', 'G', 'R', 'C', '#', '#', '#', '#', '#', '#'],
      ['#', 'A', 'T', 'H', '#', '#', '#', '#', '#', '#'],
      ['P', 'L', 'A', 'T', 'Z', '#', '#', '#', '#', '#'],
      ['#', '#', '#', 'A', '#', '#', '#', '#', '#', '#'],
      ['#', '#', '#', 'S', '#', '#', '#', '#', '#', '#'],
      ['#', '#', '#', 'S', '#', '#', '#', '#', '#', '#'],
      ['H', 'A', 'F', 'E', 'N', '#', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Ton oder musikalischer Laut', answer: 'KLANG', row: 0, col: 0 },
      { number: 2, direction: 'across', clue: 'Offener Bereich in der Stadt', answer: 'PLATZ', row: 4, col: 0 },
      { number: 3, direction: 'across', clue: 'Anlegestelle für Schiffe', answer: 'HAFEN', row: 8, col: 0 },
      { number: 4, direction: 'down', clue: 'Gesetzmäßig, erlaubt', answer: 'LEGAL', row: 0, col: 1 },
      { number: 5, direction: 'down', clue: 'Große Körperschlagader', answer: 'AORTA', row: 0, col: 2 },
      { number: 6, direction: 'down', clue: 'Dunkle Tageszeit', answer: 'NACHT', row: 0, col: 3 },
      { number: 7, direction: 'down', clue: 'Trinkgefäß mit Unterteller', answer: 'TASSE', row: 4, col: 3 },
    ],
  },

  // Puzzle 21 (9x9): LIEBE, MALER, STEIN (across) + EXTRA, ERNTE, MOST, ARIE (down)
  {
    id: 'cw-med-021',
    difficulty: 'medium',
    width: 9,
    height: 9,
    grid: [
      ['#', '#', '#', '#', '#', '#', '#', '#', '#'],
      ['L', 'I', 'E', 'B', 'E', '#', '#', '#', '#'],
      ['#', '#', 'X', '#', 'R', '#', '#', '#', '#'],
      ['#', '#', 'T', '#', 'N', '#', '#', '#', '#'],
      ['#', '#', 'R', '#', 'T', '#', '#', '#', '#'],
      ['#', 'M', 'A', 'L', 'E', 'R', '#', '#', '#'],
      ['#', 'O', 'R', '#', '#', '#', '#', '#', '#'],
      ['#', 'S', 'I', '#', '#', '#', '#', '#', '#'],
      ['S', 'T', 'E', 'I', 'N', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Tiefes Gefühl der Zuneigung', answer: 'LIEBE', row: 1, col: 0 },
      { number: 2, direction: 'across', clue: 'Künstler mit Pinsel und Farbe', answer: 'MALER', row: 5, col: 1 },
      { number: 3, direction: 'across', clue: 'Hartes Material in der Natur', answer: 'STEIN', row: 8, col: 0 },
      { number: 4, direction: 'down', clue: 'Besonders, außergewöhnlich', answer: 'EXTRA', row: 1, col: 2 },
      { number: 5, direction: 'down', clue: 'Einbringen der Feldfrüchte', answer: 'ERNTE', row: 1, col: 4 },
      { number: 6, direction: 'down', clue: 'Frisch gepresster Saft', answer: 'MOST', row: 5, col: 1 },
      { number: 7, direction: 'down', clue: 'Gesangsstück in der Oper', answer: 'ARIE', row: 5, col: 2 },
    ],
  },

  // Puzzle 22 (9x9): REGEN, INSEL, WAGEN (across) + EULEN, ELITE, NAGEL, IGEL (down)
  {
    id: 'cw-med-022',
    difficulty: 'medium',
    width: 9,
    height: 9,
    grid: [
      ['#', '#', '#', '#', '#', '#', '#', '#', '#'],
      ['R', 'E', 'G', 'E', 'N', '#', '#', '#', '#'],
      ['#', 'U', '#', 'L', 'A', '#', '#', '#', '#'],
      ['#', 'L', '#', 'I', 'G', '#', '#', '#', '#'],
      ['#', 'E', '#', 'T', 'E', '#', '#', '#', '#'],
      ['I', 'N', 'S', 'E', 'L', '#', '#', '#', '#'],
      ['G', '#', '#', '#', '#', '#', '#', '#', '#'],
      ['E', '#', '#', '#', '#', '#', '#', '#', '#'],
      ['L', '#', 'W', 'A', 'G', 'E', 'N', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Niederschlag vom Himmel', answer: 'REGEN', row: 1, col: 0 },
      { number: 2, direction: 'across', clue: 'Von Wasser umgebenes Land', answer: 'INSEL', row: 5, col: 0 },
      { number: 3, direction: 'across', clue: 'Fahrzeug mit vier Rädern', answer: 'WAGEN', row: 8, col: 2 },
      { number: 4, direction: 'down', clue: 'Nachtaktive Vögel (Mehrzahl)', answer: 'EULEN', row: 1, col: 1 },
      { number: 5, direction: 'down', clue: 'Ausgewählte Spitzengruppe', answer: 'ELITE', row: 1, col: 3 },
      { number: 6, direction: 'down', clue: 'Metallstift zum Aufhängen', answer: 'NAGEL', row: 1, col: 4 },
      { number: 7, direction: 'down', clue: 'Kleines stacheliges Tier', answer: 'IGEL', row: 5, col: 0 },
    ],
  },

  // Puzzle 23 (9x9): REISE, GARTEN, MUTTER (across) + ROHR, RECHT, TROST, ERNTE (down)
  {
    id: 'cw-med-023',
    difficulty: 'medium',
    width: 9,
    height: 9,
    grid: [
      ['#', '#', 'R', 'E', 'I', 'S', 'E', '#', '#'],
      ['#', '#', 'O', '#', '#', '#', '#', '#', '#'],
      ['#', '#', 'H', '#', '#', '#', '#', '#', '#'],
      ['G', 'A', 'R', 'T', 'E', 'N', '#', '#', '#'],
      ['#', '#', 'E', 'R', 'R', '#', '#', '#', '#'],
      ['#', '#', 'C', 'O', 'N', '#', '#', '#', '#'],
      ['#', '#', 'H', 'S', 'T', '#', '#', '#', '#'],
      ['M', 'U', 'T', 'T', 'E', 'R', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Fahrt in ein fernes Land', answer: 'REISE', row: 0, col: 2 },
      { number: 2, direction: 'across', clue: 'Bereich mit Pflanzen beim Haus', answer: 'GARTEN', row: 3, col: 0 },
      { number: 3, direction: 'across', clue: 'Weibliches Elternteil', answer: 'MUTTER', row: 7, col: 0 },
      { number: 4, direction: 'down', clue: 'Leitung für Wasser oder Gas', answer: 'ROHR', row: 0, col: 2 },
      { number: 5, direction: 'down', clue: 'Anspruch nach dem Gesetz', answer: 'RECHT', row: 3, col: 2 },
      { number: 6, direction: 'down', clue: 'Aufmunterung in schwerer Zeit', answer: 'TROST', row: 3, col: 3 },
      { number: 7, direction: 'down', clue: 'Einbringen der Feldfrüchte', answer: 'ERNTE', row: 3, col: 4 },
    ],
  },

  // Puzzle 24 (9x9): WASSER, HERBST, STERN (across) + ACHSE, SAUER, RECHT, ROST (down)
  {
    id: 'cw-med-024',
    difficulty: 'medium',
    width: 9,
    height: 9,
    grid: [
      ['#', '#', '#', '#', '#', '#', '#', '#', '#'],
      ['W', 'A', 'S', 'S', 'E', 'R', '#', '#', '#'],
      ['#', 'C', 'A', '#', '#', 'E', '#', '#', '#'],
      ['#', 'H', 'U', '#', '#', 'C', '#', '#', '#'],
      ['#', 'S', 'E', '#', '#', 'H', '#', '#', '#'],
      ['H', 'E', 'R', 'B', 'S', 'T', '#', '#', '#'],
      ['#', '#', 'O', '#', '#', '#', '#', '#', '#'],
      ['#', '#', 'S', '#', '#', '#', '#', '#', '#'],
      ['#', 'S', 'T', 'E', 'R', 'N', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Lebensnotwendige Flüssigkeit', answer: 'WASSER', row: 1, col: 0 },
      { number: 2, direction: 'across', clue: 'Jahreszeit mit bunten Blättern', answer: 'HERBST', row: 5, col: 0 },
      { number: 3, direction: 'across', clue: 'Leuchtender Punkt am Nachthimmel', answer: 'STERN', row: 8, col: 1 },
      { number: 4, direction: 'down', clue: 'Drehpunkt eines Rades', answer: 'ACHSE', row: 1, col: 1 },
      { number: 5, direction: 'down', clue: 'Geschmack wie Zitrone', answer: 'SAUER', row: 1, col: 2 },
      { number: 6, direction: 'down', clue: 'Anspruch nach dem Gesetz', answer: 'RECHT', row: 1, col: 5 },
      { number: 7, direction: 'down', clue: 'Braune Schicht auf altem Eisen', answer: 'ROST', row: 5, col: 2 },
    ],
  },

  // Puzzle 25 (10x10): DOKTOR, KIRCHE, STERN (across) + DRUCK, KATER, REISE, RECHT (down)
  {
    id: 'cw-med-025',
    difficulty: 'medium',
    width: 10,
    height: 10,
    grid: [
      ['D', 'O', 'K', 'T', 'O', 'R', '#', '#', '#', '#'],
      ['R', '#', 'A', '#', '#', 'E', '#', '#', '#', '#'],
      ['U', '#', 'T', '#', '#', 'I', '#', '#', '#', '#'],
      ['C', '#', 'E', '#', '#', 'S', '#', '#', '#', '#'],
      ['K', 'I', 'R', 'C', 'H', 'E', '#', '#', '#', '#'],
      ['#', '#', 'E', '#', '#', '#', '#', '#', '#', '#'],
      ['#', '#', 'C', '#', '#', '#', '#', '#', '#', '#'],
      ['#', '#', 'H', '#', '#', '#', '#', '#', '#', '#'],
      ['#', 'S', 'T', 'E', 'R', 'N', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Arzt mit akademischem Titel', answer: 'DOKTOR', row: 0, col: 0 },
      { number: 2, direction: 'across', clue: 'Gotteshaus im Dorf', answer: 'KIRCHE', row: 4, col: 0 },
      { number: 3, direction: 'across', clue: 'Leuchtender Punkt am Nachthimmel', answer: 'STERN', row: 8, col: 1 },
      { number: 4, direction: 'down', clue: 'Kraft beim Pressen', answer: 'DRUCK', row: 0, col: 0 },
      { number: 5, direction: 'down', clue: 'Männliche Hauskatze', answer: 'KATER', row: 0, col: 2 },
      { number: 6, direction: 'down', clue: 'Fahrt in ein anderes Land', answer: 'REISE', row: 0, col: 5 },
      { number: 7, direction: 'down', clue: 'Anspruch nach dem Gesetz', answer: 'RECHT', row: 4, col: 2 },
    ],
  },

  // Puzzle 26 (9x9): SCHULE, STRAND, KLANG (across) + HUMOR, ULTRA, LODEN, DORN (down)
  {
    id: 'cw-med-026',
    difficulty: 'medium',
    width: 9,
    height: 9,
    grid: [
      ['#', '#', '#', '#', '#', '#', '#', '#', '#'],
      ['S', 'C', 'H', 'U', 'L', 'E', '#', '#', '#'],
      ['#', '#', 'U', 'L', 'O', '#', '#', '#', '#'],
      ['#', '#', 'M', 'T', 'D', '#', '#', '#', '#'],
      ['#', '#', 'O', 'R', 'E', '#', '#', '#', '#'],
      ['S', 'T', 'R', 'A', 'N', 'D', '#', '#', '#'],
      ['#', '#', '#', '#', '#', 'O', '#', '#', '#'],
      ['#', '#', '#', '#', '#', 'R', '#', '#', '#'],
      ['#', '#', 'K', 'L', 'A', 'N', 'G', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Ort, an dem Kinder lernen', answer: 'SCHULE', row: 1, col: 0 },
      { number: 2, direction: 'across', clue: 'Sandiger Bereich am Meer', answer: 'STRAND', row: 5, col: 0 },
      { number: 3, direction: 'across', clue: 'Ton oder musikalischer Laut', answer: 'KLANG', row: 8, col: 2 },
      { number: 4, direction: 'down', clue: 'Sinn für das Komische', answer: 'HUMOR', row: 1, col: 2 },
      { number: 5, direction: 'down', clue: 'Äußerst, sehr (Vorsilbe)', answer: 'ULTRA', row: 1, col: 3 },
      { number: 6, direction: 'down', clue: 'Grober Wollstoff aus Bayern', answer: 'LODEN', row: 1, col: 4 },
      { number: 7, direction: 'down', clue: 'Spitzer Teil einer Rose', answer: 'DORN', row: 5, col: 5 },
    ],
  },

  // Puzzle 27 (9x9): MORGEN, FLUG, LEHRER (across) + ORGEL, LAGE, FELL, NABEL (down)
  {
    id: 'cw-med-027',
    difficulty: 'medium',
    width: 9,
    height: 9,
    grid: [
      ['M', 'O', 'R', 'G', 'E', 'N', '#', '#', '#'],
      ['#', 'R', '#', '#', '#', 'A', '#', '#', '#'],
      ['#', 'G', '#', '#', '#', 'B', '#', '#', '#'],
      ['#', 'E', '#', '#', '#', 'E', '#', '#', '#'],
      ['F', 'L', 'U', 'G', '#', 'L', '#', '#', '#'],
      ['E', 'A', '#', '#', '#', '#', '#', '#', '#'],
      ['L', 'G', '#', '#', '#', '#', '#', '#', '#'],
      ['L', 'E', 'H', 'R', 'E', 'R', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Tageszeit nach der Nacht', answer: 'MORGEN', row: 0, col: 0 },
      { number: 2, direction: 'across', clue: 'Reise durch die Luft', answer: 'FLUG', row: 4, col: 0 },
      { number: 3, direction: 'across', clue: 'Person, die Wissen vermittelt', answer: 'LEHRER', row: 7, col: 0 },
      { number: 4, direction: 'down', clue: 'Musikinstrument in der Kirche', answer: 'ORGEL', row: 0, col: 1 },
      { number: 5, direction: 'down', clue: 'Position oder Situation', answer: 'LAGE', row: 4, col: 1 },
      { number: 6, direction: 'down', clue: 'Tierhaut mit Haaren', answer: 'FELL', row: 4, col: 0 },
      { number: 7, direction: 'down', clue: 'Körperstelle am Bauch', answer: 'NABEL', row: 0, col: 5 },
    ],
  },

  // Puzzle 28 (9x9): BLUMEN, ELTERN, ARBEIT (across) + LEGAL, MEISE, LEDER, EBENE (down)
  {
    id: 'cw-med-028',
    difficulty: 'medium',
    width: 9,
    height: 9,
    grid: [
      ['B', 'L', 'U', 'M', 'E', 'N', '#', '#', '#'],
      ['#', 'E', '#', 'E', '#', '#', '#', '#', '#'],
      ['#', 'G', '#', 'I', '#', '#', '#', '#', '#'],
      ['#', 'A', '#', 'S', '#', '#', '#', '#', '#'],
      ['E', 'L', 'T', 'E', 'R', 'N', '#', '#', '#'],
      ['#', 'E', '#', 'B', '#', '#', '#', '#', '#'],
      ['#', 'D', '#', 'E', '#', '#', '#', '#', '#'],
      ['#', 'E', '#', 'N', '#', '#', '#', '#', '#'],
      ['A', 'R', 'B', 'E', 'I', 'T', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Bunte Pflanzen im Garten', answer: 'BLUMEN', row: 0, col: 0 },
      { number: 2, direction: 'across', clue: 'Mutter und Vater zusammen', answer: 'ELTERN', row: 4, col: 0 },
      { number: 3, direction: 'across', clue: 'Tägliche Beschäftigung im Beruf', answer: 'ARBEIT', row: 8, col: 0 },
      { number: 4, direction: 'down', clue: 'Gesetzmäßig, erlaubt', answer: 'LEGAL', row: 0, col: 1 },
      { number: 5, direction: 'down', clue: 'Kleiner Singvogel', answer: 'MEISE', row: 0, col: 3 },
      { number: 6, direction: 'down', clue: 'Material aus Tierhaut', answer: 'LEDER', row: 4, col: 1 },
      { number: 7, direction: 'down', clue: 'Flache Landschaft', answer: 'EBENE', row: 4, col: 3 },
    ],
  },

  // Puzzle 29 (9x9): FEUER, WOLKE, STERN (across) + RUINE, OPUS, LAST, KNIE (down)
  {
    id: 'cw-med-029',
    difficulty: 'medium',
    width: 9,
    height: 9,
    grid: [
      ['F', 'E', 'U', 'E', 'R', '#', '#', '#', '#'],
      ['#', '#', '#', '#', 'U', '#', '#', '#', '#'],
      ['#', '#', '#', '#', 'I', '#', '#', '#', '#'],
      ['#', '#', '#', '#', 'N', '#', '#', '#', '#'],
      ['W', 'O', 'L', 'K', 'E', '#', '#', '#', '#'],
      ['#', 'P', 'A', 'N', '#', '#', '#', '#', '#'],
      ['#', 'U', 'S', 'I', '#', '#', '#', '#', '#'],
      ['#', 'S', 'T', 'E', 'R', 'N', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Heiße Flamme zum Wärmen', answer: 'FEUER', row: 0, col: 0 },
      { number: 2, direction: 'across', clue: 'Weiße Form am Himmel', answer: 'WOLKE', row: 4, col: 0 },
      { number: 3, direction: 'across', clue: 'Leuchtender Punkt am Nachthimmel', answer: 'STERN', row: 7, col: 1 },
      { number: 4, direction: 'down', clue: 'Verfallenes altes Gebäude', answer: 'RUINE', row: 0, col: 4 },
      { number: 5, direction: 'down', clue: 'Großes musikalisches Werk', answer: 'OPUS', row: 4, col: 1 },
      { number: 6, direction: 'down', clue: 'Schwere Bürde zu tragen', answer: 'LAST', row: 4, col: 2 },
      { number: 7, direction: 'down', clue: 'Gelenk zwischen Ober- und Unterschenkel', answer: 'KNIE', row: 4, col: 3 },
    ],
  },

  // Puzzle 30 (10x10): MEISTER, FRIEDE, TRAUM (across) + EINER, SAHNE, ERNTE, RECHT (down)
  {
    id: 'cw-med-030',
    difficulty: 'medium',
    width: 10,
    height: 10,
    grid: [
      ['M', 'E', 'I', 'S', 'T', 'E', 'R', '#', '#', '#'],
      ['#', 'I', '#', 'A', '#', 'R', '#', '#', '#', '#'],
      ['#', 'N', '#', 'H', '#', 'N', '#', '#', '#', '#'],
      ['#', 'E', '#', 'N', '#', 'T', '#', '#', '#', '#'],
      ['F', 'R', 'I', 'E', 'D', 'E', '#', '#', '#', '#'],
      ['#', 'E', '#', '#', '#', '#', '#', '#', '#', '#'],
      ['#', 'C', '#', '#', '#', '#', '#', '#', '#', '#'],
      ['#', 'H', '#', '#', '#', '#', '#', '#', '#', '#'],
      ['#', 'T', 'R', 'A', 'U', 'M', '#', '#', '#', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
    ],
    clues: [
      { number: 1, direction: 'across', clue: 'Experte in seinem Fach', answer: 'MEISTER', row: 0, col: 0 },
      { number: 2, direction: 'across', clue: 'Zustand ohne Krieg', answer: 'FRIEDE', row: 4, col: 0 },
      { number: 3, direction: 'across', clue: 'Etwas, das man im Schlaf erlebt', answer: 'TRAUM', row: 8, col: 1 },
      { number: 4, direction: 'down', clue: 'Zahlwort: ein einzelner', answer: 'EINER', row: 0, col: 1 },
      { number: 5, direction: 'down', clue: 'Weiße Masse auf dem Kuchen', answer: 'SAHNE', row: 0, col: 3 },
      { number: 6, direction: 'down', clue: 'Einbringen der Feldfrüchte', answer: 'ERNTE', row: 0, col: 5 },
      { number: 7, direction: 'down', clue: 'Anspruch nach dem Gesetz', answer: 'RECHT', row: 4, col: 1 },
    ],
  },
]
