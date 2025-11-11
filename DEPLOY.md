# guia de deploy para produção

este documento explica como fazer deploy da aplicação vitrine sorocabana em plataformas como heroku e render

## pré requisitos

- java 17 ou superior
- maven 3.6+
- conta no heroku ou render
- git configurado

## build da aplicação

o maven já faz tudo automaticamente incluindo build do frontend

```bash
cd api
mvn clean package -DskipTests
```

isso vai:
1. instalar node.js e npm automaticamente
2. instalar dependências do frontend
3. fazer build do react
4. criar o jar com tudo dentro

o jar fica em: `api/target/vitrine-sorocabana-1.0.0.jar`

## deploy no heroku

### passo 1: instalar heroku cli

baixe em: https://devcenter.heroku.com/articles/heroku-cli

### passo 2: fazer login

```bash
heroku login
```

### passo 3: criar app no heroku

```bash
heroku create vitrine-sorocabana
```

ou use um nome diferente se esse já existir

### passo 4: criar arquivo procfile

crie um arquivo chamado `Procfile` na raiz do projeto (mesmo nível que api e frontend):

```
web: java -jar api/target/vitrine-sorocabana-1.0.0.jar --spring.profiles.active=prod
```

### passo 5: configurar variáveis de ambiente

```bash
heroku config:set SPRING_PROFILES_ACTIVE=prod
heroku config:set PORT=8080
```

### passo 6: fazer deploy

```bash
git add .
git commit -m "preparar para deploy"
git push heroku main
```

se sua branch principal não for main:

```bash
git push heroku sua-branch:main
```

### passo 7: verificar deploy

```bash
heroku logs --tail
heroku open
```

a aplicação vai estar rodando em: `https://vitrine-sorocabana.herokuapp.com`

### configurações adicionais no heroku

se precisar de mais memória:

```bash
heroku config:set JAVA_OPTS="-Xmx512m -Xms256m"
```

para ver logs:

```bash
heroku logs --tail
```

para reiniciar:

```bash
heroku restart
```

## deploy no render

### passo 1: criar conta no render

acesse: https://render.com e crie uma conta

### passo 2: conectar repositório

1. vá em dashboard
2. clique em "new" e escolha "web service"
3. conecte seu repositório do github (https://github.com/maskednarcissus/proj3.git)
4. selecione o repositório

### passo 3: configurar build

nas configurações do serviço:

**build command:**
```bash
cd api && mvn clean package -DskipTests
```

**start command:**
```bash
java -jar api/target/vitrine-sorocabana-1.0.0.jar --spring.profiles.active=prod
```

### passo 4: configurar variáveis de ambiente

na seção "environment variables" adicione:

- `SPRING_PROFILES_ACTIVE` = `prod`
- `PORT` = `8080` (ou deixe render definir automaticamente)

### passo 5: configurar plano e região

- escolha o plano free ou paid conforme necessário
- selecione a região mais próxima (us east para brasil)

### passo 6: fazer deploy

clique em "create web service" e o render vai fazer o build e deploy automaticamente

### passo 7: verificar

o render vai dar uma url tipo: `https://vitrine-sorocabana.onrender.com`

acesse e verifique se está funcionando

## configuração de produção

a aplicação usa h2 database em produção que salva os dados em arquivo

os dados ficam em: `./data/vitrinedb.mv.db`

no heroku e render isso funciona normalmente porque o sistema de arquivos é persistente

### variáveis de ambiente importantes

| variável | valor | obrigatório |
|----------|-------|-------------|
| SPRING_PROFILES_ACTIVE | prod | sim |
| PORT | 8080 | não (heroku/render definem) |
| DB_PASSWORD | (opcional) | não |

## verificação pós deploy

### testar endpoints

- portal: `https://seu-app.herokuapp.com/` ou `https://seu-app.onrender.com/`
- loja: `/loja`
- blog: `/blog`
- admin: `/admin`

### credenciais padrão

**admin:**
- email: `admin@vitrine.com`
- senha: `admin123`

**usuário:**
- email: `user@vitrine.com`
- senha: `user123`

**importante:** mude essas senhas depois do primeiro login em produção

## troubleshooting

### erro de build no heroku/render

verifique os logs:
```bash
# heroku
heroku logs --tail

# render
veja na aba "logs" do dashboard
```

### aplicação não inicia

verifique se:
- java 17 está disponível (heroku e render têm por padrão)
- a porta está configurada corretamente
- o profile prod está ativo

### frontend não carrega

o build do maven já inclui o frontend no jar, então não precisa fazer nada extra

se não funcionar, verifique se o build do frontend aconteceu durante `mvn package`

### banco de dados

h2 funciona normalmente em heroku e render

os dados persistem enquanto o dyno/instância estiver rodando

**nota:** no plano free do heroku, dynos dormem após 30min de inatividade, mas os dados não são perdidos

## atualizações

para atualizar a aplicação:

### heroku
```bash
git push heroku main
```

### render
render detecta automaticamente quando você faz push no repositório e faz redeploy

ou você pode clicar em "manual deploy" no dashboard

## dicas importantes

1. **senhas:** mude as senhas padrão depois do primeiro deploy
2. **logs:** sempre verifique os logs se algo não funcionar
3. **memória:** heroku free tem limite de 512mb, render free tem 512mb também
4. **timeout:** render free tem timeout de 15min em requisições
5. **sleep:** heroku free dorme após 30min, render free também dorme

## comandos úteis

### heroku
```bash
# ver logs
heroku logs --tail

# reiniciar
heroku restart

# abrir app
heroku open

# ver variáveis
heroku config

# abrir console
heroku run bash
```

### render
- logs: veja na aba "logs" do dashboard
- reiniciar: clique em "manual deploy"
- variáveis: veja em "environment"
- console: não disponível no plano free

## estrutura do projeto

```
projeto/
├── api/                    # backend spring boot
│   ├── src/
│   ├── pom.xml
│   └── target/            # jar gerado aqui
├── frontend/              # frontend react
│   ├── src/
│   └── package.json
├── Procfile              # para heroku
└── DEPLOY.md            # este arquivo
```

## suporte

se tiver problemas:
1. verifique os logs primeiro
2. confirme que o build local funciona: `mvn clean package`
3. teste localmente: `java -jar api/target/vitrine-sorocabana-1.0.0.jar --spring.profiles.active=prod`
4. verifique se todas as variáveis de ambiente estão configuradas

## resumo rápido

**heroku:**
1. `heroku create nome-app`
2. criar `Procfile`
3. `git push heroku main`

**render:**
1. conectar repositório
2. build: `cd api && mvn clean package -DskipTests`
3. start: `java -jar api/target/vitrine-sorocabana-1.0.0.jar --spring.profiles.active=prod`
4. criar serviço

pronto, sua aplicação está no ar

