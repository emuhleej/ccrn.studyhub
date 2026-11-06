// Optional Firebase sync for the Adult CCRN Study Hub.
// Paste your Firebase web app config here if you want notes, progress,
// and weak areas to sync within the same anonymous browser identity.
// Account-based cross-device identity is not implemented. Leave placeholders
// for local-only use. Automated tests replace this file with synthetic config.
window.CCRN_FIREBASE_CONFIG = {
  apiKey: "PASTE_API_KEY",
  authDomain: "PASTE_PROJECT.firebaseapp.com",
  projectId: "PASTE_PROJECT_ID",
  storageBucket: "PASTE_PROJECT.firebasestorage.app",
  messagingSenderId: "PASTE_SENDER_ID",
  appId: "PASTE_APP_ID"
};

// The adapter derives users/<authenticated uid>/study/adult-ccrn-hub.
// No shared-document override or automatic legacy-data migration is supported.
