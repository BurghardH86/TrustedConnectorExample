FROM alpine:3.7

WORKDIR /app
ADD . /app
RUN apk update \
	&& apk upgrade \
	&& apk add nodejs \
	&& npm install

EXPOSE 8080

ENTRYPOINT [ "node", "app.js" ]
