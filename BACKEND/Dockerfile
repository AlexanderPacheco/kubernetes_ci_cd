#Obtener la imagen que necesitamos
#en este caso, node v.14.x.x
FROM node:14.17.5

#Asignar el workdir de la api
WORKDIR /usr/src/app

#Copiar el package-json
COPY package*.json ./

#Correr 'npm install' para instalar todas las dependencias que necesitamos
RUN npm install

#Aca pueden existir muchos mas comandos "run"

#Seteando variables de entorno
ENV AWS_ACCESS_KEY_ID="AWS_ACCESS_KEY_ID"
ENV AWS_SECRET_ACCESS_KEY="AWS_SECRET_ACCESS_KEY"
ENV AWS_DEFAULT_REGION="us-east-2"

#Copiar todos los archivos al workdir
COPY . .

#Exponer el puerto 3000 al mundo
EXPOSE 2300

#Correr NodeJS
#CMD [ "node", "server.js" ]
CMD [ "npm", "start" ]