export type Category =
  | 'Short Vowels'
  | 'Long Vowels'
  | 'Consonants'
  | 'Digraphs'
  | 'Blends'
  | 'Vowel Teams'
  | 'R-Controlled'
  | 'Word Endings';

export interface Sound {
  id: string;
  grapheme: string;
  example: string;
  category: Category;
  speech: string;
}

export const CATEGORY_COLORS: Record<Category, string> = {
  'Short Vowels': '#f43f5e',
  'Long Vowels': '#3b82f6',
  'Consonants': '#8b5cf6',
  'Digraphs': '#f97316',
  'Blends': '#22c55e',
  'Vowel Teams': '#06b6d4',
  'R-Controlled': '#eab308',
  'Word Endings': '#ec4899',
};

export const CATEGORY_EMOJIS: Record<Category, string> = {
  'Short Vowels': '🔴',
  'Long Vowels': '🔵',
  'Consonants': '🟣',
  'Digraphs': '🟠',
  'Blends': '🟢',
  'Vowel Teams': '🩵',
  'R-Controlled': '🟡',
  'Word Endings': '🩷',
};

export const CATEGORIES: Category[] = [
  'Short Vowels',
  'Long Vowels',
  'Consonants',
  'Digraphs',
  'Blends',
  'Vowel Teams',
  'R-Controlled',
  'Word Endings',
];

