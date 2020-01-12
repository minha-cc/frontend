import * as firebase from 'firebase/app'
import 'firebase/auth'

console.log('----')
console.log(process.env.APIKEY)
const firebaseConfig = {
  apiKey: process.env.APIKEY,
  projectId: process.env.PROJECTID,
  authDomain: `${process.env.PROJECTID}.firebaseapp.com`
}

firebase.apps.length ? firebase.app() : firebase.initializeApp(firebaseConfig)

export const firebaseAuth = firebase.auth()
