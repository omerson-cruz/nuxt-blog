<template>
  <div class="single-post-page">
    <section class="post">
      <h1 class="post-title">
        {{ loadedPosts.title }}
      </h1>
      <div class="post-details">
        <div class="post-detail">
          Last updated on {{ loadedPosts.updatedDate | date }}
        </div>
        <div class="post-detail">
          Written by {{ loadedPosts.author }}
        </div>
      </div>
      <p class="post-content">
        {{ loadedPosts.content }}
      </p>
    </section>
    <section class="post-feedback">
      <p>Let me know what you think about the post, send a mail to <a href="mailto:feedback@myawesomedomain.com">feedback@myawesomedomain.com</a></p>
    </section>
  </div>
</template>

<script>

export default {

  async asyncData (context) {
    // console.log('context', context.params.id)

    try {
      const data = await context.$axios.$get('https://nuxt-blog-b4ca4.firebaseio.com/posts/' + context.params.id + '.json')
      // console.log('data: ', data)
      return {
        loadedPosts: {
          ...data
        }
      }
    } catch (err) {
      // console.log('err: ', err)
      throw new Error('error: ', err)
    }
  },

  head: {
    title: 'A Blog Post'
  }
}
</script>

<style scoped>
    .single-post-page {
  padding: 30px;
  text-align: center;
  box-sizing: border-box;
}

.post {
  width: 100%;
}

@media (min-width: 768px) {
  .post {
    width: 600px;
    margin: auto;
  }
}

.post-title {
  margin: 0;
}

.post-details {
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 3px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

@media (min-width: 768px) {
  .post-details {
    flex-direction: row;
  }
}

.post-detail {
  color: rgb(88, 88, 88);
  margin: 0 10px;
}

.post-feedback a {
  color: red;
  text-decoration: none;
}

.post-feedback a:hover,
.post-feedback a:active {
  color: salmon;
}
</style>,
