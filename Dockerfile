# build and config environment
FROM keymetrics/pm2:14-alpine
WORKDIR /app
COPY . .

# Install dependencies 
RUN yarn global add pm2
RUN yarn install --silent --ignore-engines
RUN yarn build

EXPOSE 8000

# RUN
CMD [ "pm2-runtime", "start", "pm2.json" ]
