export class SessionModel {
  public Id = '';
  public DisplayName = '';
  public Email = '';
<<<<<<< HEAD
  public PhotoUrl = '';
=======
>>>>>>> c0cca08596d4e7304c3e5c69f4a34a9188538bc3

  constructor(data?: Partial<SessionModel>) {
    Object.assign(this, data);
  }
}
