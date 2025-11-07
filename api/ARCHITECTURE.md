# VitrineSorocabana - Documentação de Arquitetura

## 📐 Visão Geral da Arquitetura

Este projeto segue o padrão **MVC (Model-View-Controller)** com arquitetura em camadas do Spring Boot, garantindo separação de responsabilidades e facilidade de manutenção.

## 🏛️ Camadas da Aplicação

### 1. **Presentation Layer (Camada de Apresentação)**
- **Controllers**: Recebem requisições HTTP e retornam views Thymeleaf
- **Templates**: Views Thymeleaf com HTML dinâmico
- **Static Resources**: CSS, JavaScript, imagens

**Localização**: `controller/`, `templates/`, `static/`

### 2. **Business Layer (Camada de Negócio)**
- **Services**: Contêm a lógica de negócio da aplicação
- **DTOs**: Objetos de transferência de dados
- **Validators**: Validações customizadas

**Localização**: `service/`, `dto/`

### 3. **Persistence Layer (Camada de Persistência)**
- **Repositories**: Interface com o banco de dados (Spring Data JPA)
- **Entities/Models**: Representação das tabelas do banco

**Localização**: `repository/`, `model/`

### 4. **Cross-Cutting Concerns (Transversais)**
- **Configuration**: Configurações de segurança, web, etc.
- **Exception Handling**: Tratamento global de exceções
- **Security**: Autenticação e autorização

**Localização**: `config/`, `exception/`

## 🔄 Fluxo de Requisição

```
Browser → Controller → Service → Repository → Database
   ↑                                              ↓
   └──────── View (Thymeleaf) ←─────────────────┘
```

### Exemplo Prático: Listar Produtos

1. **Browser**: Usuário acessa `/loja`
2. **Controller** (`LojaController`): Recebe a requisição
3. **Service** (`ProdutoService`): Busca lógica de negócio
4. **Repository** (`ProdutoRepository`): Consulta o banco de dados
5. **Database**: Retorna os dados
6. **Service**: Processa os dados
7. **Controller**: Adiciona os dados ao Model
8. **Thymeleaf**: Renderiza a view `loja/index.html`
9. **Browser**: Recebe o HTML renderizado

## 📦 Estrutura de Pacotes

```
br.com.sorocaba.vitrine/
├── VitrineSorocabanaApplication.java   # Classe principal
├── config/                              # Configurações
│   ├── SecurityConfig.java             # Spring Security
│   └── WebConfig.java                  # Web MVC
├── controller/                          # Controladores MVC
│   ├── PortalController.java
│   ├── LojaController.java
│   ├── BlogController.java
│   └── AdminController.java
├── model/                               # Entidades JPA
│   ├── Usuario.java
│   ├── Produto.java
│   └── Post.java
├── repository/                          # Repositórios Spring Data
│   ├── UsuarioRepository.java
│   ├── ProdutoRepository.java
│   └── PostRepository.java
├── service/                             # Lógica de negócio
│   ├── UsuarioService.java
│   ├── ProdutoService.java
│   └── PostService.java
├── dto/                                 # Data Transfer Objects
│   ├── ProdutoDTO.java
│   └── PostDTO.java
└── exception/                           # Tratamento de exceções
    ├── GlobalExceptionHandler.java
    └── ResourceNotFoundException.java
```

## 🔐 Arquitetura de Segurança

### Spring Security Configuration

```
Public Access:
- / (Portal)
- /loja/** (Loja)
- /blog/** (Blog)
- /login
- /css/**, /js/**, /images/**

Authenticated Access (ROLE_ADMIN):
- /admin/**
```

### Fluxo de Autenticação

1. Usuário acessa `/admin`
2. Spring Security intercepta
3. Redireciona para `/login`
4. Usuário envia credenciais
5. `SecurityConfig` valida no banco
6. Se válido, cria sessão autenticada
7. Redireciona para `/admin`

## 🗄️ Arquitetura de Dados

### Diagrama de Entidades

```
┌─────────────┐
│   Usuario   │
├─────────────┤
│ id (PK)     │
│ nome        │
│ email       │
│ senha       │
│ role        │
│ ativo       │
└─────────────┘
       │
       │ 1
       │
       │ N
       ▼
┌─────────────┐       ┌─────────────┐
│    Post     │       │   Produto   │
├─────────────┤       ├─────────────┤
│ id (PK)     │       │ id (PK)     │
│ titulo      │       │ nome        │
│ conteudo    │       │ descricao   │
│ autor_id(FK)│       │ preco       │
│ publicado   │       │ estoque     │
│ data_public │       │ ativo       │
└─────────────┘       └─────────────┘
```

### Relacionamentos

- **Usuario → Post**: Um para Muitos (1:N)
- Cada post tem um autor (usuário)

