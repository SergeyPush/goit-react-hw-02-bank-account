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

  componentDidMount() {
    try {
      const transactions = localStorage.getItem('transactions');
      const parsedTransactions = JSON.parse(transactions);
      const { balance } = this.calculateFunds(parsedTransactions);
      this.setState({
        transactions: parsedTransactions,
        balance,
      });
    } catch (error) {
      // some text to prevent ESlint error
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { transactions } = this.state;
    if (prevState.transactions.lengt !== transactions.length) {
      localStorage.setItem('transactions', JSON.stringify(transactions));
    }
  }

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
    return transactions.reduce(
      (acc, transaction) => {
        const income =
          transaction.type === 'Deposit'
            ? acc.income + transaction.amount
            : acc.income;
        const expenses =
          transaction.type === 'Withdrawal'
            ? acc.expenses + transaction.amount
            : acc.expenses;
        const balance = income - expenses;

        return {
          ...acc,
          income,
          expenses,
          balance,
        };
      },
      { income: 0, expenses: 0, balance: 0 },
    );
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
