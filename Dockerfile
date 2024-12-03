# Imagen base
FROM node:18

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar archivos necesarios para instalar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el código fuente, incluyendo el esquema Prisma
COPY . .

# Mover el esquema Prisma al lugar esperado por Prisma CLI (opcional)
RUN mkdir -p prisma && mv ./schema.prisma ./prisma/schema.prisma

# Generar cliente Prisma
RUN npx prisma generate

# Compilar la aplicación
RUN npm run build

# Exponer el puerto de la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "start:prod"]
