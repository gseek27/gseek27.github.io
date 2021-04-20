import VueWrapper from '@/components/core/Vue/vue.wrapper';
import { fromNow } from '@/globals';
import { BlogPostModel } from '@/sdk';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class BlogPostCardComponent extends VueWrapper {
  @Prop({
    required: true,
    type: Object
  })
  private readonly post!: BlogPostModel;

  get FromNow() {
    return fromNow(this.post.Date.seconds);
  }
}
