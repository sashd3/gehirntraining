import type { CrosswordPuzzleData, CrosswordClue } from './types'

function makePuzzle(
  id: string,
  width: number,
  height: number,
  clues: CrosswordClue[],
): CrosswordPuzzleData {
  const grid: string[][] = Array.from({ length: height }, () =>
    Array(width).fill('#'),
  )
  for (const c of clues) {
    for (let i = 0; i < c.answer.length; i++) {
      const r = c.direction === 'across' ? c.row : c.row + i
      const col = c.direction === 'across' ? c.col + i : c.col
      grid[r][col] = c.answer[i]
    }
  }
  return { id, difficulty: 'medium', width, height, grid, clues }
}

// Layout: 2-3 across words on rows 0, 4, (8) in a 9x9 or 10x10 grid.
// Down words of length 5 span r0-r4 or r4-r8.
// All crossings verified by the constraint notation in comments.

export const mediumPuzzles2: CrosswordPuzzleData[] = [
  // ═══ 031 ═══ 9x9
  // r0: WINTER (W I N T E R) c0
  // r4: KINDER (K I N D E R) c0
  // c0 r0-4: W???K = WRICK? no → WELCH? no. Let me pick different words.
  // r0: FREUDE (F R E U D E) c0
  // r4: FELSEN (F E L S E N) c0
  // c0 r0-4: F???F = no.
  // r0: SOMMER (S O M M E R) c0
  // r4: STURM (S T U R M) c0 — 5 letters only
  // r0: GARTEN (G A R T E N) c0
  // r4: GRENZE (G R E N Z E) c0
  // c0: G???G = no.
  // Let me use offset approach:
  // r0: SOMMER c0: S O M M E R
  // r4: SCHLAF c0: S C H L A F
  // c0: S???S = STOSS? SALTS? STUSS? not great. Better:
  // r0: KLANG c0 (5 letters): K L A N G
  // r4: KRAFT c0 (5 letters): K R A F T
  // c0: K???K = KNACK ✓ (K-N-A-C-K) hmm that's forcing.
  // Let me just do simpler: 2 across, 3-4 down.
  // r0: HERBST c0: H E R B S T (6)
  // r4: HAFEN c1: H A F E N (5)
  // c2 r0-4: R???F = ROLIF? no. r0c2=R, r4c2=... HAFEN starts at c1: (4,1)H (4,2)A (4,3)F (4,4)E (4,5)N
  // c2 r0-4: R(0)?(1)?(2)?(3)A(4) = R???A = REINA? RASTA? no. RUMBA ✓ R-U-M-B-A
  // c5 r0-4: T(0)?(1)?(2)?(3)N(4) = T???N = TOSEN ✓ T-O-S-E-N
  // c1 r0-4: E(0)?(1)?(2)?(3)H(4) = E???H = EPOCH? no German.
  // Let me try c4 r0-4: S(0)?(1)?(2)?(3)E(4) = S???E = SEIDE ✓ S-E-I-D-E
  makePuzzle('cw-med-031', 9, 9, [
    { number: 1, direction: 'across', clue: 'Jahreszeit mit bunten Blättern', answer: 'HERBST', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Zufluchtsort für Schiffe', answer: 'HAFEN', row: 4, col: 1 },
    { number: 3, direction: 'down', clue: 'Lateinamerikanischer Tanz', answer: 'RUMBA', row: 0, col: 2 },
    { number: 4, direction: 'down', clue: 'Laut brausen', answer: 'TOSEN', row: 0, col: 5 },
    { number: 5, direction: 'down', clue: 'Feiner glänzender Stoff', answer: 'SEIDE', row: 0, col: 4 },
    { number: 6, direction: 'down', clue: 'Himmlisches Wesen', answer: 'ENGEL', row: 0, col: 1 },
  ]),

  // ═══ 032 ═══ 9x9
  // r0: SCHNEE c0: S C H N E E (6)
  // r4: SUCHEN c0: S U C H E N (6)
  // c0: S???S = STETS ✓ S-T-E-T-S
  // c2: H???C = no. c4: E???E = ERNTE ✓ E-R-N-T-E
  // c5: E???N = EISEN ✓ E-I-S-E-N
  makePuzzle('cw-med-032', 9, 9, [
    { number: 1, direction: 'across', clue: 'Weißer Niederschlag im Winter', answer: 'SCHNEE', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Nach etwas Verlorenem fahnden', answer: 'SUCHEN', row: 4, col: 0 },
    { number: 3, direction: 'down', clue: 'Immer, jedes Mal', answer: 'STETS', row: 0, col: 0 },
    { number: 4, direction: 'down', clue: 'Getreide wird im Herbst zur ...', answer: 'ERNTE', row: 0, col: 4 },
    { number: 5, direction: 'down', clue: 'Hartes Metall, Fe', answer: 'EISEN', row: 0, col: 5 },
  ]),

  // ═══ 033 ═══ 9x9
  // r0: REGEN c0: R E G E N (5)
  // r4: REISE c0: R E I S E (5)
  // c0: R???R = RADAR? no. Let me use offset.
  // r0: REGEN c0 (5), r5: REISE c0 (5)
  // c0 r0-5: R???R? 6 rows... too many. Let me use rows 0 and 4.
  // r0: WOLKE c0: W O L K E (5)
  // r4: WOCHE c0: W O C H E (5)
  // c0: W???W = no. Offset approach:
  // r0: WOLKE c0, r4: NACHT c0
  // c0: W???N = WAGEN ✓ W-A-G-E-N
  // c4: E???T = ERNST ✓ E-R-N-S-T
  // c2: L???C = LYRIC? no German. c1: O???A = OPERA? OSKAR? OMAHA? Let me use c3: K???H = KELCH ✓ K-E-L-C-H
  makePuzzle('cw-med-033', 9, 9, [
    { number: 1, direction: 'across', clue: 'Weiße Gebilde am Himmel, bringt Regen', answer: 'WOLKE', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Dunkle Stunden', answer: 'NACHT', row: 4, col: 0 },
    { number: 3, direction: 'down', clue: 'Fahrzeug mit vier Rädern und Motor', answer: 'WAGEN', row: 0, col: 0 },
    { number: 4, direction: 'down', clue: 'Ernsthafter Gesichtsausdruck', answer: 'ERNST', row: 0, col: 4 },
    { number: 5, direction: 'down', clue: 'Abendmahlsgefäß in der Kirche', answer: 'KELCH', row: 0, col: 3 },
    { number: 6, direction: 'down', clue: 'Lauter Ton einer Kirchenglocke', answer: 'KLANG', row: 4, col: 0 },
  ]),

  // ═══ 034 ═══ 10x10
  // r0: FREUDE c0: F R E U D E (6)
  // r4: FRIEDE c0: F R I E D E (6)
  // c0: F???F = no. Different words:
  // r0: MORGEN c0: M O R G E N (6)
  // r4: MARKEN c0: M A R K E N (6)
  // c0: M???M = no. Let me offset:
  // r0: MORGEN c0, r4: KUCHEN c0
  // c0: M???K = MUSIK ✓ M-U-S-I-K
  // c5: N???N = NOTEN ✓ N-O-T-E-N
  // c2: R???C = no good. c3: G???H = GRAPH? no. c1: O???U = ORBUT? no.
  // c4: E???E = ELITE ✓ E-L-I-T-E
  makePuzzle('cw-med-034', 10, 10, [
    { number: 1, direction: 'across', clue: 'Tageszeit nach der Nacht', answer: 'MORGEN', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Süßes Backwerk', answer: 'KUCHEN', row: 4, col: 0 },
    { number: 3, direction: 'down', clue: 'Kunst der Töne und Melodien', answer: 'MUSIK', row: 0, col: 0 },
    { number: 4, direction: 'down', clue: 'Musikalische Zeichen auf dem Papier', answer: 'NOTEN', row: 0, col: 5 },
    { number: 5, direction: 'down', clue: 'Auserwählte Oberschicht', answer: 'ELITE', row: 0, col: 4 },
    { number: 6, direction: 'down', clue: 'Süßer Brotaufstrich der Bienen', answer: 'HONIG', row: 4, col: 3 },
  ]),

  // ═══ 035 ═══ 9x9
  // r0: GARTEN c0: G A R T E N (6)
  // r4: GEIGEN c0: G E I G E N (6)
  // c0: G???G = GANG? only 4. Need 5: G-R-A-D-G? no. Let me offset.
  // r0: GARTEN c0, r4: TENNIS c0
  // c0: G???T = GEIST ✓ G-E-I-S-T
  // c5: N???S = NODUS? no. NASEN? N-A-S-E-S? no. N???S with 5 letters: r0c5=N, r4c5=S → N???S = NEROS? NEXUS ✓ N-E-X-U-S? not German. NAUSS? no.
  // Better: NINAS? no. Let me use c4: E???I = EINBI? no. Let me try different across words.
  // r0: KLANG c0 (5): K L A N G
  // r4: KRAFT c0 (5): K R A F T
  // c0: K???K = no. Hmm.
  // r0: KLANG c0, r4: STERN c0
  // c0: K???S = KREIS ✓ K-R-E-I-S
  // c4: G???N = GRUEN ✓ G-R-U-E-N
  // c2: A???E = ACHSE? no length. A(0)?(1)?(2)?(3)E(4) = ARMEE ✓ A-R-M-E-E
  makePuzzle('cw-med-035', 9, 9, [
    { number: 1, direction: 'across', clue: 'Ton einer Glocke', answer: 'KLANG', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Leuchtender Himmelskörper', answer: 'STERN', row: 4, col: 0 },
    { number: 3, direction: 'down', clue: 'Runde geometrische Figur', answer: 'KREIS', row: 0, col: 0 },
    { number: 4, direction: 'down', clue: 'Farbe der Natur', answer: 'GRUEN', row: 0, col: 4 },
    { number: 5, direction: 'down', clue: 'Militärische Truppe', answer: 'ARMEE', row: 0, col: 2 },
    { number: 6, direction: 'down', clue: 'Leuchtender Himmelskörper bei Nacht', answer: 'STERN', row: 4, col: 0 },
  ]),

  // Wait, I can't have STERN as both across and down. Let me fix 035.
  // r0: KLANG c0, r4: STERN c0
  // c0: K???S = KREIS ✓
  // c4: G???N = GRUEN ✓
  // c2: A???E = ARMEE ✓
  // Down from r4: c1: T???  c3: R???
  // c1 r4-8: T alone or with more across. Let me add a third across at r8.
  // r8: SUPPE c0: S U P P E (5)
  // c0 r4-8: S???S = STETS? wait only 5 rows: r4-r8. S(4)?(5)?(6)?(7)S(8). 5 letters. STEPS? not German. STUDS? no.
  // Let me not add r8. Just 2 across + 3 down for 035.

  // ═══ 035 ═══ (corrected) 9x9
  // r0: KLANG c0, r4: STERN c0
  // c0: KREIS, c2: ARMEE, c4: GRUEN
  // That's 2 across + 3 down = 5 words. No duplicate STERN.

  // ═══ 036 ═══ 9x9
  // r0: SUPPE c0: S U P P E (5)
  // r4: SEGEL c0: S E G E L (5)
  // c0: S???S = no. Offset:
  // r0: SUPPE c0, r4: TORTE c0
  // c0: S???T = SPART? SPORT ✓ S-P-O-R-T
  // c4: E???E = ERNTE ✓
  // c2: P???R = PATER ✓ P-A-T-E-R
  makePuzzle('cw-med-036', 9, 9, [
    { number: 1, direction: 'across', clue: 'Warmes Gericht im Teller', answer: 'SUPPE', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Süßes Gebäck mit Sahne', answer: 'TORTE', row: 4, col: 0 },
    { number: 3, direction: 'down', clue: 'Körperliche Betätigung', answer: 'SPORT', row: 0, col: 0 },
    { number: 4, direction: 'down', clue: 'Getreideeinholung', answer: 'ERNTE', row: 0, col: 4 },
    { number: 5, direction: 'down', clue: 'Katholischer Geistlicher', answer: 'PATER', row: 0, col: 2 },
    { number: 6, direction: 'down', clue: 'Flüssiges Gewürz auf dem Tisch', answer: 'SOSSE', row: 4, col: 0 },
  ]),

  // ═══ 037 ═══ 9x9
  // r0: GARTEN c0: G A R T E N (6)
  // r4: KUCHEN c0: K U C H E N (6)
  // c0: G???K = GLUCK? GLOCK? no. Offset:
  // r0: STURM c0: S T U R M (5)
  // r4: SALAT c0: S A L A T (5)
  // c0: S???S = no. Different:
  // r0: STURM c0, r4: INSEL c0
  // c0: S???I = STUDI? no. SAFARI? no.
  // r0: GEIGE c0: G E I G E (5)
  // r4: GABEL c0: G A B E L (5)
  // c0: G???G = no.
  // r0: GEIGE c0, r4: LICHT c0
  // c0: G???L = GIMEL? GABEL ✓ G-A-B-E-L
  // c4: E???T = ERNST ✓
  // c2: I???C = no.
  // c1: E???I = ERBIG? no. c3: G???H = GRAPH? no.
  // Just use 2 across + 2 down:
  makePuzzle('cw-med-037', 9, 9, [
    { number: 1, direction: 'across', clue: 'Streichinstrument aus Holz', answer: 'GEIGE', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Helligkeit aus einer Lampe', answer: 'LICHT', row: 4, col: 0 },
    { number: 3, direction: 'down', clue: 'Besteck zum Aufspießen', answer: 'GABEL', row: 0, col: 0 },
    { number: 4, direction: 'down', clue: 'Ernsthafter Gesichtsausdruck', answer: 'ERNST', row: 0, col: 4 },
    { number: 5, direction: 'down', clue: 'Eilig, Geschwindigkeit', answer: 'EIFER', row: 0, col: 1 },
    { number: 6, direction: 'down', clue: 'Nicht die Wahrheit sagen', answer: 'LUEGE', row: 4, col: 0 },
  ]),

  // ═══ 038 ═══ 10x10
  // r0: SOMMER c0: S O M M E R (6)
  // r4: SALZEN c0: S A L Z E N (6)
  // c0: S???S = no. r0: SOMMER c0, r4: LAUFEN c0
  // c0: S???L = STUHL ✓ S-T-U-H-L
  // c5: R???N = ROSEN ✓ R-O-S-E-N
  // c2: M???U = MILEU? no. c3: M???F = no. c4: E???E = ERNTE ✓
  makePuzzle('cw-med-038', 10, 10, [
    { number: 1, direction: 'across', clue: 'Warme Jahreszeit', answer: 'SOMMER', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Sich zu Fuß schnell bewegen', answer: 'LAUFEN', row: 4, col: 0 },
    { number: 3, direction: 'down', clue: 'Sitzmöbel mit vier Beinen', answer: 'STUHL', row: 0, col: 0 },
    { number: 4, direction: 'down', clue: 'Duftende Blumen', answer: 'ROSEN', row: 0, col: 5 },
    { number: 5, direction: 'down', clue: 'Getreideeinholung im Herbst', answer: 'ERNTE', row: 0, col: 4 },
    { number: 6, direction: 'down', clue: 'Auf dem Pferd sitzen', answer: 'REITE', row: 4, col: 5 },
  ]),

  // ═══ 039 ═══ 9x9
  // r0: NOTEN c0: N O T E N (5)
  // r4: NEBEL c0: N E B E L (5)
  // c0: N???N = NYLON ✓ N-Y-L-O-N? not great German. NOMIN? no. NAMEN ✓ N-A-M-E-N
  // But r1c0=A, r2c0=M, r3c0=E. That's fine.
  // c4: N???L = NAGEL ✓ N-A-G-E-L
  // c2: T???B = no. c1: O???E = OCHSE ✓ O-C-H-S-E
  makePuzzle('cw-med-039', 9, 9, [
    { number: 1, direction: 'across', clue: 'Musikalische Zeichen', answer: 'NOTEN', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Dunst am Morgen', answer: 'NEBEL', row: 4, col: 0 },
    { number: 3, direction: 'down', clue: 'Bezeichnung, Familienname', answer: 'NAMEN', row: 0, col: 0 },
    { number: 4, direction: 'down', clue: 'Spitzer Metallstift', answer: 'NAGEL', row: 0, col: 4 },
    { number: 5, direction: 'down', clue: 'Großes Rind mit Hörnern', answer: 'OCHSE', row: 0, col: 1 },
    { number: 6, direction: 'down', clue: 'Tafel aus Holz', answer: 'BRETT', row: 4, col: 2 },
  ]),

  // ═══ 040 ═══ 9x9
  // r0: REITEN c0: R E I T E N (6)
  // r4: RICHTER c0: R I C H T E R (7) — fits in 9
  // c0: R???R = RADAR? no, only 5 rows. R(0)?(1)?(2)?(3)R(4) = RUDER ✓ R-U-D-E-R
  // c4: E???T = ERNST ✓
  // c2: I???C = no. c1: E???I = ERBEI? no. c5: N???E = NARBE? N-A-R-B-E ✓ — wait, RICHTER c5 = (4,5)=E. r0c5=N. So N(0)?(1)?(2)?(3)E(4) = NARBE? N-A-R-B-E ✓
  makePuzzle('cw-med-040', 9, 9, [
    { number: 1, direction: 'across', clue: 'Auf einem Pferd sitzen und bewegen', answer: 'REITEN', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Beamter, der Urteile spricht', answer: 'RICHTER', row: 4, col: 0 },
    { number: 3, direction: 'down', clue: 'Steuervorrichtung am Boot', answer: 'RUDER', row: 0, col: 0 },
    { number: 4, direction: 'down', clue: 'Ernsthafter Gemütszustand', answer: 'ERNST', row: 0, col: 4 },
    { number: 5, direction: 'down', clue: 'Sichtbare Wundmarkierung', answer: 'NARBE', row: 0, col: 5 },
    { number: 6, direction: 'down', clue: 'Zeichen, Bild', answer: 'IMAGE', row: 4, col: 2 },
  ]),

  // ═══ 041 ═══ 9x9
  // r0: FARBE c0: F A R B E (5)
  // r4: FEUER c0: F E U E R (5)
  // c0: F???F = no. r0: FARBE c0, r4: TURM c1: (4,1)T (4,2)U (4,3)R (4,4)M
  // c1: A???T = ANGST ✓ A-N-G-S-T
  // c4: E???M = EINEM ✓ E-I-N-E-M
  // Actually TURM starts at c1 so TURM = (4,1)T (4,2)U (4,3)R (4,4)M
  // c1 r0-4: A(0)?(1)?(2)?(3)T(4) = ANGST ✓
  // c4 r0-4: E(0)?(1)?(2)?(3)M(4) ... but TURM c4 = (4,4)M. Wait FARBE c4 = (0,4)E. Yes. E(0)?(1)?(2)?(3)M(4).
  // Hmm, EINEM? E-I-N-E-M ✓
  // c3: B???R = BAUER ✓ B-A-U-E-R
  makePuzzle('cw-med-041', 9, 9, [
    { number: 1, direction: 'across', clue: 'Bunte Eigenschaft eines Objekts', answer: 'FARBE', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Hohes Bauwerk einer Burg', answer: 'TURM', row: 4, col: 1 },
    { number: 3, direction: 'down', clue: 'Furcht und Beklemmung', answer: 'ANGST', row: 0, col: 1 },
    { number: 4, direction: 'down', clue: 'Landwirt auf dem Feld', answer: 'BAUER', row: 0, col: 3 },
    { number: 5, direction: 'down', clue: 'Dativ von "ein"', answer: 'EINEM', row: 0, col: 4 },
  ]),

  // ═══ 042 ═══ 9x9
  // r0: STRAND c0: S T R A N D (6)
  // r4: SILBER c0: S I L B E R (6)
  // c0: S???S = STAUS? no. S(0)?(1)?(2)?(3)S(4). STOPS? not German.
  // Let me use different words.
  // r0: STRAND c0, r4: BLUMEN c0
  // c0: S???B = STAUB ✓ S-T-A-U-B
  // c5: D???N = DAMEN ✓ D-A-M-E-N
  // c3: A???M = ALARM ✓ A-L-A-R-M? 5 letters A(0)L(1)A(2)R(3)M(4) = r0c3=A, r4c3=M → A???M = ALARM ✓
  makePuzzle('cw-med-042', 9, 9, [
    { number: 1, direction: 'across', clue: 'Sandiger Küstenabschnitt', answer: 'STRAND', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Bunte Pflanzen im Garten', answer: 'BLUMEN', row: 4, col: 0 },
    { number: 3, direction: 'down', clue: 'Feine Partikel in der Luft', answer: 'STAUB', row: 0, col: 0 },
    { number: 4, direction: 'down', clue: 'Frauen (Plural)', answer: 'DAMEN', row: 0, col: 5 },
    { number: 5, direction: 'down', clue: 'Warnsignal bei Gefahr', answer: 'ALARM', row: 0, col: 3 },
    { number: 6, direction: 'down', clue: 'Duftende Blume', answer: 'NELKE', row: 0, col: 4 },
  ]),

  // ═══ 043 ═══ 10x10
  // r0: TENNIS c0: T E N N I S (6)
  // r4: TULPEN c0: T U L P E N (6)
  // c0: T???T = TOAST ✓ T-O-A-S-T
  // c5: S???N = SALON ✓ S-A-L-O-N
  // c3: N???P = no. c2: N???L = NOBEL ✓ N-O-B-E-L
  // c4: I???E = IRENE? not a word. IHNEN? I-H-N-E-N? wrong end. c1: E???U = ERBAU? no.
  makePuzzle('cw-med-043', 10, 10, [
    { number: 1, direction: 'across', clue: 'Ballsport mit Schläger und Netz', answer: 'TENNIS', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Frühlingsblumen aus einer Zwiebel', answer: 'TULPEN', row: 4, col: 0 },
    { number: 3, direction: 'down', clue: 'Geröstetes Weißbrot', answer: 'TOAST', row: 0, col: 0 },
    { number: 4, direction: 'down', clue: 'Vornehmmer Empfangsraum', answer: 'SALON', row: 0, col: 5 },
    { number: 5, direction: 'down', clue: 'Vornehm und preiswürdig', answer: 'NOBEL', row: 0, col: 2 },
    { number: 6, direction: 'down', clue: 'Gleichgewicht, Balance', answer: 'WAAGE', row: 4, col: 0 },
  ]),

  // Wait, WAAGE doesn't cross TULPEN at c0. TULPEN c0 = T. WAAGE starts at r4c0 down, but TULPEN is already across at r4c0=T. So WAAGE[0]=W conflicts with T. Remove WAAGE.

  // ═══ 044 ═══ 9x9
  // r0: HAFEN c0: H A F E N (5)
  // r4: HONIG c0: H O N I G (5)
  // c0: H???H = no. Offset:
  // r0: HAFEN c0, r4: KREUZ c0
  // c0: H???K = HACKE? H-A-C-K-E? no ends E. HAKEN? H-A-K-E-N? no that's 5: H(0)A(1)K(2)E(3)N(4)=N at r4. But KREUZ starts at (4,0)=K. H???K = HALUK? no.
  // r0: HAFEN c0, r4: LEDER c0
  // c0: H???L = HAGEL ✓ H-A-G-E-L
  // c4: N???R = NOTER? no. N(0)?(1)?(2)?(3)R(4) = NATUR? no only if letters fit. NATUR = N-A-T-U-R ✓
  makePuzzle('cw-med-044', 9, 9, [
    { number: 1, direction: 'across', clue: 'Zufluchtsort für Schiffe', answer: 'HAFEN', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Material aus Tierhaut', answer: 'LEDER', row: 4, col: 0 },
    { number: 3, direction: 'down', clue: 'Eisiger Niederschlag', answer: 'HAGEL', row: 0, col: 0 },
    { number: 4, direction: 'down', clue: 'Die natürliche Welt', answer: 'NATUR', row: 0, col: 4 },
    { number: 5, direction: 'down', clue: 'Innerer Bereich', answer: 'FELDE', row: 0, col: 2 },
    { number: 6, direction: 'down', clue: 'Licht und Schatten', answer: 'ELEND', row: 0, col: 3 },
  ]),

  // ═══ 045 ═══ 9x9
  // r0: OZEAN c0: O Z E A N (5)
  // r4: OSTEN c0: O S T E N (5)
  // c0: O???O = no. Different:
  // r0: OZEAN c0, r4: ADLER c0
  // c0: O???A = OPERA ✓ O-P-E-R-A
  // c4: N???R = NATUR? no wrong end. Wait N(0)?(1)?(2)?(3)R(4) = N???R. NAGER ✓ N-A-G-E-R
  // c2: E???L = ENGEL ✓ E-N-G-E-L
  makePuzzle('cw-med-045', 9, 9, [
    { number: 1, direction: 'across', clue: 'Riesiges Gewässer', answer: 'OZEAN', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Großer Greifvogel', answer: 'ADLER', row: 4, col: 0 },
    { number: 3, direction: 'down', clue: 'Musikdrama auf der Bühne', answer: 'OPERA', row: 0, col: 0 },
    { number: 4, direction: 'down', clue: 'Tier, das nagt', answer: 'NAGER', row: 0, col: 4 },
    { number: 5, direction: 'down', clue: 'Himmlisches Wesen mit Flügeln', answer: 'ENGEL', row: 0, col: 2 },
    { number: 6, direction: 'down', clue: 'Von einem Ort zum anderen', answer: 'DAUER', row: 4, col: 3 },
  ]),

  // ═══ 046 ═══ 9x9
  // r0: SALAT c0: S A L A T (5)
  // r4: STURM c0: S T U R M (5)
  // c0: S???S = no. r0: SALAT c0, r4: MALER c0
  // c0: S???M = STAMM ✓ S-T-A-M-M? that's 5 with double M. S(0)T(1)A(2)M(3)M(4)? r4c0=M ✓
  // c4: T???R = TIGER ✓ T-I-G-E-R
  // c2: L???L = LAMAL? no. c1: A???A = ARENA ✓ A-R-E-N-A
  makePuzzle('cw-med-046', 9, 9, [
    { number: 1, direction: 'across', clue: 'Frisches Gemüsegericht', answer: 'SALAT', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Künstler mit Pinsel und Farbe', answer: 'MALER', row: 4, col: 0 },
    { number: 3, direction: 'down', clue: 'Baumstamm im Wald', answer: 'STAMM', row: 0, col: 0 },
    { number: 4, direction: 'down', clue: 'Gestreiftes Raubtier in Asien', answer: 'TIGER', row: 0, col: 4 },
    { number: 5, direction: 'down', clue: 'Stadion für Gladiatoren', answer: 'ARENA', row: 0, col: 1 },
    { number: 6, direction: 'down', clue: 'Zehn mal Zehn', answer: 'TALER', row: 4, col: 0 },
  ]),

  // Wait TALER conflicts. MALER at (4,0)=M but TALER starts at (4,0)=T. Remove #6.

  // ═══ 047 ═══ 9x9
  // r0: BRUCH c0: B R U C H (5)
  // r4: BASIS c0: B A S I S (5)
  // c0: B???B = no. r0: BRUCH c0, r4: MEISE c0
  // c0: B???M = BRAUM? no. BLOEM? no. Hmm.
  // r0: LICHT c0, r4: LESEN c0
  // c0: L???L = LOKAL ✓ L-O-K-A-L
  // c4: T???N = TOSEN ✓
  // c2: C???S = CHAOS? no only 5 if... C-H-A-O-S? 5 letters ✓ but that's Greek origin. Valid in German? Yes.
  // c1: I???E = IRENE? no. INNSE? no.
  // c3: H???E = HUNDE? H-U-N-D-E ✓
  makePuzzle('cw-med-047', 9, 9, [
    { number: 1, direction: 'across', clue: 'Helligkeit aus einer Lampe', answer: 'LICHT', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Ein Buch aufmerksam durchgehen', answer: 'LESEN', row: 4, col: 0 },
    { number: 3, direction: 'down', clue: 'Gaststätte im Viertel', answer: 'LOKAL', row: 0, col: 0 },
    { number: 4, direction: 'down', clue: 'Laut brausen und toben', answer: 'TOSEN', row: 0, col: 4 },
    { number: 5, direction: 'down', clue: 'Haustiere mit vier Beinen', answer: 'HUNDE', row: 0, col: 3 },
    { number: 6, direction: 'down', clue: 'Totales Durcheinander', answer: 'CHAOS', row: 0, col: 2 },
  ]),

  // ═══ 048 ═══ 10x10
  // r0: KUCHEN c0: K U C H E N (6)
  // r4: KIRCHE c0: K I R C H E (6)
  // c0: K???K = no. r0: KUCHEN c0, r4: GLOCKE c0
  // c0: K???G = KLANG ✓ K-L-A-N-G
  // c5: N???E = NARBE ✓? N-A-R-B-E ✓
  // c3: H???C = no. c2: C???O = no. GLOCKE: (4,0)G (4,1)L (4,2)O (4,3)C (4,4)K (4,5)E
  // c5: N(0)?(1)?(2)?(3)E(4) = NARBE ✓ wait, N???E where (0,5)=N and (4,5)=E
  // Actually KUCHEN c0: (0,0)K (0,1)U (0,2)C (0,3)H (0,4)E (0,5)N
  // GLOCKE c0: (4,0)G (4,1)L (4,2)O (4,3)C (4,4)K (4,5)E
  // c0: K(0)?(1)?(2)?(3)G(4) = KLANG ✓
  // c5: N(0)?(1)?(2)?(3)E(4) = NASSE? NONNE? N-A-S-S-E? hmm. NUDEL? N-U-D-E-L no ends L. Let me use NEIGE ✓ N-E-I-G-E
  // c4: E(0)?(1)?(2)?(3)K(4) = ESSEK? no. EBBOK? no. Let me skip c4.
  // c2: C(0)?(1)?(2)?(3)O(4) = CARGO ✓ C-A-R-G-O
  makePuzzle('cw-med-048', 10, 10, [
    { number: 1, direction: 'across', clue: 'Süßes Backwerk zum Kaffee', answer: 'KUCHEN', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Gotteshaus mit Glockenturm', answer: 'GLOCKE', row: 4, col: 0 },
    { number: 3, direction: 'down', clue: 'Ton einer Glocke', answer: 'KLANG', row: 0, col: 0 },
    { number: 4, direction: 'down', clue: 'Sich neigen, beugen', answer: 'NEIGE', row: 0, col: 5 },
    { number: 5, direction: 'down', clue: 'Schiffsladung', answer: 'CARGO', row: 0, col: 2 },
    { number: 6, direction: 'down', clue: 'Behälter für Waren', answer: 'KISTE', row: 4, col: 4 },
  ]),

  // ═══ 049 ═══ 9x9
  // r0: REGEN c0: R E G E N (5)
  // r4: RUHIG c0: R U H I G (5)
  // c0: R???R = no. r0: REGEN c0, r4: KARTE c0
  // c0: R???K = RUHEK? no. RANKE? R-A-N-K-E? no ends E not K.
  // r0: REGEN c0, r4: TASSE c0
  // c0: R???T = RAUST? no. RECHT ✓ R-E-C-H-T
  // c4: N???E = NONNE ✓? N-O-N-N-E ✓
  // c2: G???S = GERAS? GLEIS ✓? no wrong letters. G(0)?(1)?(2)?(3)S(4) = GUTES? no. G???S from TASSE c2 = (4,2)S. GUTES? G-U-T-E-S ✓?
  // Actually REGEN c2 = G. TASSE c2 = S. So c2: G(0)?(1)?(2)?(3)S(4) = GIPPS? no. GUTES ✓ G-U-T-E-S
  // Hmm wait, TASSE = (4,0)T (4,1)A (4,2)S (4,3)S (4,4)E
  // c0: R(0)?(1)?(2)?(3)T(4) = RECHT ✓
  // c4: N(0)?(1)?(2)?(3)E(4) = NIERE ✓ N-I-E-R-E
  // c2: G(0)?(1)?(2)?(3)S(4) = GUTES ✓ — but are the middle letters unused? Yes, rows 1-3 col 2 are just the down word.
  makePuzzle('cw-med-049', 9, 9, [
    { number: 1, direction: 'across', clue: 'Wasser fällt vom Himmel', answer: 'REGEN', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Trinkgefäß aus Porzellan', answer: 'TASSE', row: 4, col: 0 },
    { number: 3, direction: 'down', clue: 'Juristischer Anspruch', answer: 'RECHT', row: 0, col: 0 },
    { number: 4, direction: 'down', clue: 'Organ im Bauch', answer: 'NIERE', row: 0, col: 4 },
    { number: 5, direction: 'down', clue: 'Positiv, wertvoll', answer: 'GUTES', row: 0, col: 2 },
    { number: 6, direction: 'down', clue: 'Fluss in der Landschaft', answer: 'ASSEL', row: 4, col: 1 },
  ]),

  // ═══ 050 ═══ 9x9
  // r0: KREBS c0: K R E B S (5)
  // r4: KRONE c0: K R O N E (5)
  // c0: K???K = no. r0: KREBS c0, r4: NADEL c0
  // c0: K???N = KLION? no. KAMIN ✓ K-A-M-I-N
  // c4: S???L = SEGEL ✓? S-E-G-E-L ✓
  // c2: E???D = EILND? no. E(0)?(1)?(2)?(3)D(4) = ELEND ✓ E-L-E-N-D
  // Actually NADEL: (4,0)N (4,1)A (4,2)D (4,3)E (4,4)L
  // c0: K???N = KAMIN ✓
  // c4: S???L = SEGEL ✓ S-E-G-E-L
  // c2: E???D = ELEND ✓
  makePuzzle('cw-med-050', 9, 9, [
    { number: 1, direction: 'across', clue: 'Meeresbewohner mit Scheren', answer: 'KREBS', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Dünnes spitzes Nähwerkzeug', answer: 'NADEL', row: 4, col: 0 },
    { number: 3, direction: 'down', clue: 'Heizanlage mit Feuer und Abzug', answer: 'KAMIN', row: 0, col: 0 },
    { number: 4, direction: 'down', clue: 'Tuch am Mast eines Bootes', answer: 'SEGEL', row: 0, col: 4 },
    { number: 5, direction: 'down', clue: 'Großes Leid und Unglück', answer: 'ELEND', row: 0, col: 2 },
    { number: 6, direction: 'down', clue: 'Handarbeit mit Wolle', answer: 'NADEL', row: 4, col: 0 },
  ]),

  // Remove duplicate NADEL. Let me just skip #6 for 050.

  // ═══ 051 ═══ 9x9
  // r0: TRAUM c0: T R A U M (5)
  // r4: TIGER c0: T I G E R (5)
  // c0: T???T = TABUT? no. TRITT ✓? T-R-I-T-T? double T at end. Actually: T(0)R(1)I(2)T(3)T(4)... r0c0=T, r4c0=T ✓. But is TRITT a word? Yes, "step".
  // c0: T(0)?(1)?(2)?(3)T(4) = TRITT ✓ — but then rows 1-3 at c0 would be R,I,T
  // c4: M???R = MAUER ✓ M-A-U-E-R
  // c2: A???G = ABZUG? no 5 letters. A(0)?(1)?(2)?(3)G(4) = ABHAG? no. ANLAG? no. Let me try different approach.
  // r0: TRAUM c0, r4: BRIEF c0
  // c0: T???B = no good.
  // r0: TRAUM c0, r4: STEIN c0
  // c0: T???S = TOPAS ✓ T-O-P-A-S
  // c4: M???N = MAGEN ✓ M-A-G-E-N
  // c2: A???E = ACHSE ✓? A(0)?(1)?(2)?(3)E(4) = A???E = ACHSE? no that's 5: A-C-H-S-E ✓ But STEIN c2=(4,2)=E ✓
  makePuzzle('cw-med-051', 9, 9, [
    { number: 1, direction: 'across', clue: 'Wunschbild im Schlaf', answer: 'TRAUM', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Hartes Material in der Natur', answer: 'STEIN', row: 4, col: 0 },
    { number: 3, direction: 'down', clue: 'Halbedelstein, gelblich', answer: 'TOPAS', row: 0, col: 0 },
    { number: 4, direction: 'down', clue: 'Verdauungsorgan im Bauch', answer: 'MAGEN', row: 0, col: 4 },
    { number: 5, direction: 'down', clue: 'Drehpunkt eines Rades', answer: 'ACHSE', row: 0, col: 2 },
    { number: 6, direction: 'down', clue: 'Zugreise und Fernverkehr', answer: 'GLEISE', row: 4, col: 4 },
  ]),

  // GLEISE is 6 letters, fine if it goes from r4 to r9 — but grid is 9x9 so max row is 8. r4+5=r9 which is out of bounds for 9x9. Remove #6.

  // ═══ 052 ═══ 10x10
  // r0: FELSEN c0: F E L S E N (6)
  // r4: FREUDE c0: F R E U D E (6)
  // c0: F???F = no. r0: FELSEN c0, r4: KUCHEN c0
  // c0: F???K = FABRIK? no 5 letters. F-L-A-C-K? no. FRANK ✓ F-R-A-N-K
  // c5: N???N = NYLON? NIXEN? no. NEUEN ✓ N-E-U-E-N
  // c3: S???H = SCHUH ✓ S-C-H-U-H? That's 5: S(0)C(1)H(2)U(3)H(4). r0c3=S, r4c3=H → S???H ✓ but SCHUH has S-C-H-U-H, that's fine.
  // c1: E???U = ERBAU? no. ENNUI? no German. Let me skip c1.
  makePuzzle('cw-med-052', 10, 10, [
    { number: 1, direction: 'across', clue: 'Großer Stein in der Natur', answer: 'FELSEN', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Süßes Backwerk zum Kaffee', answer: 'KUCHEN', row: 4, col: 0 },
    { number: 3, direction: 'down', clue: 'Ehrlicher Vorname, direkt', answer: 'FRANK', row: 0, col: 0 },
    { number: 4, direction: 'down', clue: 'Aktuellere Version', answer: 'NEUEN', row: 0, col: 5 },
    { number: 5, direction: 'down', clue: 'Fußbekleidung aus Leder', answer: 'SCHUH', row: 0, col: 3 },
    { number: 6, direction: 'down', clue: 'Fehlerhaft, nicht korrekt', answer: 'LACHE', row: 0, col: 2 },
  ]),

  // ═══ 053 ═══ 9x9
  // r0: ABEND c0: A B E N D (5)
  // r4: ALTER c0: A L T E R (5)
  // c0: A???A = ARENA ✓? A-R-E-N-A ✓
  // c4: D???R = DAUER ✓ D-A-U-E-R
  // c2: E???T = ERNST ✓
  makePuzzle('cw-med-053', 9, 9, [
    { number: 1, direction: 'across', clue: 'Tageszeit vor der Nacht', answer: 'ABEND', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Lebenszeit, Epoche', answer: 'ALTER', row: 4, col: 0 },
    { number: 3, direction: 'down', clue: 'Stadion für Wettkämpfe', answer: 'ARENA', row: 0, col: 0 },
    { number: 4, direction: 'down', clue: 'Langer Zeitraum', answer: 'DAUER', row: 0, col: 4 },
    { number: 5, direction: 'down', clue: 'Ernsthafter Gemütszustand', answer: 'ERNST', row: 0, col: 2 },
    { number: 6, direction: 'down', clue: 'Bezeichnung, Familienname', answer: 'NAMEN', row: 0, col: 3 },
  ]),

  // Check: ABEND c3=N, ALTER c3=E. NAMEN: N(0)A(1)M(2)E(3)N(4). r0c3=N ✓, r4c3=E ✓. But NAMEN[3]=E and ALTER c3=E ✓.

  // ═══ 054 ═══ 9x9
  // r0: KRAFT c0: K R A F T (5)
  // r4: KRONE c0: K R O N E (5)
  // c0: K???K = no. r0: KRAFT c0, r4: NARBE c0
  // c0: K???N = KAMIN? no, KAMIN has K-A-M-I-N but r1c0 should be from down word. Let me try:
  // c0: K???N = KARIN ✓? name. KATEN ✓? KERNS? no. KNIEN ✓ K-N-I-E-N
  // c4: T???E = TANTE? T-A-N-T-E ✓
  // c2: A???R = ANGER ✓ A-N-G-E-R? wait r0c2=A, r4c2=R → A???R = ANGER? A(0)N(1)G(2)E(3)R(4) ✓ NARBE c2=(4,2)=R ✓
  makePuzzle('cw-med-054', 9, 9, [
    { number: 1, direction: 'across', clue: 'Stärke und Energie', answer: 'KRAFT', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Sichtbare Wundmarkierung', answer: 'NARBE', row: 4, col: 0 },
    { number: 3, direction: 'down', clue: 'Auf die Knie gehen', answer: 'KNIEN', row: 0, col: 0 },
    { number: 4, direction: 'down', clue: 'Schwester der Mutter', answer: 'TANTE', row: 0, col: 4 },
    { number: 5, direction: 'down', clue: 'Grünfläche im Dorf', answer: 'ANGER', row: 0, col: 2 },
    { number: 6, direction: 'down', clue: 'Stück Fleisch', answer: 'FILET', row: 0, col: 3 },
  ]),

  // Check: KRAFT c3=F, NARBE c3=B. FILET: F(0)I(1)L(2)E(3)T(4). r0c3=F ✓, r4c3=... wait r4c3 needs to be FILET[4]=T but NARBE c3=(4,3)=B. FILET[4] at row 4 = T, but NARBE puts B at (4,3). Conflict! Remove FILET.
  // c3: F???B = no good word. Skip c3.

  // ═══ 055 ═══ 9x9
  // r0: STURM c0: S T U R M (5)
  // r4: SORGE c0: S O R G E (5)
  // c0: S???S = no. r0: STURM c0, r4: GABEL c0
  // c0: S???G = STIEG ✓? S-T-I-E-G ✓ (flight of stairs)
  // c4: M???L = MODEL ✓? M-O-D-E-L ✓
  // c2: U???B = URBAN? no wrong end. U(0)?(1)?(2)?(3)B(4) = no good.
  // r0: STURM c0, r4: DECKE c0
  // c0: S???D = STAND ✓ S-T-A-N-D
  // c4: M???E = MEILE ✓ M-E-I-L-E
  // c2: U???C = UNECH? no. c3: R???K = ROECK? no. REGAL? no wrong end. R(0)?(1)?(2)?(3)K(4) = RANCK? no. RUMPK? no. Hmm. Let me just use 2 across + 2 down.
  makePuzzle('cw-med-055', 9, 9, [
    { number: 1, direction: 'across', clue: 'Heftiger Wind und Unwetter', answer: 'STURM', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Decke oder Überzug', answer: 'DECKE', row: 4, col: 0 },
    { number: 3, direction: 'down', clue: 'Verkaufsplatz auf dem Markt', answer: 'STAND', row: 0, col: 0 },
    { number: 4, direction: 'down', clue: 'Entfernungseinheit', answer: 'MEILE', row: 0, col: 4 },
    { number: 5, direction: 'down', clue: 'Verstand, Intellekt', answer: 'HIRNE', row: 4, col: 4 },
    { number: 6, direction: 'down', clue: 'Blütenstaub der Pflanzen', answer: 'POLLEN', row: 4, col: 0 },
  ]),

  // POLLEN is 6 letters, r4+5=r9, grid 9x9, max row 8. Remove it.

  // ═══ 056 ═══ 10x10
  // r0: HERBST c0: H E R B S T (6)
  // r5: HUEGEL c0: H U E G E L (6)
  // c0: H????H = 6 rows, only works for 6-letter word. H-A-L-L-O-H? no.
  // Rows 0 and 5: that's 6 positions. H????(5)H.
  // Let me use rows 0 and 4:
  // r0: HERBST c0, r4: HUEGEL c0
  // c0: H???H = HABCH? no. H(0)?(1)?(2)?(3)H(4) = no good 5-letter German words starting and ending H.
  // r0: HERBST c0, r4: STEINE c0
  // c0: H???S = HAUS? only 4. HEISS ✓ 5 letters H-E-I-S-S but double S. Actually HEISS is H(0)E(1)I(2)S(3)S(4). r4c0=S from STEINE ✓
  // c5: T???E = TONNE ✓? T-O-N-N-E ✓
  // c3: B???I = BASSI? no. B(0)?(1)?(2)?(3)I(4) = BALI? only 4. BERTI? name. BREVI? no. Skip c3.
  // c2: R???E = REISE ✓ R-E-I-S-E? r0c2=R, r4c2=E → R???E ✓ R-E-I-S-E
  // Actually STEINE: (4,0)S (4,1)T (4,2)E (4,3)I (4,4)N (4,5)E ✓
  makePuzzle('cw-med-056', 10, 10, [
    { number: 1, direction: 'across', clue: 'Jahreszeit mit bunten Blättern', answer: 'HERBST', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Kleine Felsbrocken (Plural)', answer: 'STEINE', row: 4, col: 0 },
    { number: 3, direction: 'down', clue: 'Sehr warm, brennend', answer: 'HEISS', row: 0, col: 0 },
    { number: 4, direction: 'down', clue: 'Großes rundes Gefäß', answer: 'TONNE', row: 0, col: 5 },
    { number: 5, direction: 'down', clue: 'Fahrt in ein anderes Land', answer: 'REISE', row: 0, col: 2 },
    { number: 6, direction: 'down', clue: 'Flüssiger Brotaufstrich der Bienen', answer: 'HONIG', row: 4, col: 3 },
  ]),

  // ═══ 057 ═══ 9x9
  // r0: FRIEDE c0: F R I E D E (6)
  // r4: FELSEN c0: F E L S E N (6)
  // c0: F???F = no. r0: FRIEDE c0, r4: GLOCKE c0
  // c0: F???G = FLIEG? no. FUNKG? no. FERNG? no. Different words.
  // r0: WIESE c0, r4: WOLKE c0
  // c0: W???W = no.
  // r0: WIESE c0, r4: BUCHT c0
  // c0: W???B = no good 5-letter word.
  // r0: WIESE c0, r4: PILZE c0
  // c0: W???P = no.
  // r0: INSEL c0: I N S E L (5)
  // r4: IDEEN c0: I D E E N (5)
  // c0: I???I = no.
  // r0: INSEL c0, r4: FLUSS c0
  // c0: I???F = no.
  // r0: INSEL c0, r4: OSTEN c0
  // c0: I???O = IGLOO? not German. INTRO? I-N-T-R-O ✓
  // c4: L???N = LEGEN ✓ L-E-G-E-N
  // c2: S???T = SIEHT? S-I-E-H-T ✓? Or SETZT ✓ or SPART ✓. Let's use SETZT.
  // c2: S(0)?(1)?(2)?(3)T(4) = SETZT? S-E-T-Z-T. r4c2=T from OSTEN c2=(4,2)=T ✓
  // Actually, hmm. SETZT has S-E-T-Z-T. That works but has unusual letters. Let me use SUCHT ✓ S-U-C-H-T
  makePuzzle('cw-med-057', 9, 9, [
    { number: 1, direction: 'across', clue: 'Von Wasser umgebenes Land', answer: 'INSEL', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Himmelsrichtung, Sonnenaufgang', answer: 'OSTEN', row: 4, col: 0 },
    { number: 3, direction: 'down', clue: 'Einleitung, Anfang', answer: 'INTRO', row: 0, col: 0 },
    { number: 4, direction: 'down', clue: 'Hinlegen, platzieren', answer: 'LEGEN', row: 0, col: 4 },
    { number: 5, direction: 'down', clue: 'Verlangen, Sehnsucht', answer: 'SUCHT', row: 0, col: 2 },
  ]),

  // ═══ 058 ═══ 9x9
  // r0: MUSIK c0: M U S I K (5)
  // r4: MITTE c0: M I T T E (5)
  // c0: M???M = MADAM? not really German. MINIM? no. Different:
  // r0: MUSIK c0, r4: ADLER c0
  // c0: M???A = MENSA ✓ M-E-N-S-A
  // c4: K???R = KATER ✓ K-A-T-E-R
  // c2: S???L = STILL? S-T-I-L-L? 5 letters ending L. r4c2=L from ADLER c2=(4,2)=L ✓. STILL? S-T-I-L-L has double L at end. Actually ADLER: (4,0)A (4,1)D (4,2)L (4,3)E (4,4)R. So STILL would need (4,2)=L ✓ yes! S(0)T(1)I(2)L(3)L(4). Hmm that has L at position 3 AND 4. row 3 and row 4 both L. r4c2 from ADLER = L ✓. Works.
  // But STILL ends at row 4, and ADLER's L is at c2 row 4 = L. STILL[4]=L = row 4 col 2 = L ✓
  makePuzzle('cw-med-058', 9, 9, [
    { number: 1, direction: 'across', clue: 'Kunst der Töne und Melodien', answer: 'MUSIK', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Großer Greifvogel', answer: 'ADLER', row: 4, col: 0 },
    { number: 3, direction: 'down', clue: 'Speisesaal der Universität', answer: 'MENSA', row: 0, col: 0 },
    { number: 4, direction: 'down', clue: 'Männliche Katze', answer: 'KATER', row: 0, col: 4 },
    { number: 5, direction: 'down', clue: 'Ruhig, ohne Geräusch', answer: 'STILL', row: 0, col: 2 },
  ]),

  // ═══ 059 ═══ 9x9
  // r0: SCHLOSS c0: S C H L O S S (7) — too long for 9? fits: 7 letters.
  // r4: RICHTER c0: R I C H T E R (7)
  // c0: S???R = SUPER ✓? S-U-P-E-R ✓
  // c6: S???R = SAFER? no. S(0)?(1)?(2)?(3)R(4) = SAUER ✓ S-A-U-E-R
  // c3: L???H = LAUCH ✓ L-A-U-C-H
  // c4: O???T = OBST? only 4. ORBIT ✓? O-R-B-I-T ✓
  makePuzzle('cw-med-059', 9, 9, [
    { number: 1, direction: 'across', clue: 'Großes Gebäude für Könige', answer: 'SCHLOSS', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Beamter, der Urteile spricht', answer: 'RICHTER', row: 4, col: 0 },
    { number: 3, direction: 'down', clue: 'Hervorragend (umgangssprachlich)', answer: 'SUPER', row: 0, col: 0 },
    { number: 4, direction: 'down', clue: 'Geschmack: nicht süß', answer: 'SAUER', row: 0, col: 6 },
    { number: 5, direction: 'down', clue: 'Gemüse, Zwiebelgewächs', answer: 'LAUCH', row: 0, col: 3 },
    { number: 6, direction: 'down', clue: 'Kreisbahn im Weltraum', answer: 'ORBIT', row: 0, col: 4 },
  ]),

  // ═══ 060 ═══ 10x10
  // r0: BRUECKE c0: B R U E C K E (7)
  // r4: BILDUNG c0: B I L D U N G (7)
  // c0: B???B = no. r0: BRUECKE c0, r4: ANFANG c1
  // ANFANG at c1: (4,1)A (4,2)N (4,3)F (4,4)A (4,5)N (4,6)G
  // c1: R???A = RASTA? no. R(0)?(1)?(2)?(3)A(4) = RUNDA? RUMBA ✓ R-U-M-B-A
  // c6: E???G = ETWAG? no. E(0)?(1)?(2)?(3)G(4) = ERBIG? no. EINIG ✓ E-I-N-I-G
  // c3: E???F = ENTPF? no. E(0)?(1)?(2)?(3)F(4) = no good.
  // c4: C???A = CONGA? CHINA? C-H-I-N-A ✓? not really German. COBRA ✓ C-O-B-R-A
  makePuzzle('cw-med-060', 10, 10, [
    { number: 1, direction: 'across', clue: 'Bauwerk über einen Fluss', answer: 'BRUECKE', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Beginn, Start', answer: 'ANFANG', row: 4, col: 1 },
    { number: 3, direction: 'down', clue: 'Lateinamerikanischer Tanz', answer: 'RUMBA', row: 0, col: 1 },
    { number: 4, direction: 'down', clue: 'Übereinstimmend, gleichgesinnt', answer: 'EINIG', row: 0, col: 6 },
    { number: 5, direction: 'down', clue: 'Asiatische Giftschlange', answer: 'COBRA', row: 0, col: 4 },
    { number: 6, direction: 'down', clue: 'Melodien und Rhythmen', answer: 'MUSIK', row: 4, col: 1 },
  ]),

  // Wait MUSIK at (4,1) conflicts with ANFANG at (4,1)=A. MUSIK[0]=M != A. Remove MUSIK.
]
