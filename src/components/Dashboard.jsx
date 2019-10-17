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
    const date = Date.now();

    const transaction = {
      id: shortid.generate(),
      date: new Date().toLocaleDateString('en-US'),
      type,
      amount,
    };

    this.setState(state => ({
      transactions: [...state.transactions, transaction],
    }));
  };

  onDeposit = amount => {
    this.setState(state => ({
      balance: state.balance + amount,
      income: state.income + amount,
    }));
    this.addTransaction(amount, 'Withdrawal');
  };

  onWithdraw = amount => {
    if (amount === 0) {
      this.notify('Введите сумму для проведения операции!');
      return;
    }
    if (this.state.balance - amount < 0) {
      this.notify('На счету недостаточно средств для проведения операции!');
      return;
    }
    this.setState(state => ({
      balance: state.balance + -amount,
      expenses: state.expenses + -amount,
    }));
  };

  render() {
    const { transactions, balance, income, expenses } = this.state;

    return (
      <div>
        <Controls onDeposit={this.onDeposit} onWithdraw={this.onWithdraw} />
        <Balance balance={balance} income={income} expenses={expenses} />
        <TransactionHistory transactions={transactions} />
        <ToastContainer autoClose={2000} transition={Slide} />
      </div>
    );
  }
}

export default Dashboard;
