<template>
<v-container grid-list-md>
  <v-layout row wrap>
    <v-flex
      md3 xs4
      v-for="(album, index) in albums"
      :key="index"
    >
      <v-card flat tile hover class="d-flex" :to="{ path: `/photos/${album.id}` }">
        <v-img
          :src="album.thumbnailUrl"
          class="grey darken-3"
        >
          <v-layout
            slot="placeholder"
            fill-height
            align-center
            justify-center
            ma-0
          >
            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
          </v-layout>
        </v-img>
      </v-card>
    </v-flex>
  </v-layout>

  <v-snackbar
    top
    right
    :timeout="2000"
    v-model="snackbar"
  >{{ text }}</v-snackbar>
</v-container>
</template>

<script>
export default {
  name: 'AlbumPhotos',
  metaInfo: {
    title: 'List of Photos from the Album',
  },

  data: () => ({
    albums: [],
    text: '',
    snackbar: false,
  }),

  mounted() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      const url = this.$route.fullPath;

      this.axios.get(url)
        .then((res) => {
          this.albums = res.data;
        })
        .catch(() => {
          this.snackbar = true;
          this.text = 'Error occurred. Please refresh the page';
        });
    },
  },
};
</script>
