import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import moment from 'moment';
import ReactSVG from 'react-svg';
import { useTranslation } from 'react-i18next';

import Column from './Column';
import Badge from './Badge';
import { setTimeoutAnimationFrame } from '../utils';
import {
  getContextualMessage,
  getPartOfTheDay,
  isWeekend,
  isWorkingHour,
} from '../time-utils';

import styles from '../style.css';

const propTypes = {};
const defaultProps = {};

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
              <Badge testId="Week" label={t('Week')} value={today.week()} />
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
                  today.hours()
                )} ${t('to go home')}`}</li>
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
