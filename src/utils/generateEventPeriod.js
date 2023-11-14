import { TIME } from '../constant/periodInfo.js';
import addLeadingZero from './addLeadingZero.js';

const generateEventPeriod = ({ start, end }) => {
  const [startYear, startMonth, startDay] = start.split('.');
  const [endYear, endMonth, endDay] = end.split('.');

  return {
    start: new Date(
      `${startYear}-${addLeadingZero(startMonth, 2)}-${addLeadingZero(
        startDay,
        2,
      )}${TIME.start}`,
    ),
    end: new Date(
      `${endYear}-${addLeadingZero(endMonth, 2)}-${addLeadingZero(endDay, 2)}${
        TIME.end
      }`,
    ),
  };
};

export default generateEventPeriod;
