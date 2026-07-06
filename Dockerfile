FROM node:20-alpine

WORKDIR /app

# El campo "packageManager" de package.json fija la versión exacta de pnpm
# que corepack instala; no hace falta un `npm install -g pnpm` aparte.
RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

EXPOSE 5173

CMD ["pnpm", "dev", "--host"]
