import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Privacy Policy</h1>

      <p className="mb-4">
        <strong>Effective Date: 2025-04-01</strong>
      </p>

      <p className="mb-6">
        Thank you for using our Text Compare Tool. Your privacy is important to us, and we are committed to protecting your personal information.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">1. Information We Collect</h2>
      <p className="mb-6">
        This tool does not collect, store, or transmit any personal or user-provided text data. All operations (such as comparing text) are performed locally in your browser.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">2. Use of Data</h2>
      <p className="mb-6">
        No data is stored or used beyond the current browser session. We do not analyze, save, or share the content you input.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">3. Cookies and Tracking</h2>
      <p className="mb-6">
        We do not use cookies for tracking or advertising. Basic analytics (e.g., page views) may be collected anonymously to help improve the tool.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">4. Third-Party Services</h2>
      <p className="mb-6">
        We do not integrate third-party scripts or services that track or collect user data from this tool.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">5. Data Security</h2>
      <p className="mb-6">
        As no data is sent to a server, your input remains entirely within your control. Always close your browser or clear text after use if you're handling sensitive content.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">6. Changes to This Policy</h2>
      <p className="mb-6">
        We may update this Privacy Policy occasionally. Changes will be posted on this page with an updated effective date.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">7. Contact Us</h2>
      <p className="mb-6">
        If you have any questions about this Privacy Policy, please contact us at:{' '}
        <a href="mailto:support@textcomparetool.com" className="text-blue-600 underline">
          gdkadawathage@gmail.com
        </a>
      </p>
    </div>
  );
};

export default PrivacyPolicy;
