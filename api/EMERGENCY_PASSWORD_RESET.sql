-- ⚠️ EMERGENCY PASSWORD RESET
-- Use this script in H2 Console to fix the password issue immediately
-- 
-- HOW TO USE:
-- 1. Go to: http://localhost:8080/h2-console
-- 2. JDBC URL: jdbc:h2:file:./data/vitrinedb
-- 3. Username: sa
-- 4. Password: (leave blank)
-- 5. Click Connect
-- 6. Copy and paste ALL commands below and run them

-- First, check current password hash
SELECT id, email, senha, role FROM usuarios WHERE email = 'admin@vitrine.com';

-- Update all users with the correct BCrypt hash for 'admin123'
UPDATE usuarios 
SET senha = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'
WHERE id IN (1, 2, 3);

-- Verify the update
SELECT id, nome, email, role, 
       CASE WHEN senha = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy' 
            THEN 'PASSWORD UPDATED ✓' 
            ELSE 'OLD PASSWORD ✗' 
       END as status
FROM usuarios;

-- ✅ After running these commands, try logging in again with:
-- Email: admin@vitrine.com
-- Password: admin123

