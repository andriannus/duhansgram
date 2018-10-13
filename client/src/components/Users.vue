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

  <v-expansion-panel popout v-if="!isLoading">
    <v-expansion-panel-content
      v-for="(user, index) in users"
      :key="index"
    >
      <div slot="header">{{ user.name }}</div>

      <v-card>
        <v-card-text>
          <v-list-tile>
            <v-list-tile-avatar>
              <v-icon>mdi-account</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ user.username }}</v-list-tile-title>
              <v-list-tile-sub-title class="grey--text">Username</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile>
            <v-list-tile-avatar>
              <v-icon>mdi-email</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ user.email }}</v-list-tile-title>
              <v-list-tile-sub-title class="grey--text">Email</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile>
            <v-list-tile-avatar>
              <v-icon>mdi-map-marker</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ user.address.street }},
                {{ user.address.suite }},
                {{ user.address.city }},
                {{ user.address.zipcode }}
                </v-list-tile-title>
              <v-list-tile-sub-title class="grey--text">Address</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-card-text>

        <v-card-actions>
          <v-btn
            flat
            color="primary"
            :to="{ path: `/users/${user.id}/posts` }"
          >View Posts</v-btn>

          <v-btn
            flat
            color="success"
            :to="{ path: `/users/${user.id}/albums` }"
          >View Albums</v-btn>
        </v-card-actions>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>

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
  name: 'Users',
  metaInfo: {
    title: 'List of Users',
  },

  data: () => ({
    users: [],
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

      this.axios.get('users')
        .then((res) => {
          this.users = res.data;
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
