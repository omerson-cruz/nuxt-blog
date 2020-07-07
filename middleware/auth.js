export default function (context) {
  console.log('[MiddleWare] running Authentication')

  if (!context.store.getters.isAuthenticated) {
    context.redirect('/admin/auth')
  }
}
