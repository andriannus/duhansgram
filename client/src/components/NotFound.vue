<template>
<v-container fill-height>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
      <v-card>
        <v-card-text class="text-xs-center">
          <h3 class="title mb-4">
            Error Page Not Found
          </h3>
          <p class="display-4 mb-0">404</p>
        </v-card-text>
        <v-card-actions>
          <v-btn
            flat
            block
            color="primary"
            to="/"
          >Home</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
export default {
  name: 'NotFound',
  metaInfo: {
    title: 'Page Not Found',
  },
};
</script>

