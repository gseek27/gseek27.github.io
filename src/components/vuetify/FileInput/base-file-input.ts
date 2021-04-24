import { ValidationProvider } from 'vee-validate';
import { Component } from 'vue-property-decorator';
import BaseInput from '../Input/base-input';

@Component({
  components: {
    ValidationProvider
  }
})
export default class BaseFileInput extends BaseInput {
  $refs!: {
    baseFileRef: any;
  };
}
