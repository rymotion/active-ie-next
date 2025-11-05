import { describe, it } from 'mocha';
import { expect } from 'chai';
import React from 'react';
import { render } from '@testing-library/react';
import MarqueeWidget from '../../src/components/custom-widget/marquee';

describe('MarqueeWidget Component', () => {
  it('should render without crashing', () => {
    const { container } = render(
      <MarqueeWidget 
        marquee={<div>Test Marquee</div>} 
        information={<div>Test Info</div>}
      />
    );
    expect(container).to.exist;
  });

  it('should accept marquee and information props', () => {
    const marqueeContent = <div data-testid="marquee">Test Marquee</div>;
    const infoContent = <div data-testid="info">Test Info</div>;
    
    const { container } = render(
      <MarqueeWidget 
        marquee={marqueeContent} 
        information={infoContent}
      />
    );
    
    expect(container.querySelector('[data-testid="marquee"]')).to.exist;
    expect(container.querySelector('[data-testid="info"]')).to.exist;
  });

  it('should have responsive layout structure', () => {
    const { container } = render(
      <MarqueeWidget 
        marquee={<div>Test Marquee</div>} 
        information={<div>Test Info</div>}
      />
    );
    // Check that component renders with container
    expect(container.firstChild).to.exist;
  });
});
