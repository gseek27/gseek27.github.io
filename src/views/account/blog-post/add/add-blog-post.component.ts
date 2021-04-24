import VueWrapper from '@/components/core/Vue/vue.wrapper';
import { getTimestamp } from '@/globals';
import {
  BlogPostModel,
  CoreService,
  FirebaseService,
  LoaderService,
  Session
} from '@/sdk';
import { Component } from 'vue-property-decorator';

@Component
export default class AddBlogPostComponent extends VueWrapper {
  public PostData = new BlogPostModel();
  private FirebaseSrv = new FirebaseService();

  public async addBlogPost() {
    new LoaderService().showFullScreenLoader('Adding post...');
    try {
      const { Id } = new Session().SessionValue!;
      const post = { ...this.PostData } as Partial<BlogPostModel>;
      delete post.User;
      post.UserId = Id;
      post.Date = getTimestamp();

      await this.FirebaseSrv.Db.collection('/posts').add(post);

      this.$router.push({ name: 'Your Blog Posts' });
      new CoreService().showAlert('Post has been added successfully!');
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
