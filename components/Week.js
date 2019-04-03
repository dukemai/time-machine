import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classnames from 'classnames';

import styles from '../style.css';

const propTypes = {};
const defaultProps = {};
const Component = ({}) => {
    const today = moment();
    return (
  <section className={classnames('nes-container with-title', styles.column)}>
    <h3 className="title">Week number</h3>
    <div className="nes-text is-primary">{today.week()}</div>
  </section>
);}
Component.propTypes = propTypes;
Component.defaultProps = defaultProps;
export default Component;
