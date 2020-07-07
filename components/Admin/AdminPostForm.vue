<template>
  <form @submit.prevent="onSave">
    <AppControlInput v-model="editedPost.author">
      Author Name
    </AppControlInput>

    <AppControlInput v-model="editedPost.title">
      Title
    </AppControlInput>

    <AppControlInput v-model="editedPost.thumbnail">
      Thumbnail Link
    </AppControlInput>

    <AppControlInput v-model="editedPost.content" control-type="textarea">
      Content
    </AppControlInput>

    <AppControlInput v-model="editedPost.previewText" control-type="textarea">
      Preview Text
    </AppControlInput>

    <AppButton type="submit">
      Save
    </AppButton>

    <AppButton
      type="button"
      style="margin-left: 10px"
      btn-style="cancel"
      @click="onCancel"
    >
      Cancel
    </AppButton>
  </form>
</template>

<script>
// import AppControlInput from '@/components/UI/AppControlInput'
// import AppButton from '@/components/UI/AppButton'

export default {
  components: {
    // AppControlInput,
    // AppButton
  },
  props: {
    post: {
      type: Object,
      required: false,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      editedPost: this.post
        ? { ...this.post } // If "this.post" was passed from the parent component
      //  this is for editing existing posts. If this.post exists

        : { // for NEW posts if this post DOES not exist or if coming from new-post page
          author: '',
          title: '',
          thumbnail: '',
          content: '',
          previewText: ''
        }
    }
  },
  methods: {
    onSave () {
      // Save the post
    //   console.log(this.editedPost)
      this.$emit('submit', this.editedPost)
    },
    onCancel () {
      // Navigate back
      this.$router.push('/admin')
    }
  }
}
</script>

<style scoped>

</style>,
