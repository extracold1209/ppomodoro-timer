FROM node:lts
COPY . .
RUN yarn
RUN yarn webpack

EXPOSE 8080
CMD ["yarn", "start"]
