import VueWrapper from '@/components/core/Vue/vue.wrapper';
import { BlogPostService, LoaderService, Session } from '@/sdk';
import { Component } from 'vue-property-decorator';

@Component
export default class HomeComponent extends VueWrapper {
  private Session = new Session();
  private BlogPostSrv = new BlogPostService();
  private LoaderSrv = new LoaderService();

  public created() {
    this.BlogPostSrv.getBlogPosts();
  }

  public scrollToPosts() {
    document.getElementById('latest-posts')?.scrollIntoView({
      behavior: 'smooth'
    });
  }
}
