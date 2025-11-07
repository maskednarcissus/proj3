# VitrineSorocabana - Guia Rápido

## 🚀 Como Começar em 5 Minutos

### 1. Requisitos
- Java 17+
- Maven 3.6+
- IDE (IntelliJ IDEA, Eclipse, VS Code)

### 2. Clone e Execute
```bash
cd api
mvn spring-boot:run
```

### 3. Acesse a Aplicação
- **Portal**: http://localhost:8080
- **Loja**: http://localhost:8080/loja
- **Blog**: http://localhost:8080/blog
- **Admin**: http://localhost:8080/admin
- **H2 Console**: http://localhost:8080/h2-console

### 4. Login no Admin
```
Email: admin@vitrine.com
Senha: admin123
```

## 📝 Próximos Passos

### Adicionar um Novo Produto
1. Faça login no Admin
2. Acesse "Gerenciar Produtos"
3. Clique em "➕ Novo Produto"
4. Preencha os dados e salve

### Criar um Post no Blog
1. Faça login no Admin
2. Acesse "Gerenciar Posts"
3. Clique em "➕ Novo Post"
4. Escreva o conteúdo e marque "Publicar"

### Adicionar um Usuário
1. Faça login no Admin
2. Acesse "Gerenciar Usuários"
3. Clique em "➕ Novo Usuário"
4. Defina role como ROLE_ADMIN ou ROLE_USER

## 🔧 Configuração do Banco de Dados

### H2 (Desenvolvimento - Padrão)
Já configurado! Acesse o console em http://localhost:8080/h2-console

```yaml
JDBC URL: jdbc:h2:file:./data/vitrinedb
Username: sa
Password: (deixe em branco)
```

**Importante**: O banco é salvo localmente na pasta `data/`. Para resetar os dados, delete esta pasta.

### PostgreSQL (Produção)

1. Instale o PostgreSQL
2. Crie o banco de dados:
```sql
CREATE DATABASE vitrinedb;
```

3. Configure as variáveis de ambiente:
```bash
export DB_USERNAME=seu_usuario
export DB_PASSWORD=sua_senha
export SPRING_PROFILES_ACTIVE=prod
```

4. Execute a aplicação:
```bash
mvn spring-boot:run
```

## 🛠️ Desenvolvimento

### Estrutura de Código
```
src/main/java/br/com/sorocaba/vitrine/
├── controller/    # Adicionar novos endpoints aqui
├── service/       # Lógica de negócio
├── repository/    # Acesso ao banco
└── model/         # Entidades do banco

src/main/resources/
├── templates/     # Views Thymeleaf
└── static/css/    # Estilos CSS
```

### Adicionar um Novo Módulo

1. **Criar Entidade** (`model/NovaEntidade.java`)
```java
@Entity
@Table(name = "nova_entidade")
@Data
public class NovaEntidade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
}
```

2. **Criar Repository** (`repository/NovaEntidadeRepository.java`)
```java
@Repository
public interface NovaEntidadeRepository extends JpaRepository<NovaEntidade, Long> {
}
```

3. **Criar Service** (`service/NovaEntidadeService.java`)
```java
@Service
@RequiredArgsConstructor
public class NovaEntidadeService {
    private final NovaEntidadeRepository repository;
    
    public List<NovaEntidade> listarTodos() {
        return repository.findAll();
    }
}
```

4. **Criar Controller** (`controller/NovaEntidadeController.java`)
```java
@Controller
@RequestMapping("/nova-entidade")
@RequiredArgsConstructor
public class NovaEntidadeController {
    private final NovaEntidadeService service;
    
    @GetMapping
    public String index(Model model) {
        model.addAttribute("lista", service.listarTodos());
        return "nova-entidade/index";
    }
}
```

5. **Criar Template** (`templates/nova-entidade/index.html`)
```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org"
      xmlns:layout="http://www.ultraq.net.nz/thymeleaf/layout"
      layout:decorate="~{layout}">
<body>
    <main layout:fragment="content">
        <h1>Nova Entidade</h1>
        <!-- Seu conteúdo aqui -->
    </main>
</body>
</html>
```

## 🎨 Personalizar o Design

