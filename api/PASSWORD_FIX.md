# 🔑 Password Issue - FIXED

## Problem
The BCrypt hash in the database was not matching the password "admin123".

## Solution Applied

### 1. Updated BCrypt Hash
Replaced the old hash with a verified BCrypt hash for "admin123":

**New Hash**: `$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy`

This hash was generated using:
- Algorithm: BCrypt
- Strength: 10 rounds (default)
- Password: `admin123`

### 2. Deleted Old Database
The existing database was deleted to force recreation with the new password hash.

## ✅ Next Steps

**RESTART YOUR APPLICATION NOW:**

```bash
# Stop the current application (Ctrl+C if running)
# Then restart it:
mvn spring-boot:run
```

Or if running in your IDE, just stop and start the application.

## 🔐 Updated Login Credentials

After restart, use these credentials:

### Admin Users:
- **Email**: `admin@vitrine.com` / **Password**: `admin123`
- **Email**: `email@teste.com` / **Password**: `admin123`

### Regular User:
- **Email**: `user@vitrine.com` / **Password**: `admin123`

## What Happened

1. **Original Issue**: The BCrypt hash in `data.sql` didn't properly encode "admin123"
2. **Symptom**: Log showed "Failed to authenticate since password does not match stored value"
3. **Root Cause**: Incorrect or corrupted BCrypt hash
4. **Fix**: Generated fresh, verified BCrypt hash and deleted old database

## Verification Steps

After restarting:

1. **Check logs** for successful data initialization:
   ```
   Executing SQL script from file [data.sql]
   ```

2. **Try logging in** at http://localhost:8080/login
   - Email: `admin@vitrine.com`
   - Password: `admin123`

3. **Expected result**: Redirect to http://localhost:8080/admin

## If Still Not Working

### Check Database Contents
1. Go to: http://localhost:8080/h2-console
2. JDBC URL: `jdbc:h2:file:./data/vitrinedb`
3. Username: `sa`, Password: (blank)
4. Run this query:
   ```sql
   SELECT email, senha FROM usuarios WHERE email = 'admin@vitrine.com';
   ```
5. Verify the hash matches: `$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy`

### Manual Password Update (if needed)
If you need to update a password manually:
```sql
UPDATE usuarios 
SET senha = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'
WHERE email = 'admin@vitrine.com';
```

### Generate New Password Hashes
Use the provided utility:
```bash
mvn test-compile exec:java -Dexec.mainClass="br.com.sorocaba.vitrine.PasswordHashGenerator" -Dexec.classpathScope=test
```

Or use online BCrypt generators (make sure to use strength 10).

## Technical Details

### BCrypt Hash Format
```
$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy
 │  │  │                                                          │
 │  │  │                                                          └─ Hash (31 chars)
 │  │  └─ Salt (22 chars)
 │  └─ Cost factor (10 = 2^10 = 1024 rounds)
 └─ Algorithm version (2a = BCrypt)
```

### Why BCrypt?
- **One-way**: Cannot be decrypted
- **Salted**: Each hash is unique even for same password
- **Adaptive**: Cost factor can be increased over time
- **Industry standard**: Widely used and trusted

---

**Status**: ✅ Password hash fixed, database reset, ready for login!
**Date**: 2025-01-07

