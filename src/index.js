import React from 'react';
import { createRoot } from 'react-dom/client';
import Advertisement from './components/Advertisement';
import Advertisement2 from './components/Advertisement2';

// Mount advertisements
document.addEventListener('DOMContentLoaded', () => {
    const adContainer = document.getElementById('ad-container');
    if (adContainer) {
        const adRoot = createRoot(adContainer);
        adRoot.render(<Advertisement />);
    }

    const adContainer2 = document.getElementById('ad-container2');
    if (adContainer2) {
        const adRoot2 = createRoot(adContainer2);
        adRoot2.render(<Advertisement2 />);
    }
});