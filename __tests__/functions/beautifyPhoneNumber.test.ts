import {beautifyPhoneNumber} from '@utils/phoneNumber';

describe('beautifyPhoneNumber', () => {
  it('should return the formatted phone number with US country code', () => {
    expect(beautifyPhoneNumber('1234567890', 'US')).toBe('+1 1234567890');
  });

  it('should return the formatted phone number with GB country code', () => {
    expect(beautifyPhoneNumber('3234567890', 'GB')).toBe('+44 0323 456 7890');
  });

  it('should return the formatted phone number even if its short with country code set', () => {
    expect(beautifyPhoneNumber('1234567', 'UA')).toBe('+380 1234567');
  });

  it('should return an empty string for an invalid phone number', () => {
    expect(() => beautifyPhoneNumber('invalid')).toThrowError();
  });

  it('should throw an error for phone number without a country code', () => {
    expect(() => beautifyPhoneNumber('0932223344')).toThrowError();
  });
});
