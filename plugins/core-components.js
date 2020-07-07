// So we also have to import Vue library itself. This is also the dependecy of Nuxt
import Vue from 'vue'

// import the components you wanna use globally
import AppButton from '@/components/UI/AppButton'
import AppControlInput from '@/components/UI/AppControlInput'
import PostList from '@/components/Posts/PostList'

Vue.component('AppButton', AppButton)
Vue.component('AppControlInput', AppControlInput)
Vue.component('PostList', PostList)
