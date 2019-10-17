import React, { Component } from 'react';
import { ToastContainer, toast, Slide } from 'react-toastify';
import shortid from 'shortid';
import 'react-toastify/dist/ReactToastify.css';

import Controls from './Controls';
import Balance from './Balance';
import TransactionHistory from './TransactionHistory';

class Dashboard extends Component {
  state = {
    balance: 0,
    transactions: [],
    income: 0,
    expenses: 0,
  };

  notify = message => toast.error(message);

  addTransaction = (amount, type) => {
    const date = new Date().toLocaleString('en-GB');

    const transaction = {
      id: shortid.generate(),
      date,
      type,
      amount,
    };

    this.setState(state => ({
      transactions: [transaction, ...state.transactions],
    }));
  };

  onDeposit = amount => {
    if (amount <= 0) {
      this.notify('Введите сумму для проведения операции!');
      return;
    }
    this.setState(state => ({
      balance: state.balance + amount,
      income: state.income + amount,
    }));
    this.addTransaction(amount, 'Deposit');
  };

  onWithdraw = amount => {
    if (amount <= 0) {
      this.notify('Введите сумму для проведения операции!');
      return;
    }
    if (this.state.balance - amount < 0) {
      this.notify('На счету недостаточно средств для проведения операции!');
      return;
    }
    this.setState(state => ({
      balance: state.balance - amount,
      expenses: state.expenses + amount,
    }));

    this.addTransaction(amount, 'Withdrawal');
  };

  render() {
    const { transactions, balance, income, expenses } = this.state;

    return (
      <div>
        <Controls onDeposit={this.onDeposit} onWithdraw={this.onWithdraw} />
        {transactions.length > 0 && (
          <Balance balance={balance} income={income} expenses={expenses} />
        )}

        {transactions.length > 0 && (
          <TransactionHistory transactions={transactions} />
        )}

        <ToastContainer autoClose={2000} transition={Slide} />
      </div>
    );
  }
}

export default Dashboard;