## 🎨 Arquitetura de Templates (Thymeleaf)

### Layout Pattern

Usamos o **Thymeleaf Layout Dialect** para reutilização de código:

```
layout.html (Base)
    ├── portal/index.html
    ├── loja/index.html
    ├── blog/index.html
    └── admin/dashboard.html
```

### Fragmentos Comuns

- **Header**: Navegação e branding
- **Footer**: Copyright e links
- **Styles**: CSS customizado
- **Scripts**: JavaScript

## 🔧 Padrões de Design Utilizados

### 1. **MVC (Model-View-Controller)**
- **Model**: Entidades JPA
- **View**: Templates Thymeleaf
- **Controller**: Controllers Spring

### 2. **Repository Pattern**
- Abstração da camada de dados
- Spring Data JPA fornece implementação

### 3. **Service Layer Pattern**
- Lógica de negócio isolada
- Transações gerenciadas por `@Transactional`

### 4. **DTO Pattern**
- Transferência de dados entre camadas
- Evita expor entidades diretamente

### 5. **Dependency Injection**
- Inversão de controle via Spring
- `@Autowired` e `@RequiredArgsConstructor` (Lombok)

### 6. **Builder Pattern**
- Lombok `@Data` e `@Builder` para construtores fluentes

## 🚀 Tecnologias e Frameworks

| Camada | Tecnologia | Propósito |
|--------|------------|-----------|
| Web | Spring Web MVC | Controllers e REST |
| Template Engine | Thymeleaf | Renderização de HTML |
| Persistência | Spring Data JPA | Acesso a dados |
| Segurança | Spring Security | Autenticação/Autorização |
| Database | H2 (file-based) / PostgreSQL | Armazenamento |
| Build | Maven | Gerenciamento de dependências |
| Validação | Bean Validation | Validação de dados |

## 📝 Convenções de Código

### Nomenclatura

- **Classes**: PascalCase (`ProdutoService`)
- **Métodos**: camelCase (`buscarPorId`)
- **Constantes**: UPPER_SNAKE_CASE (`MAX_ESTOQUE`)
- **Packages**: lowercase (`br.com.sorocaba.vitrine`)

### Anotações

- `@Entity`: Entidades JPA
- `@Repository`: Repositórios
- `@Service`: Serviços
- `@Controller`: Controladores MVC
- `@Transactional`: Métodos transacionais
- `@Valid`: Validação de beans

## 🧪 Estratégia de Testes

### Pirâmide de Testes

```
        /\
       /  \      E2E Tests (Selenium)
      /────\
     /      \    Integration Tests (Spring Boot Test)
    /────────\
   /          \  Unit Tests (JUnit 5 + Mockito)
  /____________\
```

### Estrutura de Testes

- **Unit Tests**: Testar services isoladamente
- **Integration Tests**: Testar controllers + services + repository
- **E2E Tests**: Testar fluxo completo via navegador

## 🔄 Ciclo de Vida da Aplicação

1. **Startup**: `VitrineSorocabanaApplication.main()`
2. **Component Scan**: Spring escaneia pacotes
3. **Bean Creation**: Cria beans Spring
4. **Database Init**: Executa `data.sql`
5. **Security Config**: Aplica regras de segurança
6. **Server Start**: Tomcat embarcado inicia na porta 8080
7. **Ready**: Aplicação pronta para receber requisições

## 📊 Monitoramento e Observabilidade

### Spring Boot Actuator (Opcional)

- `/actuator/health`: Status da aplicação
- `/actuator/metrics`: Métricas
- `/actuator/info`: Informações

### Logs

- **SLF4J + Logback**: Framework de logging
- Níveis: DEBUG, INFO, WARN, ERROR
- Configurável via `application.yml`

## 🔐 Segurança

### Proteções Implementadas

- **CSRF Protection**: Habilitado para formulários
- **Password Encoding**: BCrypt com salt
- **Session Management**: Sessões seguras
- **SQL Injection**: Prevenido por JPA
- **XSS**: Thymeleaf escapa HTML automaticamente

## 🌐 Escalabilidade

### Horizontal Scaling

- Stateless application (sessões podem ir para Redis)
- Load balancer na frente (Nginx, HAProxy)
- Database separado

### Vertical Scaling

- Aumentar memória JVM (`-Xmx`)
- Threads do Tomcat configuráveis

## 📚 Referências

- [Spring Boot Documentation](https://docs.spring.io/spring-boot/)
- [Spring Security Reference](https://docs.spring.io/spring-security/)
- [Thymeleaf Documentation](https://www.thymeleaf.org/)
- [Spring Data JPA Guide](https://docs.spring.io/spring-data/jpa/)

---

**VitrineSorocabana** - Uma arquitetura robusta, escalável e de fácil manutenção! 🏗️

