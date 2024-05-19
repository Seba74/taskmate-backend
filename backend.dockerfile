# Base image
FROM node:21

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Install TypeScript as a development dependency
RUN npm install -g typescript

# Install Prisma as a development dependency
COPY src/prisma/schema.prisma ./src/prisma/schema.prisma

# Generate the Prisma client
RUN npx prisma generate

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

# Expose the port on which the app will run
EXPOSE 4000

# Start the server using the production build
CMD ["node", "dist/main.js"]
