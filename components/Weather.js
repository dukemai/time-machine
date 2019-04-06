import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ReactSVG from 'react-svg';
import moment from 'moment';

import styles from '../style.css';
import Badge from './Badge';
import Column from './Column';
import { setTimeoutAnimationFrame } from '../utils';

const propTypes = {};
const defaultProps = {};
const longAttitude = 17.819824;
const latAttitude = 59.455363;
const basePath =
  'https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2';

const getParameter = (arr, name) => {
  return arr.find(p => p.name === name);
};
const getTimeSeri = weatherData => weatherData.timeSeries[0];

const formatTimeSeri = timeSeri =>
  moment(timeSeri.validTime).format('HH:mm');

const getTemprature = timeSeri => {
  return getParameter(timeSeri.parameters, 't').values[0];
};

const findTimeSeries = weatherData =>
  weatherData.timeSeries.reduce((acc, curr) => {
    if (acc.length > 2) {
      return acc;
    }
    const timeSeri = moment(curr.validTime);
    const now = moment();
    if (timeSeri.hours() === now.hours() || timeSeri.diff(now) > 0) {
      acc.push(curr);
    }
    return acc;
  }, []);

const weatherMappings = {
  2: './static/clearsky-sun.svg',
  3: '/static/cloudiness-sun.svg',
  4: '/static/cloudy-sun.svg',
  6: '/static/over-cast.svg',
  16: '/static/snow-shower.svg',
};
const getWeatherSymbol = timeSeri => {
  const num = getParameter(timeSeri.parameters, 'Wsymb2')
    .values[0];
  return weatherMappings[num] || weatherMappings[2];
};

// refresh by hour
const START_DATE = moment();
const Weather = () => {
  const [hour, setHour] = useState(START_DATE.hours());
  setTimeoutAnimationFrame(() => setHour(moment().hours()), 1000 * 60 * 15);

  const [weatherData, setWeatherData] = useState();
  useEffect(() => {
    const data = fetch(
      `${basePath}/geotype/point/lon/${longAttitude}/lat/${latAttitude}/data.json`
    )
      .then(res => res.json())
      .then(res => setWeatherData(res));
  }, [hour]);
  return weatherData ? (
    <section className={classnames(styles.row, styles.columns3)}>
      {findTimeSeries(weatherData).map(timeSeri => (
        <Column
          title={formatTimeSeri(timeSeri)}
          className={styles.weatherCard}
          key={timeSeri.validTime}
        >
          {() => (
            <>
              <ReactSVG
                className={styles.icon__weather}
                src={getWeatherSymbol(timeSeri)}
              />
              <div className={styles.temperature}>
              <ReactSVG
                className={styles.icon__temp}
                src="./static/icon-temperature.svg"
              />
                {getTemprature(timeSeri)}
              </div>
            </>
          )}
        </Column>
      ))}
    </section>
  ) : null;
};
Weather.propTypes = propTypes;
Weather.defaultProps = defaultProps;
export default Weather;
