# Firebase Setup Instructions for Guardian App

## 🔧 Quick Fix Required

Your Firebase integration is almost complete! You just need to add your actual Firebase credentials.

## 📋 Steps to Get Your Firebase Credentials

### 1. Go to Firebase Console
Visit: https://console.firebase.google.com/u/0/project/niminil

### 2. Get Your Configuration
1. Click on the **Settings** gear icon (⚙️) in the left sidebar
2. Select **Project settings**
3. Scroll down to **Your apps** section
4. If you don't have a web app yet:
   - Click **Add app** button
   - Select the **Web** icon (`</>`)
   - Give it a nickname (e.g., "Guardian Web App")
   - Click **Register app**
5. You'll see your Firebase configuration object

### 3. Copy Your Configuration
You'll see something like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC1234567890abcdefghijklmnopqrs",
  authDomain: "niminil.firebaseapp.com",
  databaseURL: "https://niminil-default-rtdb.firebaseio.com",
  projectId: "niminil",
  storageBucket: "niminil.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456"
};
```

### 4. Update Your Files
Replace the placeholder values in these files:

#### File: `guardian-firebase.html` (Line ~612)
```javascript
const firebaseConfig = {
    apiKey: "YOUR_ACTUAL_API_KEY_HERE",  // ← Replace this
    authDomain: "niminil.firebaseapp.com",
    databaseURL: "https://niminil-default-rtdb.firebaseio.com",
    projectId: "niminil",
    storageBucket: "niminil.appspot.com",
    messagingSenderId: "YOUR_ACTUAL_SENDER_ID",  // ← Replace this
    appId: "YOUR_ACTUAL_APP_ID"  // ← Replace this
};
```

## 🔒 Enable Authentication Methods

### Enable Email/Password Authentication:
1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Click on **Email/Password**
3. Toggle **Enable** switch
4. Click **Save**

### Enable Google Sign-In:
1. In the same **Sign-in method** page
2. Click on **Google**
3. Toggle **Enable** switch
4. Select a support email
5. Click **Save**

## 🗄️ Set Up Database Rules

### Realtime Database Rules:
1. Go to **Realtime Database** → **Rules** tab
2. Replace with these rules:

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    },
    "emergencies": {
      "$uid": {
        ".read": "auth != null",
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```

3. Click **Publish**

### Firestore Rules:
1. Go to **Firestore Database** → **Rules** tab
2. Replace with these rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      match /contacts/{contactId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
    
    match /emergencies/{emergencyId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

3. Click **Publish**

## ✅ What's Been Fixed

### 1. **User Profile Saving** ✓
- User details (email, displayName, uid) are now saved to Realtime Database
- Profile is saved under `users/{uid}/` path
- Includes timestamps for createdAt, lastLogin, and updatedAt

### 2. **Dual Database Storage** ✓
- User profiles saved to both Realtime Database AND Firestore
- Emergency alerts saved to both databases for redundancy

### 3. **Better Error Handling** ✓
- Specific error messages for wrong password, user not found, etc.
- Console logging for debugging
- Warning toasts if database sync fails

### 4. **Auto-Registration** ✓
- If user doesn't exist, account is automatically created
- Display name is set from email
- Profile is immediately saved to database

## 🧪 Testing After Setup

1. Open `guardian-firebase.html` in your browser
2. Try registering with email/password
3. Check Firebase Console:
   - **Authentication** → You should see the new user
   - **Realtime Database** → Check `users/{uid}` for profile data
   - **Firestore** → Check `users` collection

4. Test SOS button:
   - Click SOS button
   - Check `emergencies/{uid}` in Realtime Database
   - Check `emergencies` collection in Firestore

## 🐛 Troubleshooting

### Error: "Permission denied"
- Check that you've published the database rules
- Verify user is logged in before triggering SOS

### Error: "API key not valid"
- Double-check you copied the correct API key
- Make sure there are no extra spaces

### User profile not saving
- Open browser console (F12)
- Look for error messages
- Check Firebase Console → Realtime Database to see if data appears

### Can't sign in with Google
- Verify Google sign-in is enabled in Firebase Console
- Check that you're using HTTPS or localhost (required for Google auth)

## 📱 Data Structure

### Realtime Database:
```
niminil-default-rtdb/
├── users/
│   └── {userId}/
│       ├── uid: "abc123..."
│       ├── email: "user@example.com"
│       ├── displayName: "user"
│       ├── photoURL: null
│       ├── createdAt: 1234567890
│       ├── lastLogin: 1234567890
│       └── updatedAt: 1234567890
└── emergencies/
    └── {userId}/
        └── {emergencyId}/
            ├── userId: "abc123..."
            ├── userEmail: "user@example.com"
            ├── location: {lat: 0, lng: 0}
            ├── timestamp: 1234567890
            └── status: "active"
```

## 🎉 Next Steps

After updating your Firebase credentials:
1. Test user registration
2. Test user login
3. Verify profile data in Firebase Console
4. Test SOS emergency alerts
5. Check that emergency data is saved

Need help? Check the browser console for detailed error messages!
