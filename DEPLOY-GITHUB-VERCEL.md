# 🚀 Guia Completo: GitHub → Vercel

## Passo 1: Preparar o Projeto para Git

### 1.1 Abrir Terminal na Pasta do Projeto
- **Windows:** Shift + Botão Direito na pasta → "Abrir no Terminal" ou "Abrir janela do PowerShell aqui"
- **Mac/Linux:** Botão direito → "Abrir no Terminal"

### 1.2 Inicializar Git
```bash
git init
```

### 1.3 Adicionar Todos os Arquivos
```bash
git add .
```

### 1.4 Fazer o Primeiro Commit
```bash
git commit -m "Initial commit - Portfolio Rian Cavalcante"
```

## Passo 2: Criar Repositório no GitHub

### 2.1 Acessar GitHub
- Vá para: https://github.com
- Faça login (ou crie uma conta se não tiver)

### 2.2 Criar Novo Repositório
1. Clique no **"+"** no canto superior direito
2. Selecione **"New repository"**

### 2.3 Configurar o Repositório
- **Repository name:** `portfolio` (ou o nome que preferir)
- **Description:** "Portfólio profissional - Desenvolvedor de Automação com IA"
- **Visibilidade:** 
  - ✅ **Public** (recomendado - gratuito e permite Vercel)
  - ⚠️ Private (funciona, mas pode ter limitações no plano gratuito)
- **NÃO marque:**
  - ❌ Add a README file
  - ❌ Add .gitignore
  - ❌ Choose a license
  
  (Já temos esses arquivos!)

4. Clique em **"Create repository"**

### 2.4 Copiar a URL do Repositório
Após criar, você verá uma página com comandos. Copie a URL que aparece, algo como:
```
https://github.com/seu-usuario/portfolio.git
```

## Passo 3: Conectar Local com GitHub

### 3.1 Adicionar Remote
No terminal, execute (substitua pela SUA URL):
```bash
git remote add origin https://github.com/seu-usuario/portfolio.git
```

### 3.2 Verificar Branch
```bash
git branch -M main
```

### 3.3 Fazer Push (Enviar para GitHub)
```bash
git push -u origin main
```

**Se pedir autenticação:**
- Use seu usuário do GitHub
- Para senha, use um **Personal Access Token** (não a senha normal)

### 3.4 Criar Personal Access Token (se necessário)

1. No GitHub, vá para: **Settings** (seu perfil) → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
2. Clique em **"Generate new token"** → **"Generate new token (classic)"**
3. Dê um nome: "Vercel Deploy"
4. Marque: **repo** (todas as opções de repo)
5. Clique em **"Generate token"**
6. **COPIE O TOKEN** (você não verá novamente!)
7. Use esse token como senha no terminal

## Passo 4: Verificar no GitHub

1. Atualize a página do seu repositório no GitHub
2. Você deve ver todos os arquivos do projeto
3. ✅ Pronto! Projeto está no GitHub

## Passo 5: Deploy no Vercel

### 5.1 Acessar Vercel
- Vá para: https://vercel.com
- Clique em **"Sign Up"** (ou "Login")
- **IMPORTANTE:** Escolha **"Continue with GitHub"**

### 5.2 Autorizar Vercel
- Vercel vai pedir permissão para acessar seus repositórios
- Clique em **"Authorize Vercel"**

### 5.3 Importar Projeto
1. No dashboard do Vercel, clique em **"Add New..."** → **"Project"**
2. Você verá uma lista dos seus repositórios do GitHub
3. Encontre **"portfolio"** (ou o nome que você deu)
4. Clique em **"Import"**

### 5.4 Configurar Deploy
O Vercel detecta automaticamente que é um site estático:

- **Framework Preset:** Other
- **Root Directory:** `./`
- **Build Command:** (deixe vazio)
- **Output Directory:** `./`

**Não precisa mudar nada!**

