export class LoginModel {
  public Email = '';
  public Password = '';

  constructor(data?: Partial<LoginModel>) {
    Object.assign(this, data);
  }
}
