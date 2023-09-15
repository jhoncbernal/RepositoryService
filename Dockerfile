# Use Node.js 18.16.0 as the base image
FROM node:18.16.0-alpine
WORKDIR /app
COPY . .

# Install dependencies 
RUN yarn global add pm2
RUN yarn install --silent --ignore-engines
RUN yarn build

EXPOSE 8000

# RUN
CMD [ "pm2-runtime", "start", "pm2.json" ]
