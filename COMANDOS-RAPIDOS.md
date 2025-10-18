# ⚡ Comandos Rápidos - Git & Deploy

## 🚀 Setup Inicial (Fazer UMA vez)

```bash
# 1. Inicializar Git
git init

# 2. Adicionar todos os arquivos
git add .

# 3. Primeiro commit
git commit -m "Initial commit - Portfolio Rian Cavalcante"

# 4. Conectar com GitHub (SUBSTITUA pela sua URL!)
git remote add origin https://github.com/SEU-USUARIO/portfolio.git

# 5. Definir branch principal
git branch -M main

# 6. Enviar para GitHub
git push -u origin main
```

## 🔄 Atualizar o Site (Fazer sempre que mudar algo)

```bash
# 1. Ver o que mudou
git status

# 2. Adicionar alterações
git add .

# 3. Fazer commit (mude a mensagem!)
git commit -m "Atualização: descrição do que mudou"

# 4. Enviar para GitHub (Vercel atualiza automaticamente!)
git push
```

## 📋 Comandos Úteis

```bash
# Ver histórico de commits
git log --oneline

# Ver diferenças antes de commitar
git diff

# Ver remote configurado
git remote -v

# Desfazer alterações em um arquivo (antes do commit)
git checkout -- nome-do-arquivo.html

# Ver status detalhado
git status -v
```

## 🆘 Resolver Problemas

### Esqueci de fazer commit antes de mudar mais coisas
```bash
# Adicionar tudo e commitar
git add .
git commit -m "Várias alterações"
git push
```

### Quero desfazer o último commit (mas manter as alterações)
```bash
git reset --soft HEAD~1
```

### Quero desfazer TUDO e voltar ao último commit
```bash
git reset --hard HEAD
```

### Erro: "Permission denied"
**Use Personal Access Token em vez de senha!**

1. GitHub → Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. Marque "repo"
4. Copie o token
5. Use como senha no terminal

### Erro: "Repository not found"
```bash
# Verificar se a URL está correta
git remote -v

# Se estiver errada, remover e adicionar novamente
git remote remove origin
git remote add origin https://github.com/SEU-USUARIO/portfolio.git
```

## 📝 Fluxo de Trabalho Diário

```bash
# 1. Fazer alterações nos arquivos
# (editar HTML, CSS, JS, etc.)

# 2. Ver o que mudou
git status

# 3. Adicionar e commitar
git add .
git commit -m "Descrição clara do que mudou"

# 4. Enviar para GitHub
git push

# 5. Aguardar 10-30 segundos
# Vercel faz deploy automaticamente!

# 6. Verificar no Vercel
# https://seu-site.vercel.app
```

## 🎯 Exemplos de Mensagens de Commit

```bash
# Boas mensagens:
git commit -m "Adiciona seção de projetos"
git commit -m "Corrige bug no formulário de contato"
git commit -m "Atualiza informações de contato"
git commit -m "Melhora responsividade em mobile"
git commit -m "Adiciona novos projetos ao portfólio"

# Mensagens ruins (evite):
git commit -m "update"
git commit -m "fix"
git commit -m "changes"
```

## 🔧 Configuração Inicial do Git (Opcional)

```bash
# Configurar nome (aparece nos commits)
git config --global user.name "Rian Cavalcante"

# Configurar email (use o mesmo do GitHub)
git config --global user.email "riancavalcante505@gmail.com"

# Ver configurações
git config --list
```

## 📊 Verificar Deploy no Vercel

1. **Via Dashboard:**
   - Acesse: https://vercel.com
   - Vá para seu projeto
   - Clique em "Deployments"
   - Veja o status do último deploy

2. **Via URL:**
   - Acesse seu site
   - Ctrl+Shift+R para forçar atualização
   - Verifique se as mudanças aparecem

## 💡 Dicas

1. **Commit Frequente:** Faça commits pequenos e frequentes
2. **Mensagens Claras:** Descreva o que mudou
3. **Teste Local:** Teste antes de fazer push
4. **Backup:** Git é seu backup automático
5. **Histórico:** Pode voltar para qualquer versão anterior

## ⚠️ IMPORTANTE

- **NUNCA** commite senhas ou tokens
- **SEMPRE** use `.gitignore` para arquivos sensíveis
- **TESTE** localmente antes de fazer push
- **DESCREVA** bem seus commits

## 🎉 Pronto!

Agora você sabe:
- ✅ Como fazer o setup inicial
- ✅ Como atualizar o site
- ✅ Como resolver problemas comuns
- ✅ Como usar Git no dia a dia

**Qualquer dúvida, consulte:** [DEPLOY-GITHUB-VERCEL.md](DEPLOY-GITHUB-VERCEL.md)
