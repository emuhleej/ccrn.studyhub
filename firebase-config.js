// Optional Firebase sync for the Adult CCRN Study Hub.
// Paste your Firebase web app config here if you want notes, progress,
// and weak areas to sync across devices inside the Notion embed.
window.CCRN_FIREBASE_CONFIG = {
  apiKey: "PASTE_API_KEY",
  authDomain: "PASTE_PROJECT.firebaseapp.com",
  projectId: "PASTE_PROJECT_ID",
  storageBucket: "PASTE_PROJECT.firebasestorage.app",
  messagingSenderId: "PASTE_SENDER_ID",
  appId: "PASTE_APP_ID"
};

// Firestore document used for the shared CCRN study hub state.
window.CCRN_FIREBASE_DOC_PATH = "study/adult-ccrn-hub";
