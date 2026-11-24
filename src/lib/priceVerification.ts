import type { PharmaceuticalMedicine } from '../types';

export type PriceStatusState = 'verified' | 'reference';

export interface PriceStatus {
  state: PriceStatusState;
  label: string;
  detail: string;
  source?: string;
}

/**
 * A price may only be presented as an official MRP when the record carries
 * explicit verification evidence (an authoritative source plus the date it was
 * checked). Everything else is a catalog reference value and is labelled as
 * unverified, so a placeholder or estimate is never mistaken for a confirmed MRP.
 */
export function getPriceStatus(med: PharmaceuticalMedicine): PriceStatus {
  const record = med.priceVerification;
  if (record?.state === 'verified' && record.source && record.verifiedAt) {
    return {
      state: 'verified',
      label: 'Verified MRP',
      detail: `MRP confirmed against ${record.source} on ${record.verifiedAt}.`,
      source: record.source,
    };
  }

  return {
    state: 'reference',
    label: 'Reference price',
    detail:
      'Catalog reference value only. This amount has not been checked against a government or manufacturer price list, so it is not a verified MRP.',
  };
}

export function formatRupees(value: number | null | undefined): string {
  if (value === null || value === undefined) return '—';
  return `₹${Number.isInteger(value) ? value : value.toFixed(2)}`;
}
