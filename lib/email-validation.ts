const personalEmailDomains = new Set([
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "ymail.com",
  "rocketmail.com",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "msn.com",
  "icloud.com",
  "me.com",
  "mac.com",
  "aol.com",
  "proton.me",
  "protonmail.com",
  "zoho.com",
  "yandex.com",
  "mail.com",
  "gmx.com",
  "rediffmail.com",
]);

export const iamCompanyEmailMessage =
  "IAM users must use a company email address. Personal emails like Gmail, Yahoo, and Outlook are not allowed.";

export function isPersonalEmail(email: string) {
  const domain = email.split("@").pop()?.trim().toLowerCase();
  return domain ? personalEmailDomains.has(domain) : false;
}
