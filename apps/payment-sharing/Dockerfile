FROM node:alpine
WORKDIR /usr/src/app
COPY dist/apps/payment-sharing/ ./
RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*
RUN npm install -g pm2@latest
RUN npm install --only=production --silent
RUN npm install express
ENTRYPOINT ["pm2-runtime","main.js"]
