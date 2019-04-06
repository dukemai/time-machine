import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import moment from 'moment';

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
  moment.locale('sv');
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
        <Column title="Date time">
          {() => (
            <>
              <Badge label="Today" value={currentLocaleData.weekdays(today)} />
              <Badge label="Week" value={today.week()} />
              <Badge label="Weeks" value={today.weeksInYear()} />
              <Badge isSplited={false} value={today.format('YYYY-MM-DD')} />
            </>
          )}
        </Column>
      </section>
      <section className={classnames(styles.row)}>
        <Column title="Now">
          {() => (
            <ul className="nes-list is-circle">
              <li>{today.format('HH:mm:ss')}</li>
              <li>{`Good ${getPartOfTheDay(today)}`}</li>
              <li>
                {isWorkingHour(today)
                  ? 'Fight hard at work'
                  : 'Time to resting'}
              </li>
              <li>{`${countToWorkingHour(today)} hours to start working`}</li>
              <li>{`${countToEndWorkingDay(today)} hours to go home :)`}</li>
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
