export function validateEmptyFields(fields: { [key: string]: string }) {
  for (const field in fields) {
    if (!fields[field] || fields[field].trim() === '') {
      return false;
    }
  }
  return true;
}