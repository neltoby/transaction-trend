import { ITransaction } from '.'

export default class Transaction {
  private cleanArray: ITransaction[] = [];
  private _transactionCount: number;
  constructor(
    private transactionArray: ITransaction[],
    private _amount: number = 0,
    private _transactions: number = 0,
    private _icon_url: string[] = [],
  )
  {
    this._transactionCount = transactionArray.length;
    this.initiateSeperation();
  }

  get amount() {
    return this._amount;
  }

  get transactions () {
    return this._transactions;
  }

  get icon_url () {
    return this._icon_url;
  }

  get transactionCount () {
    return this._transactionCount;
  }

  initiateSeperation(): void {
    const newTransArray: ITransaction[] = this.transactionArray.map((item ) => {
      const { 
        icon_url,
        transactions,
        amount
      } = item;
      return {icon_url, transactions, amount}
    })
    this.cleanArray = newTransArray;
    this.seperateValues();
  }

  seperateValues(){
    const clone = this.cleanArray.slice();
    let transaction: number = 0;
    let icon_urls: string[] = [];
    let amounts: number = 0;
    clone.forEach((item) => {
      const { transactions, icon_url, amount } = item;
      transaction = transaction+transactions ;
      icon_urls = [...icon_urls, icon_url];
      amounts = amount + amounts;
    })
    this._transactions = transaction;
    this._amount = amounts;
    this._icon_url = icon_urls;
  }
}