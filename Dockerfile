FROM nginx:alpine

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy web assets
COPY index.html /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/
COPY app.js /usr/share/nginx/html/
COPY portfolio-data.js /usr/share/nginx/html/
COPY crimadezignz-profile-assets /usr/share/nginx/html/crimadezignz-profile-assets/
COPY crimadezignz-portfolio /usr/share/nginx/html/crimadezignz-portfolio/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
