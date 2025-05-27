import React from 'react';
import NavigationBar from '../components/navbar.js';
import Footer from '../components/footer.js';
import PrivacyPolicyComponent from '../components/privacy-policy-component.js';


export default function PrivacyPolicy() {
    return (
        <>
            <NavigationBar/>
            <PrivacyPolicyComponent/>
            <Footer/>
        </>
    );
}