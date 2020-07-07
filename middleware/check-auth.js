export default function (context) {
  console.log('[Middleware] Check Auth')

  // removed the "if" statement because we have now put the handling fro both SERVER
  // and CLIENT for the retrieval of the token from COOKIE (if it is from SERVER)
  // then from "localSTorage" if it is from the CLIENT
  //    the initAuth" action.
  context.store.dispatch('initAuth', context.req)
}
