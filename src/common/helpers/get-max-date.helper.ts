import { fromZonedTime } from 'date-fns-tz';

import { berlinTimeZone } from './berlin-time-zone.const';

export function getMaxDate(): Date {
  return fromZonedTime(new Date('2024-10-01T00:00:00'), berlinTimeZone);
}
