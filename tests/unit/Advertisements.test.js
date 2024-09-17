/**
 * @jest-environment jsdom
*/
//! Jest Unit UI tests
import React from "react";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import Advertisement from "../../src/components/Advertisement";
import Advertisement2 from "../../src/components/Advertisement2";


test ('Advertisement1 content is renderd properly', () => {
    render(<Advertisement/>);
    const adElement = screen.getByText(/KV24/i);
    expect(adElement).toBeInTheDocument();
})

test ('Advertisement2 content is renderd properly', () => {
    render(<Advertisement2/>);
    const adElement = screen.getByText(/Tähebüroo/i);
    expect(adElement).toBeInTheDocument();
})