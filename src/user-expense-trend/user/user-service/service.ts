export default class User {
  private _name: string;
   
  constructor(
    private first_name:string,
    private last_name: string,
    private _id: number,
    private _avatar: string,
    private _created_at: string,
    ){
    this._name = `${first_name} ${last_name}`;
  }

  get name () {
    return this._name;
  }

  get id () {
    return this._id;
  }

  get avatar () {
    return this._avatar;
  }

  get created_at () {
    return this._created_at;
  }

}