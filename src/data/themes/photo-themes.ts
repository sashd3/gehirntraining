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

// Using Unsplash source API — guaranteed to return correct images
// Format: https://source.unsplash.com/featured/400x400/?{query}
function searchUrl(query: string): string {
  return `https://source.unsplash.com/400x400/?${encodeURIComponent(query)}`
}

export const photoThemes: PhotoTheme[] = [
  {
    id: 'photo-nature',
    name: 'Natur',
    icon: 'trees',
    entries: [
      { id: 'forest', label: 'Wald', imageUrl: searchUrl('forest,trees,green') },
      { id: 'mountain', label: 'Berg', imageUrl: searchUrl('mountain,peak,alps') },
      { id: 'lake', label: 'See', imageUrl: searchUrl('lake,calm,water') },
      { id: 'beach', label: 'Strand', imageUrl: searchUrl('beach,sand,ocean') },
      { id: 'waterfall', label: 'Wasserfall', imageUrl: searchUrl('waterfall,nature') },
      { id: 'flower', label: 'Blume', imageUrl: searchUrl('flower,bloom,colorful') },
      { id: 'sunset', label: 'Sonnenuntergang', imageUrl: searchUrl('sunset,sky,orange') },
      { id: 'meadow', label: 'Wiese', imageUrl: searchUrl('meadow,green,field') },
      { id: 'ocean', label: 'Ozean', imageUrl: searchUrl('ocean,waves,blue') },
      { id: 'river', label: 'Fluss', imageUrl: searchUrl('river,stream,flowing') },
      { id: 'desert', label: 'Wüste', imageUrl: searchUrl('desert,sand,dunes') },
      { id: 'snow', label: 'Schnee', imageUrl: searchUrl('snow,winter,landscape') },
    ],
  },
  {
    id: 'photo-animals',
    name: 'Tiere',
    icon: 'paw-print',
    entries: [
      { id: 'dog', label: 'Hund', imageUrl: searchUrl('dog,puppy,cute') },
      { id: 'cat', label: 'Katze', imageUrl: searchUrl('cat,kitten,feline') },
      { id: 'horse', label: 'Pferd', imageUrl: searchUrl('horse,stallion') },
      { id: 'bird', label: 'Vogel', imageUrl: searchUrl('bird,songbird,colorful') },
      { id: 'butterfly', label: 'Schmetterling', imageUrl: searchUrl('butterfly,wings,insect') },
      { id: 'fox', label: 'Fuchs', imageUrl: searchUrl('fox,red,wildlife') },
      { id: 'rabbit', label: 'Hase', imageUrl: searchUrl('rabbit,bunny,cute') },
      { id: 'deer', label: 'Hirsch', imageUrl: searchUrl('deer,stag,wildlife') },
      { id: 'owl', label: 'Eule', imageUrl: searchUrl('owl,bird,night') },
      { id: 'dolphin', label: 'Delfin', imageUrl: searchUrl('dolphin,ocean,jumping') },
      { id: 'lion', label: 'Löwe', imageUrl: searchUrl('lion,mane,safari') },
      { id: 'elephant', label: 'Elefant', imageUrl: searchUrl('elephant,africa,safari') },
    ],
  },
  {
    id: 'photo-cities',
    name: 'Städte',
    icon: 'building-2',
    entries: [
      { id: 'paris', label: 'Paris', imageUrl: searchUrl('paris,eiffel,tower') },
      { id: 'zurich', label: 'Zürich', imageUrl: searchUrl('zurich,switzerland,city') },
      { id: 'rome', label: 'Rom', imageUrl: searchUrl('rome,colosseum,italy') },
      { id: 'london', label: 'London', imageUrl: searchUrl('london,bigben,bridge') },
      { id: 'newyork', label: 'New York', imageUrl: searchUrl('newyork,manhattan,skyline') },
      { id: 'tokyo', label: 'Tokyo', imageUrl: searchUrl('tokyo,japan,shibuya') },
      { id: 'barcelona', label: 'Barcelona', imageUrl: searchUrl('barcelona,sagrada,spain') },
      { id: 'vienna', label: 'Wien', imageUrl: searchUrl('vienna,austria,palace') },
      { id: 'amsterdam', label: 'Amsterdam', imageUrl: searchUrl('amsterdam,canal,netherlands') },
      { id: 'prague', label: 'Prag', imageUrl: searchUrl('prague,castle,bridge') },
      { id: 'venice', label: 'Venedig', imageUrl: searchUrl('venice,gondola,canal') },
      { id: 'istanbul', label: 'Istanbul', imageUrl: searchUrl('istanbul,mosque,turkey') },
    ],
  },
  {
    id: 'photo-buildings',
    name: 'Gebäude',
    icon: 'landmark',
    entries: [
      { id: 'castle', label: 'Schloss', imageUrl: searchUrl('castle,medieval,tower') },
      { id: 'church', label: 'Kirche', imageUrl: searchUrl('church,cathedral,gothic') },
      { id: 'lighthouse', label: 'Leuchtturm', imageUrl: searchUrl('lighthouse,coast,tower') },
      { id: 'bridge', label: 'Brücke', imageUrl: searchUrl('bridge,architecture,span') },
      { id: 'skyscraper', label: 'Hochhaus', imageUrl: searchUrl('skyscraper,modern,glass') },
      { id: 'windmill', label: 'Windmühle', imageUrl: searchUrl('windmill,dutch,traditional') },
      { id: 'temple', label: 'Tempel', imageUrl: searchUrl('temple,ancient,columns') },
      { id: 'palace', label: 'Palast', imageUrl: searchUrl('palace,royal,grand') },
      { id: 'cottage', label: 'Häuschen', imageUrl: searchUrl('cottage,cozy,rural') },
      { id: 'tower', label: 'Turm', imageUrl: searchUrl('tower,tall,landmark') },
      { id: 'stadium', label: 'Stadion', imageUrl: searchUrl('stadium,sports,arena') },
      { id: 'museum', label: 'Museum', imageUrl: searchUrl('museum,art,building') },
    ],
  },
]

export function getPhotoTheme(themeId: string): PhotoTheme | undefined {
  return photoThemes.find(t => t.id === themeId)
}

export function getPhotoThemeIds(): string[] {
  return photoThemes.map(t => t.id)
}
