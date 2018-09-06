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

  <div v-if="!isLoading">
    <v-btn class="ml-0 mb-3" color="black white--text" @click="dialog = true">Add Post</v-btn>

    <v-list
      v-for="(post, index) in posts"
      :key="index"
    >
      <v-list-tile>
        <v-list-tile-avatar color="grey">
          <span class="white--text">
            {{ index + 1 }}
          </span>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title class="text-capitalize">{{ post.title }}</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-menu offset-x>
            <v-btn icon ripple slot="activator">
              <v-icon color="grey lighten-1">mdi-dots-vertical</v-icon>
            </v-btn>

            <v-list>
              <v-list-tile :to="{ path: `/posts/${post.id}` }">
                <v-list-tile-title>View</v-list-tile-title>
              </v-list-tile>

              <v-list-tile @click="updateDialog(post.id)">
                <v-list-tile-title>Edit</v-list-tile-title>
              </v-list-tile>

              <v-list-tile @click="confirmDelete(post.id)">
                <v-list-tile-title>Delete</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
  </div>

  <v-dialog persistent v-model="dialog" max-width="600px">
    <v-card>
      <v-card-title class="headline">
        Post Form
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md class="px-0">
          <v-layout wrap>
            <v-flex md4 xs12>
              <v-text-field outline label="User ID" v-model="post.userId"></v-text-field>
            </v-flex>

            <v-flex md8 xs12>
              <v-text-field outline label="Title" v-model="post.title"></v-text-field>
            </v-flex>

            <v-flex md12 xs12>
              <v-text-field outline label="Body" v-model="post.body"></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn
          flat
          color="primary"
          @click="createPost"
          v-if="!edit"
        >Submit</v-btn>

        <v-btn
          flat
          color="primary"
          @click="updatePost(post.id)"
          v-if="edit"
        >Update</v-btn>

        <v-btn
          flat
          color="error"
          @click="reset"
        >Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="dialogConfirm" max-width="300px">
    <v-card>
      <v-card-text>
        <h3 class="title">Are You sure?</h3>
      </v-card-text>
      <v-card-actions>
        <v-btn
          flat
          color="primary"
          @click="deletePost(idPost)"
        >Yes</v-btn>

        <v-btn
          flat
          color="error"
          @click="cancelDelete"
        >No</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

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
  name: 'Posts',
  metaInfo: {
    title: 'List of Posts',
  },

  data: () => ({
    posts: [],
    post: {},
    idPost: '',
    text: '',
    snackbar: false,
    edit: false,
    dialog: false,
    dialogConfirm: false,
    isLoading: false,
  }),

  mounted() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      this.isLoading = true;

      this.axios.get('posts')
        .then((res) => {
          this.posts = res.data;
          this.isLoading = false;
        })
        .catch(() => {
          this.errorMsg();
        });
    },

    readPost(id) {
      this.axios.get(`posts/${id}`)
        .then((res) => {
          this.post = res.data;
        })
        .catch(() => {
          this.errorMsg();
        });
    },

    createPost() {
      const data = this.post;

      this.axios.post('posts', data)
        .then(() => {
          this.reset();
          this.fetchData();
        })
        .catch(() => {
          this.errorMsg();
        });
    },

    updatePost(id) {
      const data = this.post;

      this.axios.put(`posts/${id}`, data)
        .then(() => {
          this.fetchData();
          this.reset();
        })
        .catch(() => {
          this.errorMsg();
        });
    },

    deletePost(id) {
      this.axios.delete(`posts/${id}`)
        .then(() => {
          this.fetchData();
          this.dialogConfirm = false;
        })
        .catch(() => {
          this.errorMsg();
        });
    },

    errorMsg() {
      this.snackbar = true;
      this.text = 'Error occurred. Please refresh the page';
    },

    updateDialog(id) {
      this.readPost(id);

      this.edit = true;
      this.dialog = true;
    },

    confirmDelete(id) {
      this.dialogConfirm = true;
      this.idPost = id;
    },

    cancelDelete() {
      this.idPost = '';
      this.dialogConfirm = false;
    },

    reset() {
      this.dialog = false;
      this.edit = false;
      this.post = {};
    },
  },

  components: {
    HollowDotsSpinner,
  },
};
</script>
