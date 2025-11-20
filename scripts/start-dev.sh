#!/bin/bash

# Script para levantar PenApi en modo desarrollo

echo "🚀 Iniciando PenApi en modo desarrollo..."

# Verificar si .env existe
if [ ! -f ".env" ]; then
    echo "❌ Error: Archivo .env no encontrado"
    echo "Por favor, copia .env.example a .env y configura las variables"
    exit 1
fi

# Generar cliente Prisma
echo "🔧 Generando cliente Prisma..."
npm run db:generate

if [ $? -ne 0 ]; then
    echo "❌ Error generando cliente Prisma"
    exit 1
fi

# Iniciar el servidor
echo "🌐 Iniciando servidor en http://localhost:8080..."
npm run dev:server