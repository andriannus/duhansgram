<template>
<div>
  <v-toolbar app fixed>
    <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>

    <v-toolbar-title>{{ title }}</v-toolbar-title>
  </v-toolbar>

  <v-navigation-drawer
    app
    temporary
    v-model="drawer"
    width="250"
  >
    <v-toolbar flat>
      <v-list-tile>
        <v-list-tile-title class="title">
          Duhansgram
        </v-list-tile-title>
      </v-list-tile>
    </v-toolbar>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-tile to="/" @click="setTitle()">
        <v-list-tile-action>
          <v-icon>mdi-view-dashboard</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          Home
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile to="/users" @click="setTitle()">
        <v-list-tile-action>
          <v-icon>mdi-account-group</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          Users
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile to="/posts" @click="setTitle()">
        <v-list-tile-action>
          <v-icon>mdi-library-books</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          Posts
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile to="/albums" @click="setTitle()">
        <v-list-tile-action>
          <v-icon>mdi-image-album</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          Albums
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile to="/photos" @click="setTitle()">
        <v-list-tile-action>
          <v-icon>mdi-image-multiple</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          Photos
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</div>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    title: '',
  }),

  mounted() {
    this.setTitle();
    this.$root.$watch(this.setTitle);
  },

  methods: {
    setTitle() {
      this.title = this.$route.meta.title;
    },
  },
};
</script>
