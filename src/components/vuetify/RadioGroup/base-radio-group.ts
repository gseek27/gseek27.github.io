import { Component, Prop } from 'vue-property-decorator';
import { ValidationProvider } from 'vee-validate';
import BaseInput from '../Input/base-input';
import { AnyObject } from '@/globals';

@Component({
  components: {
    ValidationProvider,
  },
})
export default class BaseRadioGroup extends BaseInput {
  @Prop({ required: true, type: Array })
  private readonly items!: Array<AnyObject>;
}
