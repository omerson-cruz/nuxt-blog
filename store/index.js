// import axios from '@nuxtjs/axios'
import Cookie from 'js-cookie'

export const state = () => ({
  loadedPosts: ['hello testing'],
  token: null
})

export const mutations = {
  setPosts (state, posts) {
    state.loadedPosts = posts
  },
  addPost (state, post) {
    state.loadedPosts.push(post)
  },
  editPost (state, editedPost) {
    // let's find the index in the array for the Post we need to edit
    const postIndex = state.loadedPosts.findIndex((post) => {
      return post.id === editedPost.id
    })

    // replace that with the editedPost
    state.loadedPosts[postIndex] = editedPost
  },

  // set the token in the Vuex
  setToken (state, token) {
    state.token = token
  },

  // this should be called after the EXPIRY time or
  // when user LOGS out
  clearToken (state) {
    state.token = null
  }
}

export const actions = {
  // posts is the payload usually from the "component" when this action was called
  //  or could be a payload from another action dispatching this current action method
  setPosts ({ commit }, posts) {
    commit('setPosts', posts)
  },
  // this will be dispatched by nuxt
  // argv1 - the normal "vuex store context that has { commit, dispatch } ,etc.
  // argv2 - is the context similar to that of "fetc()" and asyncData() contex
  //       - with that context we can use the URL path, params, etc.
  // the key thing to do in "nuxtServerInit" is to return a promise just like fetch() and asyncData()
  nuxtServerInit (vuexContext, context) {
    // console.log('nuxt Server init called')

    // check if we are running this code on the server or the client
    if (!process.client) {
      // console.log('context', context.req)
    }

    // so here we are going to get all of the posts by returnin the Promise returned by axios
    return this.$axios.$get(process.env.baseUrl + '/posts.json')
      .then((data) => {
        // console.log('axios response: ', data)
        const postArray = []
        // received data contains an Object of objects instead of
        // Array of Objects (w/c is what we needed) so wee need to convert first to Array of Objects

        for (const key in data) {
          postArray.push({ ...data[key], id: key })
        }

        vuexContext.commit('setPosts', postArray)
      })
      .catch(e => context.error(e))
  },
  addPost (vuexContext, postData) {
    const createdPost = {
      ...postData,
      updatedDate: new Date()
    }

    return this.$axios.post('https://nuxt-blog-b4ca4.firebaseio.com/posts.json?auth=' +
      vuexContext.state.token
    , createdPost)
      .then((result) => {
        // console.log('[store] result: ', result)

        vuexContext.commit('addPost', { ...createdPost, id: result.data.name })
      })
      .catch((err) => {
        // console.log('err: ', err)
        throw new Error('err: ', err)
      })
  },
  editPost (vuexContext, editedPost) {
    return this.$axios.put('https://nuxt-blog-b4ca4.firebaseio.com/posts/' +
        editedPost.id +
        '.json?auth=' + vuexContext.state.token,
    {
      ...editedPost,
      updatedDate: new Date()
    })
      .then((result) => {
        // console.log(result)
        vuexContext.commit('editPost', editedPost)
      })
      .catch((err) => {
        // console.log('err: ', err)
        throw new Error('error: ', err)
      })
  },
  // For signing Up and signing In
  authenticateUser (vuexContext, authData) {
    // console.log('submit: ', authData.email)
    // console.log('submit: ', authData.password)

    // authUl for Sign-in mode
    let authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + process.env.fbAPIKey

    // it is Sign-Up Mode
    if (!authData.isLogin) {
      authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + process.env.fbAPIKey
    }

    // console.log('authUrl: ', authUrl)

    // we will return "AXIOS promise to the component so that
    // the component can then route to another page
    //    after successfully signing in
    return this.$axios.$post(authUrl, {
      email: authData.email,
      password: authData.password,
      returnSecureToken: true
    })
      .then((result) => {
        // console.log('index store result: ', result)
        vuexContext.commit('setToken', result.idToken)
        localStorage.setItem('token', result.idToken) // for page refresh

        // this will store the "TIME" (in milliseconds time)
        // when token will expire and NOT the NUMBER of seconds
        // before expiration
        localStorage.setItem('tokenExpiration',
          // multiply by 1k to convert to milliseconds
          new Date().getTime() + Number.parseInt(result.expiresIn) * 1000
        )

        // console.log('setting the cookies')
        // Now let's also store this token and expirationDate in Cookies also
        Cookie.set('jwt', result.idToken)
        Cookie.set('expirationDate',
          new Date().getTime() + Number.parseInt(result.expiresIn) * 1000
        )

        // removing 'setLogoutTImer" no Longer needed
        // vuexContext.dispatch('setLogoutTimer', result.expiresIn)

        this.$axios.$post('http://localhost:3000/api/track-data', {
          data: 'Authenticated user already'
        })

        return result
      })
      .catch((err) => {
        // console.log('store error: ', err)
        throw new Error('error here at the store', err)
      })
  },
  // check for TOken in the local storage upon "refresh"
  // basically this will be called on the "MIDDLEWARE" which will run before any secured
  //  or guarded ROUTE
  initAuth (vuexContext, req) { // this will be a normal request object coming from Express JS
    let token
    let expirationDate

    if (req) { // if token and expiration date source is the COOKIE
      // console.log('initAuth: ', req.headers.cookie)
      if (!req.headers.cookie) { // if there is no COOKIE header that is SET
        return
      }
      const jwtCookie =
        req.headers.cookie
          .split(';')
          .find(c => c.trim().startsWith('jwt='))

      // if we dont get a cookie. Because cookie starts with "jwt=" in the header
      if (!jwtCookie) {
        return
      }
      // otherwise
      token = jwtCookie.split('=')[1] //= => this would be the token we stored

      // console.log('initAuth: token, ', token)

      expirationDate = req.headers.cookie
        .split(';')
        .find(c => c.trim().startsWith('expirationDate='))
        .split('=')[1]
    } else { // if the source of "token" and "expirationDate" is "localStorage"
      token = localStorage.getItem('token')
      expirationDate = localStorage.getItem('tokenExpiration')
    } /** else - END  (extraction of token & expiration from localStorage */

    // expirationDate => in milliseconds format
    // new Date() also in milliseconds format
    // so below if statement is for checking if the current Date is already PAST the expiration date
    //    in short: expired  || or if NO TOKEN
    if (new Date().getTime() > +expirationDate || !token) {
      // instead of early implementation where we call vuexContext.dispatch('setLogoutTimer'
      // we are now clearing the timer. Because essentially this "if" statement
      // actually checks if the token is already expired. so below we'll just
      // commit the clearing of the token
      vuexContext.commit('clearToken')
      vuexContext.dispatch('logout')

      return
    }

    // console.log('getting the cookies: ', token)

    // let's start the logoutTimer wiht the remaining time fromt the expirationDate
    // vuexContext.dispatch('setLogoutTimer', +expirationDate - new Date().getTime())
    // let's set the token if there's any
    vuexContext.commit('setToken', token)
  },

  // setting the LogOUT TImer
  // WOnt work here anymore as per Max
  // setLogoutTimer (vuexContext, duration) {
  //   setTimeout(() => {
  //     vuexContext.commit('clearToken')
  //   }, duration)
  // }

  logout (vuexContext) {
    vuexContext.commit('clearToken')

    // clearing the cookies and the localStorage
    Cookie.remove('jwt')
    Cookie.remove('expiration')

    // If running on the client Browser
    if (process.client) { // or can be "if (localStorage) "
      localStorage.removeItem('token')
      localStorage.removeItem('tokenExpiration')
    }
  }

}

export const getters = {
  loadedPosts (state) {
    return state.loadedPosts
  },

  isAuthenticated (state) {
    return state.token != null
  }
}
