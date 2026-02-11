# 🚀 Quick Start Guide - Firebase Setup

## ⚡ 3-Minute Setup

### Step 1: Get Your Firebase Credentials (2 minutes)
1. Open: **https://console.firebase.google.com/u/0/project/niminil**
2. Click **⚙️ Settings** → **Project settings**
3. Scroll to **"Your apps"** section
4. Click **`</>`** (Web icon) if no app exists
5. **Copy** the entire config object

### Step 2: Update Your App (1 minute)
Open `guardian-firebase.html` and find line ~612:

**Replace this:**
```javascript
apiKey: "AIzaSyBXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
messagingSenderId: "123456789012",
appId: "1:123456789012:web:abcdef123456"
```

**With your actual values from Firebase Console**

### Step 3: Enable Authentication
1. In Firebase Console: **Authentication** → **Sign-in method**
2. Enable **Email/Password** ✓
3. Enable **Google** (optional) ✓

### Step 4: Test It!
1. Open `guardian-firebase.html` in browser
2. Register with email/password
3. Check Firebase Console → **Authentication** (user should appear)
4. Check **Realtime Database** → `users/{uid}` (profile should be there)

---

## 🎯 What Was Fixed

| Issue | Status | Fix |
|-------|--------|-----|
| User details not saving | ✅ FIXED | Added `saveUserProfile()` function |
| Missing Firebase config | ✅ FIXED | Updated structure with clear placeholders |
| Poor error handling | ✅ FIXED | Added specific error messages |
| No user display name | ✅ FIXED | Auto-set from email |
| Missing warning toasts | ✅ FIXED | Added orange warning style |

---

## 📂 Important Files

| File | Purpose |
|------|---------|
| `guardian-firebase.html` | Main app (needs your Firebase credentials) |
| `firebase-test.html` | Test your Firebase connection |
| `FIREBASE_SETUP_COMPLETE.md` | Detailed setup instructions |
| `FIXES_SUMMARY.md` | Complete list of all fixes |

---

## ✅ Verification Checklist

After updating credentials:
- [ ] `firebase-test.html` shows all tests passing
- [ ] Can register new user
- [ ] User appears in Firebase Console → Authentication
- [ ] User profile in Realtime Database → `users/{uid}`
- [ ] SOS button saves to `emergencies/{uid}`

---

## 🆘 Quick Troubleshooting

**"Invalid API Key"**
→ Copy-paste directly from Firebase Console, check for spaces

**"Permission Denied"**  
→ Set database rules (see FIREBASE_SETUP_COMPLETE.md)

**Profile not saving**
→ Open browser console (F12), check for errors

**Can't sign in**
→ Enable Email/Password in Firebase Console

---

## 🎉 You're All Set!

Once you update the Firebase credentials:
1. User registration will work ✓
2. User profiles will save automatically ✓
3. Emergency SOS will save to database ✓
4. Contacts will sync across devices ✓

**Need help?** Check `FIREBASE_SETUP_COMPLETE.md` for detailed instructions!
