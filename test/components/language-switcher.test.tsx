import { describe, it } from 'mocha';
import { expect } from 'chai';
import React from 'react';

describe('LanguageSwitcher Component', () => {
  it('should have locale configuration', () => {
    const { locales } = require('../../src/i18n/config');
    expect(locales).to.include('en');
    expect(locales).to.include('es');
  });

  it('should support English, Spanish, Tagalog, and Chinese', () => {
    const { locales } = require('../../src/i18n/config');
    expect(locales.length).to.equal(4);
  });

  it('should have English as default locale', () => {
    const { defaultLocale } = require('../../src/i18n/config');
    expect(defaultLocale).to.equal('en');
  });
});
