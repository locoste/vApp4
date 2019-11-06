FROM node:alpine

ENV ASSET_NAME="vApp34Proxy"

RUN mkdir -p /vapp4proxy
WORKDIR /vapp4proxy

COPY /vf-os-vapp-3.4-master/dev .

RUN ls -a

RUN npm install
#RUN ls -a node_modules
#RUN chmod +x entrypoint.sh

EXPOSE 3000

LABEL vf-OS.author="lyon2"
LABEL vf-OS.name="vApp34Proxy"
LABEL vf-OS.description="Pilot 3 - vApp34 Proxy"
LABEL vf-OS=true
LABEL vf-OS.frontendUri=/login.html
LABEL vf-OS.icon=img/2.png
LABEL vf-OS.urlprefixReplace=true

CMD ["npm", "start"]
