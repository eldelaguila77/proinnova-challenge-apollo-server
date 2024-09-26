# Usar una imagen base de Node.js
FROM node:22

# Agregar repositorios y actualizar
RUN apt-get update && apt-get install -y software-properties-common && \
    add-apt-repository 'deb http://security.debian.org/debian-security stretch/updates main' && \
    apt-get update

# Instala Java
#RUN apt-get install -y openjdk-11-jdk
RUN apt install -y default-jdk


#ENV JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64/
#ENV PATH=$PATH:$JAVA_HOME/bin

# Establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Instala ts-node globalmente
RUN npm install -g ts-node

# Copiar el resto del código de la aplicación
COPY . .

# Ejecuta el script liquibase.ts
#RUN ts-node liquibase.ts

# Compilar TypeScript
#RUN npm run build

# Exponer el puerto de la aplicación
EXPOSE 4000

# Comando para ejecutar la aplicación
CMD ["npm", "run", "dev"]