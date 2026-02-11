# Guardian Firebase Login - Troubleshooting Guide

## Issues Fixed

I've identified and fixed several potential issues with the login page:

### 1. **Google Sign-In Improvements**
- ✅ Added proper OAuth scopes (`profile` and `email`)
- ✅ Enhanced error handling with user-friendly messages
- ✅ Added console logging for debugging

### 2. **Email/Password Login Improvements**
- ✅ Better error messages for common issues
- ✅ Added handling for weak passwords, invalid emails, and rate limiting
- ✅ Improved console logging for debugging

### 3. **Common Issues & Solutions**

#### Issue: Google Login Popup Blocked
**Symptoms:** Nothing happens when clicking "Continue with Google"
**Solution:** 
- Check browser console for popup blocker warnings
- Allow popups for this site in browser settings
- Try using a different browser

#### Issue: Unauthorized Domain Error
**Symptoms:** Error message about unauthorized domain
**Solution:**
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project: `niminil`
3. Go to Authentication → Settings → Authorized domains
4. Add your domain (e.g., `localhost` for local testing)

#### Issue: Email Login Not Working
**Symptoms:** Error when trying to login with email/password
**Solutions:**
- Ensure password is at least 6 characters
- Check if Email/Password authentication is enabled in Firebase Console
- Look at browser console for specific error codes

#### Issue: Firebase Connection Failed
**Symptoms:** Page loads but nothing works
**Solution:**
- Check browser console for Firebase initialization errors
- Verify internet connection
- Check Firebase project status

## Testing Steps

### Step 1: Use the Diagnostic Tool
1. Open `firebase-login-test.html` in your browser
2. Check if Firebase initializes successfully (green checkmark)
3. Try each login method and observe the detailed logs

### Step 2: Check Browser Console
1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for any red error messages
4. Common errors to look for:
   - `popup-blocked`
   - `unauthorized-domain`
   - `auth/configuration-not-found`
   - `auth/api-key-not-valid`

### Step 3: Verify Firebase Configuration

#### Enable Email/Password Authentication:
1. Go to [Firebase Console](https://console.firebase.google.com/u/0/project/niminil/authentication/providers)
2. Click on "Email/Password"
3. Enable it and save

#### Enable Google Sign-In:
1. Go to [Firebase Console](https://console.firebase.google.com/u/0/project/niminil/authentication/providers)
2. Click on "Google"
3. Enable it
4. Add support email
5. Save

#### Add Authorized Domains:
1. Go to Authentication → Settings → Authorized domains
2. Add these domains:
   - `localhost`
   - `127.0.0.1`
   - Any other domain you're using

## Files Modified

1. **guardian-firebase.html** - Main application (FIXED)
   - Enhanced Google login with better error handling
   - Improved email/password login with detailed error messages
   - Added console logging for debugging

2. **firebase-login-test.html** - Diagnostic tool (NEW)
   - Test Firebase connection
   - Test Google login
   - Test email/password login
   - View detailed error logs

## How to Test

### Option 1: Test with Diagnostic Tool
```
1. Open: file:///c:/niminil/firebase-login-test.html
2. Click "Test Google Login" or "Test Email Login"
3. Check the log output at the bottom
4. Look for specific error codes
```

### Option 2: Test Main Application
```
1. Open: file:///c:/niminil/guardian-firebase.html
2. Open browser console (F12)
3. Try logging in
4. Check console for detailed error messages
```

## Common Error Codes

| Error Code | Meaning | Solution |
|------------|---------|----------|
| `auth/popup-blocked` | Browser blocked the popup | Allow popups in browser settings |
| `auth/unauthorized-domain` | Domain not authorized | Add domain in Firebase Console |
| `auth/user-not-found` | Email not registered | App will auto-create account |
| `auth/wrong-password` | Incorrect password | Try again with correct password |
| `auth/weak-password` | Password too short | Use 6+ characters |
| `auth/too-many-requests` | Too many failed attempts | Wait a few minutes |
| `auth/popup-closed-by-user` | User closed popup | Try again |

## Next Steps

1. **Open the diagnostic tool** (`firebase-login-test.html`) to identify the specific issue
2. **Check browser console** for error codes
3. **Verify Firebase settings** in the console
4. **Report back** with the specific error code you're seeing

## Quick Fixes

### If Google Login doesn't work:
```javascript
// The fix is already applied - check for:
1. Popup blockers
2. Unauthorized domain error
3. Firebase Console settings
```

### If Email Login doesn't work:
```javascript
// The fix is already applied - check for:
1. Password length (min 6 chars)
2. Email/Password enabled in Firebase
3. Valid email format
```

## Need More Help?

Please provide:
1. What happens when you click login?
2. Any error messages you see
3. Browser console output
4. Which login method you're trying (Google or Email)
