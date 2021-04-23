import User from '../user-service'

export default class AllUser extends User{
  constructor(
    first_name: string,
    last_name: string,
    id: number,
    avatar: string,
    created_at: string,
    private _transactions: number
  )
  {
    super(first_name, last_name, id, avatar, created_at)
  }
  get transactions () {
    return this._transactions
  }
}