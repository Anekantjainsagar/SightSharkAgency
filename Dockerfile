FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache libc6-compat g++ make
COPY client/package*.json ./

ARG NEXT_PUBLIC_BACKEND_URI
ARG NEXT_PUBLIC_ADMIN_BACKEND_URI
ENV NEXT_PUBLIC_BACKEND_URI=$NEXT_PUBLIC_BACKEND_URI
ENV NEXT_PUBLIC_ADMIN_BACKEND_URI=$NEXT_PUBLIC_ADMIN_BACKEND_URI

ENV PORT=3000
RUN npm install \
    && npm install sharp

COPY client/. .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]

