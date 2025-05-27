import React from 'react';
import NavigationBar from '../components/navbar.js';
import Footer from '../components/footer.js';
import PrivacyPolicyComponent from '../components/privacy-policy-component.js';
import { Helmet } from 'react-helmet';


export default function PrivacyPolicy() {
    return (
        <>
            <Helmet>
              <title>Privacy Policy - Text Compare Tool</title>
              <meta name="description" content="Read our privacy policy to understand how we handle your data securely and privately." />
              <link rel="canonical" href="https://onlinetextcomparetool.netlify.app/privacy-policy" />
            </Helmet>
            <NavigationBar/>
            <PrivacyPolicyComponent/>
            <Footer/>
        </>
    );
}