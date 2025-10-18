# 📝 Guia de Atualização de Projetos

Este guia explica como atualizar os cards de projetos do seu portfólio quando você tiver projetos reais para adicionar.

## 🎯 O que foi feito

✅ **Melhorias visuais implementadas:**
- Badge "Em breve" animado em cada card
- Links desabilitados (não clicáveis) até você adicionar URLs reais
- Efeitos de hover melhorados
- Gradientes e sombras aprimorados
- Animações de entrada suaves
- Placeholders SVG com cores diferentes para IA vs Programação

## 📂 Arquivos importantes

1. **`index.html`** - Contém todos os cards de projeto
2. **`css/project-cards-enhanced.css`** - Estilos melhorados dos cards
3. **`project-card-template.html`** - Template para novos projetos

## 🔄 Como atualizar um projeto existente

### Passo 1: Adicionar imagem real

Localize o card do projeto no `index.html` e substitua:

**ANTES:**
```html
<img src="data:image/svg+xml,%3Csvg..." 
     alt="Nome do Projeto" 
     loading="lazy">
```

**DEPOIS:**
```html
<img src="assets/images/projects/meu-projeto.jpg" 
     alt="Nome do Projeto" 
     loading="lazy">
```

### Passo 2: Adicionar links reais

**ANTES:**
```html
<span class="project-card__badge">Em breve</span>
...
<div class="project-card__actions project-card__actions--disabled">
    <span class="btn-link">Ver Detalhes...</span>
    <span class="btn-link btn-link--secondary">GitHub</span>
</div>
```

**DEPOIS:**
```html
<!-- Remova o badge "Em breve" -->
...
<div class="project-card__actions">
    <a href="https://seu-site.com/projeto" class="btn-link" aria-label="Ver detalhes do projeto">
        Ver Detalhes
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 3L11 8L6 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </a>
    <a href="https://github.com/seu-usuario/seu-repo" class="btn-link btn-link--secondary" aria-label="Ver código no GitHub" target="_blank" rel="noopener noreferrer">
        GitHub
    </a>
</div>
```

### Passo 3: Atualizar informações

Atualize o título, descrição e tags conforme necessário:

```html
<h3 class="project-card__title">Seu Projeto Real</h3>
<p class="project-card__description">
    Descrição real do seu projeto, explicando o que ele faz e qual problema resolve.
</p>
<div class="project-card__tags">
    <span class="tag">Python</span>
    <span class="tag">FastAPI</span>
    <span class="tag">PostgreSQL</span>
    <!-- Adicione mais tags conforme necessário -->
</div>
```

## ➕ Como adicionar um novo projeto

1. Abra o arquivo `project-card-template.html`
2. Copie todo o conteúdo
3. Cole no `index.html` dentro da `<div class="projects__grid">` apropriada
4. Substitua todos os valores entre `[COLCHETES]`:
   - `[EMOJI]` - Emoji representativo (🤖, 📊, 💻, etc)
   - `[NOME DO PROJETO]` - Nome do seu projeto
   - `[DESCRIÇÃO DO PROJETO]` - Descrição de 2-3 linhas
   - `[TECH 1]`, `[TECH 2]`, etc - Tecnologias usadas
   - `[URL_DETALHES]` - URL da página de detalhes (quando tiver)
   - `[URL_GITHUB]` - URL do repositório no GitHub

## 🎨 Onde colocar as imagens

Crie uma pasta para as imagens dos projetos:

```
assets/
  └── images/
      └── projects/
          ├── assistente-virtual.jpg
          ├── analise-preditiva.jpg
          ├── automacao-ia.jpg
          ├── sistema-gestao.jpg
          ├── api-restful.jpg
          └── ferramenta-cli.jpg
```

**Recomendações para imagens:**
- Formato: JPG ou PNG
- Dimensões: 800x600px (proporção 4:3)
- Tamanho: Máximo 200KB (otimize com TinyPNG ou similar)
- Conteúdo: Screenshot do projeto, mockup ou design representativo

## 🎯 Checklist de atualização

Quando for atualizar um projeto, siga este checklist:

- [ ] Adicionar imagem real do projeto em `assets/images/projects/`
- [ ] Atualizar o `src` da tag `<img>` no HTML
- [ ] Remover o `<span class="project-card__badge">Em breve</span>`
- [ ] Remover a classe `project-card__actions--disabled`
- [ ] Trocar `<span>` por `<a>` nos botões
- [ ] Adicionar `href` com URL real do projeto
- [ ] Adicionar `href` com URL do GitHub
- [ ] Adicionar `target="_blank" rel="noopener noreferrer"` no link do GitHub
- [ ] Atualizar título se necessário
- [ ] Atualizar descrição se necessário
- [ ] Atualizar tags de tecnologias
- [ ] Testar os links
- [ ] Verificar responsividade

## 🚀 Exemplo completo de card atualizado

```html
<article class="project-card">
    <!-- Badge removido -->
    <div class="project-card__image">
        <img src="assets/images/projects/meu-chatbot.jpg" 
             alt="Chatbot Inteligente" 
             loading="lazy">
    </div>
    <div class="project-card__content">
        <h3 class="project-card__title">Chatbot Inteligente</h3>
        <p class="project-card__description">
            Sistema de atendimento automatizado usando GPT-4 que reduziu em 70% 
            o tempo de resposta ao cliente e aumentou a satisfação em 45%.
        </p>
        <div class="project-card__tags">
            <span class="tag">Python</span>
            <span class="tag">OpenAI</span>
            <span class="tag">FastAPI</span>
            <span class="tag">Redis</span>
        </div>
        <div class="project-card__actions">
            <a href="https://chatbot.riancavalcante.com" class="btn-link" aria-label="Ver detalhes do projeto Chatbot">
                Ver Detalhes
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 3L11 8L6 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </a>
            <a href="https://github.com/riancavalcante/chatbot-ia" class="btn-link btn-link--secondary" aria-label="Ver código no GitHub" target="_blank" rel="noopener noreferrer">
                GitHub
            </a>
        </div>
    </div>
</article>
```

## 💡 Dicas

1. **Mantenha a consistência**: Use o mesmo estilo de descrição para todos os projetos
2. **Seja específico**: Mencione resultados concretos quando possível (ex: "aumentou eficiência em 300%")
3. **Otimize imagens**: Use ferramentas como TinyPNG para reduzir o tamanho sem perder qualidade
4. **Teste em mobile**: Sempre verifique como os cards aparecem em dispositivos móveis
5. **Atualize gradualmente**: Não precisa atualizar todos de uma vez, vá adicionando conforme completa os projetos

## 🆘 Precisa de ajuda?

Se tiver dúvidas ou problemas ao atualizar os projetos, me chame novamente! 🚀
