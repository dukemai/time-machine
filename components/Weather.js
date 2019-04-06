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

const getTemprature = weatherData => {
  return getParameter(getTimeSeri(weatherData).parameters, 't').values[0];
};
const weatherMappings = {
  2: './static/clearsky-sun.svg',
  3: '/static/cloudiness-sun.svg',
};
const getWeatherSymbol = weatherData => {
  const num = getParameter(getTimeSeri(weatherData).parameters, 'Wsymb2')
    .values[0];
  return weatherMappings[num] || weatherMappings[2];
};

// refresh by hour
const START_DATE = moment();
const Weather = () => {
  const [hour, setHour] = useState(START_DATE.hours());
  setTimeout(() => setHour(moment().hours()), 1000 * 60 * 15);
  const [weatherData, setWeatherData] = useState();
  useEffect(() => {
    const data = fetch(
      `${basePath}/geotype/point/lon/${longAttitude}/lat/${latAttitude}/data.json`
    )
      .then(res => res.json())
      .then(res => setWeatherData(res));
  }, [hour]);

  return weatherData ? (
    <section className={classnames(styles.row)}>
      <Column>
        {() => (
          <>
            <ReactSVG
              className={styles.icon__weather}
              src={getWeatherSymbol(weatherData)}
            />
            <div>{getTemprature(weatherData)}</div>
          </>
        )}
      </Column>
    </section>
  ) : null;
};
Weather.propTypes = propTypes;
Weather.defaultProps = defaultProps;
export default Weather;
