<<<<<<< HEAD
import { extend, ValidationProvider } from 'vee-validate';
import {
  confirmed,
  digits,
  email,
  ext,
  max,
  min,
  required,
  size
} from 'vee-validate/dist/rules';
import Vue from 'vue';
=======
import Vue from 'vue';
import { ValidationProvider, extend } from 'vee-validate';
import {
  required,
  email,
  max,
  min,
  confirmed,
  size,
  ext,
  digits
} from 'vee-validate/dist/rules';
>>>>>>> c0cca08596d4e7304c3e5c69f4a34a9188538bc3

Vue.component('ValidationProvider', ValidationProvider);

extend('required', {
  ...required,
  message: 'This field is required.'
});

extend('email', {
  ...email,
  message: 'Email must be valid.'
});

extend('true', {
  validate: value => value === true,
  message: 'This is requried.'
});

extend('phone', {
  validate: value =>
    new RegExp(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/).test(value),
  message: 'Phone must be in xxx-xxx-xxxx format.'
});

extend('max', {
  ...max,
  message: 'This field must not be greater than {length} characters!'
});

extend('min', {
  ...min,
  message: 'This field must be at least {length} characters!'
});

extend('confirmed', {
  ...confirmed,
  message: "{target} confirmation doesn't match!"
});

extend('size', {
  ...size,
  message: 'File must not be greater than {size}KB!'
});

extend('positive_float', {
  validate: value => +value >= 0,
  message: 'The value must not be negative.'
});

extend('digits', {
  ...digits,
  message: 'The value must be in digits and exactly contain 8 digits'
});
<<<<<<< HEAD

extend('image', {
  ...ext,
  message: 'The file must be an image (jpg/png/jpeg)'
});
=======
>>>>>>> c0cca08596d4e7304c3e5c69f4a34a9188538bc3
