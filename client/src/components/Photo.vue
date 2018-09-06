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

  <v-layout v-if="!isLoading">
    <v-flex md4 offset-md4 xs12>
      <v-card>
        <v-img
          :src="photo.url"
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
        <v-card-title>
          <h3 class="title text-capitalize">{{ photo.title }}</h3>
        </v-card-title>
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
import { HollowDotsSpinner } from 'epic-spinners';

export default {
  name: 'Photo',
  metaInfo: {
    title: 'Photo Details',
  },

  data: () => ({
    photo: {},
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
      const url = this.$route.fullPath;

      this.axios.get(url)
        .then((res) => {
          this.photo = res.data;
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
