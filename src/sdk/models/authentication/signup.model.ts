export class SignupModel {
  public DisplayName = '';
  public Email = '';
  public Password = '';
  public File: File | null = null;

  constructor(data?: Partial<SignupModel>) {
    Object.assign(this, data);
  }
}
