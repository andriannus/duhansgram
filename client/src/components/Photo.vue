<template>
<v-container>
  <v-layout>
    <v-flex md4 offset-md4 xs12>
      <v-card>
        <v-img
          :src="photo.url"
        ></v-img>
        <v-card-title>
          <h3 class="title text-capitalize">{{ photo.title }}</h3>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
export default {
  name: 'Photo',
  metaInfo: {
    title: 'Photo Details',
  },

  data: () => ({
    photo: {},
  }),

  mounted() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      const url = this.$route.fullPath;

      this.axios.get(url)
        .then((res) => {
          this.photo = res.data;
        })
        .catch((err) => {
          //
        });
    },
  },
};
</script>
