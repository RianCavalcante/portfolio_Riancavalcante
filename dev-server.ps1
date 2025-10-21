# Script para desenvolvimento local do portfólio
param(
    [int]$Port = 8000,
    [switch]$Open
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "    SERVIDOR LOCAL - PORTFOLIO RIAN" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar se Python está instalado
try {
    $pythonVersion = python --version 2>&1
    Write-Host "✓ Python detectado: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Python não encontrado. Instale Python primeiro." -ForegroundColor Red
    exit 1
}

# Verificar se a porta está disponível
$portInUse = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue
if ($portInUse) {
    Write-Host "⚠ Porta $Port já está em uso. Tentando porta alternativa..." -ForegroundColor Yellow
    $Port = $Port + 1
}

Write-Host ""
Write-Host "🚀 Iniciando servidor local na porta $Port..." -ForegroundColor Green
Write-Host ""
Write-Host "📱 Acesse seu site em:" -ForegroundColor Cyan
Write-Host "   http://localhost:$Port" -ForegroundColor White
Write-Host "   http://127.0.0.1:$Port" -ForegroundColor White
Write-Host ""
Write-Host "🔧 Comandos úteis:" -ForegroundColor Cyan
Write-Host "   Ctrl+C - Parar servidor" -ForegroundColor White
Write-Host "   F5 - Recarregar página no navegador" -ForegroundColor White
Write-Host ""
Write-Host "📁 Servindo arquivos de: $(Get-Location)" -ForegroundColor Gray
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Abrir navegador automaticamente se solicitado
if ($Open) {
    Start-Sleep 2
    Start-Process "http://localhost:$Port"
    Write-Host "🌐 Abrindo navegador..." -ForegroundColor Green
}

# Iniciar servidor
try {
    python -m http.server $Port
} catch {
    Write-Host ""
    Write-Host "✗ Erro ao iniciar servidor: $_" -ForegroundColor Red
}