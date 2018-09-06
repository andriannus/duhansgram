<template>
<v-container>
  <v-layout>
    <v-flex md4 offset-md4 xs12>
      <v-card>
        <v-card-title>
          <h3 class="headline">
            Hi, we found too many pictures. Please see by Album.
          </h3>
        </v-card-title>
        <v-card-actions>
          <v-btn
            flat
            block
            color="primary"
            to="/albums"
          >
            Go To Albums
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
export default {
  name: 'Photos',
  metaInfo: {
    title: 'List of Photos',
  },
};
</script>
