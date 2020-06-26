import React from 'react';

import styles from './LightBulb.module.scss';

/**
 * Light bulb design
 * Credits to https://codepen.io/networkedevolution/pen/yZqRrR
 * Inspired by https://codepen.io/twogrey/pen/Wbzbox
 * @param {*} param0
 */
const LightBulb = ({ char, lightenUp, height }) => {
  if (!char) {
    return null;
  }

  const classes = [styles.Bulb];
  if (lightenUp) {
    classes.push(styles.lightened);
  }

  const cordHeight = { height: `${height}px` };

  const container = (
    <div className={styles.Container}>
      <div className={styles.LightBulb}>
        <div className={styles.BulbCord} style={cordHeight}></div>
        <div data-testid="display-letter" className={classes.join(' ')}>
          {char.toUpperCase()}
          <div className={styles.BulbBase} />
        </div>
      </div>
    </div>
  );

  return container;
};

export default LightBulb;
