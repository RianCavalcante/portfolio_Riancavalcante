# 🚀 Desenvolvimento Local - Portfolio Rian

## 📋 Pré-requisitos

- Python 3.x instalado
- Git configurado
- Navegador moderno

## 🛠️ Como rodar localmente

### Opção 1: Script Batch (Simples)
```bash
# Clique duplo no arquivo ou execute:
dev-server.bat
```

### Opção 2: Script PowerShell (Avançado)
```powershell
# Executar com porta padrão (8000)
.\dev-server.ps1

# Executar em porta específica
.\dev-server.ps1 -Port 3000

# Executar e abrir navegador automaticamente
.\dev-server.ps1 -Open
```

### Opção 3: Comando direto
```bash
python -m http.server 8000
```

### Opção 4: Usando npm scripts
```bash
npm run dev     # Porta 8000
npm run preview # Porta 8080
```

## 🌐 Acessar o site

Após iniciar o servidor, acesse:
- http://localhost:8000
- http://127.0.0.1:8000

## 🔄 Workflow de desenvolvimento

1. **Fazer alterações** nos arquivos HTML, CSS ou JS
2. **Salvar** os arquivos
3. **Recarregar** a página no navegador (F5)
4. **Testar** as funcionalidades
5. **Commit** quando estiver satisfeito:
   ```bash
   git add .
   git commit -m "feat: descrição da alteração"
   git push origin main
   ```

## 📁 Estrutura do projeto

```
portfolio/
├── index.html              # Página principal
├── css/
│   ├── redesign-styles.css  # Estilos do redesign
│   └── style.css           # Estilos originais
├── js/                     # Scripts JavaScript
├── assets/                 # Imagens e recursos
├── dev-server.bat          # Servidor local (Windows)
├── dev-server.ps1          # Servidor local (PowerShell)
└── vercel.json            # Configuração do Vercel
```

## 🐛 Solução de problemas

### Porta em uso
Se a porta 8000 estiver ocupada:
```bash
# Usar porta alternativa
python -m http.server 8080
```

### Python não encontrado
1. Instalar Python: https://python.org/downloads
2. Adicionar ao PATH do sistema
3. Reiniciar terminal

### Arquivos não carregam
1. Verificar se está na pasta correta do projeto
2. Verificar permissões dos arquivos
3. Limpar cache do navegador (Ctrl+Shift+R)

## 🚀 Deploy para produção

```bash
# 1. Testar localmente
npm run dev

# 2. Fazer commit das alterações
git add .
git commit -m "feat: nova funcionalidade"

# 3. Enviar para produção
git push origin main

# 4. Vercel fará deploy automático
```

## 📱 Testes recomendados

- ✅ Tema escuro/claro
- ✅ Responsividade (mobile/desktop)
- ✅ Efeitos de partículas
- ✅ Animação typewriter
- ✅ Navegação suave
- ✅ Modais e interações
- ✅ Performance (Lighthouse)

## 🔗 Links úteis

- **Produção:** https://riancavalcante.vercel.app
- **Repositório:** https://github.com/RianCavalcante/portfolio_Riancavalcante
- **Vercel Dashboard:** https://vercel.com/dashboard