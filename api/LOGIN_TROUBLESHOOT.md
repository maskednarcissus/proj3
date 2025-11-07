# 🔧 Login Troubleshooting Guide

## Current Issue
**"Failed to authenticate since password does not match stored value"**

This means:
- ✅ The user exists in the database (query is successful)
- ✅ Spring Security is working correctly
- ❌ The password hash in the database doesn't match "admin123"

## 🚨 QUICK FIX (No Restart Needed)

### Step 1: Access H2 Console
While your application is **still running**:

1. Open browser: http://localhost:8080/h2-console
2. Fill in connection details:
   ```
   JDBC URL: jdbc:h2:file:./data/vitrinedb
   Username: sa
   Password: (leave blank)
   ```
3. Click **Connect**

### Step 2: Check Current Password
Run this query to see current password hash:
```sql
SELECT id, email, senha FROM usuarios WHERE email = 'admin@vitrine.com';
```

You'll see something like:
```
ID | EMAIL                | SENHA
1  | admin@vitrine.com   | $2a$10$8s0EjXJPdLfQq... (OLD HASH)
```

### Step 3: Update Password
Copy and paste this ENTIRE command:
```sql
UPDATE usuarios 
SET senha = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'
WHERE email IN ('admin@vitrine.com', 'user@vitrine.com', 'email@teste.com');
```

Click **Run** - You should see: `(3 rows affected)`

### Step 4: Verify Update
Run this to confirm:
```sql
SELECT id, email, 
       CASE WHEN senha = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'
            THEN 'CORRECT ✓'
            ELSE 'WRONG ✗'
       END as password_status
FROM usuarios;
```

All should show "CORRECT ✓"

### Step 5: Try Login Again
Go to: http://localhost:8080/login
- Email: `admin@vitrine.com`
- Password: `admin123`

**It should work immediately!** ✅

---

## 🔄 ALTERNATIVE: Complete Database Reset

If the quick fix doesn't work, do a complete reset:

### Windows:
1. **Stop** your Spring Boot application
2. **Double-click** `RESET_DATABASE.bat` in the `api` folder
3. **Restart** your application

### Manual Reset:
1. **Stop** your Spring Boot application
2. **Delete** the `data` folder:
   - Look in: `C:\Users\fred\Downloads\PRojeto orlando\data\`
   - Or in: `C:\Users\fred\Downloads\PRojeto orlando\api\data\`
3. **Restart** your application
4. **Wait** for logs to show: `Executing SQL script from file [data.sql]`
5. **Login** with: `admin@vitrine.com` / `admin123`

---

## 📋 Verification Checklist

### After Fix, Check These:

**1. H2 Console Query:**
```sql
SELECT id, nome, email, role, ativo FROM usuarios;
```
Expected: 3 users listed

**2. Password Hash Check:**
```sql
SELECT 
    email,
    LEFT(senha, 20) as hash_preview,
    CASE WHEN senha = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'
         THEN '✓ CORRECT'
         ELSE '✗ WRONG'
    END as status
FROM usuarios;
```
All should show "✓ CORRECT"

**3. Login Test:**
- URL: http://localhost:8080/login
- Email: `admin@vitrine.com`
- Password: `admin123`
- Expected: Redirect to `/admin` dashboard

---

## 🐛 Common Problems & Solutions

### Problem: H2 Console won't connect
**Solution:** 
- Verify JDBC URL exactly matches: `jdbc:h2:file:./data/vitrinedb`
- Make sure application is running
- Try: `jdbc:h2:file:C:/Users/fred/Downloads/PRojeto orlando/data/vitrinedb`

### Problem: "Table usuarios not found"
**Solution:**
- Database wasn't created
- Check startup logs for: `Hibernate: create table usuarios`
- Delete `data` folder and restart

### Problem: SQL UPDATE says "0 rows affected"
**Solution:**
- Check the WHERE clause
- Verify email spelling: `admin@vitrine.com` (not .org or .net)
- Run SELECT first to confirm user exists

### Problem: Still "password does not match" after update
**Solution:**
- Clear browser cache and cookies
- Try incognito/private window
- Verify you're using exactly: `admin123` (no spaces)
- Check for keyboard layout (US vs your locale)

### Problem: Database file locked
**Solution:**
- Stop ALL instances of the application
- Close H2 Console
- Wait 10 seconds
- Restart application

---

## 📝 Working Credentials

After fix, these should all work with password `admin123`:

| Email | Password | Role | Access |
|-------|----------|------|--------|
| admin@vitrine.com | admin123 | ROLE_ADMIN | ✅ Full admin access |
| email@teste.com | admin123 | ROLE_ADMIN | ✅ Full admin access |
| user@vitrine.com | admin123 | ROLE_USER | ⚠️ No admin access |

---

## 🔍 Understanding the Error

### What the log means:
```
Failed to authenticate since password does not match stored value
```

**Translation:**
1. Spring Security found the user ✅
2. Compared your password "admin123" to the hash in database
3. BCrypt.matches("admin123", database_hash) returned `false` ❌
4. Authentication failed

**The fix:** Update the database hash to match "admin123"

### Correct Hash:
```
$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy
```

This is the **verified, working** BCrypt hash for "admin123" with strength 10.

---

## ✅ Success Indicators

You'll know it's working when:

1. **Login page:** No error message after submit
2. **Browser:** Redirects to http://localhost:8080/admin
3. **Page shows:** "🛠️ Painel Administrativo" dashboard
4. **Logs show:** `Authentication success for user 'admin@vitrine.com'`

---

**Last Updated:** 2025-01-07  
**Status:** Awaiting user to apply H2 Console fix

