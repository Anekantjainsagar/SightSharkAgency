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

# Build command
# docker build --build-arg NEXT_PUBLIC_BACKEND_URI=https://admin-portal-backend-118842008879.asia-south1.run.app/ --build-arg NEXT_PUBLIC_ADMIN_BACKEND_URI=https://admin-portal-backend-118842008879.asia-south1.run.app/ -t agency-portal-frontendx .

# Run command
# docker run -p 3000:3000 agency-portal-frontend
