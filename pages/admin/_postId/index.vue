<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" @submit="onSubmitted" />
    </section>
  </div>
</template>

<script>
import AdminPostForm from '@/components/Admin/AdminPostForm'

export default {
  layout: 'admin',
  middleware: ['check-auth', 'auth'],
  components: {
    AdminPostForm
  },

  async asyncData (context) {
    // console.log('context', context.params.postId)

    try {
      const data = await context.$axios.$get('https://nuxt-blog-b4ca4.firebaseio.com/posts/' + context.params.postId + '.json')
      // console.log('data: ', data)
      return {
        loadedPost: {
          ...data,
          id: context.params.postId
        }
      }
    } catch (err) {
      // console.log('err: ', err)
      throw new Error('Error: ', err)
    }
  },

  data () {
    return {
      loadedPost: {

      }
    }
  },

  methods: {
    onSubmitted (editedPost) {
      this.$store.dispatch('editPost', editedPost)
        .then(() => {
          this.$router.push('/admin')
        })
    }
  }
}
</script>

<style scoped>
.update-form {
  width: 50%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>,
