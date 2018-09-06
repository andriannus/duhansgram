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
    <v-list-tile :to="{ path: `/albums/${album.id}/photos` }">
      <v-list-tile-avatar color="grey">
        <span class="white--text">
          {{ index + 1 }}
        </span>
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title class="text-capitalize">{{ album.title }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>

  <v-snackbar
    top
    right
    :timeout="2000"
    v-model="snackbar"
  >{{ text }}</v-snackbar>
</v-container>
</template>

<script>
import { HollowDotsSpinner } from 'epic-spinners';

export default {
  name: 'Albums',
  metaInfo: {
    title: 'List of Albums',
  },

  data: () => ({
    albums: [],
    text: '',
    snackbar: false,
    isLoading: false,
  }),

  mounted() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      this.isLoading = true;

      this.axios.get('albums')
        .then((res) => {
          this.albums = res.data;
          this.isLoading = false;
        })
        .catch(() => {
          this.snackbar = true;
          this.text = 'Error occurred. Please refresh the page';
        });
    },
  },

  components: {
    HollowDotsSpinner,
  },
};
</script>
