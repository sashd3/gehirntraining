export interface PhotoThemeEntry {
  id: string
  label: string
  imageUrl: string
}

export interface PhotoTheme {
  id: string
  name: string
  icon: string
  entries: PhotoThemeEntry[]
}

// Direct Unsplash URLs — these are permanent, no API key needed
const U = 'https://images.unsplash.com'
function img(id: string): string {
  return `${U}/${id}?w=400&h=400&fit=crop&auto=format&q=80`
}

export const photoThemes: PhotoTheme[] = [
  {
    id: 'photo-nature',
    name: 'Natur',
    icon: 'trees',
    entries: [
      { id: 'forest', label: 'Wald', imageUrl: img('photo-1448375240586-882707db888b') },
      { id: 'mountain', label: 'Berg', imageUrl: img('photo-1506905925346-21bda4d32df4') },
      { id: 'lake', label: 'See', imageUrl: img('photo-1501785888041-af3ef285b470') },
      { id: 'beach', label: 'Strand', imageUrl: img('photo-1507525428034-b723cf961d3e') },
      { id: 'waterfall', label: 'Wasserfall', imageUrl: img('photo-1433086966358-54859d0ed716') },
      { id: 'flower', label: 'Blume', imageUrl: img('photo-1490750967868-88aa4f44baee') },
      { id: 'sunset', label: 'Sonnenuntergang', imageUrl: img('photo-1495616811223-4d98c6e9c869') },
      { id: 'meadow', label: 'Wiese', imageUrl: img('photo-1500382017468-9049fed747ef') },
      { id: 'ocean', label: 'Ozean', imageUrl: img('photo-1505118380757-91f5f5632de0') },
      { id: 'river', label: 'Fluss', imageUrl: img('photo-1432405972618-c6b0cfba8b46') },
      { id: 'desert', label: 'Wüste', imageUrl: img('photo-1509316785289-025f5b846b35') },
      { id: 'snow', label: 'Schnee', imageUrl: img('photo-1491002052546-bf38f186af56') },
    ],
  },
  {
    id: 'photo-animals',
    name: 'Tiere',
    icon: 'paw-print',
    entries: [
      { id: 'dog', label: 'Hund', imageUrl: img('photo-1543466835-00a7907e9de1') },
      { id: 'cat', label: 'Katze', imageUrl: img('photo-1514888286974-6c03e2ca1dba') },
      { id: 'horse', label: 'Pferd', imageUrl: img('photo-1534773728080-aa3fa9cf5765') },
      { id: 'bird', label: 'Vogel', imageUrl: img('photo-1444464666168-49d633b86797') },
      { id: 'butterfly', label: 'Schmetterling', imageUrl: img('photo-1452570053594-1b985d6ea890') },
      { id: 'fox', label: 'Fuchs', imageUrl: img('photo-1474511320723-9a56873e38b8') },
      { id: 'rabbit', label: 'Hase', imageUrl: img('photo-1585110396000-c9ffd4e4b308') },
      { id: 'deer', label: 'Hirsch', imageUrl: img('photo-1484406743952-3b5c3f1a5478') },
      { id: 'owl', label: 'Eule', imageUrl: img('photo-1543549790-e98f78bdd746') },
      { id: 'dolphin', label: 'Delfin', imageUrl: img('photo-1564438943996-24eca75a7567') },
      { id: 'lion', label: 'Löwe', imageUrl: img('photo-1546182990-dffeafbe841d') },
      { id: 'elephant', label: 'Elefant', imageUrl: img('photo-1557050543-4d5f4e07ef46') },
    ],
  },
  {
    id: 'photo-cities',
    name: 'Städte',
    icon: 'building-2',
    entries: [
      { id: 'paris', label: 'Paris', imageUrl: img('photo-1502602898657-3e91760cbb34') },
      { id: 'zurich', label: 'Zürich', imageUrl: img('photo-1620735692151-26a7e0748429') },
      { id: 'rome', label: 'Rom', imageUrl: img('photo-1552832230-c0197dd311b5') },
      { id: 'london', label: 'London', imageUrl: img('photo-1513635269975-59663e0ac1ad') },
      { id: 'newyork', label: 'New York', imageUrl: img('photo-1496442226666-8d4d0e62e6e9') },
      { id: 'tokyo', label: 'Tokyo', imageUrl: img('photo-1540959733332-eab4deabeeaf') },
      { id: 'barcelona', label: 'Barcelona', imageUrl: img('photo-1583422409516-2895a77efded') },
      { id: 'vienna', label: 'Wien', imageUrl: img('photo-1609856878074-cf31e21ccb6b') },
      { id: 'amsterdam', label: 'Amsterdam', imageUrl: img('photo-1534351590666-13e3e96b5017') },
      { id: 'prague', label: 'Prag', imageUrl: img('photo-1519677100203-a0e668c92439') },
      { id: 'venice', label: 'Venedig', imageUrl: img('photo-1523906834658-6e24ef2386f9') },
      { id: 'istanbul', label: 'Istanbul', imageUrl: img('photo-1524231757912-21f4fe3a7200') },
    ],
  },
  {
    id: 'photo-buildings',
    name: 'Gebäude',
    icon: 'landmark',
    entries: [
      { id: 'castle', label: 'Schloss', imageUrl: img('photo-1518602164578-cd0074062767') },
      { id: 'church', label: 'Kirche', imageUrl: img('photo-1548625149-fc4a29cf7092') },
      { id: 'lighthouse', label: 'Leuchtturm', imageUrl: img('photo-1507003211169-0a1dd7228f2d') },
      { id: 'bridge', label: 'Brücke', imageUrl: img('photo-1477959858617-67f85cf4f1df') },
      { id: 'skyscraper', label: 'Hochhaus', imageUrl: img('photo-1486325212027-8081e485255e') },
      { id: 'windmill', label: 'Windmühle', imageUrl: img('photo-1533669955142-6a73332af4db') },
      { id: 'temple', label: 'Tempel', imageUrl: img('photo-1545569341-9eb8b30979d9') },
      { id: 'palace', label: 'Palast', imageUrl: img('photo-1551882547-ff40c63fe5fa') },
      { id: 'cottage', label: 'Häuschen', imageUrl: img('photo-1510798831971-661eb04b3739') },
      { id: 'tower', label: 'Turm', imageUrl: img('photo-1431274172761-fca41d930114') },
      { id: 'stadium', label: 'Stadion', imageUrl: img('photo-1522778119026-d647f0596c20') },
      { id: 'museum', label: 'Museum', imageUrl: img('photo-1554907984-15263bfd63bd') },
    ],
  },
]

export function getPhotoTheme(themeId: string): PhotoTheme | undefined {
  return photoThemes.find(t => t.id === themeId)
}

export function getPhotoThemeIds(): string[] {
  return photoThemes.map(t => t.id)
}
