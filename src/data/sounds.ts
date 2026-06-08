export type Category =
  | 'Short Vowels'
  | 'Long Vowels'
  | 'Consonants'
  | 'Digraphs'
  | 'Blends'
  | 'Vowel Teams'
  | 'R-Controlled'
  | 'Word Endings'
  | 'Diphthongs';

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
  'Diphthongs':  '#10b981',
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
  'Diphthongs':  '🟩',
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
  'Diphthongs',
];

export const SOUNDS: Sound[] = [
  // Short Vowels (15)
  { id: 'sv-1',  grapheme: 'ă', example: 'apple',    category: 'Short Vowels', speech: 'apple' },
  { id: 'sv-2',  grapheme: 'ă', example: 'ant',      category: 'Short Vowels', speech: 'ant' },
  { id: 'sv-3',  grapheme: 'ă', example: 'add',      category: 'Short Vowels', speech: 'add' },
  { id: 'sv-4',  grapheme: 'ĕ', example: 'egg',      category: 'Short Vowels', speech: 'egg' },
  { id: 'sv-5',  grapheme: 'ĕ', example: 'elephant', category: 'Short Vowels', speech: 'elephant' },
  { id: 'sv-6',  grapheme: 'ĕ', example: 'end',      category: 'Short Vowels', speech: 'end' },
  { id: 'sv-7',  grapheme: 'ĭ', example: 'igloo',    category: 'Short Vowels', speech: 'igloo' },
  { id: 'sv-8',  grapheme: 'ĭ', example: 'inch',     category: 'Short Vowels', speech: 'inch' },
  { id: 'sv-9',  grapheme: 'ĭ', example: 'if',       category: 'Short Vowels', speech: 'if' },
  { id: 'sv-10', grapheme: 'ŏ', example: 'octopus',  category: 'Short Vowels', speech: 'octopus' },
  { id: 'sv-11', grapheme: 'ŏ', example: 'olive',    category: 'Short Vowels', speech: 'olive' },
  { id: 'sv-12', grapheme: 'ŏ', example: 'odd',      category: 'Short Vowels', speech: 'odd' },
  { id: 'sv-13', grapheme: 'ŭ', example: 'umbrella', category: 'Short Vowels', speech: 'umbrella' },
  { id: 'sv-14', grapheme: 'ŭ', example: 'uncle',    category: 'Short Vowels', speech: 'uncle' },
  { id: 'sv-15', grapheme: 'ŭ', example: 'up',       category: 'Short Vowels', speech: 'up' },
  { id: 'sv-16', grapheme: 'ă', example: 'cat',      category: 'Short Vowels', speech: 'cat' },
  { id: 'sv-17', grapheme: 'ă', example: 'bat',      category: 'Short Vowels', speech: 'bat' },
  { id: 'sv-18', grapheme: 'ă', example: 'hat',      category: 'Short Vowels', speech: 'hat' },
  { id: 'sv-19', grapheme: 'ĕ', example: 'bed',      category: 'Short Vowels', speech: 'bed' },
  { id: 'sv-20', grapheme: 'ĕ', example: 'red',      category: 'Short Vowels', speech: 'red' },
  { id: 'sv-21', grapheme: 'ĕ', example: 'ten',      category: 'Short Vowels', speech: 'ten' },
  { id: 'sv-22', grapheme: 'ĭ', example: 'sit',      category: 'Short Vowels', speech: 'sit' },
  { id: 'sv-23', grapheme: 'ĭ', example: 'hit',      category: 'Short Vowels', speech: 'hit' },
  { id: 'sv-24', grapheme: 'ĭ', example: 'pin',      category: 'Short Vowels', speech: 'pin' },
  { id: 'sv-25', grapheme: 'ŏ', example: 'hot',      category: 'Short Vowels', speech: 'hot' },
  { id: 'sv-26', grapheme: 'ŏ', example: 'dog',      category: 'Short Vowels', speech: 'dog' },
  { id: 'sv-27', grapheme: 'ŏ', example: 'mop',      category: 'Short Vowels', speech: 'mop' },
  { id: 'sv-28', grapheme: 'ŭ', example: 'bug',      category: 'Short Vowels', speech: 'bug' },
  { id: 'sv-29', grapheme: 'ŭ', example: 'sun',      category: 'Short Vowels', speech: 'sun' },
  { id: 'sv-30', grapheme: 'ŭ', example: 'cup',      category: 'Short Vowels', speech: 'cup' },

  // Long Vowels (15)
  { id: 'lv-1',  grapheme: 'ā', example: 'ape',     category: 'Long Vowels', speech: 'ape' },
  { id: 'lv-2',  grapheme: 'ā', example: 'acorn',   category: 'Long Vowels', speech: 'acorn' },
  { id: 'lv-3',  grapheme: 'ā', example: 'age',     category: 'Long Vowels', speech: 'age' },
  { id: 'lv-4',  grapheme: 'ē', example: 'eagle',   category: 'Long Vowels', speech: 'eagle' },
  { id: 'lv-5',  grapheme: 'ē', example: 'eat',     category: 'Long Vowels', speech: 'eat' },
  { id: 'lv-6',  grapheme: 'ē', example: 'even',    category: 'Long Vowels', speech: 'even' },
  { id: 'lv-7',  grapheme: 'ī', example: 'ice',     category: 'Long Vowels', speech: 'ice' },
  { id: 'lv-8',  grapheme: 'ī', example: 'ivy',     category: 'Long Vowels', speech: 'ivy' },
  { id: 'lv-9',  grapheme: 'ī', example: 'idea',    category: 'Long Vowels', speech: 'idea' },
  { id: 'lv-10', grapheme: 'ō', example: 'ocean',   category: 'Long Vowels', speech: 'ocean' },
  { id: 'lv-11', grapheme: 'ō', example: 'open',    category: 'Long Vowels', speech: 'open' },
  { id: 'lv-12', grapheme: 'ō', example: 'over',    category: 'Long Vowels', speech: 'over' },
  { id: 'lv-13', grapheme: 'ū', example: 'unicorn', category: 'Long Vowels', speech: 'unicorn' },
  { id: 'lv-14', grapheme: 'ū', example: 'use',     category: 'Long Vowels', speech: 'use' },
  { id: 'lv-15', grapheme: 'ū', example: 'unit',    category: 'Long Vowels', speech: 'unit' },

  // Consonants (21)
  { id: 'c-1',  grapheme: 'b', example: 'ball',  category: 'Consonants', speech: 'ball' },
  { id: 'c-2',  grapheme: 'c', example: 'cat',   category: 'Consonants', speech: 'cat' },
  { id: 'c-3',  grapheme: 'd', example: 'dog',   category: 'Consonants', speech: 'dog' },
  { id: 'c-4',  grapheme: 'f', example: 'fish',  category: 'Consonants', speech: 'fish' },
  { id: 'c-5',  grapheme: 'g', example: 'goat',  category: 'Consonants', speech: 'goat' },
  { id: 'c-6',  grapheme: 'h', example: 'hat',   category: 'Consonants', speech: 'hat' },
  { id: 'c-7',  grapheme: 'j', example: 'jar',   category: 'Consonants', speech: 'jar' },
  { id: 'c-8',  grapheme: 'k', example: 'kite',  category: 'Consonants', speech: 'kite' },
  { id: 'c-9',  grapheme: 'l', example: 'lion',  category: 'Consonants', speech: 'lion' },
  { id: 'c-10', grapheme: 'm', example: 'moon',  category: 'Consonants', speech: 'moon' },
  { id: 'c-11', grapheme: 'n', example: 'net',   category: 'Consonants', speech: 'net' },
  { id: 'c-12', grapheme: 'p', example: 'pin',   category: 'Consonants', speech: 'pin' },
  { id: 'c-13', grapheme: 'q', example: 'queen', category: 'Consonants', speech: 'queen' },
  { id: 'c-14', grapheme: 'r', example: 'rain',  category: 'Consonants', speech: 'rain' },
  { id: 'c-15', grapheme: 's', example: 'sun',   category: 'Consonants', speech: 'sun' },
  { id: 'c-16', grapheme: 't', example: 'top',   category: 'Consonants', speech: 'top' },
  { id: 'c-17', grapheme: 'v', example: 'van',   category: 'Consonants', speech: 'van' },
  { id: 'c-18', grapheme: 'w', example: 'web',   category: 'Consonants', speech: 'web' },
  { id: 'c-19', grapheme: 'x', example: 'fox',   category: 'Consonants', speech: 'fox' },
  { id: 'c-20', grapheme: 'y', example: 'yarn',  category: 'Consonants', speech: 'yarn' },
  { id: 'c-21', grapheme: 'z', example: 'zip',   category: 'Consonants', speech: 'zip' },

  // Digraphs (8)
  { id: 'd-1', grapheme: 'ch', example: 'chair', category: 'Digraphs', speech: 'chair' },
  { id: 'd-2', grapheme: 'sh', example: 'ship',  category: 'Digraphs', speech: 'ship' },
  { id: 'd-3', grapheme: 'th', example: 'thumb', category: 'Digraphs', speech: 'thumb' },
  { id: 'd-4', grapheme: 'th', example: 'that',  category: 'Digraphs', speech: 'that' },
  { id: 'd-5', grapheme: 'wh', example: 'whale', category: 'Digraphs', speech: 'whale' },
  { id: 'd-6', grapheme: 'ph', example: 'phone', category: 'Digraphs', speech: 'phone' },
  { id: 'd-7', grapheme: 'ng', example: 'ring',  category: 'Digraphs', speech: 'ring' },
  { id: 'd-8', grapheme: 'ck', example: 'clock', category: 'Digraphs', speech: 'clock' },

  // Blends (20)
  { id: 'bl-1',  grapheme: 'bl', example: 'blue',  category: 'Blends', speech: 'blue' },
  { id: 'bl-2',  grapheme: 'br', example: 'brown', category: 'Blends', speech: 'brown' },
  { id: 'bl-3',  grapheme: 'cl', example: 'clap',  category: 'Blends', speech: 'clap' },
  { id: 'bl-4',  grapheme: 'cr', example: 'crab',  category: 'Blends', speech: 'crab' },
  { id: 'bl-5',  grapheme: 'dr', example: 'drum',  category: 'Blends', speech: 'drum' },
  { id: 'bl-6',  grapheme: 'fl', example: 'flag',  category: 'Blends', speech: 'flag' },
  { id: 'bl-7',  grapheme: 'fr', example: 'frog',  category: 'Blends', speech: 'frog' },
  { id: 'bl-8',  grapheme: 'gl', example: 'glass', category: 'Blends', speech: 'glass' },
  { id: 'bl-9',  grapheme: 'gr', example: 'green', category: 'Blends', speech: 'green' },
  { id: 'bl-10', grapheme: 'pl', example: 'play',  category: 'Blends', speech: 'play' },
  { id: 'bl-11', grapheme: 'pr', example: 'prize', category: 'Blends', speech: 'prize' },
  { id: 'bl-12', grapheme: 'sc', example: 'scale', category: 'Blends', speech: 'scale' },
  { id: 'bl-13', grapheme: 'sk', example: 'skate', category: 'Blends', speech: 'skate' },
  { id: 'bl-14', grapheme: 'sl', example: 'slide', category: 'Blends', speech: 'slide' },
  { id: 'bl-15', grapheme: 'sm', example: 'smile', category: 'Blends', speech: 'smile' },
  { id: 'bl-16', grapheme: 'sn', example: 'snake', category: 'Blends', speech: 'snake' },
  { id: 'bl-17', grapheme: 'sp', example: 'space', category: 'Blends', speech: 'space' },
  { id: 'bl-18', grapheme: 'st', example: 'star',  category: 'Blends', speech: 'star' },
  { id: 'bl-19', grapheme: 'sw', example: 'swim',  category: 'Blends', speech: 'swim' },
  { id: 'bl-20', grapheme: 'tr', example: 'truck', category: 'Blends', speech: 'truck' },

  // Vowel Teams (12)
  { id: 'vt-1',  grapheme: 'ai', example: 'rain',  category: 'Vowel Teams', speech: 'rain' },
  { id: 'vt-2',  grapheme: 'ay', example: 'play',  category: 'Vowel Teams', speech: 'play' },
  { id: 'vt-3',  grapheme: 'ea', example: 'beach', category: 'Vowel Teams', speech: 'beach' },
  { id: 'vt-4',  grapheme: 'ee', example: 'tree',  category: 'Vowel Teams', speech: 'tree' },
  { id: 'vt-5',  grapheme: 'ie', example: 'pie',   category: 'Vowel Teams', speech: 'pie' },
  { id: 'vt-6',  grapheme: 'oa', example: 'boat',  category: 'Vowel Teams', speech: 'boat' },
  { id: 'vt-7',  grapheme: 'oe', example: 'toe',   category: 'Vowel Teams', speech: 'toe' },
  { id: 'vt-8',  grapheme: 'oo', example: 'moon',  category: 'Vowel Teams', speech: 'moon' },
  { id: 'vt-9',  grapheme: 'ow', example: 'snow',  category: 'Vowel Teams', speech: 'snow' },
  { id: 'vt-10', grapheme: 'oy', example: 'toy',   category: 'Vowel Teams', speech: 'toy' },
  { id: 'vt-11', grapheme: 'ou', example: 'cloud', category: 'Vowel Teams', speech: 'cloud' },
  { id: 'vt-12', grapheme: 'ue', example: 'blue',  category: 'Vowel Teams', speech: 'blue' },

  // R-Controlled (5)
  { id: 'rc-1', grapheme: 'ar', example: 'star',   category: 'R-Controlled', speech: 'star' },
  { id: 'rc-2', grapheme: 'er', example: 'fern',   category: 'R-Controlled', speech: 'fern' },
  { id: 'rc-3', grapheme: 'ir', example: 'bird',   category: 'R-Controlled', speech: 'bird' },
  { id: 'rc-4', grapheme: 'or', example: 'corn',   category: 'R-Controlled', speech: 'corn' },
  { id: 'rc-5', grapheme: 'ur', example: 'turtle', category: 'R-Controlled', speech: 'turtle' },

  // Word Endings (10)
  { id: 'we-1',  grapheme: '-ing',  example: 'running',  category: 'Word Endings', speech: 'running' },
  { id: 'we-2',  grapheme: '-ed',   example: 'jumped',   category: 'Word Endings', speech: 'jumped' },
  { id: 'we-3',  grapheme: '-er',   example: 'faster',   category: 'Word Endings', speech: 'faster' },
  { id: 'we-4',  grapheme: '-est',  example: 'tallest',  category: 'Word Endings', speech: 'tallest' },
  { id: 'we-5',  grapheme: '-ful',  example: 'helpful',  category: 'Word Endings', speech: 'helpful' },
  { id: 'we-6',  grapheme: '-less', example: 'hopeless', category: 'Word Endings', speech: 'hopeless' },
  { id: 'we-7',  grapheme: '-tion', example: 'station',  category: 'Word Endings', speech: 'station' },
  { id: 'we-8',  grapheme: '-ness', example: 'kindness', category: 'Word Endings', speech: 'kindness' },
  { id: 'we-9',  grapheme: '-ment', example: 'movement', category: 'Word Endings', speech: 'movement' },
  { id: 'we-10', grapheme: '-ly',   example: 'quickly',  category: 'Word Endings', speech: 'quickly' },

  // Diphthongs (8)
  { id: 'dp-1', grapheme: 'oi', example: 'coin',   category: 'Diphthongs', speech: 'coin' },
  { id: 'dp-2', grapheme: 'oy', example: 'boy',    category: 'Diphthongs', speech: 'boy' },
  { id: 'dp-3', grapheme: 'ou', example: 'cloud',  category: 'Diphthongs', speech: 'cloud' },
  { id: 'dp-4', grapheme: 'ow', example: 'cow',    category: 'Diphthongs', speech: 'cow' },
  { id: 'dp-5', grapheme: 'au', example: 'August', category: 'Diphthongs', speech: 'August' },
  { id: 'dp-6', grapheme: 'aw', example: 'saw',    category: 'Diphthongs', speech: 'saw' },
  { id: 'dp-7', grapheme: 'ew', example: 'dew',    category: 'Diphthongs', speech: 'dew' },
  { id: 'dp-8', grapheme: 'oo', example: 'book',   category: 'Diphthongs', speech: 'book' },
];
