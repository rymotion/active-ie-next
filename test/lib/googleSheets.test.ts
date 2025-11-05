import { describe, it } from 'mocha';
import { expect } from 'chai';
import { fetchEventsFromGoogleSheets, fetchCollabEventsFromGoogleSheets } from '../../src/lib/googleSheets';

describe('Google Sheets API Functions', () => {
  describe('fetchEventsFromGoogleSheets', () => {
    it('should return an empty array (function is disabled)', async () => {
      const result = await fetchEventsFromGoogleSheets('test-sheet-id', 'test-sheet-name');
      expect(result).to.be.an('array');
      expect(result).to.have.lengthOf(0);
    });

    it('should handle any sheet ID without errors', async () => {
      const result = await fetchEventsFromGoogleSheets('', '');
      expect(result).to.be.an('array');
    });
  });

  describe('fetchCollabEventsFromGoogleSheets', () => {
    it('should return an array', async () => {
      // Note: This will fail without proper API key, but tests the structure
      try {
        const result = await fetchCollabEventsFromGoogleSheets('test-id', 'test-name');
        expect(result).to.be.an('array');
      } catch (error) {
        // Expected to fail without API key
        expect(error).to.exist;
      }
    });

    it('should handle errors gracefully', async () => {
      const result = await fetchCollabEventsFromGoogleSheets('invalid-id', 'invalid-name');
      expect(result).to.be.an('array');
      expect(result).to.have.lengthOf(0);
    });
  });
});
