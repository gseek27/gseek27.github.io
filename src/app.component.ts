import VueWrapper from '@/components/core/Vue/vue.wrapper';
import { Component } from 'vue-property-decorator';
import { CoreService, LoaderService } from './sdk';

@Component
export default class AppComponent extends VueWrapper {
  // Services
  private CoreService = new CoreService();
  private LoaderService = new LoaderService();
}
