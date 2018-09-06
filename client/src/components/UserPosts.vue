<template>
<v-container>
  <v-layout justify-center class="mt-5" v-if="isLoading">
    <hollow-dots-spinner
      :animation-duration="1000"
      :dot-size="15"
      :dots-num="3"
      color="#000000"
    />
  </v-layout>

  <v-list
    v-if="!isLoading"
    v-for="(post, index) in posts"
    :key="index"
    two-line
  >
    <v-list-tile :to="{ path: '/posts/' + post.id }">
      <v-list-tile-avatar>
        <v-icon>mdi-book</v-icon>
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title class="text-capitalize">{{ post.title }}</v-list-tile-title>
        <v-list-tile-sub-title>{{ post.body }}</v-list-tile-sub-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</v-container>
</template>

<script>
import { HollowDotsSpinner } from 'epic-spinners';

export default {
  name: 'Users',
  metaInfo: {
    title: 'List of User Posts',
  },

  data: () => ({
    posts: [],
    isLoading: false,
  }),

  mounted() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      this.isLoading = true;
      this.$root.$emit('setTitle');

      const url = this.$route.fullPath;

      this.axios.get(url)
        .then((res) => {
          this.posts = res.data;
          this.isLoading = false;
        })
        .catch((err) => {
          //
        });
    },
  },

  components: {
    HollowDotsSpinner,
  },
};
</script>

