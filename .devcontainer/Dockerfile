FROM  ghcr.io/foundry-rs/foundry:latest
LABEL maintainer="Ademar Arvati Filho <arvati@hotmail.com>"

## VS CODE
COPY library-scripts/*.sh /tmp/library-scripts/
RUN ash /tmp/library-scripts/common-alpine.sh \
    && rm -rf /tmp/library-scripts

ENTRYPOINT ["/bin/sh", "-c"]