package br.com.sorocaba.vitrine;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * Utility class to generate BCrypt password hashes
 * Run this to generate new password hashes for users
 */
public class PasswordHashGenerator {
    
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        
        // Generate hash for admin123
        String admin123 = encoder.encode("admin123");
        System.out.println("Hash for 'admin123': " + admin123);
        
        // Generate hash for user123
        String user123 = encoder.encode("user123");
        System.out.println("Hash for 'user123': " + user123);
        
        // Verify the hashes work
        System.out.println("\nVerification:");
        System.out.println("admin123 matches: " + encoder.matches("admin123", admin123));
        System.out.println("user123 matches: " + encoder.matches("user123", user123));
        
        // Test the existing hash from database
        String existingHash = "$2a$10$8s0EjXJPdLfQq3hXEPvHguMhPw0nXJQYPVvPt5gF.6GqYkZWdE9IG";
        System.out.println("\nTesting existing hash:");
        System.out.println("Matches 'admin123': " + encoder.matches("admin123", existingHash));
        System.out.println("Matches 'user123': " + encoder.matches("user123", existingHash));
    }
}

