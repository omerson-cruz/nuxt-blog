<template>
  <div class="posts-page">
    <PostList :posts="loadedPosts" />
  </div>
</template>

<script>
// import PostList from '@/components/Posts/PostList'

export default {
  // middleware: 'log',

  components: {
    // PostList
  },
  // dont use the "callback" or remove it if you are going to use the Promise based approach.
  // since Nuxt.js will be waiting for the callback to return if you indicated it on the argv2. And that callback approach is already deprecated
  fetch (context) {
    if (context.store.state.loadedPosts.length > 0) {
      return null
    }

    return new Promise((resolve, reject) => {
      resolve({
        loadedPosts: [{
          id: '1',
          title: 'First Post',
          previewText: 'This is our first post!',
          author: 'Omerson',
          udpatedDate: new Date(),
          content: 'Some dummy text here. Lorem ipsum eme eme',
          thumbnail: 'https://9to5mac.com/wp-content/uploads/sites/6/2019/09/5G-iPhone-in-2020-will-benefit-from-two-tech-developments.jpg?quality=82&strip=all'
        }]
      })

      // below is just to demonstrate if there is an error but never reach that code
      const err = ''
      if (err === 'there is an error') {
        reject(new Error()) // this will be catched in the catch block
      }
    })
      .then((data) => {
        context.store.commit('setPosts', data.loadedPosts)
      })
      .catch(e => context.error(new Error()))
  },

  computed: {
    loadedPosts () {
      return this.$store.getters.loadedPosts
    }
  }

  // removing this created method  and data method because fetch()
  //   is going to initialize our data in Vuex store

  // data () {
  //   return {
  //     loadedPosts: ''
  //   }
  // },

  // created () {
  //   this.$store.dispatch('setPosts', this.loadedPosts)
  //   console.log('from the store', this.$store.getters.loadedPosts)
  //   console.log('from the store', this.loadedPosts)
  // }
}
</script>

<style scoped>
    .posts-page {
        display: flex;
        justify-content: center;
        align-items: center;
    }

</style>
