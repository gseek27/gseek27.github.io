import VueWrapper from '@/components/core/Vue/vue.wrapper';
import { fromNow } from '@/globals';
import {
  BlogPostModel,
  BlogPostService,
  CoreService,
  FirebaseService,
  LoaderService,
  Session
} from '@/sdk';
import { Component } from 'vue-property-decorator';

@Component
export default class YourBlogPostsComponent extends VueWrapper {
  private BlogPostSrv = new BlogPostService();
  private LoaderSrv = new LoaderService();
  private FirebaseSrv = new FirebaseService();

  public created() {
    this.getBlogPosts();
  }

  public getBlogPosts() {
    this.BlogPostSrv.getBlogPosts(new Session().SessionValue!.Id);
  }

  public async deletePost(postId: string) {
    if (confirm('Are you sure you want to delete your post?')) {
      new LoaderService().showFullScreenLoader('Deleting the post...');
      try {
        await this.FirebaseSrv.Db.collection('posts').doc(postId).delete();
        new CoreService().showAlert('Post has been deleted successfully.');
        this.getBlogPosts();
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

  public getFromNow(post: BlogPostModel) {
    return fromNow(post.Date.seconds);
  }
}
