# Base image
FROM node:21

# Install pnpm
RUN npm install -g pnpm

# Create app directory
WORKDIR /usr/src/app

# Copy pnpm and lock files
COPY pnpm*.yaml ./

# Install app dependencies
RUN pnpm install --frozen-lockfile

# Install TypeScript as a development dependency
RUN pnpm add -g typescript

# Install Prisma as a development dependency
COPY src/prisma/schema.prisma ./src/prisma/schema.prisma

# Generate the Prisma client
RUN npx prisma generate

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN pnpm run build

# Expose the port on which the app will run
EXPOSE 4000

# Start the server using the production build
CMD ["node", "dist/main.js"]
