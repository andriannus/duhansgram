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

  <v-card v-if="!isLoading">
    <v-card-title>
      <h3 class="headline text-capitalize">{{ post.title }}</h3>
    </v-card-title>
    <v-card-text>{{ post.body }}</v-card-text>
  </v-card>
  <br>
  <v-expansion-panel v-if="!isLoading">
    <v-expansion-panel-content>
      <div slot="header">Comments</div>

      <v-layout justify-center class="my-3" v-if="isLoadingComments">
        <half-circle-spinner
          :animation-duration="1000"
          :size="60"
          color="#000000"
        />
      </v-layout>

      <v-card v-if="!isLoadingComments">
        <v-card-text>
          <v-list
            v-for="(comment, index) in comments"
            :key="index"
          >
            <v-card>
              <v-card-text>
                <p class="text-capitalize font-weight-bold mb-0">{{ comment.name }}</p>
                <p class="text-lowercase grey--text">{{ comment.email }}</p>
                <p>{{ comment.body }}</p>
              </v-card-text>
            </v-card>
          </v-list>
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</v-container>
</template>

<script>
import { HollowDotsSpinner, HalfCircleSpinner } from 'epic-spinners';

export default {
  name: 'Post',
  metaInfo: {
    title: 'Post Details',
  },

  data: () => ({
    post: {},
    comments: [],
    isLoading: false,
    isLoadingComments: true,
  }),

  mounted() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      this.isLoading = true;
      const id = this.$route.params.id;
      const url = this.$route.fullPath;

      this.axios.get(url)
        .then((res) => {
          this.post = res.data;

          this.isLoading = false;
          this.fetchComments(id);
        })
        .catch((err) => {
          //
        });
    },

    fetchComments(id) {
      this.isLoadingComments = true;

      this.axios.get(`posts/${id}/comments`)
        .then((res) => {
          this.comments = res.data;
          this.isLoadingComments = false;
        })
        .catch((err) => {
          //
        });
    },
  },

  components: {
    HollowDotsSpinner,
    HalfCircleSpinner,
  },
};
</script>

