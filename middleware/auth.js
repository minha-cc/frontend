import { AUTH_PATH } from '@/MinhaCCConstants'

export default function({ store, redirect, route }) {
  const firebaseUid = localStorage.getItem('firebaseUid')
  if (firebaseUid != null && route.name === AUTH_PATH) {
    redirect('/dashboard')
  }
  if (firebaseUid == null && isInternalRoute(route)) {
    redirect(`/${AUTH_PATH}`)
  }
}

function isInternalRoute(route) {
  if (route.matched.some((record) => record.path !== `/${AUTH_PATH}`)) {
    return true
  }
}
