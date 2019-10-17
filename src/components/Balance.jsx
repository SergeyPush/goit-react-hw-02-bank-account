import React from 'react';

import style from '../styles/Balance.module.css';

const Balance = ({ balance, income, expenses }) => {
  return (
    <section className={style.balance}>
      <i className={`material-icons ${style.arrow} ${style.up}`}>
        arrow_upward
      </i>
      <span className={style.item}>{income}$</span>
      <i className={`material-icons ${style.arrow} ${style.down}`}>
        arrow_downward
      </i>
      <span className={style.item}> {expenses}$</span>
      <span className={style.item}>Balance: {balance}$</span>
    </section>
  );
};

export default Balance;
