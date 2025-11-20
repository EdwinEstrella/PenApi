# Despliegue en Dokploy

## Pasos para desplegar PenApi en Dokploy

### 1. Configurar Variables de Entorno

Debes configurar estas variables de entorno en Dokploy:

**Variables Esenciales:**
```
NODE_ENV=production
DATABASE_PROVIDER=postgresql
DATABASE_URL=postgresql://usuario:password@host:5432/database?schema=public
SERVER_URL=https://tu-dominio.com
AUTHENTICATION_API_KEY=tu-api-key-segura
JWT_SECRET=tu-jwt-secret-muy-largo-y-seguro
```

**Variables Opcionales:**
```
REDIS_ENABLED=false
REDIS_URI=redis://host:6379
WEBHOOK_GLOBAL=https://tu-dominio.com/webhook
WEBHOOK_GLOBAL_ENABLED=false
```

### 2. Configurar Base de Datos

1. Crea una base de datos PostgreSQL en Dokploy o en otro servicio
2. Copia la URL de conexión completa
3. Configúrala en la variable `DATABASE_URL`

### 3. Deploy Options

**Opción A: Usar Dockerfile (Recomendado)**
- Selecciona "Dockerfile" como método de build
- El Dockerfile está optimizado para producción
- Incluye health checks y seguridad

**Opción B: Usar Docker Compose**
- Selecciona "Docker Compose"
- Usa el archivo `docker-compose.dokploy.yaml`
- Configura las variables de entorno en el compose

### 4. Post-Deploy

Después del despliegue inicial:

1. **Ejecutar migraciones:**
   - Conéctate al contenedor via terminal
   - Ejecuta: `npx prisma migrate deploy`

2. **Verificar health check:**
   - Visita `https://tu-dominio.com/`
   - Deberías ver un mensaje de bienvenida

3. **Probar API:**
   - Endpoint: `https://tu-dominio.com/`
   - Usa tu API key: `apikey: tu-api-key-segura`

### 5. Recomendaciones

- **Dominio:** Configura un dominio personalizado
- **SSL:** Habilita HTTPS automático en Dokploy
- **Backups:** Configura backups automáticos de la base de datos
- **Monitoring:** Usa los health checks incluidos
- **Recursos:** Mínimo 1GB RAM, 1 CPU

### 6. Solución de Problemas

**Error: "No such file or directory"**
- Verifica que el .dockerignore no esté excluyendo archivos necesarios
- Asegúrate de que todos los archivos estén en el repositorio

**Error: "Database connection failed"**
- Verifica la URL de la base de datos
- Asegúrate de que la base de datos sea accesible desde el contenedor

**Error: "Build failed"**
- Revisa los logs de build en Dokploy
- Verifica que las variables de entorno estén configuradas

### 7. Características del Dockerfile

- ✅ Multi-stage build para optimizar tamaño
- ✅ Usuario no-root para seguridad
- ✅ Health checks automáticos
- ✅ Instalación optimizada de FFmpeg
- ✅ Generación automática de cliente Prisma
- ✅ Soporte para montado de volúmenes