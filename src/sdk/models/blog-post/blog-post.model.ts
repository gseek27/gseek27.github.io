import firebase from 'firebase/app';
import { UserModel } from '../authentication/user.model';

export class BlogPostModel {
  public Id = '';
  public Title = '';
  public PostBody = '';
  public Date!: firebase.firestore.Timestamp;
  public UserId = '';
  public User = new UserModel();

  constructor(data?: Partial<BlogPostModel>) {
    Object.assign(this, data);
  }
}
