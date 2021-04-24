import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#727cf5',
        secondary: '#727cf5',
        error: '#f55a4e',
        success: '#5cb860',
        warning: '#ffa21a'
      }
    }
  }
});
