import { describe, it } from 'mocha';
import { expect } from 'chai';
import { locales, defaultLocale, localeNames, localeFlags } from '../../src/i18n/config';

describe('i18n Configuration', () => {
  describe('locales', () => {
    it('should be an array', () => {
      expect(locales).to.be.an('array');
    });

    it('should contain en, es, tl, and zh', () => {
      expect(locales).to.include('en');
      expect(locales).to.include('es');
      expect(locales).to.include('tl');
      expect(locales).to.include('zh');
    });

    it('should have exactly 4 locales', () => {
      expect(locales).to.have.lengthOf(4);
    });

    it('should have a name and flag for every locale', () => {
      for (const locale of locales) {
        expect(localeNames[locale]).to.be.a('string').that.is.not.empty;
        expect(localeFlags[locale]).to.be.a('string').that.is.not.empty;
      }
    });
  });

  describe('defaultLocale', () => {
    it('should be a string', () => {
      expect(defaultLocale).to.be.a('string');
    });

    it('should be en', () => {
      expect(defaultLocale).to.equal('en');
    });

    it('should be included in locales array', () => {
      expect(locales).to.include(defaultLocale);
    });
  });
});
