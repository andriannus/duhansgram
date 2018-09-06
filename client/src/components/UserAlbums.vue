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
    v-for="(album, index) in albums"
    :key="index"
  >
    <v-list-tile :to="{ path: '/albums/' + album.id + '/photos' }">
      <v-list-tile-avatar>
        <v-icon>mdi-image-album</v-icon>
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title class="text-capitalize">{{ album.title }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</v-container>
</template>

<script>
import { HollowDotsSpinner } from 'epic-spinners';

export default {
  name: 'UserAlbums',
  metaInfo: {
    title: 'List of User Albums',
  },

  data: () => ({
    albums: [],
    isLoading: false,
  }),

  mounted() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      this.isLoading = true;
      const id = this.$route.params.id;

      this.axios.get(`users/${id}/albums`)
        .then((res) => {
          this.albums = res.data;

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
