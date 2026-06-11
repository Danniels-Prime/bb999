export interface GameTile {
  seg: string
  say: string
}

export interface GameWord {
  word: string
  tiles: GameTile[]
}

export interface GameLevel {
  level: number
  name: string
  color: string
  words: GameWord[]
}

const t = (seg: string, say: string): GameTile => ({ seg, say })

export const GAME_LEVELS: GameLevel[] = [
  {
    level: 1,
    name: 'Starter Sounds',
    color: '#f43f5e',
    words: [
      { word: 'cat', tiles: [t('c','kuh'), t('ă','ah'), t('t','tuh')] },
      { word: 'bed', tiles: [t('b','buh'), t('ĕ','eh'), t('d','duh')] },
      { word: 'sit', tiles: [t('s','suh'), t('ĭ','ih'), t('t','tuh')] },
      { word: 'hot', tiles: [t('h','huh'), t('ŏ','aw'), t('t','tuh')] },
      { word: 'bug', tiles: [t('b','buh'), t('ŭ','uh'), t('g','guh')] },
      { word: 'mat', tiles: [t('m','muh'), t('ă','ah'), t('t','tuh')] },
      { word: 'red', tiles: [t('r','ruh'), t('ĕ','eh'), t('d','duh')] },
      { word: 'pin', tiles: [t('p','puh'), t('ĭ','ih'), t('n','nuh')] },
      { word: 'dog', tiles: [t('d','duh'), t('ŏ','aw'), t('g','guh')] },
      { word: 'sun', tiles: [t('s','suh'), t('ŭ','uh'), t('n','nuh')] },
    ],
  },
  {
    level: 2,
    name: 'Blends & Digraphs',
    color: '#22c55e',
    words: [
      { word: 'ship',  tiles: [t('sh','sh'),  t('i','ih'),  t('p','puh')] },
      { word: 'crab',  tiles: [t('cr','cr'),  t('a','ah'),  t('b','buh')] },
      { word: 'star',  tiles: [t('st','st'),  t('ar','ar')] },
      { word: 'flag',  tiles: [t('fl','fl'),  t('a','ah'),  t('g','guh')] },
      { word: 'drum',  tiles: [t('dr','dr'),  t('u','uh'),  t('m','muh')] },
      { word: 'chip',  tiles: [t('ch','ch'),  t('i','ih'),  t('p','puh')] },
      { word: 'glass', tiles: [t('gl','gl'),  t('ass','as')] },
      { word: 'swim',  tiles: [t('sw','sw'),  t('im','im')] },
      { word: 'snow',  tiles: [t('sn','sn'),  t('ow','oh')] },
      { word: 'brush', tiles: [t('br','br'),  t('u','uh'),  t('sh','sh')] },
    ],
  },
  {
    level: 3,
    name: 'Two-Syllable',
    color: '#3b82f6',
    words: [
      { word: 'dragon',  tiles: [t('drag','drag'), t('on','un')] },
      { word: 'basket',  tiles: [t('bas','bass'),  t('ket','kit')] },
      { word: 'kitten',  tiles: [t('kit','kit'),   t('ten','ten')] },
      { word: 'rabbit',  tiles: [t('rab','rab'),   t('bit','bit')] },
      { word: 'sunset',  tiles: [t('sun','sun'),   t('set','set')] },
      { word: 'garden',  tiles: [t('gar','gar'),   t('den','den')] },
      { word: 'pencil',  tiles: [t('pen','pen'),   t('cil','sul')] },
      { word: 'monkey',  tiles: [t('mon','mun'),   t('key','kee')] },
      { word: 'happy',   tiles: [t('hap','hap'),   t('py','ee')] },
      { word: 'button',  tiles: [t('but','but'),   t('ton','tun')] },
    ],
  },
  {
    level: 4,
    name: 'Multi-Syllable',
    color: '#a855f7',
    words: [
      { word: 'umbrella',    tiles: [t('um','um'),     t('brel','brel'),   t('la','la')] },
      { word: 'fantastic',   tiles: [t('fan','fan'),   t('tas','tas'),     t('tic','tik')] },
      { word: 'September',   tiles: [t('sep','sep'),   t('tem','tem'),     t('ber','ber')] },
      { word: 'butterfly',   tiles: [t('but','but'),   t('ter','ter'),     t('fly','fly')] },
      { word: 'dinosaur',    tiles: [t('di','die'),    t('no','no'),       t('saur','sor')] },
      { word: 'alphabet',    tiles: [t('al','al'),     t('pha','fa'),      t('bet','bet')] },
      { word: 'elevator',    tiles: [t('el','el'),     t('e','uh'),        t('va','vay'),  t('tor','ter')] },
      { word: 'caterpillar', tiles: [t('cat','cat'),   t('er','er'),       t('pil','pil'), t('lar','ler')] },
      { word: 'strawberry',  tiles: [t('straw','straw'), t('ber','ber'),   t('ry','ee')] },
      { word: 'alligator',   tiles: [t('al','al'),     t('li','lee'),      t('ga','gay'),  t('tor','ter')] },
    ],
  },
]
