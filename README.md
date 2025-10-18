# 🤖 Portfólio Rian Cavalcante

Portfólio profissional de Rian Cavalcante, desenvolvedor especializado em automação com inteligência artificial e Python.

## 🚀 Deploy no Vercel

### ⭐ Método Recomendado: GitHub → Vercel

**Veja o guia completo em:** [DEPLOY-GITHUB-VERCEL.md](DEPLOY-GITHUB-VERCEL.md)

**Resumo:**
1. Inicializar Git localmente
2. Criar repositório no GitHub
3. Fazer push do código
4. Conectar Vercel ao GitHub
5. Deploy automático!

**Vantagens:**
- ✅ Deploy automático a cada push
- ✅ Histórico de versões
- ✅ Fácil de atualizar
- ✅ Backup do código

---

### Opção 1: Deploy via Interface Web (Sem GitHub)

1. **Acesse o Vercel:**
   - Vá para [vercel.com](https://vercel.com)
   - Faça login ou crie uma conta (pode usar GitHub, GitLab ou email)

2. **Importe o Projeto:**
   - Clique em "Add New..." → "Project"
   - Selecione "Import from Git" ou arraste a pasta do projeto
   - Se não tiver Git, use "Import from Local Directory"

3. **Configure o Projeto:**
   - **Project Name:** `portfolio-rian-cavalcante` (ou o nome que preferir)
   - **Framework Preset:** Other (ou None)
   - **Root Directory:** `./` (raiz do projeto)
   - **Build Command:** Deixe vazio (site estático)
   - **Output Directory:** `./` (raiz do projeto)

4. **Deploy:**
   - Clique em "Deploy"
   - Aguarde alguns segundos
   - Seu site estará no ar! 🎉

5. **URL Gerada:**
   - Vercel vai gerar uma URL tipo: `portfolio-rian-cavalcante.vercel.app`
   - Você pode configurar um domínio customizado depois

### Opção 2: Deploy via CLI

1. **Instalar Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Fazer Login:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   # Na pasta do projeto
   vercel
   ```

4. **Seguir as instruções:**
   - Set up and deploy? **Y**
   - Which scope? Selecione sua conta
   - Link to existing project? **N**
   - What's your project's name? `portfolio-rian-cavalcante`
   - In which directory is your code located? `./`
   - Want to override the settings? **N**

5. **Deploy para Produção:**
   ```bash
   vercel --prod
   ```

### Opção 3: Deploy via Drag & Drop

1. **Acesse:**
   - [vercel.com/new](https://vercel.com/new)

2. **Arraste a pasta:**
   - Arraste toda a pasta do projeto para a área de upload
   - Vercel vai fazer o deploy automaticamente

## 🌐 Configurar Domínio Customizado

### No Vercel Dashboard:

1. Vá para o projeto no Vercel
2. Clique em "Settings" → "Domains"
3. Adicione seu domínio (ex: `riancavalcante.com`)
4. Siga as instruções para configurar DNS

### Configuração DNS:

**Se usar domínio próprio, adicione estes registros:**

```
Tipo: A
Nome: @
Valor: 76.76.21.21

Tipo: CNAME
Nome: www
Valor: cname.vercel-dns.com
```

## 📁 Estrutura do Projeto

```
portfolio/
├── index.html              # Página principal
├── css/
│   ├── style.css          # Estilos principais
│   ├── animations.css     # Animações
│   ├── responsive.css     # Media queries
│   └── critical.css       # CSS crítico
├── js/
│   ├── main.js           # JavaScript principal
│   ├── smooth-scroll.js  # Scroll suave
│   ├── form-validation.js # Validação de formulário
│   └── browser-detect.js  # Detecção de navegador
├── assets/
│   └── images/           # Imagens do projeto
├── vercel.json           # Configuração Vercel
├── manifest.json         # PWA manifest
├── robots.txt            # SEO
├── sitemap.xml           # Sitemap
└── README.md             # Este arquivo
```

## ✨ Funcionalidades

- ✅ Design responsivo (mobile, tablet, desktop)
- ✅ Animações suaves ao scroll
- ✅ Formulário de contato funcional
- ✅ SEO otimizado
- ✅ Performance otimizada (Lighthouse 90+)
- ✅ Acessibilidade (WCAG 2.1 AA)
- ✅ Cross-browser compatible
- ✅ PWA ready

## 🛠️ Tecnologias

- HTML5 semântico
- CSS3 (Grid, Flexbox, Custom Properties)
- JavaScript Vanilla (ES6+)
- Intersection Observer API
- Schema.org (JSON-LD)

## 📊 Performance

- **Lighthouse Score:** 90+ (esperado)
- **First Contentful Paint:** < 1.8s
- **Largest Contentful Paint:** < 2.5s
- **Cumulative Layout Shift:** < 0.1

## 🔧 Configurações Importantes

### Atualizar Informações de Contato

Edite o arquivo `index.html` e atualize:

1. **E-mail:** Procure por `riancavalcante505@gmail.com`
2. **WhatsApp:** Procure por `5585991872205`
3. **LinkedIn:** Procure por `rian-silva-766525196`

### Atualizar Domínio no Sitemap

Edite `sitemap.xml` e substitua `https://riancavalcante.com` pelo seu domínio.

### Atualizar Meta Tags

Edite `index.html` e atualize as meta tags Open Graph com seu domínio e imagem.

## 📝 Após o Deploy

### Checklist Pós-Deploy:

- [ ] Testar todas as páginas/seções
- [ ] Verificar formulário de contato
- [ ] Testar em diferentes dispositivos
- [ ] Verificar links externos
- [ ] Testar performance com Lighthouse
- [ ] Verificar SEO com Google Search Console
- [ ] Adicionar domínio customizado (opcional)
- [ ] Configurar SSL (automático no Vercel)
- [ ] Submeter sitemap ao Google

### Google Search Console:

1. Acesse [search.google.com/search-console](https://search.google.com/search-console)
2. Adicione sua propriedade (domínio)
3. Verifique a propriedade
4. Submeta o sitemap: `https://seudominio.com/sitemap.xml`

### Analytics (Opcional):

Para adicionar Google Analytics:

1. Crie uma conta em [analytics.google.com](https://analytics.google.com)
2. Obtenha o código de tracking
3. Adicione antes do `</head>` no `index.html`

## 🐛 Troubleshooting

### Site não carrega CSS/JS:
- Verifique se os caminhos dos arquivos estão corretos
- Limpe o cache do navegador (Ctrl+Shift+R)

### Formulário não funciona:
- O formulário usa `mailto:`, abre o cliente de e-mail
- Para formulário real, integre com serviço como Formspree ou EmailJS

### Imagens não aparecem:
- Verifique se as imagens estão na pasta `assets/images/`
- Substitua os placeholders SVG por imagens reais

## 📞 Contato

- **E-mail:** riancavalcante505@gmail.com
- **WhatsApp:** +55 85 99187-2205
- **LinkedIn:** [Rian Silva](https://www.linkedin.com/in/rian-silva-766525196/)

## 📄 Licença

© 2025 Rian Cavalcante. Todos os direitos reservados.

---

**Desenvolvido com ❤️ por Rian Cavalcante**
