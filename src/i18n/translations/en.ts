import { legalEn } from './legal-en';

export const en = {
  dir: 'ltr' as 'ltr' | 'rtl',
  lang: 'en',

  navbar: {
    brandCycle: [
      { text: 'Smart Bonus', isQuestion: false },
      { text: 'Losing profits on purchases?', isQuestion: true },
      { text: 'Smart Bonus', isQuestion: false },
      { text: 'Tired of stock shortages?', isQuestion: true },
      { text: 'Smart Bonus', isQuestion: false },
      { text: 'Paying too much per item?', isQuestion: true },
    ],
    menu: {
      home: 'Home',
      partner: 'Our Backing',
      features: 'Features',
      howItWorks: 'How It Works',
    },
    cta: 'Join the Waitlist',
    langLabel: 'EN',
  },

  hero: {
    badge: 'Powered by Al Farouk Group',
    title: 'Your profits start from smarter purchasing decisions',
    subtitle: 'How much profit is your business losing every month from non-optimal buying? How many times did you overpay for an item? How many sales were lost due to a shortage? Smart Bonus helps you fix that — silently, automatically.',
    cta: 'Join the Waitlist',
    painPoints: [
      'How often did you discover a product was available at a better price?',
      'How many sales or patient delays happened from a key shortage?',
      'How much time is wasted daily contacting suppliers and comparing prices?',
      'How many profit opportunities were missed from unclear market visibility?',
    ],
    divider: 'These are not just operational challenges — they are profits quietly slipping away.',
    story: 'And this is where Smart Bonus begins.',
  },

  trust: {
    title: 'Backed by Al Farouk Group\'s Market Expertise',
    description: 'Smart Bonus is built on the operational and market expertise of Al Farouk Group — providing a strong foundation of trust, industry knowledge, and deep understanding of the healthcare supply chain.',
  },

  painSection: {
    profitTitle: 'Profits don\'t only grow from more sales',
    profitBody: 'They also start from smarter purchasing decisions. Every dinar you save on procurement is direct profit for your business. Every better purchase decision is a new step toward growth.',
    cta: 'Join the Waitlist',
    focusTitle: 'You focus on your clients. We help you buy smarter.',
    focusBody: 'While you manage your pharmacy, clinic, or healthcare facility — Smart Bonus works for you:',
    checkItems: [
      'Discover the best prices',
      'Compare suppliers automatically',
      'Access multiple suppliers from one place',
      'Reduce procurement costs',
      'Find alternatives during shortages',
      'Know availability before ordering',
      'Speed up purchasing decisions',
      'Improve profit margins',
      'Cut time and effort',
      'Reduce shortages and waste',
    ],
    closingLine: 'Because profits don\'t only come from selling more — but from buying the right way.',
  },

  features: {
    title: 'More Than a Price Comparison Platform',
    subtitle: 'Smart Bonus isn\'t just a tool to find the cheapest price. It\'s a platform that helps your business improve the entire procurement cycle — from identifying needs, to comparing options, to making the right decision.',
    items: [
      {
        title: 'Automatic Supplier Comparison',
        description: 'No more repeated calls or manual research. The platform compares prices and available quantities across trusted suppliers to help you make the best decision.',
      },
      {
        title: 'Best Price Discovery',
        description: 'Access the most competitive offers to reduce procurement costs and improve your bottom line.',
      },
      {
        title: 'Smart Alternative Suggestions',
        description: 'When an item is out of stock, the platform suggests suitable alternatives — helping you avoid lost sales or delayed service.',
      },
      {
        title: 'Faster Decisions',
        description: 'Instead of spending hours on traditional comparisons, make purchasing decisions in minutes.',
      },
      {
        title: 'Full Availability Transparency',
        description: 'Know in advance which items are available and which aren\'t — before you place your order. Fewer surprises, better planning.',
      },
      {
        title: 'Track Your Savings',
        description: 'With every purchase, Smart Bonus gives you a clear view of how much you saved and how your buying decisions impact your profitability.',
      },
    ],
    imagineTitle: 'Imagine every order working for your profits',
    allInOne: 'All of this in one place.',
    imagineItems: [
      { emoji: '💰', label: 'Better Prices' },
      { emoji: '📦', label: 'Fewer Shortages' },
      { emoji: '⚡', label: 'Faster Decisions' },
      { emoji: '📈', label: 'Higher Margins' },
      { emoji: '🤝', label: 'More Supplier Options' },
      { emoji: '🛒', label: 'Easier Procurement' },
      { emoji: '📊', label: 'Clearer Market Visibility' },
    ],
  },

  why: {
    title: 'Why Does Your Business Need Smart Bonus?',
    reasons: [
      'Because the time you spend comparing prices can be invested in serving customers and growing your business.',
      'Because recurring shortages don\'t just hurt sales — they hurt your customers\' trust.',
      'Because profitability doesn\'t only depend on what you sell — but on how you buy.',
    ],
    savingsTitle: 'How much could you save annually?',
    savingsBody: 'If your business spends thousands every month on procurement, small improvements in prices and purchasing decisions can make a massive difference over the year. Because smart saving isn\'t just cost-cutting — it\'s a direct investment in your business growth.',
    reframe: 'Maybe you don\'t need a new supplier. Maybe you don\'t need to raise your prices. Maybe you don\'t need more customers. You might just need a smarter way to manage your purchasing.',
  },

  howItWorks: {
    title: 'How It Works',
    subtitle: 'A seamless bridge between healthcare providers and suppliers.',
    steps: [
      {
        step: '01',
        title: 'Register Your Interest',
        description: 'Be among the first businesses to get early access to the platform.',
      },
      {
        step: '02',
        title: 'Enter Your Needs',
        description: 'Specify the items you need — and let the platform handle the search and comparison.',
      },
      {
        step: '03',
        title: 'Compare Options',
        description: 'Review prices, quantities, availability rates, and available alternatives.',
      },
      {
        step: '04',
        title: 'Make the Best Decision',
        description: 'Save time, reduce costs, and increase your business profitability.',
      },
    ],
  },

  waitlist: {
    title: 'Be One of the First to Join',
    subtitle: 'Register your interest today to get priority access and early setup for your business.',
    fields: {
      businessName: 'Healthcare Business Name',
      phone: 'Phone Number',
      city: 'City / Location',
      activity: 'Business Type',
    },
    activityOptions: ['Pharmacy', 'Clinic', 'Medical Center', 'Supplier'],
    button: 'Join the Waitlist',
    submitting: 'Submitting...',
    successTitle: 'You\'re on the list!',
    successBody: 'Thank you for your interest. We will contact you soon with early access details.',
    errorMsg: 'Something went wrong. Please try again.',
  },

  footer: {
    brand: 'Smart Bonus',
    tagline: 'Buy smarter... earn more.',
    poweredBy: 'Powered by',
    partner: 'Al Farouk Group',
    links: {
      features: 'Features',
      howItWorks: 'How It Works',
      waitlist: 'Waitlist',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      deleteAccount: 'Delete Account',
      contact: 'Contact',
    },
    copyright: `© ${new Date().getFullYear()} Smart Bonus. All rights reserved.`,
  },
  download: {
    title: 'Get Smart Bonus on your phone',
    subtitle: 'Download the app and start buying smarter, wherever you are.',
    googleAlt: 'Get it on Google Play',
    appStoreSoon: 'App Store — coming soon',
  },
  pages: {
    backHome: 'Back to home',
    lastUpdated: 'Last updated',
    contactUs: 'Contact us',
    email: 'Email',
    phone: 'Phone',
    address: 'Address',
    deleteCta: 'Delete your account or data',
    deleteCardBody: 'You can request deletion of your account, or only some of your data, at any time.',
  },
  privacy: {
    title: 'Privacy Policy',
    subtitle: 'How Smart Bonus collects, uses and protects your information.',
    contactTitle: 'Questions about privacy?',
  },
  terms: {
    title: 'Terms of Service',
    subtitle: 'The rules that govern the use of the Smart Bonus platform.',
  },
  deleteAccount: {
    title: 'Delete your Smart Bonus account',
    developer: 'Developer: Smart Bonus (Benghazi, Libya)',
    stepsTitle: 'How to request deletion',
    deletedTitle: 'What gets deleted',
    keptTitle: 'What is kept',
    timingTitle: 'Processing time',
    partialTitle: 'Delete only some of your data',
    formTitle: 'Account deletion request',
    formSubtitle: 'Fill in the form and we will contact you to verify ownership.',
    invalidMsg: 'Please fill in all required fields with valid information.',
    fields: {
      fullName: 'Full name',
      phone: 'Phone number',
      email: 'Registered email',
      details: 'Which data to delete, and any notes',
    },
    requestTypeLabel: 'What would you like to do?',
    requestTypes: {
      full: 'Delete my account and data',
      partial: 'Delete specific data only',
    },
    detailsRequired: 'Please describe which data you want to delete.',
    detailsHint: 'Required when deleting specific data only.',
    submit: 'Submit request',
    submitting: 'Submitting...',
    successTitle: 'Request received',
    successBody: 'Thank you. We will verify ownership and process your request within 30 days. A confirmation will be sent to your email.',
    errorMsg: 'Something went wrong. Please try again, or email us directly.',
    orEmail: 'Or email us at',
    emailCta: 'Email support',
  },
  contact: {
    title: 'Contact Smart Bonus',
    subtitle: 'We are here to help with your account, orders, offers and privacy questions.',
    emailTitle: 'Email support',
    phoneTitle: 'Call us',
    addressTitle: 'Our location',
    deleteTitle: 'Want to delete your account?',
    deleteBody: 'You can request deletion of your account and data from the account deletion page.',
    deleteCta: 'Go to account deletion',
  },
  legal: legalEn,
};

export type Translations = typeof en;
