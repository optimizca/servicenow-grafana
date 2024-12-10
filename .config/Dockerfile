ARG grafana_version=latest
ARG grafana_image=grafana-enterprise

FROM grafana/${grafana_image}:${grafana_version}

# Development mode configurations
ENV GF_AUTH_ANONYMOUS_ORG_ROLE "Admin"
ENV GF_AUTH_ANONYMOUS_ENABLED "true"
ENV GF_AUTH_BASIC_ENABLED "false"
ENV GF_DEFAULT_APP_MODE "development"

# Inject livereload script for development
USER root
RUN sed -i 's/<\/body><\/html>/<script src=\"http:\/\/localhost:35729\/livereload.js\"><\/script><\/body><\/html>/g' /usr/share/grafana/public/views/index.html

LABEL maintainer="Grafana Labs <hello@grafana.com>"

ENV GF_PATHS_HOME="/usr/share/grafana"
WORKDIR $GF_PATHS_HOME

# Install supervisor and development tools
RUN if grep -i -q alpine /etc/issue; then \
      apk add --no-cache supervisor inotify-tools git; \
    elif grep -i -q ubuntu /etc/issue; then \
      DEBIAN_FRONTEND=noninteractive apt-get update && \
      apt-get install -y supervisor inotify-tools git && \
      rm -rf /var/lib/apt/lists/*; \
    else \
      echo 'ERROR: Unsupported base image' && exit 1; \
    fi

# Add supervisord configuration files
COPY supervisord/supervisord.conf /etc/supervisord.conf
COPY supervisord/supervisord.conf /etc/supervisor/supervisord.conf

# Install Go (if needed for development)
RUN if [ "${development}" = "true" ]; then \
      curl -O -L https://golang.org/dl/go${GO_VERSION}.linux-${GO_ARCH}.tar.gz && \
      rm -rf /usr/local/go && \
      tar -C /usr/local -xzf go${GO_VERSION}.linux-${GO_ARCH}.tar.gz && \
      echo "export PATH=$PATH:/usr/local/go/bin:~/go/bin" >> ~/.bashrc && \
      rm -f go${GO_VERSION}.linux-${GO_ARCH}.tar.gz; \
    fi

# Install delve for debugging
RUN if [ "${development}" = "true" ]; then \
      /usr/local/go/bin/go install github.com/go-delve/delve/cmd/dlv@latest; \
    fi

# Install mage for plugin (re)building
RUN if [ "${development}" = "true" ]; then \
      git clone https://github.com/magefile/mage; \
      cd mage; \
      export PATH=$PATH:/usr/local/go/bin; \
      go run bootstrap.go; \
    fi

# Inject livereload script again after plugin changes
RUN sed -i 's|</body>|<script src="http://localhost:35729/livereload.js"></script></body>|g' /usr/share/grafana/public/views/index.html

# Add the entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Set entrypoint
ENTRYPOINT ["/entrypoint.sh"]
