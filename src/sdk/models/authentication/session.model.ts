export class SessionModel {
  public Id = '';
  public DisplayName = '';
  public Email = '';

  constructor(data?: Partial<SessionModel>) {
    Object.assign(this, data);
  }
}
