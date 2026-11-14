export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface LegalDoc {
  updated: string;
  intro: string[];
  sections: LegalSection[];
}

export interface DeleteDoc {
  intro: string;
  steps: string[];
  deleted: string[];
  kept: string[];
  timing: string;
  partial: string;
}

export interface LegalContent {
  privacy: LegalDoc;
  terms: LegalDoc;
  deleteAccount: DeleteDoc;
}

export const legalEn: LegalContent = {
  privacy: {
    updated: '14 November 2026',
    intro: [
      'This Privacy Policy explains how Smart Bonus collects, uses, shares and protects personal information when you use the Smart Bonus mobile application (package com.smartbonus.app) and related websites.',
      'Smart Bonus is developed by Smart Bonus, based in Benghazi, Libya. It is a B2B intermediary platform that connects pharmacies, clinics and suppliers in Libya to order shortages, exchange products and move slow-moving stock.',
    ],
    sections: [
      {
        heading: 'Information we collect',
        bullets: [
          'Account information: full name, phone number, email address and business name.',
          'Location: only when you grant permission, and only to set delivery addresses. We do not show your live location to other users.',
          'Orders and transactions: order history, purchase history, offers and shipment status.',
          'Files you upload: product offer photos, licences and permits, and invoices.',
          'Device and technical information: basic device information and crash logs, used to keep the app stable and secure.',
        ],
      },
      {
        heading: 'How we use your information',
        bullets: [
          'To create and manage your account.',
          'To process orders, arrange delivery and show shipment status (received, on the way, delivered).',
          'To publish and manage offers, shortage requests and bonuses.',
          'To provide customer support.',
          'To prevent fraud, abuse and unauthorised use of the platform.',
        ],
        paragraphs: [
          'Bonuses are free extra goods on eligible invoices. They are not cash rewards.',
        ],
      },
      {
        heading: 'What we do not do',
        bullets: [
          'We do not sell your personal data.',
          'We do not show advertising. The app contains no ads.',
          'We do not share your data with advertisers or data brokers.',
        ],
      },
      {
        heading: 'Who we share information with',
        paragraphs: ['We share information only with:'],
        bullets: [
          'The other party in an order, to the extent needed to complete that order.',
          'The assigned delivery representative, who sees shipment status only. No live GPS tracking is shown to other users.',
          'Hosting and cloud providers that store and process data on our behalf under confidentiality obligations.',
          'Authorities, when required by law or by valid legal process.',
        ],
      },
      {
        heading: 'Security',
        paragraphs: [
          'Data is encrypted in transit using HTTPS/TLS. Access to personal data is limited to staff and service providers who need it to operate the platform.',
        ],
      },
      {
        heading: 'How long we keep data',
        paragraphs: [
          'We keep personal data while your account is active, and for as long as needed to meet legal and accounting obligations. Invoices and order records are kept for up to 5 years, after which they are deleted or anonymised.',
        ],
      },
      {
        heading: 'Your rights and account deletion',
        paragraphs: [
          'You may ask us to access, correct or delete your personal data, or to restrict certain processing. You can delete your account or only some of your data at any time, as described on the account deletion page.',
        ],
      },
      {
        heading: 'Eligibility and age',
        paragraphs: [
          'Smart Bonus is intended for licensed businesses and for adults aged 18 and over. We do not knowingly collect personal data from anyone under 18.',
        ],
      },
      {
        heading: 'Changes to this policy',
        paragraphs: [
          'We may update this policy from time to time. The latest version is always published on this page with its date. Material changes will be announced in the app or by other appropriate means.',
        ],
      },
    ],
  },
  terms: {
    updated: '14 November 2026',
    intro: [
      'These Terms of Service govern your use of the Smart Bonus platform, mobile application and websites. By creating an account or using the platform, you agree to these terms.',
    ],
    sections: [
      {
        heading: 'Who can use Smart Bonus',
        bullets: [
          'Licensed pharmacies, clinics, medical centres and suppliers, and other businesses operating legally in Libya.',
          'Users must be 18 years or older and authorised to act on behalf of their business.',
          'You must provide accurate registration information and keep it up to date.',
        ],
      },
      {
        heading: 'Our role as an intermediary',
        paragraphs: [
          'Smart Bonus is an intermediary platform. We connect buyers and suppliers. We are not the seller, manufacturer or distributor of any product. Transactions take place between the parties, and each party is responsible for its own obligations.',
        ],
      },
      {
        heading: 'Your responsibilities',
        paragraphs: [
          'You are responsible for the accuracy and legality of every offer, product, price, quantity, expiry date, licence and permit that you post or upload. You must hold all licences required by law to trade in the products you offer.',
        ],
      },
      {
        heading: 'Prohibited content and conduct',
        bullets: [
          'Fake, expired, illegal, counterfeit or unregistered medicines or medical products.',
          'Misleading information about products, prices, availability or your identity.',
          'Offensive, abusive, discriminatory or unlawful content.',
          'Spam, scams, or attempts to manipulate prices, bonuses or ratings.',
          'Attempts to access accounts or data that do not belong to you, or to interfere with the platform.',
        ],
      },
      {
        heading: 'Reporting',
        paragraphs: [
          'You can report an offer, product or user through the app or by contacting support. We review reports and may act on them.',
        ],
      },
      {
        heading: 'Enforcement',
        paragraphs: [
          'We may remove content, suspend or permanently ban accounts, and cooperate with the authorities if we believe these terms or the law have been breached.',
        ],
      },
      {
        heading: 'Bonuses',
        paragraphs: [
          'Bonuses are free extra goods provided on eligible invoices according to the terms of each offer. Bonuses are not cash, have no cash value and cannot be exchanged for money.',
        ],
      },
      {
        heading: 'Delivery and shipment status',
        paragraphs: [
          'Shipment status (received, on the way, or delivered with a confirmation code) is provided to help you follow your orders. Delivery times are estimates and depend on the supplier, the delivery representative and circumstances beyond our control.',
        ],
      },
      {
        heading: 'Limitation of liability',
        paragraphs: [
          'To the maximum extent permitted by law, Smart Bonus is not liable for losses arising from the conduct of users, the quality, safety or legality of products, delivery delays, or the inability to use the platform. Nothing in these terms limits any liability that cannot be limited under applicable law.',
        ],
      },
      {
        heading: 'Changes to these terms',
        paragraphs: [
          'We may update these terms. The updated version is published on this page with a new date. Continued use of the platform after changes take effect means you accept them.',
        ],
      },
      {
        heading: 'Governing law',
        paragraphs: [
          'These terms are governed by the laws of Libya. Disputes fall under the jurisdiction of the competent courts of Benghazi, Libya.',
        ],
      },
    ],
  },
  deleteAccount: {
    intro: 'You can request deletion of your Smart Bonus account and personal data at any time.',
    steps: [
      'Fill in the form below, or email support from the email address registered on your account.',
      'We verify that you own the account by contacting you by phone or email.',
      'We process your request within 30 days and confirm by email.',
    ],
    deleted: [
      'Your account and profile (name, business details and login information).',
      'Photos and files you uploaded, including product offer photos, licences and invoices.',
      'Location data and saved delivery addresses.',
    ],
    kept: [
      'Invoices and order records are kept for up to 5 years for accounting and legal reasons, then deleted.',
      'Anonymised data, which can no longer identify you, may remain for statistical purposes.',
    ],
    timing: 'We process every request within 30 days.',
    partial: 'You can also delete only specific data (for example uploaded files, saved addresses or location data) without deleting your account. Describe what you want removed in the notes field of the form.',
  },
};
