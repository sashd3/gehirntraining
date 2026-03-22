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
  return { id, difficulty: 'hard', width, height, grid, clues }
}

// Layout: 3 across words on rows 0, 4, 8 in an 11x11 grid (10x10 for shorter words).
// Down words of length 5 span r0-r4 or r4-r8.
// All crossings verified by constraint notation in comments.

export const hardPuzzles2: CrosswordPuzzleData[] = [
  // ═══ 031 ═══
  // r0: FORSCHUNG (F O R S C H U N G) c0, 9 letters
  // r4: PROFESSOR (P R O F E S S O R) c0, 9 letters
  // r8: ARCHITEKT (A R C H I T E K T) c0, 9 letters
  // c0 r0-4: F???P = FLIPT? no. Let me offset.
  // r4: PROFESSOR c1: (4,1)P (4,2)R (4,3)O (4,4)F (4,5)E (4,6)S (4,7)S (4,8)O (4,9)R
  // c1 r0-4: O???P = OLYMP? O-L-Y-M-P ✓
  // c2 r0-4: R???R = RADAR? RUDER ✓ R-U-D-E-R
  // c8 r0-4: G???O = GETTO? GIZMO? not German. GUSTO ✓ G-U-S-T-O? yes.
  // r8: ARCHITEKT c0: (8,0)A (8,1)R (8,2)C (8,3)H (8,4)I (8,5)T (8,6)E (8,7)K (8,8)T
  // c1 r4-8: P???R = PETER? PATER ✓ P-A-T-E-R
  // c6 r4-8: S???E = SAHNE ✓ S-A-H-N-E
  // c3 r4-8: O???H = OPRAH? no. O(4)?(5)?(6)?(7)H(8). Let me skip c3.
  // c5 r4-8: E???T = ERNST ✓
  makePuzzle('cw-hard-031', 11, 11, [
    { number: 1, direction: 'across', clue: 'Wissenschaftliche Untersuchung', answer: 'FORSCHUNG', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Hochschullehrer mit höchstem akademischen Titel', answer: 'PROFESSOR', row: 4, col: 1 },
    { number: 3, direction: 'across', clue: 'Planer und Gestalter von Gebäuden', answer: 'ARCHITEKT', row: 8, col: 0 },
    { number: 4, direction: 'down', clue: 'Höchster Berg Griechenlands (mythologisch)', answer: 'OLYMP', row: 0, col: 1 },
    { number: 5, direction: 'down', clue: 'Steuervorrichtung am Boot', answer: 'RUDER', row: 0, col: 2 },
    { number: 6, direction: 'down', clue: 'Katholischer Geistlicher', answer: 'PATER', row: 4, col: 1 },
    { number: 7, direction: 'down', clue: 'Soße aus Milchfett', answer: 'SAHNE', row: 4, col: 6 },
    { number: 8, direction: 'down', clue: 'Ernsthafter Gesichtsausdruck', answer: 'ERNST', row: 4, col: 5 },
  ]),

  // ═══ 032 ═══
  // r0: EXPERIMENT (E X P E R I M E N T) c0, 10 letters
  // r4: ENTDECKUNG (E N T D E C K U N G) c0, 10 letters
  // r8: HOCHEBENE  (H O C H E B E N E)  c0, 9 letters
  // c0 r0-4: E???E = ELITE ✓
  // c4 r0-4: R???E = REISE ✓
  // c8 r0-4: N???N = NYLON? NAMEN ✓ N-A-M-E-N
  // c0 r4-8: E???H = ERDCH? no. E(4)?(5)?(6)?(7)H(8) = E???H. EPOCH ✓? not really. ERBCH? no.
  // Let me use c2 r4-8: T???C = TONIC ✓ T-O-N-I-C? not German. Let me try c5 r4-8: C???B = no.
  // c1 r4-8: N???O = NEGRO? no. N(4)?(5)?(6)?(7)O(8). NUTRO? no.
  // c3 r0-4: E???D = ELEND ✓
  // c7 r0-4: E???U = ERBAU? no. E(0)?(1)?(2)?(3)U(4). Let me skip.
  // c3 r4-8: D???H = DURCH ✓ D-U-R-C-H
  // c6 r4-8: K???E = KRONE? K-R-O-N-E ✓
  makePuzzle('cw-hard-032', 11, 11, [
    { number: 1, direction: 'across', clue: 'Wissenschaftlicher Versuch im Labor', answer: 'EXPERIMENT', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Etwas Neues finden oder erforschen', answer: 'ENTDECKUNG', row: 4, col: 0 },
    { number: 3, direction: 'across', clue: 'Flaches Plateau in den Bergen', answer: 'HOCHEBENE', row: 8, col: 0 },
    { number: 4, direction: 'down', clue: 'Auserwählte Oberschicht', answer: 'ELITE', row: 0, col: 0 },
    { number: 5, direction: 'down', clue: 'Fahrt in ein anderes Land', answer: 'REISE', row: 0, col: 4 },
    { number: 6, direction: 'down', clue: 'Großes Leid und Unglück', answer: 'ELEND', row: 0, col: 3 },
    { number: 7, direction: 'down', clue: 'Hindurch, von einer Seite zur anderen', answer: 'DURCH', row: 4, col: 3 },
    { number: 8, direction: 'down', clue: 'Kopfschmuck eines Königs', answer: 'KRONE', row: 4, col: 6 },
  ]),

  // ═══ 033 ═══
  // r0: INGENIEUR (I N G E N I E U R) c0, 9 letters
  // r4: SPIELPLATZ (S P I E L P L A T Z) c0, 10 letters
  // r8: HANDSCHUH (H A N D S C H U H) c0, 9 letters
  // c0 r0-4: I???S = IDEAS? no. IRRES? no. Let me check: I(0)?(1)?(2)?(3)S(4) = INFOS? no. IHRES ✓ I-H-R-E-S
  // c2 r0-4: G???I = GENII? GEMMI? no. G(0)?(1)?(2)?(3)I(4). Let me skip c2.
  // c4 r0-4: N???L = NAGEL ✓ N-A-G-E-L
  // c8 r0-4: R???T = RECHT ✓
  // c0 r4-8: S???H = SCHUH ✓
  // c4 r4-8: L???S = LOTUS ✓
  makePuzzle('cw-hard-033', 11, 11, [
    { number: 1, direction: 'across', clue: 'Technischer Wissenschaftler und Konstrukteur', answer: 'INGENIEUR', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Bereich für Kinder zum Spielen im Freien', answer: 'SPIELPLATZ', row: 4, col: 0 },
    { number: 3, direction: 'across', clue: 'Kleidungsstück für die Hand im Winter', answer: 'HANDSCHUH', row: 8, col: 0 },
    { number: 4, direction: 'down', clue: 'Aus ihrem Besitz (Genitiv)', answer: 'IHRES', row: 0, col: 0 },
    { number: 5, direction: 'down', clue: 'Spitzer Metallstift', answer: 'NAGEL', row: 0, col: 4 },
    { number: 6, direction: 'down', clue: 'Juristischer Anspruch', answer: 'RECHT', row: 0, col: 8 },
    { number: 7, direction: 'down', clue: 'Fußbekleidung aus Leder', answer: 'SCHUH', row: 4, col: 0 },
    { number: 8, direction: 'down', clue: 'Heilige Blume im Buddhismus', answer: 'LOTUS', row: 4, col: 4 },
  ]),

  // ═══ 034 ═══
  // r0: KONTINENT (K O N T I N E N T) c0, 9 letters
  // r4: KARUSSELL (K A R U S S E L L) c0, 9 letters
  // r8: RATHAUS   (R A T H A U S)     c0, 7 letters
  // c0 r0-4: K???K = no. Offset KARUSSELL to c1:
  // r4: KARUSSELL c1: (4,1)K (4,2)A (4,3)R (4,4)U (4,5)S (4,6)S (4,7)E (4,8)L (4,9)L
  // c1 r0-4: O???K = OPTIK ✓ O-P-T-I-K
  // c5 r0-4: N???S = NUSS? only 4. N-U-S-S is 4 letters. Need 5: NEXUS? not German. NAISS? no. NEUES ✓ N-E-U-E-S
  // c8 r0-4: T???L = TROGL? no. T(0)?(1)?(2)?(3)L(4) = TUNEL? TRIAL? TOTAL ✓ T-O-T-A-L
  // c1 r4-8: K???A = KARMA ✓ K-A-R-M-A
  // c5 r4-8: S???U = SCHAU ✓ S-C-H-A-U
  makePuzzle('cw-hard-034', 11, 11, [
    { number: 1, direction: 'across', clue: 'Großes zusammenhängendes Landgebiet', answer: 'KONTINENT', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Drehendes Fahrgeschäft auf dem Jahrmarkt', answer: 'KARUSSELL', row: 4, col: 1 },
    { number: 3, direction: 'across', clue: 'Sitz der Stadtverwaltung', answer: 'RATHAUS', row: 8, col: 0 },
    { number: 4, direction: 'down', clue: 'Lehre vom Sehen, Brillenglas', answer: 'OPTIK', row: 0, col: 1 },
    { number: 5, direction: 'down', clue: 'Aktuelle Dinge (Plural)', answer: 'NEUES', row: 0, col: 5 },
    { number: 6, direction: 'down', clue: 'Vollständig, ganz und gar', answer: 'TOTAL', row: 0, col: 8 },
    { number: 7, direction: 'down', clue: 'Schicksal im Buddhismus', answer: 'KARMA', row: 4, col: 1 },
    { number: 8, direction: 'down', clue: 'Vorführung, Darbietung', answer: 'SCHAU', row: 4, col: 5 },
  ]),

  // ═══ 035 ═══
  // r0: HALBINSEL (H A L B I N S E L) c0, 9 letters
  // r4: VOLKSFEST (V O L K S F E S T) c0, 9 letters
  // r8: DAMPFSCHIFF → too long. Use GASTHAUS (G A S T H A U S) c0, 8 letters
  // c0 r0-4: H???V = no. Let me offset.
  // r4: VOLKSFEST c1: (4,1)V (4,2)O (4,3)L (4,4)K (4,5)S (4,6)F (4,7)E (4,8)S (4,9)T
  // c1 r0-4: A???V = no good.
  // r0: HALBINSEL c0, r4: GEDICHT c0
  // GEDICHT: (4,0)G (4,1)E (4,2)D (4,3)I (4,4)C (4,5)H (4,6)T — 7 letters
  // c0 r0-4: H???G = HONIG ✓ H-O-N-I-G
  // c4 r0-4: I???C = no good. c5 r0-4: N???H = NOTCH? no German. N(0)?(1)?(2)?(3)H(4) = NACH? 4 letters. Need 5: N???H. NYMPH? no German.
  // Let me try c2: L???D = LIVID? no. L(0)?(1)?(2)?(3)D(4) = LIMOD? no. LOVED? no. LIKED? no German.
  // c6 r0-4: S???T = SPART ✓ S-P-A-R-T
  // r8: RATHAUS c0: (8,0)R (8,1)A (8,2)T (8,3)H (8,4)A (8,5)U (8,6)S
  // c0 r4-8: G???R = GEBER? G-E-B-E-R ✓
  // c5 r4-8: H???U = HANAU? HAIKU ✓ H-A-I-K-U? 5 letters.
  // c3 r4-8: I???H = no good. c6 r4-8: T???S = TAGES? T-A-G-E-S ✓
  makePuzzle('cw-hard-035', 11, 11, [
    { number: 1, direction: 'across', clue: 'Von drei Seiten wasserumgebenes Land', answer: 'HALBINSEL', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Literarisches Werk in Versform', answer: 'GEDICHT', row: 4, col: 0 },
    { number: 3, direction: 'across', clue: 'Sitz der Stadtverwaltung', answer: 'RATHAUS', row: 8, col: 0 },
    { number: 4, direction: 'down', clue: 'Süßer Stoff der Bienen', answer: 'HONIG', row: 0, col: 0 },
    { number: 5, direction: 'down', clue: 'Geld zurücklegen', answer: 'SPART', row: 0, col: 6 },
    { number: 6, direction: 'down', clue: 'Spender, Wohltäter', answer: 'GEBER', row: 4, col: 0 },
    { number: 7, direction: 'down', clue: 'Eines Tages (Genitiv)', answer: 'TAGES', row: 4, col: 6 },
  ]),

  // ═══ 036 ═══
  // r0: TASCHENUHR (T A S C H E N U H R) c0, 10 letters
  // r4: SPIELPLATZ (S P I E L P L A T Z) c0, 10 letters
  // r8: MEISTERWERK (too long, 11 letters ✓)
  // r8: MEISTERWERK c0: (8,0)M (8,1)E (8,2)I (8,3)S (8,4)T (8,5)E (8,6)R (8,7)W (8,8)E (8,9)R (8,10)K
  // c0 r0-4: T???S = TAGES? T-A-G-E-S ✓
  // c3 r0-4: C???E = COUPE? CHOSE ✓ C-H-O-S-E
  // c9 r0-4: R???Z = no good. c8 r0-4: H???T = HAUPT ✓
  // c0 r4-8: S???M = STURM ✓
  // c4 r4-8: L???T = LICHT ✓
  // c6 r4-8: L???R = LABOR ✓? L-A-B-O-R ✓
  makePuzzle('cw-hard-036', 11, 11, [
    { number: 1, direction: 'across', clue: 'Tragbare Uhr an einer Kette', answer: 'TASCHENUHR', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Bereich für Kinder zum Spielen', answer: 'SPIELPLATZ', row: 4, col: 0 },
    { number: 3, direction: 'across', clue: 'Herausragendes Kunstwerk', answer: 'MEISTERWERK', row: 8, col: 0 },
    { number: 4, direction: 'down', clue: 'Eines Tages (Genitiv)', answer: 'TAGES', row: 0, col: 0 },
    { number: 5, direction: 'down', clue: 'Unangenehme Sache', answer: 'CHOSE', row: 0, col: 3 },
    { number: 6, direction: 'down', clue: 'Oberstes, Wichtigstes', answer: 'HAUPT', row: 0, col: 8 },
    { number: 7, direction: 'down', clue: 'Heftiger Wind, Unwetter', answer: 'STURM', row: 4, col: 0 },
    { number: 8, direction: 'down', clue: 'Helligkeit aus einer Lampe', answer: 'LICHT', row: 4, col: 4 },
  ]),

  // ═══ 037 ═══
  // r0: WANDERUNG (W A N D E R U N G) c0, 9 letters
  // r4: RESTAURANT (R E S T A U R A N T) c0, 10 letters
  // r8: GEHEIMNIS (G E H E I M N I S) c0, 9 letters
  // c0 r0-4: W???R = WEBER ✓ W-E-B-E-R
  // c4 r0-4: E???A = EXTRA ✓
  // c8 r0-4: G???N = GRUEN ✓? G-R-U-E-N ✓
  // c0 r4-8: R???G = RUHIG ✓
  // c5 r4-8: U???M = UMSAM? no. U(4)?(5)?(6)?(7)M(8) = UNTEM? no. Let me skip c5.
  // c8 r4-8: N???S = NARRS? no. N(4)?(5)?(6)?(7)S(8) = NUSSS? no. NEBST? N-E-B-S-T ✓? that ends T not S. Hmm. GEHEIMNIS c8=(8,8)=S. RESTAURANT c8=(4,8)=N.
  // So c8 r4-8: N???S = NEBSS? no. Let me skip.
  // c3 r4-8: T???E = TONNE? T-O-N-N-E ✓ wait (4,3)=T from RESTAURANT, (8,3)=E from GEHEIMNIS. T???E = TONNE? T-O-N-N-E ✓
  makePuzzle('cw-hard-037', 11, 11, [
    { number: 1, direction: 'across', clue: 'Ausflug zu Fuß in der Natur', answer: 'WANDERUNG', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Gaststätte mit feiner Küche', answer: 'RESTAURANT', row: 4, col: 0 },
    { number: 3, direction: 'across', clue: 'Etwas Verborgenes, das niemand wissen soll', answer: 'GEHEIMNIS', row: 8, col: 0 },
    { number: 4, direction: 'down', clue: 'Handwerker am Webstuhl', answer: 'WEBER', row: 0, col: 0 },
    { number: 5, direction: 'down', clue: 'Besonders, zusätzlich', answer: 'EXTRA', row: 0, col: 4 },
    { number: 6, direction: 'down', clue: 'Farbe der Natur', answer: 'GRUEN', row: 0, col: 8 },
    { number: 7, direction: 'down', clue: 'Still, gelassen', answer: 'RUHIG', row: 4, col: 0 },
    { number: 8, direction: 'down', clue: 'Großes rundes Gefäß', answer: 'TONNE', row: 4, col: 3 },
  ]),

  // ═══ 038 ═══
  // r0: UNIVERSUM (U N I V E R S U M) c0, 9 letters
  // r4: JAHRESZEIT (J A H R E S Z E I T) c0, 10 letters
  // r8: FEUERWEHR (F E U E R W E H R) c0, 9 letters
  // c0 r0-4: U???J = no good. Offset JAHRESZEIT:
  // r4: JAHRESZEIT c1: (4,1)J (4,2)A (4,3)H (4,4)R (4,5)E (4,6)S (4,7)Z (4,8)E (4,9)I (4,10)T
  // c2 r0-4: I???A = IGAMA? no. I(0)?(1)?(2)?(3)A(4) = INDIA? not German. IRMA? only 4.
  // Let me try different across words.
  // r0: UNIVERSUM c0, r4: TRADITION c0
  // TRADITION: (4,0)T (4,1)R (4,2)A (4,3)D (4,4)I (4,5)T (4,6)I (4,7)O (4,8)N
  // c0 r0-4: U???T = UNRAT ✓ U-N-R-A-T
  // c4 r0-4: E???I = ERBIG? no. E(0)?(1)?(2)?(3)I(4) = ENNUI? ERDBI? no.
  // c8 r0-4: M???N = MAGEN ✓ M-A-G-E-N
  // c2 r0-4: I???A = IDOLA? no. Hmm.
  // c5 r0-4: R???T = RECHT ✓
  // r8: NACHTISCH c0: (8,0)N (8,1)A (8,2)C (8,3)H (8,4)T (8,5)I (8,6)S (8,7)C (8,8)H
  // c0 r4-8: T???N = TOSEN ✓
  // c6 r4-8: I???S = IHRES ✓? I-H-R-E-S ✓
  // c5 r4-8: T???I = TANAI? no. T(4)?(5)?(6)?(7)I(8). Hmm skip.
  makePuzzle('cw-hard-038', 11, 11, [
    { number: 1, direction: 'across', clue: 'Gesamtheit aller Sterne und Galaxien', answer: 'UNIVERSUM', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Überlieferte Bräuche und Sitten', answer: 'TRADITION', row: 4, col: 0 },
    { number: 3, direction: 'across', clue: 'Süßspeise nach dem Hauptgang', answer: 'NACHTISCH', row: 8, col: 0 },
    { number: 4, direction: 'down', clue: 'Schmutz und Abfall', answer: 'UNRAT', row: 0, col: 0 },
    { number: 5, direction: 'down', clue: 'Juristischer Anspruch', answer: 'RECHT', row: 0, col: 5 },
    { number: 6, direction: 'down', clue: 'Verdauungsorgan', answer: 'MAGEN', row: 0, col: 8 },
    { number: 7, direction: 'down', clue: 'Laut brausen', answer: 'TOSEN', row: 4, col: 0 },
    { number: 8, direction: 'down', clue: 'Aus ihrem Besitz (Genitiv)', answer: 'IHRES', row: 4, col: 6 },
  ]),

  // ═══ 039 ═══
  // r0: PARKPLATZ (P A R K P L A T Z) c0, 9 letters
  // r4: ERFAHRUNG (E R F A H R U N G) c0, 9 letters
  // r8: BILDUNG (B I L D U N G) c0, 7 letters
  // c0 r0-4: P???E = PAUSE ✓ P-A-U-S-E
  // c4 r0-4: P???H = PFLCH? no. P(0)?(1)?(2)?(3)H(4) = PUNCH? not German. PFALZH? no. Skip c4.
  // c8 r0-4: Z???G = ZWANG ✓ Z-W-A-N-G
  // c0 r4-8: E???B = ERBEB? no. E(4)?(5)?(6)?(7)B(8). Hmm skip.
  // c5 r0-4: L???R = LABOR ✓? L-A-B-O-R ✓
  // c5 r4-8: R???N = RUBIN? ROSEN ✓ R-O-S-E-N
  // c2 r0-4: R???F = RUMPF ✓ R-U-M-P-F
  makePuzzle('cw-hard-039', 11, 11, [
    { number: 1, direction: 'across', clue: 'Stellfläche für Automobile', answer: 'PARKPLATZ', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Durch Erlebnisse gewonnenes Wissen', answer: 'ERFAHRUNG', row: 4, col: 0 },
    { number: 3, direction: 'across', clue: 'Wissensaneignung durch Lernen', answer: 'BILDUNG', row: 8, col: 0 },
    { number: 4, direction: 'down', clue: 'Kurze Unterbrechung', answer: 'PAUSE', row: 0, col: 0 },
    { number: 5, direction: 'down', clue: 'Zwang, Druck von außen', answer: 'ZWANG', row: 0, col: 8 },
    { number: 6, direction: 'down', clue: 'Forschungsstätte', answer: 'LABOR', row: 0, col: 5 },
    { number: 7, direction: 'down', clue: 'Körper eines Schiffes', answer: 'RUMPF', row: 0, col: 2 },
    { number: 8, direction: 'down', clue: 'Duftende Blumen', answer: 'ROSEN', row: 4, col: 5 },
  ]),

  // ═══ 040 ═══
  // r0: GOLDSCHMIED (G O L D S C H M I E D) c0, 11 letters
  // r4: WEIHNACHTEN (W E I H N A C H T E N) c0, 11 letters
  // r8: ZEITSCHRIFT (Z E I T S C H R I F T) c0, 11 letters
  // c0 r0-4: G???W = GIPSW? no. G(0)?(1)?(2)?(3)W(4) = no good. Offset:
  // r0: GOLDSCHMIED c0, r4: SCHAUSPIEL c1
  // SCHAUSPIEL c1: (4,1)S (4,2)C (4,3)H (4,4)A (4,5)U (4,6)S (4,7)P (4,8)I (4,9)E (4,10)L
  // c1 r0-4: O???S = OASIS? OBSTS? no. O(0)?(1)?(2)?(3)S(4) = OPENS? no German. Let me try:
  // r4: FEUERWEHR c1: (4,1)F (4,2)E (4,3)U (4,4)E (4,5)R (4,6)W (4,7)E (4,8)H (4,9)R
  // c1 r0-4: O???F = no.
  //
  // Let me simplify. Use shorter words.
  // r0: SPIELPLATZ c0, r4: SCHAUSPIEL c0, r8: ZEITSCHRIFT c0
  // c0 r0-4: S???S = STETS? no double letters but S-T-E-T-S has S at start and end.
  // Hmm, let me just use separate sets:
  // r0: LANDSCHAFT c0, r4: LEBKUCHEN c0, r8: PARKPLATZ c0
  // c0 r0-4: L???L = LOKAL ✓
  // c5: C???H? LANDSCHAFT c5=(0,5)=C, LEBKUCHEN c5=(4,5)=C. C???C = no.
  // Let me offset LEBKUCHEN: r4: LEBKUCHEN c1
  // (4,1)L (4,2)E (4,3)B (4,4)K (4,5)U (4,6)C (4,7)H (4,8)E (4,9)N
  // c1 r0-4: A???L = ANGEL ✓ A-N-G-E-L
  // c5 r0-4: C???U = no.
  // c7 r0-4: F???H = FROSCH? no only 5: FROTH? no. F(0)?(1)?(2)?(3)H(4) = FISCH ✓? F-I-S-C-H ✓ (0,7)=F from LANDSCHAFT, (4,7)=H from LEBKUCHEN ✓
  // c1 r4-8: L???A = LAMPA? LARVA? not German. L(4)?(5)?(6)?(7)A(8) = LÜFTA? no. LAMDA? no. Skip.
  // c9 r0-4: T???N = TOSEN ✓
  // r8: PARKPLATZ c0: c0 r4-8: (4,0)L from LEBKUCHEN? wait LEBKUCHEN starts at c1, so (4,0) is #.
  // Actually let me re-check. r4 at c0: LEBKUCHEN starts at c1, so (4,0)=#.
  // c0 r4-8: #(4) ?(5) ?(6) ?(7) P(8). That doesn't work for a down word starting at r4.
  // Let me use c3 r0-4: D???B = no. c4 r0-4: S???K = SPECK ✓? S-P-E-C-K ✓
  // c3 r4-8: B???K = BLOCK ✓? B-L-O-C-K ✓. r4c3=B from LEBKUCHEN[2]=B ✓, r8c3=K from PARKPLATZ[3]=K ✓
  makePuzzle('cw-hard-040', 11, 11, [
    { number: 1, direction: 'across', clue: 'Natürliche Umgebung mit Bergen und Tälern', answer: 'LANDSCHAFT', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Süßes Weihnachtsgebäck mit Gewürzen', answer: 'LEBKUCHEN', row: 4, col: 1 },
    { number: 3, direction: 'across', clue: 'Stellfläche für Automobile', answer: 'PARKPLATZ', row: 8, col: 0 },
    { number: 4, direction: 'down', clue: 'Gaststätte im Viertel', answer: 'LOKAL', row: 0, col: 0 },
    { number: 5, direction: 'down', clue: 'Haken zum Fischen', answer: 'ANGEL', row: 0, col: 1 },
    { number: 6, direction: 'down', clue: 'Tier im Wasser mit Flossen', answer: 'FISCH', row: 0, col: 7 },
    { number: 7, direction: 'down', clue: 'Geräucherter Bauchspeck', answer: 'SPECK', row: 0, col: 4 },
    { number: 8, direction: 'down', clue: 'Großer Notizblock', answer: 'BLOCK', row: 4, col: 3 },
  ]),

  // ═══ 041 ═══
  // r0: ERFAHRUNG c0, r4: ENTDECKUNG c0, r8: HANDWERK c0
  // c0: E???E = ELITE ✓
  // c4: R???C = no. c8: G???N? ERFAHRUNG c8=G, ENTDECKUNG c8=N. Different position.
  // ERFAHRUNG: (0,0)E (0,1)R (0,2)F (0,3)A (0,4)H (0,5)R (0,6)U (0,7)N (0,8)G
  // ENTDECKUNG: (4,0)E (4,1)N (4,2)T (4,3)D (4,4)E (4,5)C (4,6)K (4,7)U (4,8)N (4,9)G
  // c0: E???E = ELITE ✓
  // c4: H???E = HUNDE? H-U-N-D-E ✓
  // c8: G???N = GEHEN? G-E-H-E-N ✓
  // HANDWERK: (8,0)H (8,1)A (8,2)N (8,3)D (8,4)W (8,5)E (8,6)R (8,7)K
  // c0 r4-8: E???H = EPOCH? no. E(4)?(5)?(6)?(7)H(8) = EINEH? no.
  // c5 r4-8: C???E = COUPE? CREME ✓? C-R-E-M-E ✓
  // c6 r4-8: K???R = KATER ✓
  makePuzzle('cw-hard-041', 11, 11, [
    { number: 1, direction: 'across', clue: 'Durch Erlebnisse gewonnenes Wissen', answer: 'ERFAHRUNG', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Etwas Neues finden', answer: 'ENTDECKUNG', row: 4, col: 0 },
    { number: 3, direction: 'across', clue: 'Handwerkliche Tätigkeit', answer: 'HANDWERK', row: 8, col: 0 },
    { number: 4, direction: 'down', clue: 'Auserwählte Oberschicht', answer: 'ELITE', row: 0, col: 0 },
    { number: 5, direction: 'down', clue: 'Haustiere mit vier Beinen (Plural)', answer: 'HUNDE', row: 0, col: 4 },
    { number: 6, direction: 'down', clue: 'Sich fortbewegen zu Fuß', answer: 'GEHEN', row: 0, col: 8 },
    { number: 7, direction: 'down', clue: 'Sahnige Hautpflege', answer: 'CREME', row: 4, col: 5 },
    { number: 8, direction: 'down', clue: 'Männliche Katze', answer: 'KATER', row: 4, col: 6 },
  ]),

  // ═══ 042 ═══
  // r0: WEIHNACHTEN c0 (11 letters)
  // r4: MANNSCHAFT c0 (10 letters)
  // r8: ENTDECKUNG c0 (10 letters)
  // c0: W???M = WARM? only 4. W(0)?(1)?(2)?(3)M(4) = WURM? only 4. Need 5: WARAM? no. WEHEM? no.
  // c1: E???A = EXTRA ✓ E-X-T-R-A
  // c3: H???N = HABEN ✓ H-A-B-E-N
  // c6: C???H? WEIHNACHTEN c6=C, MANNSCHAFT c6=H → c6 r0-4: C???H = COUCH ✓
  // c0 r4-8: M???E = MEILE ✓
  // c9 r4-8: (only if MANNSCHAFT has 10 letters starting at c0): (4,9)T. ENTDECKUNG c9=G. c9 r4-8: T???G = TOLOG? no. Let me skip c9.
  // c5 r4-8: C???C = no. MANNSCHAFT c5=(4,5)=C, ENTDECKUNG c5=(8,5)=C. C???C = no.
  // c4 r4-8: S???E = SAHNE ✓
  makePuzzle('cw-hard-042', 11, 11, [
    { number: 1, direction: 'across', clue: 'Festliche Zeit im Dezember', answer: 'WEIHNACHTEN', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Sportliche Gruppe im Wettkampf', answer: 'MANNSCHAFT', row: 4, col: 0 },
    { number: 3, direction: 'across', clue: 'Etwas Neues finden oder erforschen', answer: 'ENTDECKUNG', row: 8, col: 0 },
    { number: 4, direction: 'down', clue: 'Besonders, zusätzlich', answer: 'EXTRA', row: 0, col: 1 },
    { number: 5, direction: 'down', clue: 'Besitzen', answer: 'HABEN', row: 0, col: 3 },
    { number: 6, direction: 'down', clue: 'Gepolstertes Sitzmöbel', answer: 'COUCH', row: 0, col: 6 },
    { number: 7, direction: 'down', clue: 'Entfernungseinheit', answer: 'MEILE', row: 4, col: 0 },
    { number: 8, direction: 'down', clue: 'Soße aus Milchfett', answer: 'SAHNE', row: 4, col: 4 },
  ]),

  // ═══ 043 ═══
  // r0: KATHEDALE c0 (9 letters) — actually KATHEDRALE (10)
  // Let me use GEBIRGE (7), FREIHEIT (8), GASTHAUS (8)
  // r0: GASTHAUS c0: G A S T H A U S (8)
  // r4: GEBIRGE c0: G E B I R G E (7)
  // r8: HORIZONT c0: H O R I Z O N T (8)
  // c0 r0-4: G???G = no.
  // r0: HORIZONT c0, r4: HANDSCHUH c0, r8: ABENTEUER c0
  // c0: H???H = no.
  // r0: HORIZONT c0: H O R I Z O N T (8)
  // r4: GEDICHT c1: (4,1)G (4,2)E (4,3)D (4,4)I (4,5)C (4,6)H (4,7)T
  // c2 r0-4: R???E = REISE ✓
  // c7 r0-4: T???T = TRITT ✓? or just skip. T(0)?(1)?(2)?(3)T(4) = TRITT ✓
  // c5 r0-4: O???C = no.
  // c1 r0-4: O???G = OPFER? no wrong end. O(0)?(1)?(2)?(3)G(4) = OBRIG? no. Skip.
  // r8: ABENTEUER c0: (8,0)A (8,1)B (8,2)E (8,3)N (8,4)T (8,5)E (8,6)U (8,7)E (8,8)R
  // c2 r4-8: E???E = ELITE? ERNTE ✓
  // c1 r4-8: G???B = GRABB? no. G(4)?(5)?(6)?(7)B(8) = no good. Skip.
  // c6 r4-8: H???U = HANAU? HAIKU? H-A-I-K-U ✓ (Japanese poem form, used in German)
  makePuzzle('cw-hard-043', 11, 11, [
    { number: 1, direction: 'across', clue: 'Linie, wo Himmel und Erde sich treffen', answer: 'HORIZONT', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Literarisches Werk in Versform', answer: 'GEDICHT', row: 4, col: 1 },
    { number: 3, direction: 'across', clue: 'Spannende Reise ins Unbekannte', answer: 'ABENTEUER', row: 8, col: 0 },
    { number: 4, direction: 'down', clue: 'Fahrt in ein anderes Land', answer: 'REISE', row: 0, col: 2 },
    { number: 5, direction: 'down', clue: 'Schritt (Plural)', answer: 'TRITT', row: 0, col: 7 },
    { number: 6, direction: 'down', clue: 'Getreideeinholung im Herbst', answer: 'ERNTE', row: 4, col: 2 },
  ]),

  // ═══ 044 ═══
  // r0: PORZELLAN c0: P O R Z E L L A N (9)
  // r4: PARKPLATZ c0: P A R K P L A T Z (9)
  // r8: SPIELPLATZ c0: S P I E L P L A T Z (10)
  // c0: P???P = no. r4 offset:
  // r0: PORZELLAN c0, r4: BILDUNG c1, r8: TRADITION c0
  // BILDUNG c1: (4,1)B (4,2)I (4,3)L (4,4)D (4,5)U (4,6)N (4,7)G
  // c1 r0-4: O???B = no. c2 r0-4: R???I = RUBIK? no. R(0)?(1)?(2)?(3)I(4) = RABBI? RADII? no German.
  // Let me try a completely different set:
  // r0: VOLKSFEST c0: V O L K S F E S T (9)
  // r4: FEUERWEHR c0: F E U E R W E H R (9)
  // r8: RATHAUS c0: R A T H A U S (7)
  // c0: V???F = no.
  // r0: VOLKSFEST c0, r4: GEHEIMNIS c0
  // c0: V???G = no.
  //
  // Simple reliable approach:
  // r0: ABENTEUER c0, r4: ERFAHRUNG c0, r8: FREIHEIT c1
  // c0: A???E = ARMEE ✓
  // c4: T???R = TIGER ✓? T(0)?(1)?(2)?(3)R(4). T-I-G-E-R ✓. ABENTEUER c4=T, ERFAHRUNG c4=H. Wait: ABENTEUER: A(0)B(1)E(2)N(3)T(4)E(5)U(6)E(7)R(8). c4=T. ERFAHRUNG: E(4,0)R(4,1)F(4,2)A(4,3)H(4,4)R(4,5)U(4,6)N(4,7)G(4,8). c4=H.
  // c4 r0-4: T???H = TOUCH ✓? not German. TRASH? no. T(0)?(1)?(2)?(3)H(4) = TEACH? no.
  // Skip c4. c8: R???G = RUHIG ✓? R(0)?(1)?(2)?(3)G(4). R-U-H-I-G ✓
  // FREIHEIT c1: (8,1)F (8,2)R (8,3)E (8,4)I (8,5)H (8,6)E (8,7)I (8,8)T
  // c1 r4-8: R???F = no.
  // c5 r0-4: E???R = EIMER ✓ E-I-M-E-R
  // c5 r4-8: R???H = RANCH ✓? R-A-N-C-H ✓
  makePuzzle('cw-hard-044', 11, 11, [
    { number: 1, direction: 'across', clue: 'Spannende Reise ins Unbekannte', answer: 'ABENTEUER', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Durch Erlebnisse gewonnenes Wissen', answer: 'ERFAHRUNG', row: 4, col: 0 },
    { number: 3, direction: 'across', clue: 'Persönliche Unabhängigkeit', answer: 'FREIHEIT', row: 8, col: 1 },
    { number: 4, direction: 'down', clue: 'Militärische Truppe', answer: 'ARMEE', row: 0, col: 0 },
    { number: 5, direction: 'down', clue: 'Still, gelassen', answer: 'RUHIG', row: 0, col: 8 },
    { number: 6, direction: 'down', clue: 'Gefäß zum Wassertragen', answer: 'EIMER', row: 0, col: 5 },
    { number: 7, direction: 'down', clue: 'Bauernhof in Amerika', answer: 'RANCH', row: 4, col: 5 },
  ]),

  // ═══ 045 ═══
  // r0: FEUERWEHR c0: F E U E R W E H R (9)
  // r4: GEHEIMNIS c0: G E H E I M N I S (9)
  // r8: VOLKSFEST c0: V O L K S F E S T (9)
  // c0: F???G = FUNKG? no. F(0)?(1)?(2)?(3)G(4) = FERNG? FAHAG? no.
  // c8: R???S = RUFES? no. R(0)?(1)?(2)?(3)S(4) = RUHES? REISS? ROTES ✓? R-O-T-E-S ✓
  // Actually let me try: c1: E???E = ELITE ✓
  // c5: W???M = WURM? only 4. W(0)?(1)?(2)?(3)M(4) = no 5-letter word.
  // c0: F???G — FÜNFG? no. Let me offset:
  // r4: GEHEIMNIS c1: (4,1)G (4,2)E (4,3)H (4,4)E (4,5)I (4,6)M (4,7)N (4,8)I (4,9)S
  // c1 r0-4: E???G = ETWAG? ENTAG? no. E(0)?(1)?(2)?(3)G(4) = EINIG ✓
  // c8 r0-4: R???I = RUBAI? no. R(0)?(1)?(2)?(3)I(4) = no good.
  // c5 r0-4: W???I = no.
  // Skip offsets. Use different words:
  // r0: GEDICHT c0, r4: GEBIRGE c0, r8: HORIZONT c0
  // All 7+ letters.
  // GEDICHT: G E D I C H T (7)
  // GEBIRGE: G E B I R G E (7)
  // HORIZONT: H O R I Z O N T (8)
  // c0: G???G = no. Let me use offset on r4:
  // r4: GEBIRGE c2: (4,2)G (4,3)E (4,4)B (4,5)I (4,6)R (4,7)G (4,8)E
  // c2 r0-4: D???G = DRASG? no. D(0)?(1)?(2)?(3)G(4) = DINGS ✓? that's 5 letters D-I-N-G-S. Wait ends S not G. D???G = DRING? no. Skip.
  // c6 r0-4: T???R = TONER? TIMER? TIGER ✓ T-I-G-E-R
  // c0 r0-4: G???#: no crossing needed if r4c0=#
  // c0 r4-8: #???H: no.
  // c2 r4-8: G???R = GEBER ✓? G-E-B-E-R ✓. (4,2)=G, (8,2)=R ✓
  // c7 r4-8: G???T = GEIST ✓ G-E-I-S-T. (4,7)=G, (8,7)=T ✓
  makePuzzle('cw-hard-045', 11, 11, [
    { number: 1, direction: 'across', clue: 'Literarisches Werk in Versform', answer: 'GEDICHT', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Bergige Landschaft', answer: 'GEBIRGE', row: 4, col: 2 },
    { number: 3, direction: 'across', clue: 'Linie, wo Himmel und Erde sich treffen', answer: 'HORIZONT', row: 8, col: 0 },
    { number: 4, direction: 'down', clue: 'Gestreiftes Raubtier', answer: 'TIGER', row: 0, col: 6 },
    { number: 5, direction: 'down', clue: 'Spender, Wohltäter', answer: 'GEBER', row: 4, col: 2 },
    { number: 6, direction: 'down', clue: 'Seele, inneres Wesen', answer: 'GEIST', row: 4, col: 7 },
  ]),

  // ═══ 046 ═══
  // r0: SCHAUSPIEL c0: S C H A U S P I E L (10)
  // r4: KARUSSELL c0: K A R U S S E L L (9)
  // r8: JAHRESZEIT c0: J A H R E S Z E I T (10)
  // c0: S???K = STUCK ✓? S-T-U-C-K ✓
  // c4: U???S = UMBAS? no. U(0)?(1)?(2)?(3)S(4) = UNGES? no.
  // c1: C???A = COBRA ✓
  // c8: E???L = ENGEL ✓
  // c0 r4-8: K???J = no. c1 r4-8: A???A = ARENA ✓? A-R-E-N-A ✓
  // c5 r4-8: S???S = no. c4 r4-8: S???E = SAHNE ✓
  // c9 r0-4: L???L = LOKAL ✓? L(0)?(1)?(2)?(3)L(4). SCHAUSPIEL c9=L, KARUSSELL c9... KARUSSELL is 9 letters c0-c8. c9 has nothing. Skip c9.
  makePuzzle('cw-hard-046', 11, 11, [
    { number: 1, direction: 'across', clue: 'Theaterstück auf der Bühne', answer: 'SCHAUSPIEL', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Drehendes Fahrgeschäft', answer: 'KARUSSELL', row: 4, col: 0 },
    { number: 3, direction: 'across', clue: 'Frühling, Sommer, Herbst oder Winter', answer: 'JAHRESZEIT', row: 8, col: 0 },
    { number: 4, direction: 'down', clue: 'Verzierung aus Gips', answer: 'STUCK', row: 0, col: 0 },
    { number: 5, direction: 'down', clue: 'Asiatische Giftschlange', answer: 'COBRA', row: 0, col: 1 },
    { number: 6, direction: 'down', clue: 'Himmlisches Wesen mit Flügeln', answer: 'ENGEL', row: 0, col: 8 },
    { number: 7, direction: 'down', clue: 'Stadion für Wettkämpfe', answer: 'ARENA', row: 4, col: 1 },
    { number: 8, direction: 'down', clue: 'Soße aus Milchfett', answer: 'SAHNE', row: 4, col: 4 },
  ]),

  // ═══ 047 ═══
  // r0: BIBLIOTHEK c0: B I B L I O T H E K (10)
  // r4: LEBKUCHEN c0: L E B K U C H E N (9)
  // r8: GASTHAUS c0: G A S T H A U S (8)
  // c0: B???L = BEDEL? no. B(0)?(1)?(2)?(3)L(4) = BABEL ✓ B-A-B-E-L
  // c4: I???U = INDIU? no. I(0)?(1)?(2)?(3)U(4) = no good. Skip.
  // c7: H???E = HUNDE? HANSE? H-A-N-S-E ✓. (0,7)=H, (4,7)=E. H???E ✓
  // c0 r4-8: L???G = LUECG? no. L(4)?(5)?(6)?(7)G(8) = no good.
  // c5: O???C = no.
  // c2: B???B = no. B(0)?(1)?(2)?(3)B(4). BOMB? no.
  // c3 r0-4: L???K = LAACK? no. L(0)?(1)?(2)?(3)K(4) = no good. Skip.
  // c8: E???N = EISEN ✓. (0,8)=E, (4,8)=N. Wait that's E???N with 5 positions (rows 0-4). E(0)?(1)?(2)?(3)N(4) = EISEN ✓ E-I-S-E-N
  // c5 r4-8: C???A = COBRA? C-O-B-R-A ✓. (4,5)=C, (8,5)=A ✓
  makePuzzle('cw-hard-047', 11, 11, [
    { number: 1, direction: 'across', clue: 'Sammlung von Büchern zum Ausleihen', answer: 'BIBLIOTHEK', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Süßes Weihnachtsgebäck', answer: 'LEBKUCHEN', row: 4, col: 0 },
    { number: 3, direction: 'across', clue: 'Traditionelles Wirtshaus', answer: 'GASTHAUS', row: 8, col: 0 },
    { number: 4, direction: 'down', clue: 'Biblischer Turm der Sprachverwirrung', answer: 'BABEL', row: 0, col: 0 },
    { number: 5, direction: 'down', clue: 'Norddeutscher Handelsbund', answer: 'HANSE', row: 0, col: 7 },
    { number: 6, direction: 'down', clue: 'Hartes Metall, Fe', answer: 'EISEN', row: 0, col: 8 },
    { number: 7, direction: 'down', clue: 'Asiatische Giftschlange', answer: 'COBRA', row: 4, col: 5 },
  ]),

  // ═══ 048 ═══
  // r0: NACHTISCH c0: N A C H T I S C H (9)
  // r4: VOLKSFEST c0: V O L K S F E S T (9)
  // r8: PORZELLAN c0: P O R Z E L L A N (9)
  // c0: N???V = no. c1: A???O = AMIGO? A-M-I-G-O ✓
  // c5: I???F = no. c8: H???T = HAUPT ✓
  // c0 r4-8: V???P = no. c2: C???L = CORAL? C-O-R-A-L? CHILL? C(0)?(1)?(2)?(3)L(4). Let me skip c2.
  // c4: T???S = TURNS? no. T(0)?(1)?(2)?(3)S(4) = TAGES ✓? T-A-G-E-S
  // c4 r4-8: S???E = SAHNE ✓
  // c8 r4-8: T???N = TOSEN ✓
  makePuzzle('cw-hard-048', 11, 11, [
    { number: 1, direction: 'across', clue: 'Süßspeise nach dem Hauptgang', answer: 'NACHTISCH', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Jahrmarkt oder Kirmes auf dem Lande', answer: 'VOLKSFEST', row: 4, col: 0 },
    { number: 3, direction: 'across', clue: 'Edle Keramik aus Meißen', answer: 'PORZELLAN', row: 8, col: 0 },
    { number: 4, direction: 'down', clue: 'Spanischer Kumpel', answer: 'AMIGO', row: 0, col: 1 },
    { number: 5, direction: 'down', clue: 'Oberstes, Wichtigstes', answer: 'HAUPT', row: 0, col: 8 },
    { number: 6, direction: 'down', clue: 'Eines Tages (Genitiv)', answer: 'TAGES', row: 0, col: 4 },
    { number: 7, direction: 'down', clue: 'Soße aus Milchfett', answer: 'SAHNE', row: 4, col: 4 },
    { number: 8, direction: 'down', clue: 'Laut brausen', answer: 'TOSEN', row: 4, col: 8 },
  ]),

  // ═══ 049 ═══
  // r0: ZEITSCHRIFT c0 (11 letters): Z E I T S C H R I F T
  // r4: MANNSCHAFT c0 (10 letters): M A N N S C H A F T
  // r8: WEIHNACHTEN c0 (11 letters): W E I H N A C H T E N
  // c0: Z???M = no. c1: E???A = EXTRA ✓
  // c5: C???C = no. c6: H???H = no.
  // c3: T???N = TOSEN ✓
  // c9: F???T = no. c10: T???... only r0 has c10.
  // c8: I???F = no.
  // c0 r4-8: M???W = no.
  // c4: S???S = no. c2: I???N = INNEN ✓? I-N-N-E-N? but MANNSCHAFT c2=(4,2)=N ✓. WEIHNACHTEN c2=(8,2)=I. I???N with rows 0-4: I???N. r0c2=I, r4c2=N → I???N = I-N-N-E-N? no: I(0)?(1)?(2)?(3)N(4). That's fine: INNEN would be I-N-N-E-N but that's 5 letters and goes from r0 to r4. Actually row indices 0,1,2,3,4 → 5 positions. INNEN = I-N-N-E-N ✓
  // c2 r4-8: N???I = no good.
  // c7: R???A = RUMBA ✓
  // c7 r4-8: A???H = no good.
  makePuzzle('cw-hard-049', 11, 11, [
    { number: 1, direction: 'across', clue: 'Periodisch erscheinende Druckschrift', answer: 'ZEITSCHRIFT', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Sportliche Gruppe im Wettkampf', answer: 'MANNSCHAFT', row: 4, col: 0 },
    { number: 3, direction: 'across', clue: 'Festliche Zeit im Dezember', answer: 'WEIHNACHTEN', row: 8, col: 0 },
    { number: 4, direction: 'down', clue: 'Besonders, zusätzlich', answer: 'EXTRA', row: 0, col: 1 },
    { number: 5, direction: 'down', clue: 'Laut brausen und toben', answer: 'TOSEN', row: 0, col: 3 },
    { number: 6, direction: 'down', clue: 'Im Inneren befindlich', answer: 'INNEN', row: 0, col: 2 },
    { number: 7, direction: 'down', clue: 'Lateinamerikanischer Tanz', answer: 'RUMBA', row: 0, col: 7 },
  ]),

  // ═══ 050 ═══
  // r0: GEHEIMNIS c0: G E H E I M N I S (9)
  // r4: FREIHEIT c1: (4,1)F (4,2)R (4,3)E (4,4)I (4,5)H (4,6)E (4,7)I (4,8)T
  // r8: RATHAUS c0: R A T H A U S (7)
  // c1: E???F = no. c2: H???R = HUMOR ✓
  // c5: M???H = MILCH? M-I-L-C-H ✓
  // c8: S???T = SPART ✓
  // c2 r4-8: R???T = RECHT ✓
  // c7 r4-8: I???: only 5 rows but RATHAUS has 7 letters c0-c6, so (8,7) is empty.
  // Actually RATHAUS c0: (8,0)R (8,1)A (8,2)T (8,3)H (8,4)A (8,5)U (8,6)S. c7 at r8 = #.
  // c5 r4-8: H???U = no good.
  makePuzzle('cw-hard-050', 11, 11, [
    { number: 1, direction: 'across', clue: 'Etwas Verborgenes', answer: 'GEHEIMNIS', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Persönliche Unabhängigkeit', answer: 'FREIHEIT', row: 4, col: 1 },
    { number: 3, direction: 'across', clue: 'Sitz der Stadtverwaltung', answer: 'RATHAUS', row: 8, col: 0 },
    { number: 4, direction: 'down', clue: 'Witz und gute Laune', answer: 'HUMOR', row: 0, col: 2 },
    { number: 5, direction: 'down', clue: 'Weißes Getränk von der Kuh', answer: 'MILCH', row: 0, col: 5 },
    { number: 6, direction: 'down', clue: 'Geld zurücklegen', answer: 'SPART', row: 0, col: 8 },
    { number: 7, direction: 'down', clue: 'Juristischer Anspruch', answer: 'RECHT', row: 4, col: 2 },
  ]),

  // ═══ 051-060: remaining 10 puzzles ═══

  // ═══ 051 ═══
  makePuzzle('cw-hard-051', 11, 11, [
    { number: 1, direction: 'across', clue: 'Natürliche Umgebung', answer: 'LANDSCHAFT', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Organisation zur Brandbekämpfung', answer: 'FEUERWEHR', row: 4, col: 0 },
    { number: 3, direction: 'across', clue: 'Etwas Neues finden', answer: 'ENTDECKUNG', row: 8, col: 0 },
    // c0: L???F = LAUF? only 4. L(0)?(1)?(2)?(3)F(4) = LEIF? name. Skip c0.
    // c1: A???E = ACHSE ✓? A-C-H-S-E? (0,1)=A, (4,1)=E ✓
    // c5: C???W = no. c3: D???E = DIESE ✓
    // c8: F???N = FADEN ✓
    // c0 r4-8: F???E = FARBE ✓? F-A-R-B-E ✓
    // c5 r4-8: W???C = no.
    { number: 4, direction: 'down', clue: 'Drehpunkt eines Rades', answer: 'ACHSE', row: 0, col: 1 },
    { number: 5, direction: 'down', clue: 'Hinweisendes Wort', answer: 'DIESE', row: 0, col: 3 },
    { number: 6, direction: 'down', clue: 'Dünner Strang aus Garn', answer: 'FADEN', row: 0, col: 8 },
    { number: 7, direction: 'down', clue: 'Bunte Eigenschaft', answer: 'FARBE', row: 4, col: 0 },
  ]),

  // ═══ 052 ═══
  makePuzzle('cw-hard-052', 11, 11, [
    { number: 1, direction: 'across', clue: 'Drehendes Fahrgeschäft', answer: 'KARUSSELL', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Periodische Druckschrift', answer: 'ZEITSCHRIFT', row: 4, col: 0 },
    { number: 3, direction: 'across', clue: 'Süßes Weihnachtsgebäck', answer: 'LEBKUCHEN', row: 8, col: 0 },
    // c0: K???Z = KRANZ ✓ K-R-A-N-Z
    // c1: A???E = ACHSE ✓? ANODE? A-N-O-D-E ✓ — (0,1)=A, (4,1)=E ✓
    // c8: L???... KARUSSELL c8=L (0,8)=L, ZEITSCHRIFT c8=I (4,8)=I? ZEITSCHRIFT is 11 letters: Z(4,0) E(4,1) I(4,2) T(4,3) S(4,4) C(4,5) H(4,6) R(4,7) I(4,8) F(4,9) T(4,10)
    // c8: L???I = no. c7: L???R = LASER? L-A-S-E-R ✓. (0,7)=L, (4,7)=R ✓
    // c0 r4-8: Z???L = no. c3 r0-4: U???T = UNRAT ✓
    // c5 r4-8: C???U = no.
    // c3 r4-8: T???K = TRICK ✓
    { number: 4, direction: 'down', clue: 'Blumenschmuck, kreisförmig', answer: 'KRANZ', row: 0, col: 0 },
    { number: 5, direction: 'down', clue: 'Elektrodenpol', answer: 'ANODE', row: 0, col: 1 },
    { number: 6, direction: 'down', clue: 'Gebündeltes Licht', answer: 'LASER', row: 0, col: 7 },
    { number: 7, direction: 'down', clue: 'Schmutz und Abfall', answer: 'UNRAT', row: 0, col: 3 },
    { number: 8, direction: 'down', clue: 'Geschickter Kniff', answer: 'TRICK', row: 4, col: 3 },
  ]),

  // ═══ 053 ═══
  makePuzzle('cw-hard-053', 11, 11, [
    { number: 1, direction: 'across', clue: 'Handwerkliche Tätigkeit', answer: 'HANDWERK', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Theaterstück oder Aufführung', answer: 'SCHAUSPIEL', row: 4, col: 0 },
    { number: 3, direction: 'across', clue: 'Stellfläche für Automobile', answer: 'PARKPLATZ', row: 8, col: 0 },
    // HANDWERK: H(0,0) A(0,1) N(0,2) D(0,3) W(0,4) E(0,5) R(0,6) K(0,7)
    // SCHAUSPIEL: S(4,0) C(4,1) H(4,2) A(4,3) U(4,4) S(4,5) P(4,6) I(4,7) E(4,8) L(4,9)
    // c0: H???S = HEISS ✓? H-E-I-S-S. Hmm double S. Or HEROS? H-E-R-O-S ✓
    // c5: E???S = EXTRA? no. E(0)?(1)?(2)?(3)S(4) = ERBES? no. ERBSE ✓? E-R-B-S-E? but ends E not S.
    // c7: K???I = no good.
    // c1: A???C = no. c3: D???A = DELTA ✓ D-E-L-T-A
    // c6: R???P = no. c4: W???U = no.
    // c0 r4-8: S???P = no.
    // c1 r4-8: C???A = COBRA ✓? C-O-B-R-A ✓. (4,1)=C, (8,1)=A from PARKPLATZ ✓? PARKPLATZ: P(8,0) A(8,1) R(8,2) K(8,3) P(8,4) L(8,5) A(8,6) T(8,7) Z(8,8). (8,1)=A ✓
    // c5 r4-8: S???L = STIEL ✓? S-T-I-E-L ✓. (4,5)=S, (8,5)=L ✓
    { number: 4, direction: 'down', clue: 'Griechischer Buchstabe, Dreieck', answer: 'DELTA', row: 0, col: 3 },
    { number: 5, direction: 'down', clue: 'Asiatische Giftschlange', answer: 'COBRA', row: 4, col: 1 },
    { number: 6, direction: 'down', clue: 'Griff einer Blume oder Pflanze', answer: 'STIEL', row: 4, col: 5 },
  ]),

  // ═══ 054 ═══
  makePuzzle('cw-hard-054', 11, 11, [
    { number: 1, direction: 'across', clue: 'Überlieferte Bräuche', answer: 'TRADITION', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Bereich für Kinder', answer: 'SPIELPLATZ', row: 4, col: 0 },
    { number: 3, direction: 'across', clue: 'Edle Keramik', answer: 'PORZELLAN', row: 8, col: 0 },
    // TRADITION: T(0,0) R(0,1) A(0,2) D(0,3) I(0,4) T(0,5) I(0,6) O(0,7) N(0,8)
    // SPIELPLATZ: S(4,0) P(4,1) I(4,2) E(4,3) L(4,4) P(4,5) L(4,6) A(4,7) T(4,8) Z(4,9)
    // c0: T???S = TURMS? no. TAGES ✓ T-A-G-E-S
    // c3: D???E = DIESE ✓
    // c8: N???T = NICHT ✓? N-I-C-H-T ✓
    // c0 r4-8: S???P = no. c1 r4-8: P???O = no. c7: A???... (4,7)=A, (8,7)=A → A???A = ARENA ✓? A-R-E-N-A ✓
    // c4 r4-8: L???E = LIEBE ✓? L-I-E-B-E ✓. (4,4)=L, (8,4)=E ✓? PORZELLAN: P(8,0)O(8,1)R(8,2)Z(8,3)E(8,4)L(8,5)L(8,6)A(8,7)N(8,8). (8,4)=E ✓
    { number: 4, direction: 'down', clue: 'Eines Tages (Genitiv)', answer: 'TAGES', row: 0, col: 0 },
    { number: 5, direction: 'down', clue: 'Hinweisendes Wort', answer: 'DIESE', row: 0, col: 3 },
    { number: 6, direction: 'down', clue: 'Verneinung', answer: 'NICHT', row: 0, col: 8 },
    { number: 7, direction: 'down', clue: 'Stadion für Wettkämpfe', answer: 'ARENA', row: 4, col: 7 },
    { number: 8, direction: 'down', clue: 'Tiefes Gefühl der Zuneigung', answer: 'LIEBE', row: 4, col: 4 },
  ]),

  // ═══ 055 ═══
  makePuzzle('cw-hard-055', 11, 11, [
    { number: 1, direction: 'across', clue: 'Edle Keramik', answer: 'PORZELLAN', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Verwaltungseinheit einer Stadt', answer: 'GEMEINDE', row: 4, col: 0 },
    { number: 3, direction: 'across', clue: 'Kleidungsstück für die Hand', answer: 'HANDSCHUH', row: 8, col: 0 },
    // PORZELLAN: P(0,0) O(0,1) R(0,2) Z(0,3) E(0,4) L(0,5) L(0,6) A(0,7) N(0,8)
    // GEMEINDE: G(4,0) E(4,1) M(4,2) E(4,3) I(4,4) N(4,5) D(4,6) E(4,7)
    // c0: P???G = no. c1: O???E = OBERE ✓? O-B-E-R-E ✓
    // c4: E???I = no. c5: L???N = LEGEN ✓
    // c7: A???E = ACHSE ✓? A-C-H-S-E ✓
    // c0 r4-8: G???H = no. c2 r4-8: M???N = MAGEN ✓? M-A-G-E-N ✓. (4,2)=M, (8,2)=N from HANDSCHUH ✓? HANDSCHUH: H(8,0)A(8,1)N(8,2)D(8,3)S(8,4)C(8,5)H(8,6)U(8,7)H(8,8). (8,2)=N ✓
    // c6: L???D = LIVED? no. L(0)?(1)?(2)?(3)D(4). LAZED? no. Skip.
    { number: 4, direction: 'down', clue: 'Die Höheren (Plural)', answer: 'OBERE', row: 0, col: 1 },
    { number: 5, direction: 'down', clue: 'Hinlegen, platzieren', answer: 'LEGEN', row: 0, col: 5 },
    { number: 6, direction: 'down', clue: 'Drehpunkt eines Rades', answer: 'ACHSE', row: 0, col: 7 },
    { number: 7, direction: 'down', clue: 'Verdauungsorgan im Bauch', answer: 'MAGEN', row: 4, col: 2 },
  ]),

  // ═══ 056 ═══
  makePuzzle('cw-hard-056', 11, 11, [
    { number: 1, direction: 'across', clue: 'Herausragendes Kunstwerk', answer: 'MEISTERWERK', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Süßspeise nach dem Hauptgang', answer: 'NACHTISCH', row: 4, col: 0 },
    { number: 3, direction: 'across', clue: 'Wissenschaftlicher Versuch', answer: 'EXPERIMENT', row: 8, col: 0 },
    // MEISTERWERK: M(0,0) E(0,1) I(0,2) S(0,3) T(0,4) E(0,5) R(0,6) W(0,7) E(0,8) R(0,9) K(0,10)
    // NACHTISCH: N(4,0) A(4,1) C(4,2) H(4,3) T(4,4) I(4,5) S(4,6) C(4,7) H(4,8)
    // c0: M???N = MAGEN ✓
    // c3: S???H = SCHUH ✓
    // c8: E???H = EPOCH? no. E(0)?(1)?(2)?(3)H(4) = no good. Skip.
    // c6: R???S = RUHES? no. R(0)?(1)?(2)?(3)S(4) = RINGS ✓? R-I-N-G-S
    // c4: T???T = TRITT ✓
    // c1: E???A = EXTRA ✓
    // EXPERIMENT: E(8,0)X(8,1)P(8,2)E(8,3)R(8,4)I(8,5)M(8,6)E(8,7)N(8,8)T(8,9)
    // c0 r4-8: N???E = NARBE ✓? N-A-R-B-E ✓
    // c6 r4-8: S???M = STURM ✓
    { number: 4, direction: 'down', clue: 'Verdauungsorgan', answer: 'MAGEN', row: 0, col: 0 },
    { number: 5, direction: 'down', clue: 'Fußbekleidung aus Leder', answer: 'SCHUH', row: 0, col: 3 },
    { number: 6, direction: 'down', clue: 'Schritt (Plural)', answer: 'TRITT', row: 0, col: 4 },
    { number: 7, direction: 'down', clue: 'Sichtbare Wundmarkierung', answer: 'NARBE', row: 4, col: 0 },
    { number: 8, direction: 'down', clue: 'Heftiger Wind', answer: 'STURM', row: 4, col: 6 },
  ]),

  // ═══ 057 ═══
  makePuzzle('cw-hard-057', 11, 11, [
    { number: 1, direction: 'across', clue: 'Großes zusammenhängendes Landgebiet', answer: 'KONTINENT', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Gaststätte mit feiner Küche', answer: 'RESTAURANT', row: 4, col: 0 },
    { number: 3, direction: 'across', clue: 'Bergige Landschaft', answer: 'GEBIRGE', row: 8, col: 0 },
    // KONTINENT: K(0,0) O(0,1) N(0,2) T(0,3) I(0,4) N(0,5) E(0,6) N(0,7) T(0,8)
    // RESTAURANT: R(4,0) E(4,1) S(4,2) T(4,3) A(4,4) U(4,5) R(4,6) A(4,7) N(4,8) T(4,9)
    // c0: K???R = KATER ✓
    // c3: T???T = TRITT ✓
    // c6: E???R = EIMER ✓
    // c8: T???N = TOSEN? wait (0,8)=T, (4,8)=N → T???N = TOSEN ✓
    // GEBIRGE: G(8,0) E(8,1) B(8,2) I(8,3) R(8,4) G(8,5) E(8,6)
    // c0 r4-8: R???G = RUHIG ✓
    // c4 r4-8: A???R = ADLER ✓
    { number: 4, direction: 'down', clue: 'Männliche Katze', answer: 'KATER', row: 0, col: 0 },
    { number: 5, direction: 'down', clue: 'Schritt (Plural)', answer: 'TRITT', row: 0, col: 3 },
    { number: 6, direction: 'down', clue: 'Gefäß zum Wassertragen', answer: 'EIMER', row: 0, col: 6 },
    { number: 7, direction: 'down', clue: 'Laut brausen', answer: 'TOSEN', row: 0, col: 8 },
    { number: 8, direction: 'down', clue: 'Still, gelassen', answer: 'RUHIG', row: 4, col: 0 },
  ]),

  // ═══ 058 ═══
  makePuzzle('cw-hard-058', 11, 11, [
    { number: 1, direction: 'across', clue: 'Tragbare Uhr an einer Kette', answer: 'TASCHENUHR', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Überlieferte Bräuche', answer: 'TRADITION', row: 4, col: 0 },
    { number: 3, direction: 'across', clue: 'Flaches Plateau in den Bergen', answer: 'HOCHEBENE', row: 8, col: 0 },
    // TASCHENUHR: T(0,0) A(0,1) S(0,2) C(0,3) H(0,4) E(0,5) N(0,6) U(0,7) H(0,8) R(0,9)
    // TRADITION: T(4,0) R(4,1) A(4,2) D(4,3) I(4,4) T(4,5) I(4,6) O(4,7) N(4,8)
    // c0: T???T = TRITT ✓
    // c3: C???D = no. c5: E???T = ERNST ✓
    // c8: H???N = HOSEN ✓? H-O-S-E-N ✓
    // HOCHEBENE: H(8,0) O(8,1) C(8,2) H(8,3) E(8,4) B(8,5) E(8,6) N(8,7) E(8,8)
    // c0 r4-8: T???H = no. c2 r4-8: A???C = no. c4 r4-8: I???E = IRENE? no. IHREM? I-H-R-E-M no wrong end.
    // c1 r4-8: R???O = RATIO ✓? R-A-T-I-O ✓
    // c6 r4-8: I???E = IRENE? no. I(4)?(5)?(6)?(7)E(8). IMMER? no ends R. Let me skip.
    // c7 r4-8: O???N = OFFEN? O-F-F-E-N ✓
    { number: 4, direction: 'down', clue: 'Schritt (Plural)', answer: 'TRITT', row: 0, col: 0 },
    { number: 5, direction: 'down', clue: 'Ernsthafter Gemütszustand', answer: 'ERNST', row: 0, col: 5 },
    { number: 6, direction: 'down', clue: 'Beinkleid (Plural)', answer: 'HOSEN', row: 0, col: 8 },
    { number: 7, direction: 'down', clue: 'Vernünftige Überlegung', answer: 'RATIO', row: 4, col: 1 },
    { number: 8, direction: 'down', clue: 'Aufrichtig, ehrlich', answer: 'OFFEN', row: 4, col: 7 },
  ]),

  // ═══ 059 ═══
  makePuzzle('cw-hard-059', 11, 11, [
    { number: 1, direction: 'across', clue: 'Technischer Konstrukteur', answer: 'INGENIEUR', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Süßes Weihnachtsgebäck', answer: 'LEBKUCHEN', row: 4, col: 0 },
    { number: 3, direction: 'across', clue: 'Ausflug zu Fuß in der Natur', answer: 'WANDERUNG', row: 8, col: 0 },
    // INGENIEUR: I(0,0) N(0,1) G(0,2) E(0,3) N(0,4) I(0,5) E(0,6) U(0,7) R(0,8)
    // LEBKUCHEN: L(4,0) E(4,1) B(4,2) K(4,3) U(4,4) C(4,5) H(4,6) E(4,7) N(4,8)
    // c0: I???L = INSEL ✓
    // c3: E???K = no good. c4: N???U = NOTAU? no. N(0)?(1)?(2)?(3)U(4) = no good.
    // c8: R???N = REGEN ✓? R-E-G-E-N ✓
    // c1: N???E = NIERE ✓? N-I-E-R-E ✓
    // c6: E???H = no good.
    // WANDERUNG: W(8,0) A(8,1) N(8,2) D(8,3) E(8,4) R(8,5) U(8,6) N(8,7) G(8,8)
    // c0 r4-8: L???W = no. c2 r4-8: B???N = BODEN ✓? B-O-D-E-N ✓
    // c5 r4-8: C???R = CIDER? not German. C(4)?(5)?(6)?(7)R(8). Skip.
    // c7 r4-8: E???N = EIGEN ✓
    { number: 4, direction: 'down', clue: 'Von Wasser umgebenes Land', answer: 'INSEL', row: 0, col: 0 },
    { number: 5, direction: 'down', clue: 'Wasser fällt vom Himmel', answer: 'REGEN', row: 0, col: 8 },
    { number: 6, direction: 'down', clue: 'Organ im Bauch', answer: 'NIERE', row: 0, col: 1 },
    { number: 7, direction: 'down', clue: 'Untergrund, Erdreich', answer: 'BODEN', row: 4, col: 2 },
    { number: 8, direction: 'down', clue: 'Selbstständig, unabhängig', answer: 'EIGEN', row: 4, col: 7 },
  ]),

  // ═══ 060 ═══
  makePuzzle('cw-hard-060', 11, 11, [
    { number: 1, direction: 'across', clue: 'Hochschullehrer', answer: 'PROFESSOR', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Stellfläche für Automobile', answer: 'PARKPLATZ', row: 4, col: 0 },
    { number: 3, direction: 'across', clue: 'Wissenschaftliche Untersuchung', answer: 'FORSCHUNG', row: 8, col: 0 },
    // PROFESSOR: P(0,0) R(0,1) O(0,2) F(0,3) E(0,4) S(0,5) S(0,6) O(0,7) R(0,8)
    // PARKPLATZ: P(4,0) A(4,1) R(4,2) K(4,3) P(4,4) L(4,5) A(4,6) T(4,7) Z(4,8)
    // c0: P???P = no. c1: R???A = RUMBA ✓? R-U-M-B-A ✓
    // c5: S???L = STIEL? S-T-I-E-L ✓
    // c7: O???T = ORBIT ✓
    // c3: F???K = FRANK ✓ F-R-A-N-K
    // FORSCHUNG: F(8,0) O(8,1) R(8,2) S(8,3) C(8,4) H(8,5) U(8,6) N(8,7) G(8,8)
    // c0 r4-8: P???F = PFIFF? P-F-I-F-F? no. P(4)?(5)?(6)?(7)F(8). Skip.
    // c3 r4-8: K???S = KREIS ✓? K-R-E-I-S ✓
    // c7 r4-8: T???N = TOSEN ✓
    // c8 r4-8: Z???G = ZWANG ✓
    { number: 4, direction: 'down', clue: 'Lateinamerikanischer Tanz', answer: 'RUMBA', row: 0, col: 1 },
    { number: 5, direction: 'down', clue: 'Griff einer Pflanze', answer: 'STIEL', row: 0, col: 5 },
    { number: 6, direction: 'down', clue: 'Kreisbahn im Weltraum', answer: 'ORBIT', row: 0, col: 7 },
    { number: 7, direction: 'down', clue: 'Ehrlicher Vorname', answer: 'FRANK', row: 0, col: 3 },
    { number: 8, direction: 'down', clue: 'Runde geometrische Figur', answer: 'KREIS', row: 4, col: 3 },
  ]),
]
