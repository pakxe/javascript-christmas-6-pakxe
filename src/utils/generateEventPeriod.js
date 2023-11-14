import { TIME } from '../constant/periodInfo.js';
import addLeadingZero from './addLeadingZero.js';

const createDateForObj = (dateStr) => {
  return dateStr.split('.').map((str) => addLeadingZero(str));
};

const generateEventPeriod = ({ start, end }) => {
  const [startYear, startMonth, startDay] = createDateForObj(start);
  const [endYear, endMonth, endDay] = createDateForObj(end);

  return {
    start: new Date(`${startYear}-${startMonth}-${startDay}${TIME.start}`),
    end: new Date(`${endYear}-${endMonth}-${endDay}${TIME.end}`),
  };
};

export default generateEventPeriod;
