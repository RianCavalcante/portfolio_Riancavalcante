# ✅ Checklist de Deploy - GitHub + Vercel

## 📋 Antes de Começar

- [ ] Tenho Git instalado no computador
  - Verificar: `git --version` no terminal
  - Se não tiver: https://git-scm.com/downloads

- [ ] Tenho conta no GitHub
  - Se não: https://github.com/signup

- [ ] Tenho conta no Vercel
  - Se não: https://vercel.com/signup (use "Continue with GitHub")

## 🚀 Passo 1: Git Local

- [ ] Abri o terminal na pasta do projeto
- [ ] Executei: `git init`
- [ ] Executei: `git add .`
- [ ] Executei: `git commit -m "Initial commit"`
- [ ] Vi mensagem de sucesso

## 🌐 Passo 2: GitHub

- [ ] Acessei https://github.com
- [ ] Fiz login
- [ ] Cliquei em "+" → "New repository"
- [ ] Dei um nome: `portfolio`
- [ ] Escolhi "Public"
- [ ] NÃO marquei nenhuma opção extra
- [ ] Cliquei em "Create repository"
- [ ] Copiei a URL do repositório

## 🔗 Passo 3: Conectar Local com GitHub

- [ ] Executei: `git remote add origin [URL-COPIADA]`
- [ ] Executei: `git branch -M main`
- [ ] Executei: `git push -u origin main`
- [ ] Se pediu senha, usei Personal Access Token
- [ ] Vi mensagem de sucesso
- [ ] Atualizei a página do GitHub e vi os arquivos

## ☁️ Passo 4: Vercel

- [ ] Acessei https://vercel.com
- [ ] Fiz login com "Continue with GitHub"
- [ ] Autorizei o Vercel a acessar meus repositórios
- [ ] Cliquei em "Add New..." → "Project"
- [ ] Encontrei meu repositório "portfolio"
- [ ] Cliquei em "Import"
- [ ] Deixei as configurações padrão
- [ ] Cliquei em "Deploy"
- [ ] Aguardei o deploy terminar
- [ ] Vi a mensagem de sucesso 🎉

## 🌍 Passo 5: Verificar

- [ ] Copiei a URL gerada (tipo: portfolio-xxx.vercel.app)
- [ ] Abri a URL no navegador
- [ ] O site carregou corretamente
- [ ] Testei a navegação
- [ ] Testei em mobile (DevTools ou celular)
- [ ] Todas as seções aparecem
- [ ] Formulário funciona (abre e-mail)

## 📝 Passo 6: Atualizar Informações

- [ ] Atualizei `sitemap.xml` com a URL final
- [ ] Atualizei meta tags no `index.html` com a URL final
- [ ] Fiz commit: `git add .`
- [ ] Fiz commit: `git commit -m "Atualiza URLs"`
- [ ] Fiz push: `git push`
- [ ] Vercel fez deploy automaticamente
- [ ] Verifiquei as mudanças no site

## 🎯 Passo 7: Domínio Customizado (Opcional)

Se você tem um domínio próprio:

- [ ] No Vercel, fui em Settings → Domains
- [ ] Adicionei meu domínio
- [ ] Copiei as instruções de DNS
- [ ] Acessei o painel do meu provedor de domínio
- [ ] Adicionei os registros DNS:
  - [ ] Registro A: @ → 76.76.21.21
  - [ ] Registro CNAME: www → cname.vercel-dns.com
- [ ] Aguardei propagação (10min a 48h)
- [ ] Testei o domínio
- [ ] HTTPS configurado automaticamente

## 📊 Passo 8: SEO e Analytics

- [ ] Acessei Google Search Console
- [ ] Adicionei minha propriedade (URL)
- [ ] Verifiquei a propriedade
- [ ] Submeti o sitemap: `https://meu-site.com/sitemap.xml`
- [ ] Configurei Vercel Analytics (opcional)

## 🎉 Finalização

- [ ] Site está no ar e funcionando
- [ ] URL compartilhada com amigos/família
- [ ] Adicionei URL no LinkedIn
- [ ] Adicionei URL no currículo
- [ ] Testei em diferentes dispositivos
- [ ] Testei em diferentes navegadores

## 🔄 Workflow Futuro

Quando fizer alterações:

- [ ] Edito os arquivos localmente
- [ ] Testo localmente (abrir index.html no navegador)
- [ ] `git add .`
- [ ] `git commit -m "Descrição da mudança"`
- [ ] `git push`
- [ ] Aguardo 10-30 segundos
- [ ] Vercel faz deploy automaticamente
- [ ] Verifico no site

## 📞 Suporte

Se algo não funcionar:

1. **Consulte:**
   - [DEPLOY-GITHUB-VERCEL.md](DEPLOY-GITHUB-VERCEL.md) - Guia completo
   - [COMANDOS-RAPIDOS.md](COMANDOS-RAPIDOS.md) - Comandos úteis

2. **Verifique:**
   - Mensagens de erro no terminal
   - Status no GitHub (arquivos foram enviados?)
   - Logs no Vercel (Deployments → Ver logs)

3. **Problemas Comuns:**
   - "Permission denied" → Use Personal Access Token
   - "Repository not found" → Verifique URL do remote
   - Site não atualiza → Force refresh (Ctrl+Shift+R)
   - CSS não carrega → Limpe cache do navegador

## ✨ Parabéns!

Se marcou todos os itens, seu portfólio está:
- ✅ No GitHub (versionado e com backup)
- ✅ No Vercel (online e acessível)
- ✅ Com deploy automático
- ✅ Pronto para compartilhar!

---

**Última atualização:** Janeiro 2025
**Status:** ✅ Pronto para Deploy
