import * as firebase from 'firebase/app'
import 'firebase/auth'

console.log('----')
console.log(process.env.FIREBASE_CONFIG.APIKEY)
const firebaseConfig = {
  apiKey: process.env.FIREBASE_CONFIG.APIKEY,
  projectId: process.env.FIREBASE_CONFIG.PROJECTID,
  authDomain: `${process.env.FIREBASE_CONFIG.PROJECTID}.firebaseapp.com`
}

firebase.apps.length ? firebase.app() : firebase.initializeApp(firebaseConfig)

export const firebaseAuth = firebase.auth()
