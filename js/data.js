/* =============================================================
   data.js — Menu Data & App Constants
   Mentai Yammy © 2025
   ============================================================= */

'use strict';

/**
 * @typedef {Object} MenuItem
 * @property {number}  id
 * @property {string}  name
 * @property {string}  emoji
 * @property {string}  cat       - 'dimsum' | 'mentai' | 'wonton' | 'minuman'
 * @property {number}  price     - in IDR
 * @property {string}  desc      - short description
 * @property {string}  detail    - long description for detail page
 * @property {string}  rating
 * @property {string}  cal       - calorie info
 * @property {string}  portion
 * @property {boolean} popular
 * @property {boolean} [isNew]
 */

/** @type {MenuItem[]} */
const MENU_DATA = [
  {
    id: 1,
    name: 'Dimsum Ayam Jumbo',
    emoji: '🥟',
    cat: 'dimsum',
    price: 18000,
    desc: 'Dimsum lembut berisi ayam cincang pilihan dengan bumbu rahasia.',
    detail: 'Dimsum lembut berisi ayam cincang pilihan dengan bumbu rahasia, dikukus sempurna hingga matang. Tekstur kulit tipis kenyal dengan isian yang padat dan gurih. Cocok dinikmati bersama saus sambal khas Mentai Yammy.',
    rating: '4.9',
    cal: '210 kkal',
    portion: '4 pcs',
    popular: true,
  },
  {
    id: 2,
    name: 'Mentai Dimsum',
    emoji: '🧀',
    cat: 'mentai',
    price: 22000,
    desc: 'Dimsum premium dengan topping saus mentai spesial dipanggang keemasan.',
    detail: 'Dimsum premium dengan topping saus mentai spesial yang dipanggang hingga berwarna keemasan. Perpaduan gurih saus mentai dengan dimsum yang lembut, dijamin ketagihan! Saus mentai dibuat dari bahan pilihan untuk hasil terbaik.',
    rating: '5.0',
    cal: '280 kkal',
    portion: '4 pcs',
    popular: true,
  },
  {
    id: 3,
    name: 'Wonton Kuah',
    emoji: '🍜',
    cat: 'wonton',
    price: 20000,
    desc: 'Wonton lezat dalam kuah kaldu bening segar, disajikan hangat.',
    detail: 'Wonton lezat berisi udang dan ayam dalam kuah kaldu bening yang segar. Disajikan dengan daun bawang dan minyak wijen harum. Comfort food terbaik yang cocok di segala suasana!',
    rating: '4.8',
    cal: '195 kkal',
    portion: '6 pcs',
    popular: false,
  },
  {
    id: 4,
    name: 'Dimsum Udang',
    emoji: '🦐',
    cat: 'dimsum',
    price: 20000,
    desc: 'Dimsum segar berisi udang pilihan, kenyal dan gurih alami.',
    detail: 'Dimsum segar berisi udang segar pilihan yang kenyal dan gurih. Dibalut kulit dimsum tipis transparan khas resto premium. Best seller kami yang wajib kamu coba!',
    rating: '4.9',
    cal: '175 kkal',
    portion: '4 pcs',
    popular: true,
  },
  {
    id: 5,
    name: 'Mentai Wonton Goreng',
    emoji: '🔥',
    cat: 'mentai',
    price: 25000,
    desc: 'Wonton goreng crispy dengan topping saus mentai pedas manis.',
    detail: 'Wonton goreng crispy dengan topping saus mentai pedas manis yang menggoda. Tekstur luar renyah dalam lembut, disiram mentai sauce yang kaya rasa. Menu terbaru favorit pelanggan setia!',
    rating: '4.8',
    cal: '320 kkal',
    portion: '6 pcs',
    popular: false,
    isNew: true,
  },
  {
    id: 6,
    name: 'Hakao Udang',
    emoji: '🩵',
    cat: 'dimsum',
    price: 22000,
    desc: 'Hakao klasik kulit transparan berisi udang segar pilihan.',
    detail: 'Hakao klasik berisi udang segar dengan kulit dimsum tipis semi-transparan. Dimasak dengan teknik kukus tradisional yang menjaga cita rasa asli seafood. Sajian autentik dimsum khas restoran bintang lima.',
    rating: '4.7',
    cal: '160 kkal',
    portion: '4 pcs',
    popular: false,
  },
  {
    id: 7,
    name: 'Wonton Goreng',
    emoji: '🥡',
    cat: 'wonton',
    price: 18000,
    desc: 'Wonton goreng crispy renyah isian ayam dan sayuran pilihan.',
    detail: 'Wonton goreng crispy renyah dengan isian ayam dan sayuran pilihan. Cocok jadi camilan atau pendamping makan. Gak bisa berhenti ngemil! Tersedia saus celup sambal dan saus tiram.',
    rating: '4.8',
    cal: '240 kkal',
    portion: '8 pcs',
    popular: false,
  },
  {
    id: 8,
    name: 'Thai Tea Mentai',
    emoji: '🧋',
    cat: 'minuman',
    price: 15000,
    desc: 'Thai tea creamy dengan sentuhan saus mentai spesial yang unik.',
    detail: 'Thai tea creamy dengan sentuhan saus mentai spesial yang unik. Minuman signature Mentai Yammy yang bikin penasaran dan nagih! Perpaduan manis thai tea dan gurih mentai yang tak terduga tapi memukau.',
    rating: '4.6',
    cal: '180 kkal',
    portion: '1 gelas',
    popular: false,
    isNew: true,
  },
];

/** E-Wallet options */
const EWALLET_DATA = [
  { id: 'gopay',    name: 'GoPay',      icon: '🟢' },
  { id: 'ovo',      name: 'OVO',        icon: '🟣' },
  { id: 'dana',     name: 'DANA',       icon: '🔵' },
  { id: 'shopee',   name: 'ShopeePay',  icon: '🟠' },
];

/** Category filter map */
const CAT_MAP = {
  '🥟 Dimsum':  'dimsum',
  '🧀 Mentai':  'mentai',
  '🍜 Wonton':  'wonton',
  '🧋 Minuman': 'minuman',
};
