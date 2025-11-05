import { describe, it } from 'mocha';
import { expect } from 'chai';
import { locales, defaultLocale } from '../../src/i18n/config';

describe('i18n Configuration', () => {
  describe('locales', () => {
    it('should be an array', () => {
      expect(locales).to.be.an('array');
    });

    it('should contain en and es', () => {
      expect(locales).to.include('en');
      expect(locales).to.include('es');
    });

    it('should have exactly 2 locales', () => {
      expect(locales).to.have.lengthOf(2);
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
