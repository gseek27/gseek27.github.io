import VueWrapper from '@/components/core/Vue/vue.wrapper';
import { fromNow } from '@/globals';
import { BlogPostService, LoaderService } from '@/sdk';
import { Component } from 'vue-property-decorator';

@Component
export default class ViewBlogPostComponent extends VueWrapper {
  private BlogPostSrv = new BlogPostService();
  private LoaderSrv = new LoaderService();

  get BlogPost() {
    return this.BlogPostSrv.BlogPost.value;
  }

  get FromNow() {
    return fromNow(this.BlogPost.Date.seconds);
  }

  public created() {
    this.BlogPostSrv.getBlogPost(this.$route.params.postId);
  }
}
