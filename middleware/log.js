export default function ({ route: { path } }) {
  console.log('[Middleware]  The Global Log Middleware is running')
  console.log('context: ', path)
}
