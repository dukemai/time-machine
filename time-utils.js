import moment from 'moment';
import memoizeOne from 'memoize-one';

export const convertMilliSecondsIntoLegibleString = milliSecondsIn => {
  const secsIn = milliSecondsIn / 1000;
  const milliSecs = milliSecondsIn % 1000;

  const hours = Math.floor(secsIn / 3600),
    remainder = secsIn % 3600,
    minutes = Math.floor(remainder / 60),
    seconds = remainder % 60;

  return `${hours}h: ${minutes}m`;
};

export const getPartOfTheDay = hour => {
  if (hour < 12) {
    return 'morning';
  }
  if (hour < 18) {
    return 'afternoon';
  }

  if (hour < 21) {
    return 'evening';
  }

  return 'night';
};

export const suggestedSchedules = {
  '6-8': 'breakfast',
  '11-13': 'lunch',
  '18-19': 'dinner',
  '21-6': 'sleep',
};

export const START_WORKING = 9;
export const END_WORKING = 17;
export const isWeekend = memoizeOne(weekday => weekday === 5 || weekday === 6);
export const isWorkingHour = memoizeOne(
  hour => START_WORKING <= hour && hour <= 17
);

const isInRange = memoizeOne((hour, schedule) => {
  const matches = /(\d+)-(\d+)/.exec(schedule);
  const t1 = +matches[1];
  const t2 = +matches[2];
  const from = moment()
    .hours(t1)
    .minutes(0)
    .seconds(0);
  const to =
    t2 > t1
      ? moment()
          .hours(t2)
          .minutes(0)
          .seconds(0)
      : moment()
          .add(1, 'days')
          .hours(t2)
          .minutes(0)
          .seconds(0);
  return (
    moment()
      .hours(hour)
      .isBetween(from, to) ||
    moment()
      .add(1, 'days')
      .hours(hour)
      .isBetween(from, to)
  );
});
const findSchedule = hour => {
  return Object.keys(suggestedSchedules).find(s => isInRange(hour, s));
};

export const countToWorkingHour = hour => {
  if (isWorkingHour(hour)) {
    return 0;
  }
  const part = getPartOfTheDay(hour);
  if (part === 'morning') {
    return moment().hours(START_WORKING) - moment().hours(hour);
  }
  return 0;
};

export const getContextualMessage = memoizeOne(hour => {
  const schedule = findSchedule(hour);
  const part = getPartOfTheDay(hour);
  if (!schedule) {
    if (isWorkingHour(hour)) {
      return 'Fight hard at work';
    }
    if (part === 'morning') {
      return `${convertMilliSecondsIntoLegibleString(
        countToWorkingHour(hour)
      )} to work`;
    }
    return 'Time to rest';
  }

  switch (suggestedSchedules[schedule]) {
    case 'breakfast':
      return 'Time for breakfast';
    case 'lunch':
      return 'Time for lunch';
    case 'dinner':
      return 'Time for dinner';
    case 'sleep':
      return 'Time for sleep';
    default:
      return '';
  }
});

export const countToEndWorkingDay = hour => {
  if (!isWorkingHour(hour)) {
    return 0;
  }

  return moment().hours(END_WORKING) - moment().hours(hour);
};

export const getTextCountingToEndWorkingDay = hour => {
  const remaining = countToEndWorkingDay(hour);
  return 0 < remaining && remaining < 4 * 60 * 60 * 1000
    ? convertMilliSecondsIntoLegibleString(remaining)
    : '';
};
