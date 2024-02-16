FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
# ARG CACHE_DATE=2016-01-01
RUN npm cache clean --force && npm install
# RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .
# RUN npm run build
# ENV NODE_ENV=production
# EXPOSE  3000
# CMD ["nest build"]
# CMD [ "node", "dist/main.js" ]