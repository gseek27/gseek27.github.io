import { Component, Prop } from 'vue-property-decorator';
import { ValidationProvider } from 'vee-validate';
import BaseInput from '../Input/base-input';
import { AnyObject } from '@/globals';

@Component({
  components: {
    ValidationProvider,
  },
})
export default class BaseDatePickerComponent extends BaseInput {
  @Prop({
    default: () => ({
      label: '',
    }),
    type: Object,
  })
  fieldProps!: AnyObject;

  dialog = false;
}
