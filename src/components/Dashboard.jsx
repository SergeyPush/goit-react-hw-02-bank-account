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

  calculateFunds = transactions => {
    const income = transactions.reduce(
      (sum, transaction) =>
        transaction.type === 'Deposit' ? sum + transaction.amount : sum,
      0,
    );
    const expenses = transactions.reduce(
      (sum, transaction) =>
        transaction.type === 'Withdrawal' ? sum + transaction.amount : sum,
      0,
    );

    return {
      income,
      expenses,
    };
  };

  onDeposit = amount => {
    if (amount <= 0) {
      this.notify('Введите сумму для проведения операции!');
      return;
    }
    this.setState(state => ({
      balance: state.balance + amount,
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
    }));

    this.addTransaction(amount, 'Withdrawal');
  };

  render() {
    const { transactions, balance } = this.state;
    const { income, expenses } = this.calculateFunds(transactions);

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
