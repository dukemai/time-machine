import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import moment from 'moment';
import ReactSVG from 'react-svg';
import { useTranslation } from 'react-i18next';
import memoizeOne from 'memoize-one';

import Column from './Column';
import Badge from './Badge';
import { setTimeoutAnimationFrame } from '../utils';

import styles from '../style.css';

const propTypes = {};
const defaultProps = {};

const getPartOfTheDay = hour => {
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

const suggestedSchedules = {
  '6-8': 'breakfast',
  '11-13': 'lunch',
  '18-19': 'dinner',
  '21-6': 'sleep',
};

const START_WORKING = 9;
const END_WORKING = 17;
const isWeekend = memoizeOne(weekday => weekday === 6 || weekday === 7);
const isWorkingHour = memoizeOne(hour => START_WORKING <= hour && hour <= 17);

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
  return moment().isBetween(from, to);
});
const findSchedule = hour => {
  return Object.keys(suggestedSchedules).find(s => isInRange(hour, s));
};

const countToWorkingHour = hour => {
  if (isWorkingHour(hour)) {
    return 0;
  }
  const part = getPartOfTheDay(hour);
  if (part === 'morning') {
    return moment().hours(START_WORKING) - moment().hours(hour);
  }
  return 0;
};

const getContextualMessage = memoizeOne(hour => {
  const schedule = findSchedule(hour);
  const part = getPartOfTheDay(hour);
  if (!schedule) {
    if (isWorkingHour(hour)) {
      return 'Fight hard at work';
    }
    if (part === 'morning') {
      return `${countToWorkingHour(hour)} countdown to work`;
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

const countToEndWorkingDay = hour => {
  if (!isWorkingHour(hour)) {
    return 0;
  }

  return END_WORKING - hour();
};

const manipulateTime = setToday =>
  setTimeoutAnimationFrame(() => {
    setToday(moment());
  }, 1000);

const Time = ({ title, value, children, now }) => {
  const currentLocaleData = moment.localeData();

  const [today, setToday] = useState(now);

  if (typeof requestAnimationFrame === 'function') {
    useEffect(() => {
      const anim = manipulateTime(setToday);
      return () => cancelAnimationFrame(anim);
    });
  }
  const { t } = useTranslation();
  return (
    <>
      <section className={classnames(styles.row)}>
        <Column title={`${t('Today')} ${currentLocaleData.weekdays(today)}`}>
          {() => (
            <>
              <Badge label={t('Week')} value={today.week()} />
              <Badge label={t('Weeks')} value={today.weeksInYear()} />
              <Badge isSplited={false} value={today.format('YYYY-MM-DD')} />
            </>
          )}
        </Column>
      </section>
      <section className={classnames(styles.row)}>
        <Column title={`${t('Now')} ${today.format('HH:mm:ss')}`}>
          {() => (
            <ul className="nes-list is-circle">
              <li className={styles.listItem}>
                
                <ReactSVG
                  className={styles.icon__temp}
                  src="./static/icon-smile.svg"
                />
                {t(`Good ${getPartOfTheDay(today.hours())}`)}
              </li>
              {!isWeekend(today.weekday()) && (
                <li className={styles.listItem}>
                  {!isWorkingHour(today.hours()) && (
                    <ReactSVG
                      src="./static/mug.svg"
                      className={styles.icon__temp}
                    />
                  )}
                  {t(getContextualMessage(today.hours()))}
                </li>
              )}
              {isWeekend(today.weekday()) && (
                <li className={styles.listItem}>
                  <ReactSVG
                    className={styles.icon__temp}
                    src="./static/icon-heart.svg"
                  />
                  {t('Good weekend')}!
                </li>
              )}
              
              {!isWeekend(today.weekday()) && isWorkingHour(today) && (
                <li className={styles.listItem}>{`${countToEndWorkingDay(
                  today
                )} hours to go home :)`}</li>
              )}
            </ul>
          )}
        </Column>
      </section>
    </>
  );
};
Time.propTypes = propTypes;
Time.defaultProps = defaultProps;
export default Time;
