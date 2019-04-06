import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from '../style.css';

const propTypes = {};
const defaultProps = {};
const Component = ({ title, value, children, className }) => {
  return (
    <section className={classnames('nes-container with-title', styles.column, className)}>
      {title && <h3 className="title">{title}</h3>}
      <div className="nes-text is-primary">
        {typeof children === 'function' ? children() : value}
      </div>
    </section>
  );
};
Component.propTypes = propTypes;
Component.defaultProps = defaultProps;
export default Component;
