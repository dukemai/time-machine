import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from '../style.css';

const propTypes = {};
const defaultProps = {};
const Badge = ({ label, value, isSplited = true }) => (
  <span
    className={classnames('nes-badge', styles['nes-badge'], {
      'is-splited': isSplited,
    })}
  >
    {label && <span className="is-dark">{label}</span>}

    <span className="is-primary">{value}</span>
  </span>
);
Badge.propTypes = propTypes;
Badge.defaultProps = defaultProps;
export default Badge;
