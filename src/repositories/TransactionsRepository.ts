import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance[];

  constructor() {
    this.transactions = [];
    this.balance = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const sumIncome = this.transactions.reduce((accumulator, element) => {
      return element.type === 'income'
        ? accumulator + element.value
        : accumulator + 0;
    }, 0);

    const sumOutcome = this.transactions.reduce((accumulator, element) => {
      return element.type === 'outcome'
        ? accumulator + element.value
        : accumulator + 0;
    }, 0);

    const balance = {
      income: sumIncome,
      outcome: sumOutcome,
      total: sumIncome - sumOutcome,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
