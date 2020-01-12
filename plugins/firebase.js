import * as firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.firebase_api_key,
  projectId: process.env.firebase_project_id,
  authDomain: `${process.env.firebase_project_id}.firebaseapp.com`
}

firebase.apps.length ? firebase.app() : firebase.initializeApp(firebaseConfig)

export const firebaseAuth = firebase.auth()
