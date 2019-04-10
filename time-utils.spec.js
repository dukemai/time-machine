import moment from 'moment';
import {
  getContextualMessage,
  getPartOfTheDay,
  isWeekend,
  isWorkingHour,
  getTextCountingToEndWorkingDay,
} from './time-utils';

moment.locale('sv');

const testData = {
  breakfast: moment('2019-04-09T06:00:00'),
  beforeWorking: moment('2019-04-09T08:00:00'),
  weekend: moment('2019-04-07T06:00:00'),
  weekday: moment('2019-04-08T06:00:00'),
  workingHour: moment('2019-04-08T09:00:00'),
  notWorkingHour: moment('2019-04-08T06:00:00'),
  nightTimeHour: moment('2019-04-08T19:00:00'),
  lunch: moment('2019-04-08T12:00:00'),
  afterlunch: moment('2019-04-08T14:00:00'),
  dinner: moment('2019-04-08T18:01:00'),
  sleep: moment('2019-04-08T21:00:00'),
  rest: moment('2019-04-08T20:00:00'),
  midnight: moment('2019-04-08T00:00:00'),
};

describe('Time utils', () => {
  test('isWeekend should be false', () => {
    expect(isWeekend(testData.weekday.weekday())).toBe(false);
  });
  test('isWeekend should be true', () => {
    expect(isWeekend(testData.weekend.weekday())).toBe(true);
  });
  test('isWorkingHour should be true', () => {
    expect(isWorkingHour(testData.workingHour.hours())).toBe(true);
  });
  test('isWorkingHour should be false', () => {
    expect(isWorkingHour(testData.notWorkingHour.hours())).toBe(false);
  });
  test('isWorkingHour should be false', () => {
    expect(isWorkingHour(testData.nightTimeHour.hours())).toBe(false);
  });
  test('countToEndWorkingDay should be 3h: 0m', () => {
    expect(getTextCountingToEndWorkingDay(testData.afterlunch.hours())).toBe('3h: 0m');
  });
  test('countToEndWorkingDay should be empty', () => {
    expect(getTextCountingToEndWorkingDay(testData.workingHour.hours())).toBe('');
  });
});

describe('Contextual messages', () => {
  test('contextual message should be breakfast', () => {
    expect(getContextualMessage(testData.breakfast.hours())).toBe('Time for breakfast');
  });
  test('contextual message should be countdown to work', () => {
    expect(getContextualMessage(testData.beforeWorking.hours())).toBe('1h: 0m to work');
  });
  test('contextual message should be lunch time', () => {
    expect(getContextualMessage(testData.lunch.hours())).toBe('Time for lunch');
  });
  test('contextual message should be Fight hard at work', () => {
    expect(getContextualMessage(testData.workingHour.hours())).toBe('Fight hard at work');
  });
  test('contextual message should be Dinner time', () => {
    expect(getContextualMessage(testData.dinner.hours())).toBe('Time for dinner');
  });
  test('contextual message should be Time for sleeping', () => {
    expect(getContextualMessage(testData.midnight.hours())).toBe('Time for sleep');
  });
  test('contextual message should be Time to rest', () => {
    expect(getContextualMessage(testData.rest.hours())).toBe('Time to rest');
  });
});
