# VitrineSorocabana API

Portal completo com Loja, Blog e Admin desenvolvido com Spring Boot e Thymeleaf.

## 🏗️ Arquitetura

Este projeto segue uma arquitetura em camadas baseada em boas práticas do Spring Framework:

```
api/
├── src/
│   ├── main/
│   │   ├── java/br/com/sorocaba/vitrine/
│   │   │   ├── VitrineSorocabanaApplication.java    # Classe principal
│   │   │   ├── config/                              # Configurações
│   │   │   │   ├── SecurityConfig.java             # Segurança
│   │   │   │   └── WebConfig.java                  # Web MVC
│   │   │   ├── controller/                          # Controladores
│   │   │   │   ├── PortalController.java           # Portal principal
│   │   │   │   ├── LojaController.java             # Loja
│   │   │   │   ├── BlogController.java             # Blog
│   │   │   │   └── AdminController.java            # Administração
│   │   │   ├── model/                               # Entidades
│   │   │   │   ├── Usuario.java                    # Usuário
│   │   │   │   ├── Produto.java                    # Produto
│   │   │   │   └── Post.java                       # Post do blog
│   │   │   ├── repository/                          # Repositórios
│   │   │   │   ├── UsuarioRepository.java
│   │   │   │   ├── ProdutoRepository.java
│   │   │   │   └── PostRepository.java
│   │   │   └── service/                             # Serviços
│   │   │       ├── UsuarioService.java
│   │   │       ├── ProdutoService.java
│   │   │       └── PostService.java
│   │   └── resources/
│   │       ├── application.yml                      # Configuração principal
│   │       ├── application-prod.yml                 # Configuração de produção
│   │       ├── data.sql                             # Dados iniciais
│   │       ├── static/                              # Recursos estáticos
│   │       │   └── css/
│   │       │       └── style.css                    # Estilos
│   │       └── templates/                           # Templates Thymeleaf
│   │           ├── layout.html                      # Layout base
│   │           ├── login.html                       # Página de login
│   │           ├── portal/
│   │           │   └── index.html                   # Portal principal
│   │           ├── loja/
│   │           │   ├── index.html                   # Catálogo
│   │           │   └── produto-detalhes.html        # Detalhes do produto
│   │           ├── blog/
│   │           │   ├── index.html                   # Lista de posts
│   │           │   └── post-detalhes.html           # Post completo
│   │           └── admin/
│   │               ├── dashboard.html               # Dashboard
│   │               ├── produtos/
│   │               │   ├── lista.html               # Lista de produtos
│   │               │   └── form.html                # Formulário
│   │               ├── posts/
│   │               │   ├── lista.html               # Lista de posts
│   │               │   └── form.html                # Formulário
│   │               └── usuarios/
│   │                   ├── lista.html               # Lista de usuários
│   │                   └── form.html                # Formulário
│   └── test/                                         # Testes
└── pom.xml                                           # Configuração Maven

```

## 🚀 Tecnologias

- **Spring Boot 3.2.0** - Framework principal
- **Spring Web** - Controladores REST e MVC
- **Spring Data JPA** - Acesso a dados
- **Spring Security** - Autenticação e autorização
- **Thymeleaf** - Template engine
- **H2 Database** - Banco de dados em memória (desenvolvimento)
- **PostgreSQL** - Banco de dados (produção)
- **Lombok** - Redução de boilerplate
- **Maven** - Gerenciamento de dependências

## 📋 Pré-requisitos

- Java 17 ou superior
- Maven 3.6+
- (Opcional) PostgreSQL 14+ para produção

## 🔧 Instalação e Execução

### 1. Clone o repositório
```bash
cd api
```

### 2. Compile o projeto
```bash
mvn clean install
```

### 3. Execute a aplicação
```bash
mvn spring-boot:run
```

### 4. Acesse a aplicação
- **Portal**: http://localhost:8080
- **Loja**: http://localhost:8080/loja
- **Blog**: http://localhost:8080/blog
- **Admin**: http://localhost:8080/admin
- **H2 Console**: http://localhost:8080/h2-console

## 🔐 Credenciais Padrão

### Administrador
- **Email**: admin@vitrine.com
- **Senha**: admin123

### Usuário
- **Email**: user@vitrine.com
- **Senha**: user123

## 🗄️ Banco de Dados

### Desenvolvimento (H2)
O banco H2 é criado automaticamente como arquivo local em `./data/vitrinedb`. Acesse o console em:
- URL: http://localhost:8080/h2-console
- JDBC URL: `jdbc:h2:file:./data/vitrinedb`
- Username: `sa`
- Password: (deixe em branco)

**Nota**: Os dados persistem entre reinicializações. Para resetar, delete a pasta `data/`.

### Produção (PostgreSQL)
Configure as variáveis de ambiente:
```bash
export DB_USERNAME=seu_usuario
export DB_PASSWORD=sua_senha
export SPRING_PROFILES_ACTIVE=prod
```

Ou edite o arquivo `application-prod.yml`.

## 📝 Funcionalidades

### Portal (/)
- Página inicial com links para todos os módulos
- Design responsivo com cores de Sorocaba

### Loja (/loja)
- Catálogo de produtos
- Detalhes de produto
- Sistema de estoque
- Preços formatados

### Blog (/blog)
- Lista de posts publicados
- Visualização de post completo
- Data de publicação

### Admin (/admin)
- Dashboard com estatísticas
- CRUD de Usuários
- CRUD de Produtos
- CRUD de Posts
- Autenticação obrigatória
- Acesso restrito a ROLE_ADMIN

## 🔒 Segurança

- **Autenticação baseada em formulário** com Spring Security
- **UserDetailsService customizado** para autenticação via banco de dados
- **Senhas criptografadas** com BCrypt
- **Proteção CSRF** habilitada para formulários
- **Controle de acesso baseado em roles** (ROLE_ADMIN, ROLE_USER)
- **Sessões seguras** gerenciadas pelo Spring Security
- **DaoAuthenticationProvider** para validação de credenciais

## 🧪 Testes

Execute os testes com:
```bash
mvn test
```

## 📦 Build para Produção

```bash
mvn clean package -DskipTests
```

O JAR será gerado em `target/vitrine-sorocabana-1.0.0.jar`

Execute:
```bash
java -jar target/vitrine-sorocabana-1.0.0.jar --spring.profiles.active=prod
```

## 🌐 Deploy

### Heroku
```bash
heroku create vitrine-sorocabana
heroku addons:create heroku-postgresql
git push heroku main
```

### Docker
```dockerfile
FROM openjdk:17-slim
COPY target/vitrine-sorocabana-1.0.0.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
```

```bash
docker build -t vitrine-sorocabana .
docker run -p 8080:8080 vitrine-sorocabana
```

## 📚 Documentação Adicional

- [Spring Boot Reference](https://docs.spring.io/spring-boot/docs/current/reference/html/)
- [Thymeleaf Documentation](https://www.thymeleaf.org/documentation.html)
- [Spring Security Reference](https://docs.spring.io/spring-security/reference/index.html)

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

## 👥 Autores

- VitrineSorocabana Team

## 📞 Suporte

Para suporte, envie um email para suporte@vitrine.com ou abra uma issue no GitHub.

