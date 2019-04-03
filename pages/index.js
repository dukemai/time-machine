import { useState } from 'react';
import moment from 'moment';
import Head from 'next/head';
import Week from '../components/Week';
import Column from '../components/Column';

import classnames from 'classnames';

import styles from '../style.css';

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
const isWorkingHour = day => START_WORKING <= day.hours() && day.hours() <= 17;
const countToWorkingHour = day => {
  if(isWorkingHour(day)) {
    return 0;
  }
  const part = getPartOfTheDay(day);
  if(part === 'morning') {
    return START_WORKING - day.hours();
  }
  return 24 - day.hours() + START_WORKING;
}

function Index() {
  moment.locale('sv');
  const currentLocaleData = moment.localeData();

  const [today, setToday] = useState(moment());
  if (typeof requestAnimationFrame === 'function') {
    requestAnimationFrame(() => {
      setToday(moment());
    });
  }
  return (
    <>
      <Head>
        <title>Time machine</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          href="https://fonts.googleapis.com/css?family=Press+Start+2P"
          rel="stylesheet"
        />
        <link
          href="https://unpkg.com/nes.css@latest/css/nes.min.css"
          rel="stylesheet"
        />
      </Head>
      <section
        style={{
          maxWidth: 980,
          margin: '0 auto',
          marginTop: 15,
        }}
        className="container"
      >
        <section className={classnames(styles.row, styles.columns2)}>
          <Column title="Week" value={today.week()} />
          <Column title="Total weeks" value={today.weeksInYear()} />
        </section>
        <section className={classnames(styles.row, styles.columns2)}>
          <Column title="Today" value={currentLocaleData.weekdays(today)} />
          <Column title="Date time" value={today.format('YYYY-MM-DD')} />
        </section>
        <section className={classnames(styles.row)}>
          <Column
            title="Now"
            renderContent={() => (
              <ul className="nes-list is-circle">
                <li>{today.format('HH:mm:ss')}</li>
                <li>{`Good ${getPartOfTheDay(today)}`}</li>
                <li>{isWorkingHour(today) ? 'Fight hard at work' : 'Time to resting'}</li>
                <li>{`${countToWorkingHour(today)} hours to start working`}</li>
              </ul>
            )}
          />
        </section>
      </section>
    </>
  );
}

export default Index;
