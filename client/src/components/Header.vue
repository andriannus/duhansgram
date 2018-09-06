<template>
<div>
  <Navigation />

  <v-content>
    <router-view />
  </v-content>

  <v-footer app absolute>
    <v-layout justify-center row wrap>
      <v-flex text-xs-center py-3>
        &copy; 2018 - <strong>Duhansgram</strong>
      </v-flex>
    </v-layout>
  </v-footer>
</div>
</template>

<script>
import Navigation from './Navigation';

export default {
  name: 'Header',
  metaInfo: {
    titleTemplate: '%s - Duhansgram',
  },

  data: () => ({
    isActive: false,
  }),

  methods: {
    switchMenu() {
      this.isActive = !this.isActive;
    },
  },

  components: {
    Navigation,
  },
};
</script>
