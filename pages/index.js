import React, { useState } from 'react';
import Head from 'next/head';
import moment from 'moment';

import Week from '../components/Week';
import Column from '../components/Column';
import Weather from '../components/Weather';
import Time from '../components/Time';
import pkgInfo from '../package.json';

import '../i18n';

import classnames from 'classnames';

import styles from '../style.css';

function Index() {
  moment.locale('sv');

  return (
    <>
      <Head>
        <title>Time machine</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Week number, vecka nummer, värder i Stockholm, veckor nummer, sness style vecka"
        />
        <meta property="og:title" content="Time app 8 bit style" />
        <meta
          property="og:description"
          content="An application gives information about week number, weather in Stockholm in a fun way"
        />
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
        <footer className={styles.footer}>
          <span>
            ©2019 {pkgInfo.name} version {pkgInfo.version} by{' '}
            {pkgInfo.author.name}
            <a href={pkgInfo.author.url}>
              <i className={classnames('nes-icon twitter', styles.twitterIcon)} />
            </a>
          </span>
        </footer>
      </section>
    </>
  );
}

export default Index;
