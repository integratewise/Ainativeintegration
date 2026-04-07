# Login Page Test Guide

## 🔍 **Troubleshooting: Login Page Not Reachable**

---

## ✅ **Quick Verification Steps**

### Step 1: Restart Dev Server
```bash
# Stop the current dev server (Ctrl+C)
# Then restart:
npm run dev
```

### Step 2: Clear Browser Cache
```bash
# Chrome/Edge:
Ctrl+Shift+Delete → Clear cache

# Or use hard reload:
Ctrl+Shift+R (Windows)
Cmd+Shift+R (Mac)
```

### Step 3: Navigate to App
```
http://localhost:5173/#app
```

### Step 4: Check Console
Open browser DevTools (F12) and check:
- Any error messages?
- Check Console tab
- Check Network tab for failed requests

---

## 🔧 **Manual Verification**

### Check if File Exists
```bash
# Verify the login page file exists:
ls -la components/auth/login-page-new.tsx

# Should show the file (412 lines)
```

### Check Import in App.tsx
```bash
# Verify App.tsx imports the new login page:
grep -n "LoginPageNew" App.tsx

# Should show:
# 23:import { LoginPageNew } from "./components/auth/login-page-new";
# 139:      <LoginPageNew
```

---

## 🎯 **Expected Behavior**

When you navigate to `http://localhost:5173/#app`:

1. **Hash routing triggers** (`#app`)
2. **currentPage** sets to `"app"`
3. **SpineProvider** wraps `WorkspaceApp`
4. **authState** is `"login"` (default)
5. **LoginPageNew** component renders

---

## 🐛 **Common Issues & Fixes**

### Issue 1: Old cached version
**Symptoms**: Seeing old onboarding page instead of login
**Fix**:
```bash
# Clear browser cache
# Hard reload: Ctrl+Shift+R
```

### Issue 2: Import error
**Symptoms**: Console shows module not found
**Fix**:
```bash
# Check if file exists:
cat components/auth/login-page-new.tsx

# If not found, the file might not have been created
# Re-run the implementation
```

### Issue 3: TypeScript error
**Symptoms**: Red underlines in editor
**Fix**:
```bash
# Run type check:
npm run type-check

# Fix any type errors shown
```

### Issue 4: Dev server not reloading
**Symptoms**: Changes not showing up
**Fix**:
```bash
# Stop server (Ctrl+C)
# Delete cache:
rm -rf node_modules/.vite
# Restart:
npm run dev
```

---

## 🔍 **Debug Mode**

### Add Console Logs

Edit `/App.tsx` to add debug logs:

```typescript
function WorkspaceApp() {
  const spine = useSpine();
  const [authState, setAuthState] = useState<"login" | "onboarding" | "workspace">("login");
  
  // ADD THIS DEBUG LOG:
  console.log("[DEBUG] WorkspaceApp rendered, authState:", authState);
  
  // ... rest of code
```

Then check browser console for:
```
[DEBUG] WorkspaceApp rendered, authState: login
```

### Check Page State

Add this to main App component:

```typescript
export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  
  // ADD THIS DEBUG LOG:
  console.log("[DEBUG] App rendered, currentPage:", currentPage);
  
  // ... rest of code
```

Check console for:
```
[DEBUG] App rendered, currentPage: app
```

---

## 🧪 **Alternative: Direct Component Test**

If routing isn't working, test the component directly:

### Create Test File
**File**: `/test-login.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login Page Test</title>
</head>
<body>
  <div id="root"></div>
  <script type="module">
    import { LoginPageNew } from './components/auth/login-page-new.tsx';
    import { createRoot } from 'react-dom/client';
    
    const root = createRoot(document.getElementById('root'));
    root.render(
      <LoginPageNew
        onLogin={async (email, password) => {
          console.log('Login:', email, password);
        }}
        onSignUp={() => console.log('Sign up')}
        onForgotPassword={() => console.log('Forgot password')}
      />
    );
  </script>
</body>
</html>
```

Navigate to: `http://localhost:5173/test-login.html`

---

## 📋 **Checklist**

Run through this checklist:

- [ ] Dev server is running (`npm run dev`)
- [ ] No errors in terminal
- [ ] File exists: `/components/auth/login-page-new.tsx`
- [ ] Import in App.tsx is correct
- [ ] Browser cache cleared
- [ ] Hard reload performed (Ctrl+Shift+R)
- [ ] Console shows no errors
- [ ] Hash is correct: `#app`
- [ ] URL is correct: `http://localhost:5173/#app`

---

## 🎬 **Step-by-Step Fresh Start**

If nothing works, try a complete fresh start:

### 1. Stop Everything
```bash
# Stop dev server
Ctrl+C

# Close browser
```

### 2. Clean Build
```bash
# Remove cache
rm -rf node_modules/.vite
rm -rf dist

# Reinstall (optional)
# npm install
```

### 3. Restart Server
```bash
npm run dev
```

### 4. Fresh Browser
```bash
# Open incognito/private window
# Navigate to: http://localhost:5173/#app
```

---

## 🔄 **What Should Happen**

### Correct Flow:

1. **Open**: `http://localhost:5173/#app`
2. **See**: Login page with split panel
3. **Left side**: Brand + connectors
4. **Right side**: Email/password form
5. **Enter**: Any email/password
6. **Click**: "Sign in" button
7. **See**: Loading spinner
8. **Wait**: 1 second
9. **See**: Onboarding page (Step 1)

---

## 📞 **Still Not Working?**

### Share Debug Info

Run these commands and share output:

```bash
# Check file structure
ls -la components/auth/

# Check imports
grep -n "LoginPageNew" App.tsx

# Check for TypeScript errors
npm run type-check

# Check dev server output
# (copy the last 20 lines from terminal)
```

### What to Share:

1. Browser console errors (screenshot)
2. Network tab errors (screenshot)
3. Terminal output (text)
4. What you see instead of login page (screenshot)
5. Your exact URL

---

## 🎯 **Quick Test Script**

Create this file to test: `/test-routing.ts`

```typescript
// Test if routing is working
console.log("Current URL:", window.location.href);
console.log("Current hash:", window.location.hash);
console.log("Expected hash:", "#app");
console.log("Match:", window.location.hash === "#app");

// Test if component exists
import { LoginPageNew } from './components/auth/login-page-new';
console.log("LoginPageNew imported:", typeof LoginPageNew);
```

Run in browser console after navigating to `/#app`

---

## ✅ **Expected Console Output**

When everything works correctly:

```
[DEBUG] App rendered, currentPage: app
[DEBUG] WorkspaceApp rendered, authState: login
```

When you log in:
```
[AUTH] Login successful: test@example.com
[ONBOARDING COMPLETE - 6 STEPS] { ... }
[SPINE INITIALIZED] { ... }
```

---

## 🚀 **Next Steps After It Works**

Once you see the login page:

1. ✅ Test login flow
2. ✅ Test onboarding flow
3. ✅ Test workspace loads
4. ✅ Verify console logs
5. ✅ Check all interactions

---

**If you're still having issues, please share:**
1. Screenshot of what you see
2. Browser console output
3. Terminal output
4. URL you're using

I'll help debug the specific issue! 🔍
