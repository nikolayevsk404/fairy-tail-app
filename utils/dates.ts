export function parseDateValue(value?: string) {
  if (!value?.trim()) {
    return null;
  }

  const normalizedValue = value.trim();
  const brMatch = normalizedValue.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (brMatch) {
    const [, day, month, year] = brMatch;
    return Date.UTC(Number(year), Number(month) - 1, Number(day));
  }

  const isoMatch = normalizedValue.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (isoMatch) {
    const [, year, month, day] = isoMatch;
    return Date.UTC(Number(year), Number(month) - 1, Number(day));
  }

  const parsed = new Date(normalizedValue);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return Date.UTC(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
}

export function isSameOrAfterDate(value?: string, minimum?: string) {
  const valueTime = parseDateValue(value);
  const minimumTime = parseDateValue(minimum);

  if (valueTime === null || minimumTime === null) {
    return true;
  }

  return valueTime >= minimumTime;
}
