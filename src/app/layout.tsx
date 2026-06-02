/**
 * Root Layout Component for IEEE RAS MUJ Website
 * 
 * This is the root layout component that wraps all pages in the application.
 * It defines:
 * 
 * - Global metadata and SEO configuration
 * - Font loading and optimization (Inter font family)
 * - Global CSS imports and styling
 * - HTML document structure and lang attributes
 * - Viewport and theme color configurations
 * - Open Graph and Twitter social media metadata
 * 
 * @author IEEE RAS MUJ Development Team
 * @version 2.0.0
 * @since 2024
 */

// Next.js font optimization for Google Fonts
import { Inter } from 'next/font/google'

// Global CSS styles
import './globals.css'

// Next.js metadata API for SEO and social sharing
import type { Metadata, Viewport } from 'next'

// ========================================
// FONT CONFIGURATION
// ========================================

/**
 * Inter Font Configuration
 * 
 * Loads the Inter font family from Google Fonts with optimizations:
 * - Latin subset for optimal loading performance
 * - Variable font weights for flexibility
 * - Display swap for better loading experience
 */
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

// ========================================
// SEO METADATA CONFIGURATION
// ========================================

/**
 * Application Metadata
 * 
 * Comprehensive SEO and social media configuration including:
 * - Primary title and description
 * - Keywords for search engine optimization
 * - Open Graph metadata for social sharing
 * - Twitter Card configuration
 * - Favicon and theme colors
 * - Base URL for absolute URL resolution
 */
