/**
 * Validation utilities for Nepal phone numbers and Gmail addresses.
 */

/**
 * Validates whether an email is a valid @gmail.com address.
 */
export function isValidGmail(email: string): boolean {
  if (!email) return false;
  const clean = email.trim().toLowerCase();
  // Standard RFC-compliant username before @gmail.com
  const gmailRegex = /^[a-zA-Z0-9](\.?[a-zA-Z0-9_-]+)*@gmail\.com$/;
  return gmailRegex.test(clean);
}

/**
 * Validates whether a phone number is a valid Nepal mobile number.
 * Supported formats:
 * - 98XXXXXXXX or 97XXXXXXXX (10 digits)
 * - +977 98XXXXXXXX, +977-98XXXXXXXX, +97798XXXXXXXX
 * - 97798XXXXXXXX, 098XXXXXXXX
 */
export function isValidNepalPhone(phone: string): boolean {
  if (!phone) return false;
  const clean = phone.replace(/[\s\-()]/g, '');
  // Matches +97798..., 97798..., 098..., or 98... / 97... followed by 8 digits (total 10 digits for local number)
  const nepalPhoneRegex = /^(?:\+?977|0)?(9[78]\d{8})$/;
  return nepalPhoneRegex.test(clean);
}

/**
 * Normalizes a Nepal phone number to a clean 10-digit format (e.g. 9801234567).
 */
export function normalizeNepalPhone(phone: string): string {
  if (!phone) return '';
  const clean = phone.replace(/[\s\-()]/g, '');
  const match = clean.match(/^(?:\+?977|0)?(9[78]\d{8})$/);
  return match ? match[1] : clean;
}
