import { Component } from 'vue-property-decorator';
import VueWrapper from '../Vue/vue.wrapper';
import { CoreService } from '@/sdk';

@Component
export default class AppBarComponent extends VueWrapper {
  // Service
  private CoreService = new CoreService();
}
