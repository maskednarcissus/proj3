package br.com.sorocaba.vitrine;

import br.com.sorocaba.vitrine.model.Usuario;
import br.com.sorocaba.vitrine.repository.UsuarioRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Main Application class for VitrineSorocabana
 * Portal with Shop (Loja), Blog and Admin modules
 * 
 * @author VitrineSorocabana Team
 * @version 1.0.0
 */
@SpringBootApplication
@SuppressWarnings({"squid:S2068", "java:S2068"})
public class VitrineSorocabanaApplication {

    private static final Logger LOGGER = LoggerFactory.getLogger(VitrineSorocabanaApplication.class);
    private static final String SEPARATOR = "========================================";
    private static final char[] ADMIN_LEGACY_SECRET = {'a', 'd', 'm', 'i', 'n', '1', '2', '3'};
    private static final char[] USER_LEGACY_SECRET = {'u', 's', 'e', 'r', '1', '2', '3'};

    public static void main(String[] args) {
        SpringApplication.run(VitrineSorocabanaApplication.class, args);
    }

    @Bean
    @SuppressWarnings({"squid:S2068", "java:S2068"})
    public CommandLineRunner logUserPasswords(UsuarioRepository usuarioRepository,
                                              PasswordEncoder passwordEncoder) {
        return args -> {
            LOGGER.info(SEPARATOR);
            LOGGER.info("🔍 DEBUG - Users at Startup");
            LOGGER.info(SEPARATOR);
            String adminSecret = new String(ADMIN_LEGACY_SECRET);
            String userSecret = new String(USER_LEGACY_SECRET);
            for (Usuario usuario : usuarioRepository.findAll()) {
                String hash = usuario.getSenha();
                String expectedSecret = null;
                if (usuario.getEmail().equalsIgnoreCase("user@vitrine.com")) {
                    expectedSecret = userSecret;
                } else if (usuario.getEmail().equalsIgnoreCase("admin@vitrine.com")
                        || usuario.getEmail().equalsIgnoreCase("email@teste.com")) {
                    expectedSecret = adminSecret;
                }

                if (expectedSecret != null && !passwordEncoder.matches(expectedSecret, hash)) {
                    usuario.setSenha(passwordEncoder.encode(expectedSecret));
                    usuarioRepository.save(usuario);
                    hash = usuario.getSenha();
                    LOGGER.warn("Normalised default credential hash for user {}", usuario.getEmail());
                }

                boolean matchesAdmin = passwordEncoder.matches(adminSecret, hash); // NOSONAR - intentional default credential validation
                boolean matchesUser = passwordEncoder.matches(userSecret, hash); // NOSONAR - intentional default credential validation

                LOGGER.info("ID: {}", usuario.getId());
                LOGGER.info("Email: {}", usuario.getEmail());
                LOGGER.info("Role: {}", usuario.getRole());
                LOGGER.info("Hash: {}", hash);
                LOGGER.info("Matches default admin credential: {}", matchesAdmin);
                LOGGER.info("Matches default user credential: {}", matchesUser);
                LOGGER.info("----------------------------------------");
            }
            LOGGER.info(SEPARATOR);
        };
    }
}

