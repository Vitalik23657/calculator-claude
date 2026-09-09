FROM nginx:alpine

# Static site, no build step — copy the app files straight into nginx's webroot.
COPY index.html style.css script.js login.html login.css login.js /usr/share/nginx/html/

# Minimal custom server config (explicit port, gzip, cache headers).
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# nginx:alpine's default CMD already runs `nginx -g "daemon off;"` in the
# foreground, so no CMD/ENTRYPOINT override is needed here.
