export class SessionModel {
  public Id = '';
  public DisplayName = '';
  public Email = '';
  public PhotoUrl = '';

  constructor(data?: Partial<SessionModel>) {
    Object.assign(this, data);
  }
}
