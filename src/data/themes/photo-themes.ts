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

const UNSPLASH_BASE = 'https://images.unsplash.com'

function photoUrl(photoId: string): string {
  return `${UNSPLASH_BASE}/photo-${photoId}?w=400&h=400&fit=crop`
}

export const photoThemes: PhotoTheme[] = [
  {
    id: 'photo-nature',
    name: 'Natur',
    icon: 'trees',
    entries: [
      { id: 'forest', label: 'Wald', imageUrl: photoUrl('1448375240586-882707db888b') },
      { id: 'mountain', label: 'Berg', imageUrl: photoUrl('1464822759023-fed622ff2c3b') },
      { id: 'lake', label: 'See', imageUrl: photoUrl('1439066615861-d1af74d74000') },
      { id: 'beach', label: 'Strand', imageUrl: photoUrl('1507525428034-b723cf961d3e') },
      { id: 'waterfall', label: 'Wasserfall', imageUrl: photoUrl('1432405972618-c6b0cfba8b46') },
      { id: 'flower', label: 'Blume', imageUrl: photoUrl('1490750967868-88aa4f44baee') },
      { id: 'sunset', label: 'Sonnenuntergang', imageUrl: photoUrl('1495616811223-4d98c6e9c869') },
      { id: 'meadow', label: 'Wiese', imageUrl: photoUrl('1501854140801-50d01698950b') },
      { id: 'ocean', label: 'Ozean', imageUrl: photoUrl('1518837695005-2083093ee35b') },
      { id: 'river', label: 'Fluss', imageUrl: photoUrl('1504701954957-2010ec3bcec1') },
      { id: 'desert', label: 'Wueste', imageUrl: photoUrl('1509316785289-025f5b846b35') },
      { id: 'snow', label: 'Schnee', imageUrl: photoUrl('1491002052546-bf38f186af56') },
    ],
  },
  {
    id: 'photo-animals',
    name: 'Tiere',
    icon: 'paw-print',
    entries: [
      { id: 'dog', label: 'Hund', imageUrl: photoUrl('1587300003388-59208cc962cb') },
      { id: 'cat', label: 'Katze', imageUrl: photoUrl('1514888286974-6c03e2ca1dba') },
      { id: 'horse', label: 'Pferd', imageUrl: photoUrl('1553284965-83fd3e82fa5a') },
      { id: 'bird', label: 'Vogel', imageUrl: photoUrl('1444464666168-49d633b86797') },
      { id: 'butterfly', label: 'Schmetterling', imageUrl: photoUrl('1452570053594-1b985d6ea890') },
      { id: 'fox', label: 'Fuchs', imageUrl: photoUrl('1474511320723-9a56873e38b8') },
      { id: 'rabbit', label: 'Hase', imageUrl: photoUrl('1585110396000-c9ffd4e4b308') },
      { id: 'deer', label: 'Hirsch', imageUrl: photoUrl('1484406743952-3b5c3f1a5478') },
      { id: 'owl', label: 'Eule', imageUrl: photoUrl('1543549790-e98f78bdd746') },
      { id: 'dolphin', label: 'Delfin', imageUrl: photoUrl('1607153333879-c174d265f1d2') },
      { id: 'lion', label: 'Loewe', imageUrl: photoUrl('1546182990-dffeafbe841d') },
      { id: 'elephant', label: 'Elefant', imageUrl: photoUrl('1557050543-4d5f4e07ef46') },
    ],
  },
  {
    id: 'photo-cities',
    name: 'Staedte',
    icon: 'building-2',
    entries: [
      { id: 'paris', label: 'Paris', imageUrl: photoUrl('1502602898657-3e91760cbb34') },
      { id: 'zurich', label: 'Zuerich', imageUrl: photoUrl('1515488764276-beab0607c1e6') },
      { id: 'rome', label: 'Rom', imageUrl: photoUrl('1552832230-c0197dd311b5') },
      { id: 'london', label: 'London', imageUrl: photoUrl('1513635269975-59663e0ac1ad') },
      { id: 'newyork', label: 'New York', imageUrl: photoUrl('1496442226666-8d4d0e62e6e9') },
      { id: 'tokyo', label: 'Tokyo', imageUrl: photoUrl('1540959733332-eab4deabeeaf') },
      { id: 'barcelona', label: 'Barcelona', imageUrl: photoUrl('1583422409516-2895a77efded') },
      { id: 'vienna', label: 'Wien', imageUrl: photoUrl('1516550893923-42d28e5677af') },
      { id: 'amsterdam', label: 'Amsterdam', imageUrl: photoUrl('1534351590666-13e3e96b5017') },
      { id: 'prague', label: 'Prag', imageUrl: photoUrl('1519677100203-a0e668c92439') },
      { id: 'venice', label: 'Venedig', imageUrl: photoUrl('1523906834658-6e24ef2386f9') },
      { id: 'istanbul', label: 'Istanbul', imageUrl: photoUrl('1524231757912-21f4fe3a7200') },
    ],
  },
]

/** Get a photo theme by its id */
export function getPhotoTheme(themeId: string): PhotoTheme | undefined {
  return photoThemes.find(t => t.id === themeId)
}

/** Get all photo theme ids */
export function getPhotoThemeIds(): string[] {
  return photoThemes.map(t => t.id)
}
