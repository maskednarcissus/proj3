# 🔴 CRITICAL: Fix Login NOW

## The Problem
Your database has the WRONG password hash. I've added debug logging so you can see it.

## 🎯 DO THIS NOW (Choose ONE method):

---

## ✅ METHOD 1: H2 Console Update (30 seconds, NO RESTART)

### Step-by-Step:

1. **Keep your app running** ✓

2. **Open NEW browser tab**: http://localhost:8080/h2-console

3. **Fill in exactly:**
   ```
   JDBC URL:  jdbc:h2:file:./data/vitrinedb
   Username:  sa
   Password:  [LEAVE BLANK - press Tab or click away]
   ```

4. **Click "Connect"** button

5. **In the SQL box, paste this:**
   ```sql
   UPDATE usuarios 
   SET senha = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy';
   ```

6. **Click "Run" button** (or press Ctrl+Enter)

7. **See result:** Should say "(3) row(s) affected" or similar

8. **Try login again**: admin@vitrine.com / admin123

**DONE!** ✅

---

## ✅ METHOD 2: Complete Reset (2 minutes, REQUIRES RESTART)

1. **STOP your Spring Boot app** (Ctrl+C or Stop button in IDE)

2. **Open PowerShell** in project directory

3. **Run:**
   ```powershell
   Remove-Item -Recurse -Force "data"
   ```

4. **START your Spring Boot app** again

5. **Wait** for log: "Executing SQL script from file [data.sql]"

6. **Login**: admin@vitrine.com / admin123

**DONE!** ✅

---

## 🔍 Debug Info

After I added debug logging, when you try to login, you'll see:

```
========================================
🔍 DEBUG - User Authentication Details
========================================
Email: admin@vitrine.com
Role: ROLE_ADMIN
Password Hash in DB: $2a$10$8s0... [OLD HASH - WRONG!]
Expected Hash:       $2a$10$N9qo... [NEW HASH - CORRECT!]
Hashes Match: false
========================================
```

If "Hashes Match: false" → Your database has the OLD hash → **Use METHOD 1 or 2**

If "Hashes Match: true" → Something else is wrong → Contact me

---

## 📸 Screenshots Guide

### H2 Console Connection:
```
┌─────────────────────────────────────┐
│ JDBC URL: jdbc:h2:file:./data/vi...│
│ User Name: sa                       │
│ Password:  [____________________]   │  ← LEAVE EMPTY!
│                                     │
│         [Connect] [Cancel]          │
└─────────────────────────────────────┘
```

### SQL Execution:
```
┌─────────────────────────────────────┐
│ SQL Command:                        │
│ ┌─────────────────────────────────┐ │
│ │ UPDATE usuarios                 │ │
│ │ SET senha = '$2a$10$N9qo8u...  │ │
│ │                                 │ │
│ └─────────────────────────────────┘ │
│                                     │
│         [Run] [Clear]               │
└─────────────────────────────────────┘
```

### Success Result:
```
UPDATE 3
(3) row(s) affected in 12ms
```

---

## ❌ Common Mistakes

1. **Wrong JDBC URL:**
   - ❌ `jdbc:h2:mem:vitrinedb` (this is in-memory, wrong!)
   - ✅ `jdbc:h2:file:./data/vitrinedb` (file-based, correct!)

2. **Forgot to click "Connect":**
   - You must click Connect BEFORE running SQL

3. **Typed password instead of pasting:**
   - Don't type it! Copy-paste the ENTIRE hash

4. **Wrong SQL:**
   - Must include the single quotes around the hash
   - Hash must start with `$2a$10$N9qo...`

5. **Didn't restart after Method 2:**
   - Method 2 requires stopping and starting the app

---

## ✅ How to Confirm It Worked

### After Method 1 (H2 Console):
- Just try logging in immediately
- No restart needed

### After Method 2 (Database Reset):
- Check logs for: "Executing SQL script from file [data.sql]"
- Then try logging in

### Login Should:
1. NOT show "Credenciais inválidas"
2. NOT redirect to /login?error
3. REDIRECT to /admin
4. SHOW admin dashboard

### Debug Logs Should Show:
```
========================================
🔍 DEBUG - User Authentication Details
========================================
Email: admin@vitrine.com
Role: ROLE_ADMIN
Password Hash in DB: $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy
Expected Hash:       $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy
Hashes Match: true  ← THIS SHOULD BE TRUE!
========================================
```

---

## 🆘 Still Not Working?

Share your debug logs (the box with 🔍) and I'll help immediately!

---

**DO METHOD 1 NOW - It's faster and doesn't require restart!**

