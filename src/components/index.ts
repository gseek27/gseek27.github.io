import Vue from 'vue';
import BlogPostCardComponent from './shared/blog-post-card/blog-post-card.component';
import BaseAutocomplete from './vuetify/Autocomplete/base-autocomplete';
import BaseBtn from './vuetify/Btn/base-btn';
import BaseCard from './vuetify/Card/base-card.component';
import BaseCheckbox from './vuetify/Checkbox/base-checkbox';
import BaseCheckboxGroup from './vuetify/CheckboxGroup/base-checkbox-group';
import BaseCombobox from './vuetify/Combobox/base-combobox';
import BaseDatePickerComponent from './vuetify/DatePicker/base-date-picker';
import BaseFormComponent from './vuetify/Form/base-form';
import BaseMenu from './vuetify/Menu/base-menu';
import BaseRadioGroup from './vuetify/RadioGroup/base-radio-group';
import BaseSelect from './vuetify/Select/base-select';
import BaseSwitch from './vuetify/Switch/base-switch';
import BaseTextarea from './vuetify/Textarea/base-textarea';
import BaseTextField from './vuetify/TextField/base-text-field';
import BaseTooltip from './vuetify/Tooltip/base-tooltip';

// Vuetify Components
Vue.component('base-text-field', BaseTextField);
Vue.component('base-textarea', BaseTextarea);
Vue.component('base-menu', BaseMenu);
Vue.component('base-btn', BaseBtn);
Vue.component('base-switch', BaseSwitch);
Vue.component('base-checkbox', BaseCheckbox);
Vue.component('base-checkbox-group', BaseCheckboxGroup);
Vue.component('base-radio-group', BaseRadioGroup);
Vue.component('base-select', BaseSelect);
Vue.component('base-autocomplete', BaseAutocomplete);
Vue.component('base-combobox', BaseCombobox);
Vue.component('base-form', BaseFormComponent);
Vue.component('base-date-picker', BaseDatePickerComponent);
Vue.component('base-tooltip', BaseTooltip);
Vue.component('base-card', BaseCard);

// Custom
Vue.component('blog-post-card-component', BlogPostCardComponent);
