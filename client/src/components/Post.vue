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
          <v-btn color="black white--text" @click="dialog = true">Add Comment</v-btn>

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
              <v-card-actions>
                <v-btn
                  flat
                  color="primary"
                  @click="updateDialog(comment.id)"
                >Edit</v-btn>

                <v-btn
                  flat
                  color="error"
                  @click="confirmDelete(comment.id)"
                >Delete</v-btn>
              </v-card-actions>
            </v-card>
          </v-list>
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>

  <v-dialog persistent v-model="dialog" max-width="600px">
    <v-card>
      <v-card-title class="headline">
        Comment Form
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md class="px-0">
          <v-layout wrap>
            <v-flex md6 xs12>
              <v-text-field outline label="Post ID" v-model="comment.postId"></v-text-field>
            </v-flex>

            <v-flex md6 xs12>
              <v-text-field outline label="Comment ID" v-model="comment.id"></v-text-field>
            </v-flex>

            <v-flex md6 xs12>
              <v-text-field outline label="Name" v-model="comment.name"></v-text-field>
            </v-flex>

            <v-flex md6 xs12>
              <v-text-field outline label="E-mail" v-model="comment.email"></v-text-field>
            </v-flex>

            <v-flex md12 xs12>
              <v-text-field outline label="Body" v-model="comment.body"></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn
          flat
          color="primary"
          @click="createComment"
          v-if="!edit"
        >Submit</v-btn>

        <v-btn
          flat
          color="primary"
          @click="updateComment(comment.id)"
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
          @click="deleteComment(idComment)"
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
import { HollowDotsSpinner, HalfCircleSpinner } from 'epic-spinners';

export default {
  name: 'Post',
  metaInfo: {
    title: 'Post Details',
  },

  data: () => ({
    post: {},
    comments: [],
    comment: {},
    idPost: '',
    idComment: '',
    text: '',
    snackbar: false,
    edit: false,
    dialog: false,
    dialogConfirm: false,
    isLoading: false,
    isLoadingComments: true,
  }),

  mounted() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      this.isLoading = true;
      this.idPost = this.$route.params.id;
      const url = this.$route.fullPath;

      this.axios.get(url)
        .then((res) => {
          this.post = res.data;

          this.isLoading = false;
          this.fetchComments(this.idPost);
        })
        .catch(() => {
          this.errorMsg();
        });
    },

    fetchComments(idPost) {
      this.isLoadingComments = true;

      this.axios.get(`posts/${idPost}/comments`)
        .then((res) => {
          this.comments = res.data;
          this.isLoadingComments = false;
        })
        .catch(() => {
          this.errorMsg();
        });
    },

    readComment(idComment) {
      this.axios.get(`comments/${idComment}`)
        .then((res) => {
          this.comment = res.data;
        })
        .catch(() => {
          this.errorMsg();
        });
    },

    createComment() {
      const data = this.comment;

      this.axios.post('comments', data)
        .then(() => {
          this.reset();
          this.fetchData();
        })
        .catch(() => {
          this.errorMsg();
        });
    },

    updateComment(idComment) {
      const data = this.comment;

      this.axios.put(`comments/${idComment}`, data)
        .then(() => {
          this.fetchData();
          this.reset();
        })
        .catch(() => {
          this.errorMsg();
        });
    },

    deleteComment(idComment) {
      this.axios.delete(`comments/${idComment}`)
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

    updateDialog(idComment) {
      this.readComment(idComment);

      this.edit = true;
      this.dialog = true;
    },

    confirmDelete(id) {
      this.dialogConfirm = true;
      this.idComment = id;
    },

    cancelDelete() {
      this.idComment = '';
      this.dialogConfirm = false;
    },

    reset() {
      this.dialog = false;
      this.edit = false;
      this.comment = {};
    },
  },

  components: {
    HollowDotsSpinner,
    HalfCircleSpinner,
  },
};
</script>

