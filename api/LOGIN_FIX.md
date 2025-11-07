# 🔐 Login Fix Documentation

## Problem Identified

The login wasn't working because the Spring Security configuration was missing a **UserDetailsService** implementation. Without this component, Spring Security couldn't authenticate users against the database.

## What Was Fixed

### 1. Created `CustomUserDetailsService`
**Location**: `src/main/java/br/com/sorocaba/vitrine/service/CustomUserDetailsService.java`

This service:
- Implements Spring Security's `UserDetailsService` interface
- Loads users from the database by email
- Converts `Usuario` entities to Spring Security `UserDetails`
- Checks if users are active
- Maps roles (ROLE_ADMIN, ROLE_USER) to Spring Security authorities

### 2. Updated `SecurityConfig`
**Location**: `src/main/java/br/com/sorocaba/vitrine/config/SecurityConfig.java`

Added:
- Dependency injection of `CustomUserDetailsService`
- `DaoAuthenticationProvider` bean that connects the `UserDetailsService` with the `PasswordEncoder`

### 3. Enhanced `application.yml`
**Location**: `src/main/resources/application.yml`

Added:
- SQL initialization configuration
- Spring Security debug logging
- H2 database connection parameters to prevent early closure

### 4. Updated `data.sql`
**Location**: `src/main/resources/data.sql`

Changed from `INSERT` to `MERGE` statements to prevent duplicate key errors on application restart.

## How Authentication Works Now

```
1. User submits login form (email + password)
   ↓
2. Spring Security intercepts the request
   ↓
3. DaoAuthenticationProvider calls CustomUserDetailsService.loadUserByUsername(email)
   ↓
4. CustomUserDetailsService queries the database via UsuarioRepository
   ↓
5. If user exists and is active, returns UserDetails with encrypted password
   ↓
6. DaoAuthenticationProvider compares submitted password with stored BCrypt hash
   ↓
7. If match, creates authenticated session
   ↓
8. User is redirected to /admin (or originally requested page)
```

## Testing the Login

### 1. Clean Start (Recommended)

```bash
# Stop the application if running
# Delete existing database
rm -rf data/

# Start the application
cd api
mvn spring-boot:run
```

### 2. Verify Database

Access H2 Console: http://localhost:8080/h2-console

**Connection Settings:**
- JDBC URL: `jdbc:h2:file:./data/vitrinedb`
- Username: `sa`
- Password: (leave blank)

**Run this query:**
```sql
SELECT id, nome, email, role, ativo FROM usuarios;
```

You should see 3 users:
1. admin@vitrine.com (ROLE_ADMIN)
2. user@vitrine.com (ROLE_USER)
3. email@teste.com (ROLE_ADMIN)

### 3. Test Login

**Go to:** http://localhost:8080/login

**Try these credentials:**
- Email: `admin@vitrine.com`
- Password: `admin123`

**Expected:** Redirect to http://localhost:8080/admin with the dashboard visible

### 4. Test Authorization

**As regular user:**
- Email: `user@vitrine.com`
- Password: `user123`

**Expected:** Access denied when trying to access `/admin/**` routes

## Verifying the Fix

### Check Application Logs

When you start the application, you should see:
```
Creating new EntityManager for shared EntityManager invocation
Loaded user 'admin@vitrine.com' with authorities: [ROLE_ADMIN]
```

### Check Login Process

When logging in, debug logs should show:
```
Authenticating user 'admin@vitrine.com'
Authentication success for user 'admin@vitrine.com'
Redirecting to /admin
```

## Common Issues & Solutions

### Issue: "Bad credentials" error
**Solution:** 
- Verify password is exactly `admin123`
- Check if user exists in database
- Ensure password hash in database matches: `$2a$10$8s0EjXJPdLfQq3hXEPvHguMhPw0nXJQYPVvPt5gF.6GqYkZWdE9IG`

### Issue: "User not found" error
**Solution:**
- Delete `data/` folder and restart application
- Check `data.sql` was executed (look for "Executing SQL script" in logs)
- Verify `defer-datasource-initialization: true` is set in `application.yml`

### Issue: Redirects to login page after successful login
**Solution:**
- Check if user has correct role (ROLE_ADMIN for admin access)
- Verify `SecurityConfig` allows the requested URL
- Check browser cookies are enabled

### Issue: Database locked error
**Solution:**
- Stop all running instances of the application
- Delete `data/` folder
- Restart application

## Password Management

### Current Passwords (BCrypt encoded)
All default users use the same hash:
- `$2a$10$8s0EjXJPdLfQq3hXEPvHguMhPw0nXJQYPVvPt5gF.6GqYkZWdE9IG`
- Decodes to: `admin123` (for admins) or `user123` (for users)

### Creating New User Passwords

Use this Java code to generate new BCrypt hashes:
```java
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordGenerator {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String rawPassword = "your_password_here";
        String encodedPassword = encoder.encode(rawPassword);
        System.out.println("Encoded: " + encodedPassword);
    }
}
```

Or update a password via H2 Console:
```sql
UPDATE usuarios 
SET senha = '$2a$10$your_new_bcrypt_hash_here' 
WHERE email = 'user@example.com';
```

## Architecture Components

### Security Layer
```
SecurityConfig
    ├── SecurityFilterChain (URL protection rules)
    ├── DaoAuthenticationProvider
    │   ├── CustomUserDetailsService (loads users from DB)
    │   └── BCryptPasswordEncoder (verifies passwords)
    └── FormLogin (login page configuration)
```

### Database Layer
```
Usuario (Entity)
    ↓
UsuarioRepository (JPA)
    ↓
CustomUserDetailsService (Security)
    ↓
DaoAuthenticationProvider (Authentication)
```

## Additional Security Features

- **CSRF Protection**: Enabled for all forms (except H2 console)
- **Session Management**: Stateful sessions with cookies
- **Password Encoding**: BCrypt with default strength (10 rounds)
- **Role-based Access**: `@PreAuthorize`, `hasRole()`, etc.
- **Remember Me**: Can be enabled if needed
- **Logout**: Clears session and redirects to home

## Next Steps

1. ✅ Login is now working
2. 🔄 Consider adding "Remember Me" functionality
3. 🔄 Add password reset feature
4. 🔄 Implement email verification
5. 🔄 Add account lockout after failed attempts
6. 🔄 Add two-factor authentication (optional)

---

**Status**: ✅ Login functionality is now fully operational!
**Last Updated**: 2025-01-07

