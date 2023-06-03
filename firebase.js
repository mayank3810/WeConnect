import { getApps, initializeApp } from "firebase/app";
import firebaseConfig from "./secrets";
import { getFirestore } from "firebase/firestore";

// if (getApps().length === 0) {

//   }
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
