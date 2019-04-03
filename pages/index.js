import { useState } from 'react';
import moment from 'moment';
import Head from 'next/head';
import Week from '../components/Week';
import Column from '../components/Column';

import classnames from 'classnames';

import styles from '../style.css';

function Index() {
  moment.locale('sv');
  const currentLocaleData = moment.localeData();

  const [today, setToday] = useState(moment());
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
      </section>
    </>
  );
}

export default Index;
