# Firebase Integration Guide for Guardian App

## 🔥 How to Connect Your Firebase Project

### Step 1: Get Your Firebase Configuration

1. Go to your Firebase Console: https://console.firebase.google.com/u/0/project/niminil
2. Click on the **Settings** icon (⚙️) → **Project settings**
3. Scroll down to **"Your apps"** section
4. If you don't have a web app, click **"Add app"** → Select **Web** (</>) icon
5. Register your app with a nickname (e.g., "Guardian Web App")
6. Copy the **firebaseConfig** object

### Step 2: Update the HTML File

Open `guardian-firebase.html` and find this section (around line 400):

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "niminil.firebaseapp.com",
    databaseURL: "https://niminil-default-rtdb.firebaseio.com",
    projectId: "niminil",
    storageBucket: "niminil.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

Replace it with YOUR actual config from Firebase Console. It should look like:

```javascript
const firebaseConfig = {
    apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    authDomain: "niminil.firebaseapp.com",
    databaseURL: "https://niminil-default-rtdb.firebaseio.com",
    projectId: "niminil",
    storageBucket: "niminil.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef123456"
};
```

### Step 3: Enable Firebase Services

#### A. Enable Authentication
1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Enable **Google** sign-in provider
3. Enable **Email/Password** sign-in provider

#### B. Enable Realtime Database
1. Go to **Realtime Database** → **Create Database**
2. Choose location (e.g., us-central1)
3. Start in **Test mode** (for development)
4. Update rules later for production:

```json
{
  "rules": {
    "emergencies": {
      "$uid": {
        ".read": "$uid === auth.uid || auth.uid === 'ADMIN_UID'",
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```

#### C. Enable Firestore
1. Go to **Firestore Database** → **Create database**
2. Start in **Test mode**
3. Choose location
4. Update rules for production:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/contacts/{contactId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /emergencies/{emergencyId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```

### Step 4: Test the Application

1. Open `guardian-firebase.html` in your browser
2. Click "Continue with Google" or enter email/password
3. Add emergency contacts
4. Trigger SOS to test Firebase integration
5. Check Firebase Console to see data being saved

## 📊 Firebase Data Structure

### Realtime Database
```
emergencies/
  └── {userId}/
      └── {pushId}/
          ├── userId: "user123"
          ├── userEmail: "user@example.com"
          ├── location: { lat: 28.6139, lng: 77.2090 }
          ├── timestamp: 1706345678000
          └── status: "active"
```

### Firestore
```
users/
  └── {userId}/
      └── contacts/
          └── {contactId}/
              ├── name: "John Doe"
              ├── phone: "+1234567890"
              └── createdAt: Timestamp

emergencies/
  └── {emergencyId}/
      ├── userId: "user123"
      ├── userEmail: "user@example.com"
      ├── location: { lat: 28.6139, lng: 77.2090 }
      ├── timestamp: Timestamp
      └── status: "active"
```

## 🔐 Security Best Practices

1. **Never commit Firebase config to public repositories**
2. **Use environment variables for production**
3. **Enable App Check for additional security**
4. **Set up proper Firestore/Database rules**
5. **Enable email verification for users**

## 🚀 Next Steps

1. **Admin Dashboard**: Create admin panel to monitor all emergencies
2. **Cloud Functions**: Set up automated SMS/Email alerts
3. **FCM**: Add push notifications
4. **Analytics**: Track usage and emergency patterns
5. **Hosting**: Deploy to Firebase Hosting

## 📱 Admin Dashboard Integration

The admin dashboard (`admin-dashboard.html`) can also be connected to Firebase to:
- Monitor all active emergencies in real-time
- View user statistics
- Manage help centers
- Send alerts to emergency services

Would you like me to integrate Firebase into the admin dashboard as well?

## 🆘 Troubleshooting

**Issue**: "Firebase: Error (auth/unauthorized-domain)"
**Solution**: Add your domain to authorized domains in Firebase Console → Authentication → Settings

**Issue**: "Permission denied" errors
**Solution**: Check Firestore/Database security rules

**Issue**: Google Sign-in not working
**Solution**: Ensure Google provider is enabled in Authentication settings

---

**Need Help?** Check the Firebase documentation: https://firebase.google.com/docs
