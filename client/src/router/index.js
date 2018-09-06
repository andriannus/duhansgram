import Vue from 'vue';
import Router from 'vue-router';
import Header from '@/components/Header';
import Home from '@/components/Home';
import Users from '@/components/Users';
import User from '@/components/User';
import UserPosts from '@/components/UserPosts';
import UserAlbums from '@/components/UserAlbums';
import Posts from '@/components/Posts';
import Post from '@/components/Post';
import Albums from '@/components/Albums';
import Album from '@/components/Album';
import AlbumPhotos from '@/components/AlbumPhotos';
import Photos from '@/components/Photos';
import Photo from '@/components/Photo';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Header,
      children: [
        {
          path: '',
          name: 'Home',
          component: Home,
          meta: {
            title: 'Duhansgram Dashboard',
          },
        },
      ],
    },
    {
      path: '/users',
      component: Header,
      children: [
        {
          path: '',
          name: 'users',
          component: Users,
          meta: {
            title: 'List of Users',
          },
        },
        {
          path: ':id',
          name: 'user',
          component: User,
          meta: {
            title: 'User Profile',
          },
        },
        {
          path: ':id/posts',
          name: 'user-posts',
          component: UserPosts,
          meta: {
            title: 'List of User Posts',
          },
        },
        {
          path: ':id/albums',
          name: 'user-albums',
          component: UserAlbums,
          meta: {
            title: 'List of User Albums',
          },
        },
      ],
    },
    {
      path: '/posts',
      component: Header,
      children: [
        {
          path: '',
          name: 'posts',
          component: Posts,
          meta: {
            title: 'List of Posts',
          },
        },
        {
          path: ':id',
          name: 'post',
          component: Post,
          meta: {
            title: 'Post Details',
          },
        },
      ],
    },
    {
      path: '/albums',
      component: Header,
      children: [
        {
          path: '',
          name: 'albums',
          component: Albums,
          meta: {
            title: 'List of Albums',
          },
        },
        {
          path: ':id',
          name: 'album',
          component: Album,
          meta: {
            title: 'Album Details',
          },
        },
        {
          path: ':id/photos',
          name: 'album-photos',
          component: AlbumPhotos,
          meta: {
            title: 'List of Photos from the Album',
          },
        },
      ],
    },
    {
      path: '/photos',
      component: Header,
      children: [
        {
          path: '',
          name: 'photos',
          component: Photos,
          meta: {
            title: 'List of Photos',
          },
        },
        {
          path: ':id',
          name: 'photo',
          component: Photo,
          meta: {
            title: 'Photo Details',
          },
        },
      ],
    },
  ],
});
