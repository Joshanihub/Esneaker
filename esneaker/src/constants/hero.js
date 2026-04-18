export const HERO_CONTENT = {
  collectionLabel: 'SS26 COLLECTION',
  headlines: [
    { text: 'BUILT', class: 'hero-line-muted' },
    { text: 'FOR THE', class: 'hero-line-primary' },
    { text: 'RELENTLESS', class: 'hero-line-accent' }
  ],
  subtext: 'Engineered for those who refuse to compromise. Every stride a statement, every step a revolution.',
  actions: [
    { text: 'SHOP NOW', path: '/shop', class: 'btn-primary' },
    { text: 'VIEW LOOKBOOK', path: '#', class: 'btn-secondary' }
  ],
  heroImage: {
    src: 'https://picsum.photos/seed/stridehaus-hero-sneaker/600/600',
    alt: 'STRIDEHAUS Hero Sneaker'
  },
  badge: {
    text: 'NEW DROP'
  },
  stats: [
    {
      animated: true,
      value: 12000,
      suffix: '+',
      label: 'Reviews',
      rating: '4.9'
    },
    {
      animated: false,
      label: 'Free Shipping'
    }
  ]
}

export const HERO_ANIMATION_CONFIG = {
  textLines: {
    yOffset: 60,
    duration: 1,
    ease: 'power4.out'
  },
  subtext: {
    yOffset: 30,
    duration: 0.8,
    ease: 'power3.out'
  },
  actions: {
    yOffset: 40,
    duration: 0.8,
    ease: 'power3.out',
    stagger: 0.1
  },
  image: {
    xOffset: 100,
    duration: 1.2,
    ease: 'power3.out'
  },
  badge: {
    scale: 0,
    rotation: -180,
    duration: 1,
    ease: 'back.out(1.7)'
  },
  stats: {
    yOffset: 30,
    duration: 0.6,
    ease: 'power2.out',
    stagger: 0.1
  },
  label: {
    yOffset: 20,
    duration: 0.6,
    ease: 'power2.out'
  }
}
