FROM node:12.3.1-alpine AS builder
WORKDIR /usr/src/app

# Install all packages and shared libs
RUN apk --no-cache add \
        ca-certificates \
        lz4-dev \
        musl-dev \
        cyrus-sasl-dev \
        openssl-dev \
        git \
        python \
        make \
        g++ \
        build-base \
        bash \
        gcc \
        zlib-dev \
        libc-dev \
        bsd-compat-headers \
        py-setuptools

# dumb-init lets you wrap the main process in a more signal-responsive shell
RUN wget -O /usr/local/bin/dumb-init https://github.com/Yelp/dumb-init/releases/download/v1.2.2/dumb-init_1.2.2_amd64
RUN chmod +x /usr/local/bin/dumb-init

WORKDIR /usr/src/app

COPY ./package-lock.json ./package-lock.json
COPY package.json ./package.json

RUN npm install

COPY ./src/ ./src/
COPY ./migrations/ ./migrations/
COPY ./seeds/ ./seeds/
COPY ./config/ ./config/

COPY knexfile.js ./knexfile.js
COPY .babelrc ./.babelrc

RUN npm run build

EXPOSE 9797
ENTRYPOINT ["/usr/local/bin/dumb-init", "--"]
CMD [ "npm", "run", "serve" ]