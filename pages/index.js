import { useState } from 'react';
import Head from 'next/head';
import moment from 'moment';

import Week from '../components/Week';
import Column from '../components/Column';
import Weather from '../components/Weather';
import Time from '../components/Time';
import "../i18n";

import classnames from 'classnames';

import styles from '../style.css';

function Index() {
  moment.locale('sv');

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
        <Time now={moment()} />
        <section className={classnames(styles.row)}>
          <Weather />
        </section>
      </section>
    </>
  );
}

export default Index;
