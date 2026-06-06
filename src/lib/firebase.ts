import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import firebaseConfig from "../../firebase-applet-config.json";

let app;
let auth: Auth | null = null;
let db: Firestore | null = null;
let isFirebaseAvailable = false;

// Check if config has been modified from placeholder
const isValidConfig = 
  firebaseConfig &&
  firebaseConfig.apiKey &&
  firebaseConfig.apiKey !== "PLACEHOLDER_API_KEY" &&
  firebaseConfig.projectId &&
  firebaseConfig.projectId !== "PLACEHOLDER_PROJECT_ID";

if (isValidConfig) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    // Explicitly handle DB name for Enterprise multi-database instances if present
    db = getFirestore(app, firebaseConfig.firestoreDatabaseId || "default");
    isFirebaseAvailable = true;
    console.log("Firebase initialized successfully in VIVEKA.");
  } catch (error) {
    console.error("Firebase initialization failed:", error);
    isFirebaseAvailable = false;
  }
} else {
  console.log("Using local persistent browser storage mode (no valid Firebase credentials detected).");
}

export { auth, db, isFirebaseAvailable };
export default firebaseConfig;
