import { generateSalt, hash, verifyHash } from '../../../src/utils/crypto';

describe('crypto', () => {
  describe('generateSalt()', () => {
    it('should return 32 bytes hex string', () => {
      const salt = generateSalt();

      expect(salt).toHaveLength(64);
    });
  });

  describe('hash()', () => {
    it('should work', async () => {
      const passwordHash = await hash('password', 'salt');

      expect(passwordHash).toHaveLength(128);
    });
  });

  describe('verifyHash()', () => {
    it('should verify correct hash', async () => {
      const password = 'jimmy';
      const salt = generateSalt();
      const passwordHash = await hash(password, salt);

      expect(await verifyHash(passwordHash, password, salt)).toEqual(true);
    });

    it('should fail to verify incorrect hash', async () => {
      const password = 'jimmy';
      const salt = generateSalt();
      const passwordHash = await hash(password, salt);

      expect(await verifyHash(passwordHash, 'wrong password', salt)).toEqual(false);
    });
  });
});
