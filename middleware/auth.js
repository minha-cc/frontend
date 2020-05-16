import { AUTH_PATH } from '@/MinhaCCConstants'

export default function({ store, redirect, route }) {
  const signedIn = store.state.auth.currentUser.uid

  if (signedIn && route.name === AUTH_PATH) {
    redirect('/')
  }
  if (!signedIn && isInternalRoute(route)) {
    redirect(`/${AUTH_PATH}`)
  }
}

function isInternalRoute(route) {
  if (route.matched.some((record) => record.path !== `/${AUTH_PATH}`)) {
    return true
  }
}
