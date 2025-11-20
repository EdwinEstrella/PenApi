#!/bin/bash

# Script de despliegue para Dokploy - PenApi

echo "🚀 Preparando PenApi para despliegue en Dokploy..."

# Verificar archivos necesarios
echo "📋 Verificando archivos necesarios..."
required_files=("Dockerfile" ".dockerignore" "package.json" "tsconfig.json" "src" "prisma")

for file in "${required_files[@]}"; do
    if [ ! -e "$file" ]; then
        echo "❌ Falta archivo requerido: $file"
        exit 1
    fi
done

echo "✅ Todos los archivos necesarios están presentes"

# Generar cliente Prisma
echo "🔧 Generando cliente Prisma..."
npm run db:generate

# Build local para verificar
echo "🏗️ Verificando build local..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build exitoso"
else
    echo "❌ Build falló"
    exit 1
fi

# Verificar que el Dockerfile esté optimizado
echo "🐳 Verificando configuración Docker..."
if grep -q "HEALTHCHECK" Dockerfile; then
    echo "✅ Health check configurado"
else
    echo "⚠️ No hay health check en el Dockerfile"
fi

if grep -q "USER nodejs" Dockerfile; then
    echo "✅ Usuario no-root configurado"
else
    echo "⚠️ No hay usuario no-root configurado"
fi

echo ""
echo "🎯 Tu proyecto está listo para Dokploy!"
echo ""
echo "📝 Siguientes pasos:"
echo "1. Sube los cambios a GitHub"
echo "2. En Dokploy, conecta tu repositorio"
echo "3. Configura las variables de entorno:"
echo "   - DATABASE_URL (postgresql://...)"
echo "   - AUTHENTICATION_API_KEY"
echo "   - JWT_SECRET"
echo "   - SERVER_URL (https://tu-dominio.com)"
echo "4. Selecciona 'Dockerfile' como método de build"
echo "5. Deploy!"
echo ""
echo "📚 Revisa DEPLOY_DOKPLOY.md para más detalles"