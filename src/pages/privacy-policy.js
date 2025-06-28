import React from 'react';
import NavigationBar from '../components/navbar.js';
import Footer from '../components/footer.js';
import PrivacyPolicyComponent from '../components/privacy-policy-component.js';
import { Helmet } from 'react-helmet';

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy – Free Online Text Compare Tool</title>
        <meta
          name="description"
          content="Learn how Free Online Text Compare Tool handles your data with complete privacy and security. No data is stored or shared."
        />
        <meta
          name="keywords"
          content="privacy policy, data privacy, text compare security, user data, online privacy"
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://freeonlinetextcomparetool.com/privacy-policy"
        />

        {/* Open Graph */}
        <meta property="og:title" content="Privacy Policy – Free Online Text Compare Tool" />
        <meta
          property="og:description"
          content="Understand how we protect your data on our free online text compare platform. We never store your input."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://freeonlinetextcomparetool.com/privacy-policy" />
        <meta
          property="og:image"
          content="https://freeonlinetextcomparetool.com/og-image.png"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Privacy Policy – Free Online Text Compare Tool" />
        <meta
          name="twitter:description"
          content="We value your privacy. Learn how we ensure your data is never stored or misused."
        />
        <meta
          name="twitter:image"
          content="https://freeonlinetextcomparetool.com/og-image.png"
        />

        {/* Structured Data */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Privacy Policy",
              "url": "https://freeonlinetextcomparetool.com/privacy-policy",
              "description": "Privacy policy of Free Online Text Compare Tool. We are committed to protecting user data and ensuring no text is ever stored or tracked."
            }
          `}
        </script>
      </Helmet>

      <NavigationBar />
      <PrivacyPolicyComponent />
      <Footer />
    </>
  );
}