import React, { Component } from 'react';
import T from 'prop-types';

import style from '../styles/Controls.module.css';

class Controls extends Component {
  static propTypes = {
    onDeposit: T.func.isRequired,
    onWithdraw: T.func.isRequired,
  };

  state = {
    amount: '',
  };

  handleInputChange = e => {
    this.setState({
      amount: e.target.value,
    });
  };

  handleFormInput = e => {
    e.preventDefault();
  };

  handleDepositButton = () => {
    this.props.onDeposit(Number(this.state.amount));
    this.setState({ amount: '' });
  };

  handleWithdrawButton = () => {
    this.props.onWithdraw(Number(this.state.amount));
    this.setState({ amount: '' });
  };

  render() {
    const { amount } = this.state;

    return (
      <section className={style.controls}>
        <form action="" onSubmit={this.handleFormInput}>
          <input
            type="number"
            name="amount"
            min="0"
            className={style.input}
            value={amount}
            onChange={this.handleInputChange}
          />
          <button
            type="button"
            className={style.button}
            onClick={this.handleDepositButton}
          >
            Deposit
          </button>
          <button
            type="button"
            className={style.button}
            onClick={this.handleWithdrawButton}
          >
            Withdraw
          </button>
        </form>
      </section>
    );
  }
}

export default Controls;