export const SOUNDS: Sound[] = [
  // Short Vowels (15)
  { id: 'sv-1',  grapheme: 'ă', example: 'apple',    category: 'Short Vowels', speech: 'a, apple' },
  { id: 'sv-2',  grapheme: 'ă', example: 'ant',      category: 'Short Vowels', speech: 'a, ant' },
  { id: 'sv-3',  grapheme: 'ă', example: 'add',      category: 'Short Vowels', speech: 'a, add' },
  { id: 'sv-4',  grapheme: 'ĕ', example: 'egg',      category: 'Short Vowels', speech: 'e, egg' },
  { id: 'sv-5',  grapheme: 'ĕ', example: 'elephant', category: 'Short Vowels', speech: 'e, elephant' },
  { id: 'sv-6',  grapheme: 'ĕ', example: 'end',      category: 'Short Vowels', speech: 'e, end' },
  { id: 'sv-7',  grapheme: 'ĭ', example: 'igloo',    category: 'Short Vowels', speech: 'i, igloo' },
  { id: 'sv-8',  grapheme: 'ĭ', example: 'inch',     category: 'Short Vowels', speech: 'i, inch' },
  { id: 'sv-9',  grapheme: 'ĭ', example: 'if',       category: 'Short Vowels', speech: 'i, if' },
  { id: 'sv-10', grapheme: 'ŏ', example: 'octopus',  category: 'Short Vowels', speech: 'o, octopus' },
  { id: 'sv-11', grapheme: 'ŏ', example: 'olive',    category: 'Short Vowels', speech: 'o, olive' },
  { id: 'sv-12', grapheme: 'ŏ', example: 'odd',      category: 'Short Vowels', speech: 'o, odd' },
  { id: 'sv-13', grapheme: 'ŭ', example: 'umbrella', category: 'Short Vowels', speech: 'u, umbrella' },
  { id: 'sv-14', grapheme: 'ŭ', example: 'uncle',    category: 'Short Vowels', speech: 'u, uncle' },
  { id: 'sv-15', grapheme: 'ŭ', example: 'up',       category: 'Short Vowels', speech: 'u, up' },

  // Long Vowels (15)
  { id: 'lv-1',  grapheme: 'ā', example: 'ape',     category: 'Long Vowels', speech: 'a, ape' },
  { id: 'lv-2',  grapheme: 'ā', example: 'acorn',   category: 'Long Vowels', speech: 'a, acorn' },
  { id: 'lv-3',  grapheme: 'ā', example: 'age',     category: 'Long Vowels', speech: 'a, age' },
  { id: 'lv-4',  grapheme: 'ē', example: 'eagle',   category: 'Long Vowels', speech: 'e, eagle' },
  { id: 'lv-5',  grapheme: 'ē', example: 'eat',     category: 'Long Vowels', speech: 'e, eat' },
  { id: 'lv-6',  grapheme: 'ē', example: 'even',    category: 'Long Vowels', speech: 'e, even' },
  { id: 'lv-7',  grapheme: 'ī', example: 'ice',     category: 'Long Vowels', speech: 'i, ice' },
  { id: 'lv-8',  grapheme: 'ī', example: 'ivy',     category: 'Long Vowels', speech: 'i, ivy' },
  { id: 'lv-9',  grapheme: 'ī', example: 'idea',    category: 'Long Vowels', speech: 'i, idea' },
  { id: 'lv-10', grapheme: 'ō', example: 'ocean',   category: 'Long Vowels', speech: 'o, ocean' },
  { id: 'lv-11', grapheme: 'ō', example: 'open',    category: 'Long Vowels', speech: 'o, open' },
  { id: 'lv-12', grapheme: 'ō', example: 'over',    category: 'Long Vowels', speech: 'o, over' },
  { id: 'lv-13', grapheme: 'ū', example: 'unicorn', category: 'Long Vowels', speech: 'u, unicorn' },
  { id: 'lv-14', grapheme: 'ū', example: 'use',     category: 'Long Vowels', speech: 'u, use' },
  { id: 'lv-15', grapheme: 'ū', example: 'unit',    category: 'Long Vowels', speech: 'u, unit' },

  // Consonants (21)
  { id: 'c-1',  grapheme: 'b', example: 'ball',  category: 'Consonants', speech: 'buh, ball' },
  { id: 'c-2',  grapheme: 'c', example: 'cat',   category: 'Consonants', speech: 'kuh, cat' },
  { id: 'c-3',  grapheme: 'd', example: 'dog',   category: 'Consonants', speech: 'duh, dog' },
  { id: 'c-4',  grapheme: 'f', example: 'fish',  category: 'Consonants', speech: 'fuh, fish' },
  { id: 'c-5',  grapheme: 'g', example: 'goat',  category: 'Consonants', speech: 'guh, goat' },
  { id: 'c-6',  grapheme: 'h', example: 'hat',   category: 'Consonants', speech: 'huh, hat' },
  { id: 'c-7',  grapheme: 'j', example: 'jar',   category: 'Consonants', speech: 'juh, jar' },
  { id: 'c-8',  grapheme: 'k', example: 'kite',  category: 'Consonants', speech: 'kuh, kite' },
  { id: 'c-9',  grapheme: 'l', example: 'lion',  category: 'Consonants', speech: 'luh, lion' },
  { id: 'c-10', grapheme: 'm', example: 'moon',  category: 'Consonants', speech: 'muh, moon' },
  { id: 'c-11', grapheme: 'n', example: 'net',   category: 'Consonants', speech: 'nuh, net' },
  { id: 'c-12', grapheme: 'p', example: 'pin',   category: 'Consonants', speech: 'puh, pin' },
  { id: 'c-13', grapheme: 'q', example: 'queen', category: 'Consonants', speech: 'kwuh, queen' },
  { id: 'c-14', grapheme: 'r', example: 'rain',  category: 'Consonants', speech: 'ruh, rain' },
  { id: 'c-15', grapheme: 's', example: 'sun',   category: 'Consonants', speech: 'suh, sun' },
  { id: 'c-16', grapheme: 't', example: 'top',   category: 'Consonants', speech: 'tuh, top' },
  { id: 'c-17', grapheme: 'v', example: 'van',   category: 'Consonants', speech: 'vuh, van' },
  { id: 'c-18', grapheme: 'w', example: 'web',   category: 'Consonants', speech: 'wuh, web' },
  { id: 'c-19', grapheme: 'x', example: 'fox',   category: 'Consonants', speech: 'ks, fox' },
  { id: 'c-20', grapheme: 'y', example: 'yarn',  category: 'Consonants', speech: 'yuh, yarn' },
  { id: 'c-21', grapheme: 'z', example: 'zip',   category: 'Consonants', speech: 'zuh, zip' },

  // Digraphs (8)
  { id: 'd-1', grapheme: 'ch', example: 'chair', category: 'Digraphs', speech: 'ch, chair' },
  { id: 'd-2', grapheme: 'sh', example: 'ship',  category: 'Digraphs', speech: 'sh, ship' },
  { id: 'd-3', grapheme: 'th', example: 'thumb', category: 'Digraphs', speech: 'th, thumb' },
  { id: 'd-4', grapheme: 'th', example: 'that',  category: 'Digraphs', speech: 'th, that' },
  { id: 'd-5', grapheme: 'wh', example: 'whale', category: 'Digraphs', speech: 'wh, whale' },
  { id: 'd-6', grapheme: 'ph', example: 'phone', category: 'Digraphs', speech: 'f, phone' },
  { id: 'd-7', grapheme: 'ng', example: 'ring',  category: 'Digraphs', speech: 'ng, ring' },
  { id: 'd-8', grapheme: 'ck', example: 'clock', category: 'Digraphs', speech: 'k, clock' },

  // Blends (20)
  { id: 'bl-1',  grapheme: 'bl', example: 'blue',  category: 'Blends', speech: 'bl, blue' },
  { id: 'bl-2',  grapheme: 'br', example: 'brown', category: 'Blends', speech: 'br, brown' },
  { id: 'bl-3',  grapheme: 'cl', example: 'clap',  category: 'Blends', speech: 'cl, clap' },
  { id: 'bl-4',  grapheme: 'cr', example: 'crab',  category: 'Blends', speech: 'cr, crab' },
  { id: 'bl-5',  grapheme: 'dr', example: 'drum',  category: 'Blends', speech: 'dr, drum' },
  { id: 'bl-6',  grapheme: 'fl', example: 'flag',  category: 'Blends', speech: 'fl, flag' },
  { id: 'bl-7',  grapheme: 'fr', example: 'frog',  category: 'Blends', speech: 'fr, frog' },
  { id: 'bl-8',  grapheme: 'gl', example: 'glass', category: 'Blends', speech: 'gl, glass' },
  { id: 'bl-9',  grapheme: 'gr', example: 'green', category: 'Blends', speech: 'gr, green' },
  { id: 'bl-10', grapheme: 'pl', example: 'play',  category: 'Blends', speech: 'pl, play' },
  { id: 'bl-11', grapheme: 'pr', example: 'prize', category: 'Blends', speech: 'pr, prize' },
  { id: 'bl-12', grapheme: 'sc', example: 'scale', category: 'Blends', speech: 'sc, scale' },
  { id: 'bl-13', grapheme: 'sk', example: 'skate', category: 'Blends', speech: 'sk, skate' },
  { id: 'bl-14', grapheme: 'sl', example: 'slide', category: 'Blends', speech: 'sl, slide' },
  { id: 'bl-15', grapheme: 'sm', example: 'smile', category: 'Blends', speech: 'sm, smile' },
  { id: 'bl-16', grapheme: 'sn', example: 'snake', category: 'Blends', speech: 'sn, snake' },
  { id: 'bl-17', grapheme: 'sp', example: 'space', category: 'Blends', speech: 'sp, space' },
  { id: 'bl-18', grapheme: 'st', example: 'star',  category: 'Blends', speech: 'st, star' },
  { id: 'bl-19', grapheme: 'sw', example: 'swim',  category: 'Blends', speech: 'sw, swim' },
  { id: 'bl-20', grapheme: 'tr', example: 'truck', category: 'Blends', speech: 'tr, truck' },

  // Vowel Teams (12)
  { id: 'vt-1',  grapheme: 'ai', example: 'rain',  category: 'Vowel Teams', speech: 'a, rain' },
  { id: 'vt-2',  grapheme: 'ay', example: 'play',  category: 'Vowel Teams', speech: 'a, play' },
  { id: 'vt-3',  grapheme: 'ea', example: 'beach', category: 'Vowel Teams', speech: 'e, beach' },
  { id: 'vt-4',  grapheme: 'ee', example: 'tree',  category: 'Vowel Teams', speech: 'e, tree' },
  { id: 'vt-5',  grapheme: 'ie', example: 'pie',   category: 'Vowel Teams', speech: 'i, pie' },
  { id: 'vt-6',  grapheme: 'oa', example: 'boat',  category: 'Vowel Teams', speech: 'o, boat' },
  { id: 'vt-7',  grapheme: 'oe', example: 'toe',   category: 'Vowel Teams', speech: 'o, toe' },
  { id: 'vt-8',  grapheme: 'oo', example: 'moon',  category: 'Vowel Teams', speech: 'oo, moon' },
  { id: 'vt-9',  grapheme: 'ow', example: 'snow',  category: 'Vowel Teams', speech: 'o, snow' },
  { id: 'vt-10', grapheme: 'oy', example: 'toy',   category: 'Vowel Teams', speech: 'oy, toy' },
  { id: 'vt-11', grapheme: 'ou', example: 'cloud', category: 'Vowel Teams', speech: 'ow, cloud' },
  { id: 'vt-12', grapheme: 'ue', example: 'blue',  category: 'Vowel Teams', speech: 'u, blue' },

  // R-Controlled (5)
  { id: 'rc-1', grapheme: 'ar', example: 'star',   category: 'R-Controlled', speech: 'ar, star' },
  { id: 'rc-2', grapheme: 'er', example: 'fern',   category: 'R-Controlled', speech: 'er, fern' },
  { id: 'rc-3', grapheme: 'ir', example: 'bird',   category: 'R-Controlled', speech: 'ir, bird' },
  { id: 'rc-4', grapheme: 'or', example: 'corn',   category: 'R-Controlled', speech: 'or, corn' },
  { id: 'rc-5', grapheme: 'ur', example: 'turtle', category: 'R-Controlled', speech: 'ur, turtle' },

  // Word Endings (10)
  { id: 'we-1',  grapheme: '-ing',  example: 'running',  category: 'Word Endings', speech: 'ing, running' },
  { id: 'we-2',  grapheme: '-ed',   example: 'jumped',   category: 'Word Endings', speech: 'ed, jumped' },
  { id: 'we-3',  grapheme: '-er',   example: 'faster',   category: 'Word Endings', speech: 'er, faster' },
  { id: 'we-4',  grapheme: '-est',  example: 'tallest',  category: 'Word Endings', speech: 'est, tallest' },
  { id: 'we-5',  grapheme: '-ful',  example: 'helpful',  category: 'Word Endings', speech: 'ful, helpful' },
  { id: 'we-6',  grapheme: '-less', example: 'hopeless', category: 'Word Endings', speech: 'less, hopeless' },
  { id: 'we-7',  grapheme: '-tion', example: 'station',  category: 'Word Endings', speech: 'shun, station' },
  { id: 'we-8',  grapheme: '-ness', example: 'kindness', category: 'Word Endings', speech: 'ness, kindness' },
  { id: 'we-9',  grapheme: '-ment', example: 'movement', category: 'Word Endings', speech: 'ment, movement' },
  { id: 'we-10', grapheme: '-ly',   example: 'quickly',  category: 'Word Endings', speech: 'lee, quickly' },
];
