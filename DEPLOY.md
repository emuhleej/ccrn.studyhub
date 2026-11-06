# Deploy Adult CCRN Study Hub to GitHub Pages + Notion

**Draft only:** these are future setup instructions, not evidence of a deployment. This branch remains unmerged. Complete the clinical, identity and security review in `docs/clinical-review-process.md` before considering a separately authorized release. No production Firebase changes were made or tested.

## 1. Upload This Folder to GitHub

Create a new GitHub repository, then upload the contents of this folder:

- `index.html`
- `firebase-config.js`
- `study-state.js`
- `clinical-gate.js`
- `clinical-review.js`
- `learning-lab.js`
- `docs/` (the linked evidence reports)
- `README.md`
- `DEPLOY.md`
- `.nojekyll`

Upload the files inside the folder, not the folder itself.

## 2. Turn On GitHub Pages

1. Open the GitHub repository.
2. Go to `Settings`.
3. Open `Pages`.
4. Under `Build and deployment`, choose `Deploy from a branch`.
5. Choose branch `main`.
6. Choose folder `/root`.
7. Click `Save`.

GitHub will give you a public link like:

`https://your-username.github.io/adult-ccrn-study-hub/`

## 3. Embed in Notion

1. Copy the GitHub Pages link.
2. Open your Notion CCRN page.
3. Type `/embed`.
4. Paste the GitHub Pages link.
5. Resize the embed frame until it feels comfortable.

The app will now be accessible anywhere Notion is available.

## Optional: Sync Notes and Progress Across Devices

The app works without Firebase; notes and progress are saved per browser/device. The current anonymous Firebase adapter is also tied to a browser identity. It does not solve cross-device access. Account-based sign-in, conflict resolution and migration require separate design and validation.

### Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/).
2. Click `Add project`.
3. Name it something like `Adult CCRN Study Hub`.
4. Google Analytics is optional.

### Add a Web App

1. In Firebase, open Project settings.
2. Under `Your apps`, click the web icon `</>`.
3. Register the app.
4. Copy the Firebase config object.
5. Paste those values into `firebase-config.js`.

### Turn On Anonymous Auth

1. Open `Authentication`.
2. Click `Get started`.
3. Open `Sign-in method`.
4. Enable `Anonymous`.

### Create Firestore Database

1. Open `Firestore Database`.
2. Click `Create database`.
3. Start in production mode.
4. Choose a location.

### Firestore Rules

The following owner-scoped example is documentation only. It has not been deployed or tested against a Firestore emulator in this PR. Validate authentication, authorization and field limits in a separately approved safe environment:

```js
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/study/{docId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

Each anonymous Firebase user now writes to their own document. Anonymous identities may not persist across browsers or after storage is cleared. For dependable cross-device synchronization, implement account-based sign-in and a migration flow. Never publish permissive shared-document rules.
