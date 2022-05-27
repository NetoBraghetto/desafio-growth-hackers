# Desafio Growth Hackers

## Disclaimer
Infelizmente não foi uma semana com muito tempo por aqui então muito do que eu gostaria de mostrar não esta aqui. Porém se ainda quiserem ver o projeto é só colar o script no terminal

## TLTR
```bash
git clone git@github.com:NetoBraghetto/desafio-growth-hackers.git \
&& cd desafio-growth-hackers \
&& cp .env.example .env \
&& cp admin/.env.example admin/.env.development.local \
&& cp api/.env.example api/.env \
&& cd api \
&& npm install \
&& cd .. \
&& docker-compose up -d \
&& cd admin \
&& npm install \
&& npm run start
```

## Acessos

API: http://api.dev.localhost

Mongo express: http://moe.dev.localhost

Admin (webpack deve abrir sozinho): http://localhost:3000

## Achou que não ia ter Teste? achou errado
Dentro da api
```bash
npm run test
```
