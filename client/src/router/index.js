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
        },
        {
          path: ':id',
          name: 'user',
          component: User,
        },
        {
          path: ':id/posts',
          name: '',
          component: UserPosts,
        },
        {
          path: ':id/albums',
          name: 'user-albums',
          component: UserAlbums,
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
        },
        {
          path: ':id',
          name: 'post',
          component: Post,
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
        },
        {
          path: ':id',
          name: 'album',
          component: Album,
        },
        {
          path: ':id/photos',
          name: 'album-photos',
          component: AlbumPhotos,
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
        },
        {
          path: ':id',
          name: 'photo',
          component: Photo,
        },
      ],
    },
  ],
});
