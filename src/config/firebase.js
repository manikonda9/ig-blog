import firebase from "firebase";
import { devConfig } from "./config";

firebase.initializeApp(devConfig);

export default firebase;

export const auth = firebase.auth();
const databaseRef = firebase.database().ref();

export const dataRef = databaseRef.child("data");