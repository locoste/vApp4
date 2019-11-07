FROM node:alpine

ENV ASSET_NAME="vApp34"

RUN mkdir -p /vapp4
WORKDIR /vapp4

COPY /vf-os-vapp-3.4-master/vapp4 .

RUN ls -a

RUN npm update
RUN npm install
<<<<<<< HEAD
RUN ls -a node_modules

=======
#RUN ls -a node_modules
>>>>>>> 296534d465f41c63fcda508234bd6fa8dd4d7585
#RUN chmod +x entrypoint.sh

EXPOSE 4200

LABEL vf-OS.author="lyon2"
LABEL vf-OS.name="vApp34"
LABEL vf-OS.description="Pilot 3 - vApp34"
LABEL vf-OS=true
LABEL vf-OS.frontendUri=/login.html
LABEL vf-OS.icon=img/2.png
LABEL vf-OS.urlprefixReplace=true

CMD ["npm", "start"]
