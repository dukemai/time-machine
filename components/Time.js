import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import moment from 'moment';
import ReactSVG from 'react-svg';

import Column from './Column';
import Badge from './Badge';

import styles from '../style.css';

const propTypes = {};
const defaultProps = {};

const getPartOfTheDay = day => {
  const hour = day.hours();
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

const START_WORKING = 9;
const END_WORKING = 17;
const isWeekend = day => day.weekday() === 6 || day.weekday() === 7;
const isWorkingHour = day => START_WORKING <= day.hours() && day.hours() <= 17;

const countToWorkingHour = day => {
  if (isWorkingHour(day)) {
    return 0;
  }
  const part = getPartOfTheDay(day);
  if (part === 'morning') {
    return START_WORKING - day.hours();
  }
  return 24 - day.hours() + START_WORKING;
};

const countToEndWorkingDay = day => {
  if (!isWorkingHour(day)) {
    return 0;
  }

  return END_WORKING - day.hours();
};

const manipulateTime = setToday =>
  requestAnimationFrame(() => {
    setToday(moment());
    manipulateTime(setToday);
  });

const Time = ({ title, value, children, now }) => {
  const currentLocaleData = moment.localeData();

  const [today, setToday] = useState(now);

  if (typeof requestAnimationFrame === 'function') {
    useEffect(() => {
      const anim = manipulateTime(setToday);
      return () => cancelAnimationFrame(anim);
    });
  }

  return (
    <>
      <section className={classnames(styles.row)}>
        <Column title={`I dag ${currentLocaleData.weekdays(today)}`}>
          {() => (
            <>
              <Badge label="Week" value={today.week()} />
              <Badge label="Weeks" value={today.weeksInYear()} />
              <Badge isSplited={false} value={today.format('YYYY-MM-DD')} />
            </>
          )}
        </Column>
      </section>
      <section className={classnames(styles.row)}>
        <Column title={`Nu ${today.format('HH:mm:ss')}`}>
          {() => (
            <ul className="nes-list is-circle">
              <li className={styles.listItem}>{`Good ${getPartOfTheDay(
                today
              )}`}</li>
              {!isWeekend(today) && (
                <li>
                  {isWorkingHour(today)
                    ? 'Fight hard at work'
                    : 'Time to resting'}
                </li>
              )}
              {isWeekend(today) && (
                <li className={styles.listItem}>
                  <ReactSVG
                    className={styles.icon__temp}
                    src="./static/icon-heart.svg"
                  />
                  Trevlig helg!
                </li>
              )}
              {!isWeekend(today) && !isWorkingHour(today) && (
                <li className={styles.listItem}>{`${countToWorkingHour(
                  today
                )} hours to start working`}</li>
              )}
              {!isWeekend(today) && isWorkingHour(today) && (
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
