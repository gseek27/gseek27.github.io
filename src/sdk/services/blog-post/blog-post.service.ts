import { singleton } from '@/sdk/core';
import { BlogPostModel } from '@/sdk/models';
import { BehaviorSubject } from 'rxjs';
import { FirebaseService } from '../firebase/firebase.service';
import { CoreService } from '../shared/core.service';
import { LoaderService } from '../shared/loader.service';

@singleton
export class BlogPostService {
  public BlogPosts = new BehaviorSubject<Array<BlogPostModel>>([]);
  public BlogPost = new BehaviorSubject(new BlogPostModel());
  private FirebaseSrv = new FirebaseService();

  public async getBlogPosts(userId?: string) {
    new LoaderService().showFullScreenLoader('Loading posts...');

    try {
      const postsRef = this.FirebaseSrv.Db.collection('/posts');
      const posts: Array<BlogPostModel> = [];
      (
        await (userId ? postsRef.where('UserId', '==', userId) : postsRef).get()
      ).docs.forEach(async snapshot => {
        if (snapshot.exists) {
          const post = new BlogPostModel(snapshot.data());
          post.Id = snapshot.id;
          const userSnap = await this.FirebaseSrv.Db.collection('users')
            .doc(post.UserId)
            .get();
          if (userSnap.exists) {
            post.User = userSnap.data() as any;
          }
          posts.push(post);
        }
      });
      this.BlogPosts.next(posts);
    } catch (err) {
      new CoreService().showAlert(
        this.FirebaseSrv.getErrorMessage(err),
        'error'
      );
    } finally {
      new LoaderService().hideFullScreenLoader();
    }
  }

  public async getBlogPost(id: string) {
    new LoaderService().showFullScreenLoader('Loading post...', true, true);

    try {
      const postSnap = await this.FirebaseSrv.Db.collection('posts')
        .doc(id)
        .get();
      if (postSnap.exists) {
        const post = new BlogPostModel(postSnap.data());
        post.Id = postSnap.id;
        const userSnap = await this.FirebaseSrv.Db.collection('users')
          .doc(post.UserId)
          .get();
        if (userSnap.exists) {
          post.User = userSnap.data() as any;
        }

        this.BlogPost.next(post);
      }
    } catch (err) {
      new CoreService().showAlert(
        this.FirebaseSrv.getErrorMessage(err),
        'error'
      );
    } finally {
      new LoaderService().hideFullScreenLoader();
    }
  }
}
