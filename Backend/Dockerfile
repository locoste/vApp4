FROM node:alpine

ENV ASSET_NAME="vApp34Back"

RUN mkdir -p /Server
WORKDIR /Server

COPY /Backend .

RUN ls -a

RUN npm install
#RUN ls -a node_modules
#RUN chmod +x entrypoint.sh

EXPOSE 8003

LABEL vf-OS.author="lyon2"
LABEL vf-OS.name="vApp34Back"
LABEL vf-OS.description="Pilot 3 - vApp34Back"
LABEL vf-OS=true
LABEL vf-OS.frontendUri=/login.html
LABEL vf-OS.icon=img/2.png
LABEL vf-OS.urlprefixReplace=true

CMD ["npm", "start"]