### 5.5 Deploy
1. Clique em **"Deploy"**
2. Aguarde 10-30 segundos
3. 🎉 **Pronto! Seu site está no ar!**

### 5.6 Acessar o Site
Vercel gera uma URL tipo:
```
https://portfolio-seu-usuario.vercel.app
```

## Passo 6: Configurar Domínio Customizado (Opcional)

### 6.1 No Vercel
1. Vá para o projeto
2. Clique em **"Settings"** → **"Domains"**
3. Digite seu domínio: `riancavalcante.com`
4. Clique em **"Add"**

### 6.2 Configurar DNS
Vercel vai mostrar as instruções. Adicione no seu provedor de domínio:

```
Tipo: A
Nome: @
Valor: 76.76.21.21

Tipo: CNAME
Nome: www
Valor: cname.vercel-dns.com
```

### 6.3 Aguardar
- Propagação DNS: 5 minutos a 48 horas
- Geralmente funciona em 10-30 minutos
- SSL/HTTPS configurado automaticamente

## Passo 7: Atualizar o Site no Futuro

### Método 1: Via GitHub (Recomendado)

Quando fizer alterações nos arquivos:

```bash
# 1. Adicionar alterações
git add .

# 2. Fazer commit
git commit -m "Descrição das alterações"

# 3. Enviar para GitHub
git push
```

**Vercel detecta automaticamente e faz deploy!** 🚀

### Método 2: Via Vercel Dashboard

1. Vá para "Deployments"
2. Clique em "Redeploy"

## 🆘 Problemas Comuns

### "Permission denied" no Git Push
**Solução:** Use Personal Access Token em vez de senha

### "Repository not found"
**Solução:** Verifique se a URL do remote está correta:
```bash
git remote -v
```

### Vercel não encontra o repositório
**Solução:** 
1. Vá para Vercel Settings → Git
2. Clique em "Adjust GitHub App Permissions"
3. Dê acesso ao repositório

### Site não atualiza no Vercel
**Solução:**
1. Verifique se o push foi feito: `git log`
2. Vá para Vercel → Deployments
3. Veja se há um novo deployment
4. Se não, clique em "Redeploy"

## 📝 Comandos Git Úteis

```bash
# Ver status dos arquivos
git status

# Ver histórico de commits
git log

# Ver remote configurado
git remote -v

# Desfazer alterações (antes do commit)
git checkout -- arquivo.html

# Ver diferenças
git diff
```

## ✅ Checklist Final

- [ ] Git inicializado localmente
- [ ] Primeiro commit feito
- [ ] Repositório criado no GitHub
- [ ] Remote adicionado
- [ ] Push feito com sucesso
- [ ] Arquivos visíveis no GitHub
- [ ] Vercel conectado ao GitHub
- [ ] Projeto importado no Vercel
- [ ] Deploy feito com sucesso
- [ ] Site acessível pela URL
- [ ] Domínio customizado configurado (opcional)

## 🎯 Resumo Rápido

```bash
# 1. Inicializar Git
git init
git add .
git commit -m "Initial commit"

# 2. Conectar com GitHub (substitua pela sua URL)
git remote add origin https://github.com/seu-usuario/portfolio.git
git branch -M main
git push -u origin main

# 3. No Vercel
# - Login com GitHub
# - Import repository
# - Deploy
```

## 💡 Dicas

1. **Commits Frequentes:** Faça commits pequenos e frequentes
2. **Mensagens Claras:** Use mensagens descritivas nos commits
3. **Branch Main:** Use sempre a branch `main` (padrão)
4. **Backup:** GitHub serve como backup do seu código
5. **Histórico:** Pode voltar para versões anteriores se necessário

## 📞 Precisa de Ajuda?

- **Git:** https://git-scm.com/doc
- **GitHub:** https://docs.github.com
- **Vercel:** https://vercel.com/docs

---

**Pronto! Seu portfólio está no GitHub e no Vercel! 🎉**