### Alterar Cores
Edite `src/main/resources/static/css/style.css`:
```css
:root {
  --amarelo: #F7D117;  /* Cor primária */
  --vermelho: #C1121F; /* Cor secundária */
  --bg: #FFF8CC;       /* Fundo */
}
```

### Adicionar CSS Customizado
Crie um novo arquivo CSS em `static/css/` e importe no template:
```html
<link rel="stylesheet" th:href="@{/css/seu-arquivo.css}">
```

## 🧪 Testes

### Executar Todos os Testes
```bash
mvn test
```

### Criar um Teste
```java
@SpringBootTest
class ProdutoServiceTest {
    @Autowired
    private ProdutoService service;
    
    @Test
    void deveBuscarProduto() {
        Produto produto = service.buscarPorId(1L);
        assertNotNull(produto);
    }
}
```

## 🐛 Debugging

### Habilitar Debug Logs
Edite `application.yml`:
```yaml
logging:
  level:
    br.com.sorocaba: DEBUG
```

### Acessar H2 Console
1. Vá para http://localhost:8080/h2-console
2. Use as credenciais:
   - JDBC URL: `jdbc:h2:file:./data/vitrinedb`
   - Username: `sa`
   - Password: (vazio)

## 📦 Build para Produção

### Gerar JAR
```bash
mvn clean package -DskipTests
```

### Executar JAR
```bash
java -jar target/vitrine-sorocabana-1.0.0.jar
```

## 🐳 Docker

### Dockerfile
```dockerfile
FROM openjdk:17-slim
WORKDIR /app
COPY target/vitrine-sorocabana-1.0.0.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

### Build e Run
```bash
docker build -t vitrine-sorocabana .
docker run -p 8080:8080 vitrine-sorocabana
```

## 🔐 Segurança

### Adicionar Novo Usuário Admin via SQL
```sql
INSERT INTO usuarios (nome, email, senha, role, ativo, data_criacao, data_atualizacao)
VALUES ('Novo Admin', 'novo@admin.com', '$2a$10$8s0EjXJPdLfQq3hXEPvHguMhPw0nXJQYPVvPt5gF.6GqYkZWdE9IG', 'ROLE_ADMIN', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
```
*Senha: admin123*

### Gerar Hash BCrypt para Nova Senha
```java
BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
String hash = encoder.encode("minha_senha");
System.out.println(hash);
```

## 📚 Recursos Úteis

- [Spring Boot Documentation](https://docs.spring.io/spring-boot/)
- [Thymeleaf Guide](https://www.thymeleaf.org/doc/tutorials/3.1/usingthymeleaf.html)
- [Spring Security Docs](https://docs.spring.io/spring-security/)
- [JPA Query Methods](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#jpa.query-methods)

## 💡 Dicas

### Hot Reload
O Spring DevTools está ativado! Suas mudanças em templates e código serão recarregadas automaticamente.

### Thymeleaf Layout
Use `layout:fragment` para inserir conteúdo no layout base:
```html
<main layout:fragment="content">
    <!-- Seu conteúdo -->
</main>
```

### Formatação de Datas
```html
<span th:text="${#temporals.format(data, 'dd/MM/yyyy')}"></span>
```

### Formatação de Valores
```html
<span th:text="'R$ ' + ${#numbers.formatDecimal(preco, 1, 2)}"></span>
```

## ❓ Problemas Comuns

### Login Não Funciona
1. **Verifique se a aplicação iniciou corretamente** e o `data.sql` foi executado
2. **Acesse o H2 Console** (http://localhost:8080/h2-console) e verifique se a tabela `usuarios` existe
3. **Delete a pasta `data/`** para forçar recriação do banco de dados
4. **Verifique os logs** para erros relacionados ao Spring Security
5. Use as credenciais corretas: `admin@vitrine.com` / `admin123`

### Erro de Compilação
```bash
mvn clean install
```

### Porta 8080 em Uso
Edite `application.yml`:
```yaml
server:
  port: 8081
```

### Banco de Dados Não Inicializa
Verifique se `data.sql` está em `src/main/resources/`

### Login Não Funciona
1. Verifique se as credenciais estão corretas
2. Confirme que `data.sql` foi executado
3. Acesse o H2 Console e verifique a tabela `usuarios`

---

**Pronto para começar!** 🚀 Se tiver dúvidas, consulte o README.md ou ARCHITECTURE.md

