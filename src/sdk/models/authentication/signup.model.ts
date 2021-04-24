export class SignupModel {
  public DisplayName = '';
  public Email = '';
  public Password = '';
<<<<<<< HEAD
  public File: File | null = null;
=======
>>>>>>> c0cca08596d4e7304c3e5c69f4a34a9188538bc3

  constructor(data?: Partial<SignupModel>) {
    Object.assign(this, data);
  }
}
