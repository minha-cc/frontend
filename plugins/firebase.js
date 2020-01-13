import * as firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECT_ID
}

firebase.apps.length ? firebase.app() : firebase.initializeApp(firebaseConfig)

export const firebaseAuth = firebase.auth()
