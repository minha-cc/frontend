export default function({ store, redirect, route }) {
  const firebaseUid = localStorage.getItem('firebaseUid')
  if (firebaseUid != null && route.name === 'signin') {
    redirect('/dashboard')
  }
  if (firebaseUid == null && isInternalRoute(route)) {
    redirect('/signin')
  }
}

function isInternalRoute(route) {
  if (route.matched.some((record) => record.path !== '/signin')) {
    return true
  }
}
