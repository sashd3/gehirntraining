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

// Layout: 3 across words on rows 0, 4, 8 in an 11×11 grid.
// Down words of length 5 span either r0-r4 or r4-r8.
// For r0-r4: word[0] must match across_r0 at that col, word[4] must match across_r4.
// For r4-r8: word[0] must match across_r4, word[4] must match across_r8.
// All crossings verified by the constraint notation in comments.

export const hardPuzzles: CrosswordPuzzleData[] = [
  // ═══ 001 ═══
  // r0: BIBLIOTHEK (B I B L I O T H E K)
  // r4: SCHAUSPIEL (S C H A U S P I E L)
  // r8: MANNSCHAFT (M A N N S C H A F T)
  // c0 r0-4: B???S = BASIS ✓  |  c2 r0-4: B???H = BRUCH ✓  |  c8 r0-4: E???E = ERNTE ✓
  // c0 r4-8: S???M = STURM ✓  |  c9 r4-8: L???T = LICHT ✓
  makePuzzle('cw-hard-001', 11, 11, [
    { number: 1, direction: 'across', clue: 'Sammlung von Büchern zum Ausleihen', answer: 'BIBLIOTHEK', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Theaterstück oder Filmvorführung', answer: 'SCHAUSPIEL', row: 4, col: 0 },
    { number: 3, direction: 'across', clue: 'Sportliche Gruppe im Wettkampf', answer: 'MANNSCHAFT', row: 8, col: 0 },
    { number: 4, direction: 'down', clue: 'Grundlage oder Fundament', answer: 'BASIS', row: 0, col: 0 },
    { number: 5, direction: 'down', clue: 'Fraktur eines Knochens', answer: 'BRUCH', row: 0, col: 2 },
    { number: 6, direction: 'down', clue: 'Getreide wird im Herbst zur ...', answer: 'ERNTE', row: 0, col: 8 },
    { number: 7, direction: 'down', clue: 'Heftiger Wind, Unwetter', answer: 'STURM', row: 4, col: 0 },
    { number: 8, direction: 'down', clue: 'Helligkeit aus einer Lampe', answer: 'LICHT', row: 4, col: 9 },
  ]),

  // ═══ 002 ═══
  // r0: ORCHESTER (O R C H E S T E R) c0
  // r4: GETREIDE  (G E T R E I D E)   c1
  // r8: KLEIDUNG  (K L E I D U N G)   c0
  // c5 r0-4: S???E (r0c5=S, r4c5=GETREIDE[4]=E) = STUBE ✓
  // c2 r0-4: C???T (r0c2=C, r4c2=GETREIDE[1]=E)... wait GETREIDE starts c1: (4,2)=GETREIDE[1]=E
  //   C???E = CHOSE ✓
  // c0 r0-4: O (only r0 has letter at c0, r4 c0 is blank since GETREIDE starts c1) → ORGEL starts O, 5 letters
  //   ORGEL c0 r0-4: O(0) R(1) G(2) E(3) L(4). (4,0)=L but no across word at r4 c0. ✓ no conflict
  // c1 r4-8: G???L (r4c1=GETREIDE[0]=G, r8c1=KLEIDUNG[1]=L) = GABEL ✓
  // c0 r4-8: (r4c0=#, r8c0=K) → any word ending K: DRUCK D R U C K → (8,0)=K ✓ (only 1 crossing)
  makePuzzle('cw-hard-002', 11, 11, [
    { number: 1, direction: 'across', clue: 'Musikalisches Ensemble mit vielen Instrumenten', answer: 'ORCHESTER', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Angebautes Korn wie Weizen oder Roggen', answer: 'GETREIDE', row: 4, col: 1 },
    { number: 3, direction: 'across', clue: 'Hosen, Hemden und Röcke', answer: 'KLEIDUNG', row: 8, col: 0 },
    { number: 4, direction: 'down', clue: 'Kleines gemütliches Zimmer', answer: 'STUBE', row: 0, col: 5 },
    { number: 5, direction: 'down', clue: 'Unangenehme Sache (ugs.)', answer: 'CHOSE', row: 0, col: 2 },
    { number: 6, direction: 'down', clue: 'Besteck zum Aufspießen', answer: 'GABEL', row: 4, col: 1 },
    { number: 7, direction: 'down', clue: 'Kraft auf Papier ausüben', answer: 'DRUCK', row: 4, col: 0 },
    { number: 8, direction: 'down', clue: 'Großes Leid und Unglück', answer: 'ELEND', row: 0, col: 7 },
  ]),

  // ═══ 003 ═══
  // r0: ABENTEUER (A B E N T E U E R) c0
  // r4: FREIHEIT  (F R E I H E I T)   c1
  // r8: GEHEIMNIS (G E H E I M N I S) c0
  // c2 r0-4: E???E (r0c2=E, r4c2=FREIHEIT[1]=R)... wait FREIHEIT c1: (4,1)=F (4,2)=R (4,3)=E (4,4)=I (4,5)=H (4,6)=E (4,7)=I (4,8)=T
  //   c2: r0=E, r4=R → E???R = EIFER ✓
  // c8 r0-4: R???T (r0c8=R, r4c8=FREIHEIT[7]=T) = RECHT ✓
  // c5 r4-8: H???M (r4c5=H, r8c5=M) = HAREM ✓
  // c0 r4-8: (r4c0=#, r8c0=G) → any word ending G, 5 letters: KLANG ✓ (only 1 crossing at r8)
  // c3 r0-4: N???E (r0c3=N, r4c3=FREIHEIT[2]=E) = NARBE... N A R B E [4]=E ✓ ✓
  makePuzzle('cw-hard-003', 11, 11, [
    { number: 1, direction: 'across', clue: 'Spannende Reise ins Unbekannte', answer: 'ABENTEUER', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Persönliche Unabhängigkeit', answer: 'FREIHEIT', row: 4, col: 1 },
    { number: 3, direction: 'across', clue: 'Etwas Verborgenes, das niemand wissen soll', answer: 'GEHEIMNIS', row: 8, col: 0 },
    { number: 4, direction: 'down', clue: 'Großer Enthusiasmus', answer: 'EIFER', row: 0, col: 2 },
    { number: 5, direction: 'down', clue: 'Juristischer Anspruch', answer: 'RECHT', row: 0, col: 8 },
    { number: 6, direction: 'down', clue: 'Sichtbare Wundmarkierung', answer: 'NARBE', row: 0, col: 3 },
    { number: 7, direction: 'down', clue: 'Lauter Ton einer Glocke', answer: 'KLANG', row: 4, col: 0 },
    { number: 8, direction: 'down', clue: 'Orientalischer Frauenbereich', answer: 'HAREM', row: 4, col: 5 },
  ]),

  // ═══ 004 ═══
  // r0: LANDSCHAFT (L A N D S C H A F T) c0
  // r4: SPIELPLATZ (S P I E L P L A T Z) c0
  // r8: HANDSCHUH  (H A N D S C H U H)  c0
  // c0 r0-4: L???S = LINKS ✓  |  c3 r0-4: D???E = DIESE ✓  |  c8 r0-4: F???T = FROST ✓
  // c0 r4-8: S???H = SCHUH ✓  |  c4 r4-8: L???S = LOTUS ✓
  makePuzzle('cw-hard-004', 11, 11, [
    { number: 1, direction: 'across', clue: 'Natürliche Umgebung mit Bergen und Tälern', answer: 'LANDSCHAFT', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Bereich für Kinder zum Spielen im Freien', answer: 'SPIELPLATZ', row: 4, col: 0 },
    { number: 3, direction: 'across', clue: 'Kleidungsstück für die Hand im Winter', answer: 'HANDSCHUH', row: 8, col: 0 },
    { number: 4, direction: 'down', clue: 'Auf der linken Seite', answer: 'LINKS', row: 0, col: 0 },
    { number: 5, direction: 'down', clue: 'Hinweisendes Wort: ... Person dort', answer: 'DIESE', row: 0, col: 3 },
    { number: 6, direction: 'down', clue: 'Eisige Kälte im Winter', answer: 'FROST', row: 0, col: 8 },
    { number: 7, direction: 'down', clue: 'Fußbekleidung aus Leder', answer: 'SCHUH', row: 4, col: 0 },
    { number: 8, direction: 'down', clue: 'Heilige Blume im Buddhismus', answer: 'LOTUS', row: 4, col: 4 },
  ]),

  // ═══ 005 ═══
  // r0: MANNSCHAFT (M A N N S C H A F T) c0
  // r4: ENTDECKUNG (E N T D E C K U N G) c0
  // r8: VOLKSFEST  (V O L K S F E S T)   c0
  // c2 r0-4: N???T = NACHT ✓  |  c7 r0-4: A???U = ABBAU ✓ (A B B A U)
  // c8 r0-4: F???N = FADEN ✓  |  c1 r0-4: A???N = AHNEN ✓
  // c4 r4-8: E???S = EINES ✓
  makePuzzle('cw-hard-005', 11, 11, [
    { number: 1, direction: 'across', clue: 'Sportliche Gruppe im Wettkampf', answer: 'MANNSCHAFT', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Etwas Neues finden oder erforschen', answer: 'ENTDECKUNG', row: 4, col: 0 },
    { number: 3, direction: 'across', clue: 'Jahrmarkt oder Kirmes auf dem Lande', answer: 'VOLKSFEST', row: 8, col: 0 },
    { number: 4, direction: 'down', clue: 'Dunkle Tageszeit', answer: 'NACHT', row: 0, col: 2 },
    { number: 5, direction: 'down', clue: 'Rückbau oder Zerlegung', answer: 'ABBAU', row: 0, col: 7 },
    { number: 6, direction: 'down', clue: 'Dünner Strang aus Garn', answer: 'FADEN', row: 0, col: 8 },
    { number: 7, direction: 'down', clue: 'Vorfahren kennen oder vermuten', answer: 'AHNEN', row: 0, col: 1 },
    { number: 8, direction: 'down', clue: 'Genitiv von "ein"', answer: 'EINES', row: 4, col: 4 },
  ]),

  // ═══ 006 ═══
  // r0: WEIHNACHTEN (W E I H N A C H T E N) c0, 11 letters
  // r4: ZEITSCHRIFT (Z E I T S C H R I F T) c0, 11 letters
  // r8: LEBKUCHEN   (L E B K U C H E N)     c0, 9 letters
  // c3 r0-4: H???T = HAUPT ✓  |  c6 r0-4: C???H = COUCH ✓  |  c1 r0-4: E???E = ELITE ✓
  // c7 r4-8: R???E = RUINE ✓  |  c3 r4-8: T???K = TRICK ✓
  makePuzzle('cw-hard-006', 11, 11, [
    { number: 1, direction: 'across', clue: 'Festliche Zeit im Dezember mit Geschenken', answer: 'WEIHNACHTEN', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Periodisch erscheinende Druckschrift', answer: 'ZEITSCHRIFT', row: 4, col: 0 },
    { number: 3, direction: 'across', clue: 'Süßes Weihnachtsgebäck mit Gewürzen', answer: 'LEBKUCHEN', row: 8, col: 0 },
    { number: 4, direction: 'down', clue: 'Oberstes, Wichtigstes', answer: 'HAUPT', row: 0, col: 3 },
    { number: 5, direction: 'down', clue: 'Gepolstertes Sitzmöbel', answer: 'COUCH', row: 0, col: 6 },
    { number: 6, direction: 'down', clue: 'Auserwählte Oberschicht', answer: 'ELITE', row: 0, col: 1 },
    { number: 7, direction: 'down', clue: 'Verfallenes altes Gebäude', answer: 'RUINE', row: 4, col: 7 },
    { number: 8, direction: 'down', clue: 'Geschickter Kniff oder Streich', answer: 'TRICK', row: 4, col: 3 },
  ]),

  // ═══ 007 ═══
  // r0: ERFAHRUNG (E R F A H R U N G) c0
  // r4: FEUERWEHR (F E U E R W E H R) c0
  // r8: HANDWERK  (H A N D W E R K)   c0
  // c4 r0-4: H???R = HUMOR ✓  |  c1 r0-4: R???E = REISE ✓  |  c3 r0-4: A???E = ARMEE ✓
  // c5 r4-8: W???E = WOCHE ✓  |  c0 r4-8: F???H = FRECH ✓
  makePuzzle('cw-hard-007', 11, 11, [
    { number: 1, direction: 'across', clue: 'Durch Erlebnisse gewonnenes Wissen', answer: 'ERFAHRUNG', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Organisation zur Brandbekämpfung', answer: 'FEUERWEHR', row: 4, col: 0 },
    { number: 3, direction: 'across', clue: 'Handwerkliche Tätigkeit oder Beruf', answer: 'HANDWERK', row: 8, col: 0 },
    { number: 4, direction: 'down', clue: 'Sinn für Komik und Witz', answer: 'HUMOR', row: 0, col: 4 },
    { number: 5, direction: 'down', clue: 'Fahrt in ein anderes Land', answer: 'REISE', row: 0, col: 1 },
    { number: 6, direction: 'down', clue: 'Militärische Truppe', answer: 'ARMEE', row: 0, col: 3 },
    { number: 7, direction: 'down', clue: 'Sieben Tage bilden eine ...', answer: 'WOCHE', row: 4, col: 5 },
    { number: 8, direction: 'down', clue: 'Unverschämt und vorlaut', answer: 'FRECH', row: 4, col: 0 },
  ]),

  // ═══ 008 ═══
  // r0: PORZELLAN (P O R Z E L L A N) c0
  // r4: BILDUNG   (B I L D U N G)     c0
  // r8: TRADITION (T R A D I T I O N) c0
  // c2 r0-4: R???L = REGAL ✓  |  c5 r0-4: L???N = LESEN ✓
  // c5 r4-8: N???T = NACHT ✓  |  c0 r4-8: B???T = BLATT ✓
  // c8 r0-4: N (only r0 at c8, r4 BILDUNG ends at c6) → NEBEL N E B E L ✓ (1 crossing)
  makePuzzle('cw-hard-008', 11, 11, [
    { number: 1, direction: 'across', clue: 'Edle Keramik, z.B. aus Meißen', answer: 'PORZELLAN', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Wissensaneignung durch Schule und Studium', answer: 'BILDUNG', row: 4, col: 0 },
    { number: 3, direction: 'across', clue: 'Überlieferte Bräuche und Sitten', answer: 'TRADITION', row: 8, col: 0 },
    { number: 4, direction: 'down', clue: 'Möbelstück mit Fächern für Bücher', answer: 'REGAL', row: 0, col: 2 },
    { number: 5, direction: 'down', clue: 'Ein Buch aufmerksam durchgehen', answer: 'LESEN', row: 0, col: 5 },
    { number: 6, direction: 'down', clue: 'Dichter Dunst aus dem Schornstein', answer: 'NEBEL', row: 0, col: 8 },
    { number: 7, direction: 'down', clue: 'Dunkle Tageszeit', answer: 'NACHT', row: 4, col: 5 },
    { number: 8, direction: 'down', clue: 'Seite eines Baumes oder Papiers', answer: 'BLATT', row: 4, col: 0 },
  ]),

  // ═══ 009 ═══
  // r0: KARUSSELL (K A R U S S E L L) c0
  // r4: GEMEINDE  (G E M E I N D E)   c0
  // r8: PARKPLATZ (P A R K P L A T Z) c0
  // c1 r0-4: A???E = ACHSE ✓  |  c6 r0-4: E???D = ELEND ✓  |  c7 r0-4: L???E = LIEBE ✓
  // c1 r4-8: E???A = EXTRA ✓  |  c5 r4-8: N???L = NAGEL ✓
  makePuzzle('cw-hard-009', 11, 11, [
    { number: 1, direction: 'across', clue: 'Drehendes Fahrgeschäft auf dem Jahrmarkt', answer: 'KARUSSELL', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Verwaltungseinheit einer Stadt', answer: 'GEMEINDE', row: 4, col: 0 },
    { number: 3, direction: 'across', clue: 'Stellfläche für Automobile', answer: 'PARKPLATZ', row: 8, col: 0 },
    { number: 4, direction: 'down', clue: 'Drehpunkt eines Rades', answer: 'ACHSE', row: 0, col: 1 },
    { number: 5, direction: 'down', clue: 'Großes Leid und Unglück', answer: 'ELEND', row: 0, col: 6 },
    { number: 6, direction: 'down', clue: 'Tiefes Gefühl der Zuneigung', answer: 'LIEBE', row: 0, col: 7 },
    { number: 7, direction: 'down', clue: 'Besonders, zusätzlich', answer: 'EXTRA', row: 4, col: 1 },
    { number: 8, direction: 'down', clue: 'Spitzer Metallstift', answer: 'NAGEL', row: 4, col: 5 },
  ]),

  // ═══ 010 ═══
  // r0: SCHAUSPIEL (S C H A U S P I E L) c0
  // r4: NACHTISCH  (N A C H T I S C H)  c0
  // r8: ENTDECKUNG (E N T D E C K U N G) c0
  // c1 r0-4: C???A = COBRA ✓  |  c4 r0-4: U???T = UNRAT ✓  |  c9 r0-4: L (only r0) → LAGER ✓
  // c6 r4-8: S???K = STUCK ✓  |  c0 r4-8: N???E = NARBE ✓
  makePuzzle('cw-hard-010', 11, 11, [
    { number: 1, direction: 'across', clue: 'Theaterstück auf der Bühne', answer: 'SCHAUSPIEL', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Süße Speise nach dem Hauptgang', answer: 'NACHTISCH', row: 4, col: 0 },
    { number: 3, direction: 'across', clue: 'Etwas Neues finden oder erforschen', answer: 'ENTDECKUNG', row: 8, col: 0 },
    { number: 4, direction: 'down', clue: 'Giftige Schlange', answer: 'COBRA', row: 0, col: 1 },
    { number: 5, direction: 'down', clue: 'Schmutz und Abfall', answer: 'UNRAT', row: 0, col: 4 },
    { number: 6, direction: 'down', clue: 'Aufbewahrungsort, Depot', answer: 'LAGER', row: 0, col: 9 },
    { number: 7, direction: 'down', clue: 'Dekorativer Gips an der Decke', answer: 'STUCK', row: 4, col: 6 },
    { number: 8, direction: 'down', clue: 'Sichtbare Wundmarkierung', answer: 'NARBE', row: 4, col: 0 },
  ]),

  // ═══ 011 ═══
  // r0: KATHEDRALE (K A T H E D R A L E) c0, 10 letters
  // r4: TASCHENUHR (T A S C H E N U H R) c0, 10 letters
  // r8: PHILOSOPHIE (P H I L O S O P H I E) c0, 11 letters
  // c0 r0-4: K???T = KRAFT ✓  |  c6 r0-4: R???N = RUBIN ✓  |  c9 r0-4: E???R = EIMER ✓
  // c5 r4-8: E???S = EUROS ✓  |  c4 r4-8: H???O = HIPPO ✓
  makePuzzle('cw-hard-011', 11, 11, [
    { number: 1, direction: 'across', clue: 'Große Kirche mit Bischofssitz', answer: 'KATHEDRALE', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Zeitmesser an einer Kette', answer: 'TASCHENUHR', row: 4, col: 0 },
    { number: 3, direction: 'across', clue: 'Liebe zur Weisheit, Denklehre', answer: 'PHILOSOPHIE', row: 8, col: 0 },
    { number: 4, direction: 'down', clue: 'Physische Stärke und Energie', answer: 'KRAFT', row: 0, col: 0 },
    { number: 5, direction: 'down', clue: 'Roter Edelstein', answer: 'RUBIN', row: 0, col: 6 },
    { number: 6, direction: 'down', clue: 'Gefäß zum Wassertragen', answer: 'EIMER', row: 0, col: 9 },
    { number: 7, direction: 'down', clue: 'Europäische Währung (Plural)', answer: 'EUROS', row: 4, col: 5 },
    { number: 8, direction: 'down', clue: 'Großes Flusspferd (ugs.)', answer: 'HIPPO', row: 4, col: 4 },
  ]),

  // ═══ 012 ═══
  // r0: DAMPFSCHIFF (D A M P F S C H I F F) c0, 11 letters
  // r4: GOLDSCHMIED (G O L D S C H M I E D) c0, 11 letters
  // r8: HALBINSEL   (H A L B I N S E L)     c0, 9 letters
  // c0 r0-4: D???G = DRANG ✓  |  c2 r0-4: M???L = MODEL ✓  |  c4 r0-4: F???S = FLUSS ✓
  // c5 r4-8: C???N = CLOWN ✓  |  c8 r4-8: I???L = IDEAL ✓
  makePuzzle('cw-hard-012', 11, 11, [
    { number: 1, direction: 'across', clue: 'Schiff mit Dampfantrieb', answer: 'DAMPFSCHIFF', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Edler Handwerker für Schmuck', answer: 'GOLDSCHMIED', row: 4, col: 0 },
    { number: 3, direction: 'across', clue: 'Von Wasser umgebenes Landstück', answer: 'HALBINSEL', row: 8, col: 0 },
    { number: 4, direction: 'down', clue: 'Starker innerer Antrieb', answer: 'DRANG', row: 0, col: 0 },
    { number: 5, direction: 'down', clue: 'Fotomodell auf dem Laufsteg', answer: 'MODEL', row: 0, col: 2 },
    { number: 6, direction: 'down', clue: 'Großer Wasserlauf', answer: 'FLUSS', row: 0, col: 4 },
    { number: 7, direction: 'down', clue: 'Lustiger Spaßmacher im Zirkus', answer: 'CLOWN', row: 4, col: 5 },
    { number: 8, direction: 'down', clue: 'Perfekte Vorstellung', answer: 'IDEAL', row: 4, col: 8 },
  ]),

  // ═══ 013 ═══
  // r0: ABRECHNUNG (A B R E C H N U N G) c0, 10 letters
  // r4: WANDERUNG  (W A N D E R U N G)   c0, 9 letters
  // r8: GETREIDE   (G E T R E I D E)     c0, 8 letters
  // c4 r0-4: C???E = CHOSE ✓  |  c7 r0-4: U???N = UNION ✓  |  c1 r0-4: B???A = BASTA ✓
  // c3 r4-8: D???R = DAUER ✓  |  c2 r4-8: N???T = NICHT ✓
  makePuzzle('cw-hard-013', 11, 11, [
    { number: 1, direction: 'across', clue: 'Finanzielle Aufstellung der Kosten', answer: 'ABRECHNUNG', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Längere Fußtour durch die Natur', answer: 'WANDERUNG', row: 4, col: 0 },
    { number: 3, direction: 'across', clue: 'Angebautes Korn wie Weizen', answer: 'GETREIDE', row: 8, col: 0 },
    { number: 4, direction: 'down', clue: 'Unangenehme Angelegenheit', answer: 'CHOSE', row: 0, col: 4 },
    { number: 5, direction: 'down', clue: 'Zusammenschluss, Vereinigung', answer: 'UNION', row: 0, col: 7 },
    { number: 6, direction: 'down', clue: 'Genug! Schluss damit!', answer: 'BASTA', row: 0, col: 1 },
    { number: 7, direction: 'down', clue: 'Lange Zeitspanne', answer: 'DAUER', row: 4, col: 3 },
    { number: 8, direction: 'down', clue: 'Verneinung: keineswegs', answer: 'NICHT', row: 4, col: 2 },
  ]),

  // ═══ 014 ═══
  // r0: LEBKUCHEN (L E B K U C H E N) c0
  // r4: FREIHEIT  (F R E I H E I T)   c0
  // r8: ABENTEUER (A B E N T E U E R) c0
  // c2 r0-4: B???E = BROTE ✓  |  c5 r0-4: C???E = CREME ✓  |  c7 r0-4: E???T = ERNST ✓
  // c0 r4-8: F???A = FLORA ✓  |  c4 r4-8: H???T = HORST ✓
  makePuzzle('cw-hard-014', 11, 11, [
    { number: 1, direction: 'across', clue: 'Süßes Weihnachtsgebäck mit Gewürzen', answer: 'LEBKUCHEN', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Persönliche Unabhängigkeit', answer: 'FREIHEIT', row: 4, col: 0 },
    { number: 3, direction: 'across', clue: 'Spannende Unternehmung ins Unbekannte', answer: 'ABENTEUER', row: 8, col: 0 },
    { number: 4, direction: 'down', clue: 'Plural von Brot', answer: 'BROTE', row: 0, col: 2 },
    { number: 5, direction: 'down', clue: 'Weiße Salbe für die Haut', answer: 'CREME', row: 0, col: 5 },
    { number: 6, direction: 'down', clue: 'Ernsthaftigkeit, ein Vorname', answer: 'ERNST', row: 0, col: 7 },
    { number: 7, direction: 'down', clue: 'Pflanzenwelt und Blumen', answer: 'FLORA', row: 4, col: 0 },
    { number: 8, direction: 'down', clue: 'Nest eines Greifvogels', answer: 'HORST', row: 4, col: 4 },
  ]),

  // ═══ 015 ═══
  // r0: GEMEINDERAT (G E M E I N D E R A T) c0, 11 letters
  // r4: JAHRESZEIT  (J A H R E S Z E I T) c0, 10 letters
  // r8: PORZELLAN   (P O R Z E L L A N)   c0, 9 letters
  // c2 r0-4: M???H = MULCH ✓  |  c7 r0-4: E???E = ESCHE ✓  |  c9 r0-4: A???T = ANGST ✓
  // c5 r4-8: S???L = STIEL ✓  |  c8 r4-8: I???N = IRREN ✓
  makePuzzle('cw-hard-015', 11, 11, [
    { number: 1, direction: 'across', clue: 'Städtisches Parlament', answer: 'GEMEINDERAT', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Frühling, Sommer, Herbst oder Winter', answer: 'JAHRESZEIT', row: 4, col: 0 },
    { number: 3, direction: 'across', clue: 'Edle Keramik, z.B. aus Meißen', answer: 'PORZELLAN', row: 8, col: 0 },
    { number: 4, direction: 'down', clue: 'Erdschicht zum Pflanzenschutz', answer: 'MULCH', row: 0, col: 2 },
    { number: 5, direction: 'down', clue: 'Laubbaum mit gefiedertem Blatt', answer: 'ESCHE', row: 0, col: 7 },
    { number: 6, direction: 'down', clue: 'Beklemmung und Furcht', answer: 'ANGST', row: 0, col: 9 },
    { number: 7, direction: 'down', clue: 'Griff einer Blume oder Pfanne', answer: 'STIEL', row: 4, col: 5 },
    { number: 8, direction: 'down', clue: 'Sich täuschen, falsch liegen', answer: 'IRREN', row: 4, col: 8 },
  ]),

  // ═══ 016 ═══
  // r0: VORSTELLUNG (V O R S T E L L U N G) c0, 11 letters
  // r4: GEHEIMNIS   (G E H E I M N I S)     c0, 9 letters
  // r8: EHRGEIZ     (E H R G E I Z)         c0, 7 letters
  // c2 r0-4: R???H = RAUCH ✓  |  c6 r0-4: L???N = LEGEN ✓  |  c1 r0-4: O???E = OLIVE ✓
  // c3 r4-8: E???G = EINIG ✓  |  c0 r4-8: G???E = GRUBE ✓
  makePuzzle('cw-hard-016', 11, 11, [
    { number: 1, direction: 'across', clue: 'Gedankliche Darstellung, Idee', answer: 'VORSTELLUNG', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Etwas Verborgenes, nicht Offenbares', answer: 'GEHEIMNIS', row: 4, col: 0 },
    { number: 3, direction: 'across', clue: 'Starker Wille und Zielstrebigkeit', answer: 'EHRGEIZ', row: 8, col: 0 },
    { number: 4, direction: 'down', clue: 'Dunst vom Feuer', answer: 'RAUCH', row: 0, col: 2 },
    { number: 5, direction: 'down', clue: 'Etwas hinlegen', answer: 'LEGEN', row: 0, col: 6 },
    { number: 6, direction: 'down', clue: 'Grüne Frucht vom Mittelmeer', answer: 'OLIVE', row: 0, col: 1 },
    { number: 7, direction: 'down', clue: 'Übereinstimmend, einer Meinung', answer: 'EINIG', row: 4, col: 3 },
    { number: 8, direction: 'down', clue: 'Tiefe Vertiefung im Boden', answer: 'GRUBE', row: 4, col: 0 },
  ]),

  // ═══ 017 ═══
  // r0: SPIELPLATZ  (S P I E L P L A T Z) c0, 10 letters
  // r4: WEIHNACHTEN (W E I H N A C H T E N) c0, 11 letters
  // r8: RATHAUS     (R A T H A U S)         c0, 7 letters
  // c2 r0-4: I???I = no 5-letter word. Try c8: T???T = TROST ✓? T R O S T → T(0,8)T(4,8) ✓
  // c8 r0-4: T???T = TROST ✓
  // c3 r0-4: E???H = no easy word. Skip.
  // c9 r0-4: Z???E = no. Skip.
  // c5 r0-4: P???A = PIZZA? P I Z Z A ✓ (5 letters)
  // c1 r4-8: E???A = EXTRA ✓ (already used in 009, but ok for different puzzle)
  // c0 r4-8: W???R = WIDER ✓ (W I D E R)
  // c5 r4-8: A???U = no easy word. Try c4: N???A = no. c6: C???S = no.
  // Just use 3 across + 4 down = 7... need 8. Add c7 r0-4: A???H = no.
  // c4 r0-4: L???N = LESEN ✓? L(0,4) E(1,4) S(2,4) E(3,4) N(4,4). (0,4)=L, (4,4)=WEIHNACHTEN[4]=N ✓
  makePuzzle('cw-hard-017', 11, 11, [
    { number: 1, direction: 'across', clue: 'Bereich für Kinder zum Spielen', answer: 'SPIELPLATZ', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Feierlichkeit im Dezember', answer: 'WEIHNACHTEN', row: 4, col: 0 },
    { number: 3, direction: 'across', clue: 'Verwaltungsgebäude der Stadt', answer: 'RATHAUS', row: 8, col: 0 },
    { number: 4, direction: 'down', clue: 'Beruhigung, Zuspruch', answer: 'TROST', row: 0, col: 8 },
    { number: 5, direction: 'down', clue: 'Italienisches Fladenbrot', answer: 'PIZZA', row: 0, col: 5 },
    { number: 6, direction: 'down', clue: 'Ein Buch aufmerksam durchgehen', answer: 'LESEN', row: 0, col: 4 },
    { number: 7, direction: 'down', clue: 'Gegen, entgegen', answer: 'WIDER', row: 4, col: 0 },
    { number: 8, direction: 'down', clue: 'Besonders, zusätzlich', answer: 'EXTRA', row: 4, col: 1 },
  ]),

  // ═══ 018 ═══
  // r0: PERGAMENT (P E R G A M E N T) c0
  // r4: HALBINSEL (H A L B I N S E L) c0
  // r8: KLEIDUNG  (K L E I D U N G)   c0
  // c2 r0-4: R???L = RIVAL ✓  |  c6 r0-4: E???S = ETHOS ✓  |  c7 r0-4: N???E = NIERE ✓
  // c1 r4-8: A???L = APFEL ✓  |  c7 r4-8: E???G = ESSIG ✓
  makePuzzle('cw-hard-018', 11, 11, [
    { number: 1, direction: 'across', clue: 'Beschreibstoff aus Tierhaut', answer: 'PERGAMENT', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Von Wasser umgebenes Landstück', answer: 'HALBINSEL', row: 4, col: 0 },
    { number: 3, direction: 'across', clue: 'Hosen, Hemden und Röcke', answer: 'KLEIDUNG', row: 8, col: 0 },
    { number: 4, direction: 'down', clue: 'Konkurrent, Gegner', answer: 'RIVAL', row: 0, col: 2 },
    { number: 5, direction: 'down', clue: 'Moralische Grundhaltung', answer: 'ETHOS', row: 0, col: 6 },
    { number: 6, direction: 'down', clue: 'Inneres Organ zur Blutfilterung', answer: 'NIERE', row: 0, col: 7 },
    { number: 7, direction: 'down', clue: 'Obst mit Kerngehäuse', answer: 'APFEL', row: 4, col: 1 },
    { number: 8, direction: 'down', clue: 'Saure Würzflüssigkeit', answer: 'ESSIG', row: 4, col: 7 },
  ]),

  // ═══ 019 ═══
  // r0: SPIELPLATZ (S P I E L P L A T Z) c0
  // r4: ERFAHRUNG  (E R F A H R U N G)   c0
  // r8: NACHTISCH  (N A C H T I S C H)   c0
  // c4 r0-4: L???H = LAUCH ✓  |  c7 r0-4: A???N = ALIEN ✓  |  c0 r0-4: S???E = SORGE ✓
  // c0 r4-8: E???N = EULEN ✓  |  c1 r4-8: R???A = RUMBA ✓
  makePuzzle('cw-hard-019', 11, 11, [
    { number: 1, direction: 'across', clue: 'Bereich für Kinder zum Spielen', answer: 'SPIELPLATZ', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Durch Erlebnisse gewonnenes Wissen', answer: 'ERFAHRUNG', row: 4, col: 0 },
    { number: 3, direction: 'across', clue: 'Süße Speise nach dem Hauptgang', answer: 'NACHTISCH', row: 8, col: 0 },
    { number: 4, direction: 'down', clue: 'Gemüsepflanze der Zwiebelart', answer: 'LAUCH', row: 0, col: 4 },
    { number: 5, direction: 'down', clue: 'Außerirdischer Besucher', answer: 'ALIEN', row: 0, col: 7 },
    { number: 6, direction: 'down', clue: 'Kummer und Besorgnis', answer: 'SORGE', row: 0, col: 0 },
    { number: 7, direction: 'down', clue: 'Nachtaktive Greifvögel (Plural)', answer: 'EULEN', row: 4, col: 0 },
    { number: 8, direction: 'down', clue: 'Lateinamerikanischer Tanz', answer: 'RUMBA', row: 4, col: 1 },
  ]),

  // ═══ 020 ═══
  // r0: FEUERWEHR  (F E U E R W E H R) c0
  // r4: BIBLIOTHEK (B I B L I O T H E K) c0
  // r8: GEMEINDE   (G E M E I N D E)     c0
  // c3 r0-4: E???L = ENGEL ✓  |  c8 r0-4: R???E = RINNE ✓  |  c6 r0-4: E???T = EINST ✓
  // c5 r4-8: O???N = OSTEN ✓  |  c3 r4-8: L???E = LAUGE ✓
  makePuzzle('cw-hard-020', 11, 11, [
    { number: 1, direction: 'across', clue: 'Brandbekämpfende Organisation', answer: 'FEUERWEHR', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Sammlung von Büchern zum Ausleihen', answer: 'BIBLIOTHEK', row: 4, col: 0 },
    { number: 3, direction: 'across', clue: 'Verwaltungseinheit einer Stadt', answer: 'GEMEINDE', row: 8, col: 0 },
    { number: 4, direction: 'down', clue: 'Himmlisches Wesen mit Flügeln', answer: 'ENGEL', row: 0, col: 3 },
    { number: 5, direction: 'down', clue: 'Schmale Vertiefung im Boden', answer: 'RINNE', row: 0, col: 8 },
    { number: 6, direction: 'down', clue: 'Zu einer bestimmten Zeit', answer: 'EINST', row: 0, col: 6 },
    { number: 7, direction: 'down', clue: 'Himmelsrichtung zum Sonnenaufgang', answer: 'OSTEN', row: 4, col: 5 },
    { number: 8, direction: 'down', clue: 'Alkalische Reinigungslösung', answer: 'LAUGE', row: 4, col: 3 },
  ]),

  // ═══ 021 ═══
  // r0: ERINNERUNG (E R I N N E R U N G) c0
  // r4: PARKPLATZ  (P A R K P L A T Z) c0
  // r8: HANDWERK   (H A N D W E R K)   c0
  // c2 r0-4: I???R = IMMER ✓  |  c5 r0-4: E???L = ENKEL ✓  |  c7 r0-4: U???T = UNART ✓
  // c3 r4-8: K???D = KLEID ✓  |  c6 r4-8: A???R = ADLER ✓
  makePuzzle('cw-hard-021', 11, 11, [
    { number: 1, direction: 'across', clue: 'Andenken und Gedächtnis', answer: 'ERINNERUNG', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Stellfläche für Automobile', answer: 'PARKPLATZ', row: 4, col: 0 },
    { number: 3, direction: 'across', clue: 'Handwerkliche Tätigkeit', answer: 'HANDWERK', row: 8, col: 0 },
    { number: 4, direction: 'down', clue: 'Zu jeder Zeit, stets', answer: 'IMMER', row: 0, col: 2 },
    { number: 5, direction: 'down', clue: 'Kind des eigenen Kindes', answer: 'ENKEL', row: 0, col: 5 },
    { number: 6, direction: 'down', clue: 'Schlechte Angewohnheit', answer: 'UNART', row: 0, col: 7 },
    { number: 7, direction: 'down', clue: 'Kleidungsstück für Damen', answer: 'KLEID', row: 4, col: 3 },
    { number: 8, direction: 'down', clue: 'Großer Greifvogel, Wappentier', answer: 'ADLER', row: 4, col: 6 },
  ]),

  // ═══ 022 ═══
  // r0: VOLKSFEST  (V O L K S F E S T) c0
  // r4: LANDSCHAFT (L A N D S C H A F T) c0
  // r8: BILDUNG    (B I L D U N G)       c0
  // c4 r0-4: S???S = SPASS ✓  |  c2 r0-4: L???N = LADEN ✓  |  c8 r0-4: T???F = TROPF ✓
  // c7 r0-4: S???A = SAUNA ✓  |  c3 r4-8: D???D = no 5-letter word D???D.
  // Instead: c6 r4-8: H???G = no. c0 r4-8: L???B = no. c1 r4-8: A???I = no.
  // c5 r4-8: C???N = CLOWN ✓? C L O W N → (4,5)=C(LANDSCHAFT[5])✓ (8,5)=N(BILDUNG[5])✓
  makePuzzle('cw-hard-022', 11, 11, [
    { number: 1, direction: 'across', clue: 'Jahrmarkt oder Kirmes', answer: 'VOLKSFEST', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Natürliche Umgebung mit Bergen', answer: 'LANDSCHAFT', row: 4, col: 0 },
    { number: 3, direction: 'across', clue: 'Wissenserwerb durch Schule', answer: 'BILDUNG', row: 8, col: 0 },
    { number: 4, direction: 'down', clue: 'Vergnügen und Freude', answer: 'SPASS', row: 0, col: 4 },
    { number: 5, direction: 'down', clue: 'Geschäft, Ladenlokal', answer: 'LADEN', row: 0, col: 2 },
    { number: 6, direction: 'down', clue: 'Finnisches Schwitzbad', answer: 'SAUNA', row: 0, col: 7 },
    { number: 7, direction: 'down', clue: 'Langsam tropfender Wasserhahn', answer: 'TROPF', row: 0, col: 8 },
    { number: 8, direction: 'down', clue: 'Spaßmacher im Zirkus', answer: 'CLOWN', row: 4, col: 5 },
  ]),

  // ═══ 023 ═══
  // r0: GEHEIMNIS (G E H E I M N I S) c0
  // r4: TRADITION (T R A D I T I O N) c0
  // r8: ORCHESTER (O R C H E S T E R) c0
  // c2 r0-4: H???A = HANSA ✓  |  c1 r0-4: E???R = ENTER ✓
  // c5 r4-8: T???S = TOPAS ✓  |  c0 r4-8: T???O = TURBO ✓  |  c7 r4-8: O???E = OCHSE ✓
  makePuzzle('cw-hard-023', 11, 11, [
    { number: 1, direction: 'across', clue: 'Etwas Verborgenes', answer: 'GEHEIMNIS', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Überlieferte Bräuche', answer: 'TRADITION', row: 4, col: 0 },
    { number: 3, direction: 'across', clue: 'Musikalisches Ensemble', answer: 'ORCHESTER', row: 8, col: 0 },
    { number: 4, direction: 'down', clue: 'Mittelalterlicher Handelsbund', answer: 'HANSA', row: 0, col: 2 },
    { number: 5, direction: 'down', clue: 'Ein Schiff kapern', answer: 'ENTER', row: 0, col: 1 },
    { number: 6, direction: 'down', clue: 'Gelber Edelstein', answer: 'TOPAS', row: 4, col: 5 },
    { number: 7, direction: 'down', clue: 'Motor mit Aufladung', answer: 'TURBO', row: 4, col: 0 },
    { number: 8, direction: 'down', clue: 'Männliches Rind', answer: 'OCHSE', row: 4, col: 7 },
  ]),

  // ═══ 024 ═══
  // r0: SONNENBLUME (S O N N E N B L U M E) c0, 11
  // r4: SCHAUSPIEL  (S C H A U S P I E L) c0, 10
  // r8: RESTAURANT  (R E S T A U R A N T) c0, 10
  // c5 r0-4: N???S = NEUES ✓  |  c3 r0-4: N???A = NINJA ✓  |  c9 r0-4: M???L = MOSEL ✓
  // c3 r4-8: A???T = AGENT ✓  |  c0 r4-8: S???R = SAUER ✓
  makePuzzle('cw-hard-024', 12, 12, [
    { number: 1, direction: 'across', clue: 'Große gelbe Blume im Garten', answer: 'SONNENBLUME', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Theaterstück auf der Bühne', answer: 'SCHAUSPIEL', row: 4, col: 0 },
    { number: 3, direction: 'across', clue: 'Gaststätte mit gehobener Küche', answer: 'RESTAURANT', row: 8, col: 0 },
    { number: 4, direction: 'down', clue: 'Frisches, Anderes (Plural)', answer: 'NEUES', row: 0, col: 5 },
    { number: 5, direction: 'down', clue: 'Japanischer Schattenkrieger', answer: 'NINJA', row: 0, col: 3 },
    { number: 6, direction: 'down', clue: 'Fluss in Rheinland-Pfalz', answer: 'MOSEL', row: 0, col: 9 },
    { number: 7, direction: 'down', clue: 'Spion oder Geheimagent', answer: 'AGENT', row: 4, col: 3 },
    { number: 8, direction: 'down', clue: 'Geschmack von Zitrone', answer: 'SAUER', row: 4, col: 0 },
  ]),

  // ═══ 025 ═══
  // r0: TASCHENUHR (T A S C H E N U H R) c0
  // r4: MANNSCHAFT (M A N N S C H A F T) c0
  // r8: ENTDECKUNG (E N T D E C K U N G) c0
  // c1 r0-4: A???A = ARENA ✓  |  c2 r0-4: S???N = STERN ✓  |  c7 r0-4: U???A = ULTRA ✓
  // c0 r4-8: M???E = MIETE ✓  |  c4 r4-8: S???E = SEIFE ✓
  makePuzzle('cw-hard-025', 11, 11, [
    { number: 1, direction: 'across', clue: 'Alte Uhr an einer Kette', answer: 'TASCHENUHR', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Sportliche Gruppe', answer: 'MANNSCHAFT', row: 4, col: 0 },
    { number: 3, direction: 'across', clue: 'Etwas Neues erforschen', answer: 'ENTDECKUNG', row: 8, col: 0 },
    { number: 4, direction: 'down', clue: 'Wettkampfstätte', answer: 'ARENA', row: 0, col: 1 },
    { number: 5, direction: 'down', clue: 'Himmelskörper bei Nacht', answer: 'STERN', row: 0, col: 2 },
    { number: 6, direction: 'down', clue: 'Äußerst, extrem', answer: 'ULTRA', row: 0, col: 7 },
    { number: 7, direction: 'down', clue: 'Monatliche Zahlung für die Wohnung', answer: 'MIETE', row: 4, col: 0 },
    { number: 8, direction: 'down', clue: 'Reinigungsmittel zum Händewaschen', answer: 'SEIFE', row: 4, col: 4 },
  ]),

  // ═══ 026 ═══
  // r0: WEIHNACHTEN (W E I H N A C H T E N) c0
  // r4: KARUSSELL   (K A R U S S E L L)     c0
  // r8: GETREIDE    (G E T R E I D E)       c0
  // c1 r0-4: E???A = EXTRA ✓  |  c4 r0-4: N???S = NAVIS? NATIS? → NAXOS ✓? Better: just skip c4.
  //   c6 r0-4: C???E = CHOSE ✓? C(0,6)=WEIHNACHTEN[6]=C, E=(4,6)=KARUSSELL[6]=E ✓
  // c1 r4-8: A???E = ACHTE ✓ (A C H T E)
  // c7 r4-8: L???E = LAMPE ✓? L A M P E → (4,7)=L(KARUSSELL[7])✓ (8,7)=E(GETREIDE[7])✓
  // c5 r0-4: A???S = ALIAS ✓ (A L I A S)? (0,5)=A(WEIHNACHTEN[5])✓ (4,5)=S(KARUSSELL[5])✓
  makePuzzle('cw-hard-026', 11, 11, [
    { number: 1, direction: 'across', clue: 'Festliche Zeit im Dezember', answer: 'WEIHNACHTEN', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Drehendes Kinderfahrgeschäft', answer: 'KARUSSELL', row: 4, col: 0 },
    { number: 3, direction: 'across', clue: 'Angebautes Korn', answer: 'GETREIDE', row: 8, col: 0 },
    { number: 4, direction: 'down', clue: 'Besonders, zusätzlich', answer: 'EXTRA', row: 0, col: 1 },
    { number: 5, direction: 'down', clue: 'Unangenehme Angelegenheit', answer: 'CHOSE', row: 0, col: 6 },
    { number: 6, direction: 'down', clue: 'Anderer Name, Deckname', answer: 'ALIAS', row: 0, col: 5 },
    { number: 7, direction: 'down', clue: 'Aufmerksam, vorsichtig', answer: 'ACHTE', row: 4, col: 1 },
    { number: 8, direction: 'down', clue: 'Leuchtmittel auf dem Tisch', answer: 'LAMPE', row: 4, col: 7 },
  ]),

  // ═══ 027 ═══
  // r0: DAMPFSCHIFF (D A M P F S C H I F F) c0, 11
  // r4: PHILOSOPHIE (P H I L O S O P H I E) c0, 11
  // r8: FEUERWEHR   (F E U E R W E H R)     c0, 9
  // c5 r0-4: S???S = SPASS ✓  |  c2 r0-4: M???I = MAORI ✓ (M A O R I)
  // c10 r0-4: F???E = FARBE ✓? F A R B E → (0,10)=F(DAMPFSCHIFF[10])✓ (4,10)=E(PHILOSOPHIE[10])✓
  // c1 r4-8: H???E = HEUTE ✓  |  c4 r4-8: O???R = OTTER ✓? O T T E R → (4,4)=O(PHILOSOPHIE[4])✓ (8,4)=R(FEUERWEHR[4])✓
  makePuzzle('cw-hard-027', 11, 11, [
    { number: 1, direction: 'across', clue: 'Dampfbetriebenes Wasserfahrzeug', answer: 'DAMPFSCHIFF', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Denkschule der Antike', answer: 'PHILOSOPHIE', row: 4, col: 0 },
    { number: 3, direction: 'across', clue: 'Feuerlöschende Organisation', answer: 'FEUERWEHR', row: 8, col: 0 },
    { number: 4, direction: 'down', clue: 'Vergnügen und Freude', answer: 'SPASS', row: 0, col: 5 },
    { number: 5, direction: 'down', clue: 'Volk aus Neuseeland', answer: 'MAORI', row: 0, col: 2 },
    { number: 6, direction: 'down', clue: 'Anstrich, Kolorierung', answer: 'FARBE', row: 0, col: 10 },
    { number: 7, direction: 'down', clue: 'An diesem Tag', answer: 'HEUTE', row: 4, col: 1 },
    { number: 8, direction: 'down', clue: 'Wassermarder mit Pelz', answer: 'OTTER', row: 4, col: 4 },
  ]),

  // ═══ 028 ═══
  // r0: GOLDSCHMIED (G O L D S C H M I E D) c0, 11
  // r4: WEIHNACHTEN (W E I H N A C H T E N) c0, 11
  // r8: MANNSCHAFT  (M A N N S C H A F T)   c0, 10
  // c9 r0-4: E???E = ESCHE ✓  |  c1 r0-4: O???E = OLIVE ✓
  // c4 r0-4: S???N = SATIN ✓ (S A T I N)
  // c1 r4-8: E???A = EXTRA ✓  |  c9 r4-8: E???T = ERNST ✓
  makePuzzle('cw-hard-028', 11, 11, [
    { number: 1, direction: 'across', clue: 'Edler Handwerker für Goldschmuck', answer: 'GOLDSCHMIED', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Feierlichkeit im Dezember', answer: 'WEIHNACHTEN', row: 4, col: 0 },
    { number: 3, direction: 'across', clue: 'Sportliche Gruppe im Wettkampf', answer: 'MANNSCHAFT', row: 8, col: 0 },
    { number: 4, direction: 'down', clue: 'Laubbaum, Ash auf Englisch', answer: 'ESCHE', row: 0, col: 9 },
    { number: 5, direction: 'down', clue: 'Grüne Frucht vom Mittelmeer', answer: 'OLIVE', row: 0, col: 1 },
    { number: 6, direction: 'down', clue: 'Glänzender Stoff', answer: 'SATIN', row: 0, col: 4 },
    { number: 7, direction: 'down', clue: 'Besonders, zusätzlich', answer: 'EXTRA', row: 4, col: 1 },
    { number: 8, direction: 'down', clue: 'Ernsthaftigkeit', answer: 'ERNST', row: 4, col: 9 },
  ]),

  // ═══ 029 ═══
  // r0: ZEITSCHRIFT (Z E I T S C H R I F T) c0, 11
  // r4: ABENTEUER   (A B E N T E U E R)     c0, 9
  // r8: PORZELLAN   (P O R Z E L L A N)     c0, 9
  // c2 r0-4: I???E = IRENE? Names not great. Use IMKRE? no. Skip c2.
  // c6 r0-4: H???U = no.
  // c1 r0-4: E???B = no.
  // c4 r0-4: S???T = SPART ✓? S P A R T → (0,4)=S(ZEITSCHRIFT[4])✓ (4,4)=T(ABENTEUER[4])✓
  //   SPART not a great noun. SPORT ✓! S P O R T → (0,4)=S✓ (4,4)=T✓
  // c7 r0-4: R???E = REIFE ✓ (R E I F E)
  // c0 r4-8: A???P = no. c5 r4-8: E???L = EITEL ✓  |  c8 r4-8: R???N = RUBIN ✓? R U B I N → (8,8)=N(PORZELLAN[8])✓
  // c0 r0-4: Z???A = no. Hmm. Let me check: ABENTEUER c0: (4,0)=A. (0,0)=Z. Z???A = no word.
  // Skip c0. Use c3 r0-4: T???N = THORN ✓? T H O R N → (0,3)=T(ZEITSCHRIFT[3])✓ (4,3)=N(ABENTEUER[3])✓
  makePuzzle('cw-hard-029', 11, 11, [
    { number: 1, direction: 'across', clue: 'Periodisch erscheinende Druckschrift', answer: 'ZEITSCHRIFT', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Spannende Unternehmung', answer: 'ABENTEUER', row: 4, col: 0 },
    { number: 3, direction: 'across', clue: 'Edle Keramik aus Meißen', answer: 'PORZELLAN', row: 8, col: 0 },
    { number: 4, direction: 'down', clue: 'Körperliche Ertüchtigung', answer: 'SPORT', row: 0, col: 4 },
    { number: 5, direction: 'down', clue: 'Dornenbusch, stacheliger Strauch', answer: 'THORN', row: 0, col: 3 },
    { number: 6, direction: 'down', clue: 'Reife Vollendung', answer: 'REIFE', row: 0, col: 7 },
    { number: 7, direction: 'down', clue: 'Eitel und selbstgefällig', answer: 'EITEL', row: 4, col: 5 },
    { number: 8, direction: 'down', clue: 'Roter Edelstein', answer: 'RUBIN', row: 4, col: 8 },
  ]),

  // ═══ 030 ═══
  // r0: KATHEDRALE (K A T H E D R A L E) c0, 10
  // r4: NACHTISCH  (N A C H T I S C H)  c0, 9
  // r8: WANDERUNG  (W A N D E R U N G)  c0, 9
  // c1 r0-4: A???A = AORTA ✓  |  c4 r0-4: E???T = EVENT ✓
  // c6 r0-4: R???S = REBUS ✓? R E B U S → (0,6)=R(KATHEDRALE[6])✓ (4,6)=S(NACHTISCH[6])✓
  // c9 r0-4: E (only r0 has letter at c9, NACHTISCH ends at c8) → ELFER ✓
  // c5 r4-8: I???R = no. c0 r4-8: N???W = no. c3 r4-8: H???D = no.
  // c4 r4-8: T???E = TIERE ✓ (T I E R E) → (4,4)=T(NACHTISCH[4])✓ (8,4)=E(WANDERUNG[4])✓
  makePuzzle('cw-hard-030', 11, 11, [
    { number: 1, direction: 'across', clue: 'Große Kirche mit Bischofssitz', answer: 'KATHEDRALE', row: 0, col: 0 },
    { number: 2, direction: 'across', clue: 'Süße Speise nach dem Hauptgang', answer: 'NACHTISCH', row: 4, col: 0 },
    { number: 3, direction: 'across', clue: 'Längere Fußtour durch die Natur', answer: 'WANDERUNG', row: 8, col: 0 },
    { number: 4, direction: 'down', clue: 'Hauptschlagader des Herzens', answer: 'AORTA', row: 0, col: 1 },
    { number: 5, direction: 'down', clue: 'Großes Ereignis', answer: 'EVENT', row: 0, col: 4 },
    { number: 6, direction: 'down', clue: 'Bilderrätsel', answer: 'REBUS', row: 0, col: 6 },
    { number: 7, direction: 'down', clue: 'Fußballspieler bei Strafstoß', answer: 'ELFER', row: 0, col: 9 },
    { number: 8, direction: 'down', clue: 'Lebewesen in der Natur (Plural)', answer: 'TIERE', row: 4, col: 4 },
  ]),
]
