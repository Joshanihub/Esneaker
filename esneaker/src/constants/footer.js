export const MARQUEE_TEXT = 'FREE SHIPPING OVER $100 · NEW DROPS EVERY FRIDAY · LIMITED STOCK · JOIN THE WAITLIST · '

export const SOCIAL_LINKS = [
  { name: 'Instagram', url: '#', icon: 'mdi-instagram' },
  { name: 'Twitter', url: '#', icon: 'mdi-twitter' },
  { name: 'TikTok', url: '#', icon: 'mdi-music-note' }
]

export const FOOTER_LINKS = {
  shop: [
    { name: 'All Products', path: '/shop', isRouter: true },
    { name: 'Running', path: '/shop?category=running', isRouter: true },
    { name: 'Lifestyle', path: '/shop?category=lifestyle', isRouter: true },
    { name: 'Training', path: '/shop?category=training', isRouter: true },
    { name: 'Limited Edition', path: '/shop?category=limited', isRouter: true },
    { name: 'Sale', path: '#', isRouter: false }
  ],
  help: [
    { name: 'FAQ', path: '#' },
    { name: 'Returns & Exchanges', path: '#' },
    { name: 'Shipping Info', path: '#' },
    { name: 'Size Guide', path: '#' },
    { name: 'Contact Us', path: '#' },
    { name: 'Careers', path: '#' }
  ],
  legal: [
    { name: 'Privacy Policy', path: '#' },
    { name: 'Terms of Service', path: '#' },
    { name: 'Cookie Policy', path: '#' }
  ]
}
