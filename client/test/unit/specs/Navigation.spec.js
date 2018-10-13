import { mount } from '@vue/test-utils';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import Navigation from '@/components/Navigation';
import sinon from 'sinon';

describe('Navigation', () => {
  let wrp;

  const routes = [
    {
      path: '/',
      name: 'home',
      meta: {
        title: 'Duhansgram Dashboard',
      },
    },
  ];

  const router = new VueRouter({ routes });

  beforeEach(() => {
    Vue.use(VueRouter);
    Vue.use(Vuetify);

    Vue.config.silent = true;

    wrp = mount(Navigation, { router });
  });

  it('Tombol side icon tersedia', () => {
    expect(wrp.find('.v-toolbar__side-icon').exists()).toBe(true);
  });

  it('Data drawer menjadi true ketika tombol side icon diklik', () => {
    wrp.find('.v-toolbar__side-icon').trigger('click');
    expect(wrp.vm.drawer).toBe(true);
  });

  it('Data title di dapat dari route meta title', () => {
    expect(wrp.vm.title).toBe(wrp.vm.$route.meta.title);
  });

  it('Method setTitle dipanggil ketika menu diklik', () => {
    const spy = sinon.spy(wrp.vm, 'setTitle');
    wrp.find('a.v-list__tile').trigger('click');
    expect(spy.called).toBe(true);
  });
});
