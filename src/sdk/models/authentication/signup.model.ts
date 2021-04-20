export class SignupModel {
  public DisplayName = '';
  public Email = '';
  public Password = '';

  constructor(data?: Partial<SignupModel>) {
    Object.assign(this, data);
  }
}
