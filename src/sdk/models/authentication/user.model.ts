export class UserModel {
  public UserId: string | null = null;
  public DisplayName: string | null = null;
  public Email: string | null = null;

  constructor(data?: Partial<UserModel>) {
    Object.assign(this, data);
  }
}
