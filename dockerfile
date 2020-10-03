FROM node:lts
COPY . .
RUN yarn
RUN yarn webpack

EXPOSE 4000
CMD ["yarn", "start"]
