import { initializeApp } from "firebase/app";
import secrets from "./secrets";

const firebaseConfig = secrets.firebase;

const app = initializeApp(firebaseConfig);
