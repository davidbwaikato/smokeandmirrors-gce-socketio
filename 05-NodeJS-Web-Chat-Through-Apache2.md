

# Configuring your Apache2 installation run a NodeJS Express-based Web-Chat Application using Web Sockets


  The Socket.IO website covers how to operate the complete web-chat
  application through a [Apache2 as a Reverse Proxy
  server](https://socket.io/docs/v3/reverse-proxy/#Apache-HTTPD).  The
  approach taken in their instructions assumes that Web Chat is the
  only thing the installation provides, and so visiting the main web
  domain that is set up (e.g., webchat.mydomain.com) __is__ the Web Chat
  application.

  In the instructions here we take this a bit further, providing
  details on how to set things up so the Web Chat application operates
  within a designated area of the website, e.g., webchat.mydomain.com/web-chat/.
  
  
## Setting up Web Chat to be scoped to have a URL prefix

  In a text editor with admin rights, open your Apache2 configuration file for https
  settings.  For example:
```
  sudo emacs /etc/apache2/sites-enabled/000-default-le-ssl.conf
```
 
  Add the following lines to it:   
```
ProxyPass /web-chat/ http://localhost:3000/
ProxyPass /socket.io/ http://localhost:3000/socket.io/
RewriteEngine on
RewriteCond %{HTTP:Upgrade} websocket [NC]
RewriteCond %{HTTP:Connection} upgrade [NC]
RewriteRule ^/?(.*) "ws://localhost:3000/$1" [P,L]
```

  Now restart the Apache2 web server
```
  sudo systemctl restart apache2
```

  Previously, to run our _Hello world_ NodeJS Express-based server we using
  `index.js` (which in turn references `index.html`).  In the Getting
  Started guide at Socket.IO, then go through a sequences of changes
  to this file.  Rather than do that, in our GitHub repository we have
  made availabe the result of that updating work using a slightly
  different filename: `index-ws.js` (representing it makes use of Web
  Sockets), along with the accompanying file `index-ws.html`.  The
  HTML file has also been adjusted to work with the `/web-chat/`
  URL prefix, needed with the _<script>_ tag includes the _socket.io.js_
  file.

  To run the Web Socket version, enter:
```  
  node index-ws.js
```

