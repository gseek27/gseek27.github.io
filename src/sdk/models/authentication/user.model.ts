export class UserModel {
  public UserId: string | null = null;
  public DisplayName: string | null = null;
  public Email: string | null = null;
<<<<<<< HEAD
  public PhotoUrl: string | null = null;
=======
>>>>>>> c0cca08596d4e7304c3e5c69f4a34a9188538bc3

  constructor(data?: Partial<UserModel>) {
    Object.assign(this, data);
  }
}
