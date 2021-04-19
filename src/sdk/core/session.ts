import { addDays } from 'date-fns';
import { BehaviorSubject } from 'rxjs';
import { SessionModel } from '../models';
import { CookieBrowser } from './cookie-browser';
import { singleton } from './singleton';

@singleton
export class Session {
  public Session = new BehaviorSubject<SessionModel | null>(null);

  private Cookie = new CookieBrowser();

  get SessionValue() {
    return this.Session.value;
  }

  constructor() {
    this.fetchCookies();
  }

  public fetchCookies() {
    this.Session.next({
      Id: this.load('Id'),
      DisplayName: this.load('DisplayName'),
      Email: this.load('Email')
    });
  }
  public save() {
    if (this.SessionValue) {
      for (const item of Object.entries(this.SessionValue)) {
        this.persist(item[0], item[1], addDays(new Date(), 1));
      }
      return true;
    }
    return false;
  }
  private load(Key: string): any {
    if (this.Cookie) {
      return this.Cookie.get(Key);
    }
  }
  public clear(): void {
    if (this.Session.value) {
      Object.keys(this.Session.value).forEach((key: string) =>
        this.Cookie.remove(key)
      );
    }
    this.Session.next(null);
  }
  private persist(key: string, value: any, expires: Date) {
    this.Cookie.set(
      key,
      typeof value === 'object' ? JSON.stringify(value) : value,
      { expires }
    );
  }
}
