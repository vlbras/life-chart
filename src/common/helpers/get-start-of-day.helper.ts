import { startOfDay } from 'date-fns';
import { fromZonedTime } from 'date-fns-tz';

import { berlinTimeZone } from './berlin-time-zone.const';

export function getStartOfDay(): Date {
  return startOfDay(fromZonedTime(new Date(), berlinTimeZone));
}