export const metadata: Metadata = {
  // ========================================
  // BASE URL CONFIGURATION
  // ========================================
  
  /**
   * Base URL for resolving relative URLs in metadata
   * Required for proper Open Graph and Twitter image resolution
   */
  metadataBase: new URL('https://ieeeras-muj.org'),
  
  // ========================================
  // PRIMARY SEO METADATA
  // ========================================
  
  // Main page title - appears in browser tab and search results
  title: 'IEEE RAS MUJ | Robotics & Automation Society',
  
  // Meta description - appears in search engine results
  description: 'IEEE Robotics and Automation Society at Manipal University Jaipur. Advancing robotics and automation through research, innovation, and collaborative learning. Join us for workshops, hackathons, and cutting-edge projects.',
  
  // SEO keywords for search engine optimization
  keywords: [
    'IEEE RAS',
    'Robotics',
    'Automation',
    'Manipal University Jaipur',
    'MUJ',
    'IEEE',
    'Robotics Society',
    'Automation Society',
    'Engineering',
    'Technology',
    'Innovation',
    'Research',
    'Hackathon',
    'Pixel Palettes',
    'AI',
    'Machine Learning',
    'Artificial Intelligence',
    'Student Organization',
    'Technical Society'
  ],
  
  // Author information
  authors: [{ name: 'IEEE RAS MUJ Development Team' }],
  
  // Content creator
  creator: 'IEEE RAS MUJ',
  
  // Publisher information
  publisher: 'IEEE Robotics and Automation Society - Manipal University Jaipur',
  
  // Robots directive for search engines
  robots: {
    index: true,        // Allow indexing
    follow: true,       // Allow following links
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // ========================================
  // OPEN GRAPH METADATA (Facebook, LinkedIn, etc.)
  // ========================================
  
  openGraph: {
    // Content type
    type: 'website',
    
    // Canonical URL
    url: 'https://ieeeras-muj.org',
    
    // Site name
    siteName: 'IEEE RAS MUJ',
    
    // Page title for social sharing
    title: 'IEEE RAS MUJ | Robotics & Automation Society',
    
    // Description for social sharing
    description: 'IEEE Robotics and Automation Society at Manipal University Jaipur. Advancing robotics and automation through research, innovation, and collaborative learning.',
    
    // Social sharing image
    images: [
      {
        url: '/images/logos/IEEE-RAS-Banner.jpg',
        width: 1200,
        height: 630,
        alt: 'IEEE RAS MUJ Banner',
        type: 'image/jpeg',
      },
    ],
    
    // Locale information
    locale: 'en_US',
  },

  // ========================================
  // TWITTER CARD METADATA
  // ========================================
  
  twitter: {
    // Card type for optimal display
    card: 'summary_large_image',
    
    // Twitter handle (if available)
    // site: '@ieeeras_muj',
    // creator: '@ieeeras_muj',
    
    // Title for Twitter sharing
    title: 'IEEE RAS MUJ | Robotics & Automation Society',
    
    // Description for Twitter sharing
    description: 'IEEE Robotics and Automation Society at Manipal University Jaipur. Join us for robotics research, automation projects, and innovative hackathons.',
    
    // Twitter sharing image
    images: ['/images/logos/IEEE-RAS-Banner.jpg'],
  },

  // ========================================
  // ADDITIONAL METADATA
  // ========================================
  
  // Favicon configuration
  icons: {
    apple: '/images/logos/ieee-ras-logo.png',
  },
  
  // Verification for search engines (add when available)
  // verification: {
  //   google: 'your-google-verification-code',
  //   yandex: 'your-yandex-verification-code',
  //   yahoo: 'your-yahoo-verification-code',
  // },
  
  // Category for app stores
  category: 'education',
  
  // Classification
  classification: 'Educational Institution, Technology Organization',
  
  // Application name
  applicationName: 'IEEE RAS MUJ Website',
  
  // Referrer policy
  referrer: 'origin-when-cross-origin',
  
  // Manifest file for PWA (if implemented)
  // manifest: '/manifest.json',
}

// ========================================
// VIEWPORT CONFIGURATION
// ========================================

/**
 * Viewport Configuration
 * 
 * Defines viewport settings, theme colors, and color scheme preferences.
 * Separated from metadata as per Next.js 14+ requirements.
 * 
 * Features:
 * - Responsive viewport settings for mobile optimization
 * - Theme colors for mobile browsers and PWA
 * - Color scheme support for dark/light mode
 * - User scalability controls
 */
export const viewport: Viewport = {
  // Viewport meta tag configuration
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  
  // Theme color for mobile browsers and PWA
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  
  // Color scheme preference
  colorScheme: 'dark light',
}

// ========================================
// ROOT LAYOUT COMPONENT
// ========================================

/**
 * RootLayout Component
 * 
 * The root layout component that wraps all pages in the application.
 * Provides the basic HTML structure and applies global configurations.
 * 
 * @param children - The child components/pages to render
 * @returns JSX element representing the HTML document structure
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      className={inter.variable}
      suppressHydrationWarning={true}
    >
      {/* 
        HTML Head Section
        - Automatically populated by Next.js with metadata
        - Includes title, meta tags, Open Graph data, etc.
      */}
      <head>
        {/* Additional head elements can be added here if needed */}
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://script.google.com" />
        
        {/* Structured data for search engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "IEEE Robotics and Automation Society - Manipal University Jaipur",
              "alternateName": "IEEE RAS MUJ",
              "url": "https://ieeeras-muj.org",
              "logo": "https://ieeeras-muj.org/images/logos/ieee-ras-logo.png",
              "description": "IEEE Robotics and Automation Society at Manipal University Jaipur. Advancing robotics and automation through research, innovation, and collaborative learning.",
              "foundingDate": "2020",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Jaipur",
                "addressRegion": "Rajasthan",
                "addressCountry": "India"
              },
              "parentOrganization": {
                "@type": "Organization",
                "name": "IEEE Robotics and Automation Society",
                "url": "https://www.ieee-ras.org"
              },
              "memberOf": {
                "@type": "Organization",
                "name": "Institute of Electrical and Electronics Engineers",
                "url": "https://www.ieee.org"
              }
            })
          }}
        />
      </head>
      
      {/* 
        HTML Body Section
        - Contains the main application content
        - Applies Inter font family
        - Includes anti-aliasing for better text rendering
      */}
      <body
        className={`${inter.className} antialiased bg-black`}
        suppressHydrationWarning={true}
      >
        {/* 
          Main Application Content
          - All pages and components are rendered here
          - Wrapped by this root layout structure
        */}
          {children}
        
        {/* 
          Analytics Scripts
          - Add Google Analytics, Google Tag Manager, or other analytics here
          - Example: Google Analytics 4
        */}
        {/* 
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `}
        </Script>
        */}
      </body>
    </html>
  )
}
