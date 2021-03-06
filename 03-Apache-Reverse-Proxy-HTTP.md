# Setting up the Apache2 Http Web-Server to be the Public Facing Front-end to the NodeJS Express Web-Server

  In this section of the walk-through, we install the Apache2 http web-server
  to act as the publicly accessible front-end to the _Hello world_
  NodeJS Express web-server we set up in the previous section.

  In doing this, we are starting down the road of providing a more
  presentable URL for people to access.  For now it will still need
  to be an IP address that is used rather than a domainname, but
  it will no longer require the `:3000` part to specify the port.

  Setting up an Apache2 web-server this way is known as reverse-proxying.
  

### Install the Apache2 web-server

```
  sudo apt-get install apache2
```

  Back in the Google Cloud Platform dashboard, select:
  * Main Navigation Menu -> Compute Engine -> VM Instances
  * Click on the _web-chat_ VM
  * Click on 'Edit' in the top navigation bar

  Scroll down to locate 'Firewalls'
  * Click on 'Allow HTTP traffic'

  * __Save__
  
  In a fresh tab or window in your web browser, visit:
```
    http://111.222.333.444/
```
  To confirm that the Apache2 Debian Default Page web page is displayed

### Configure the Apache web-server for Reverse-Proxy use


  In the terminal type:
```  
  sudo a2enmod proxy_http
```

  Now, as an `sudo` command, open in a text editor the core config file
  for Apache2.  For example:
```  
  sudo emacs /etc/apache2/sites-enabled/000-default.conf
```

  After the `CustomLog` line (around line 20) add:
```  
       ProxyPass /web-chat/ http://localhost:3000/ 
       ProxyPassReverse /web-chat/ http://localhost:3000/
```	

  And now restart the Apache2 web-server:
```
  sudo systemctl restart apache2 
```

  Double-check you are still running the NodeJS Express web-server
  in the VM terminal.  If not, start it up again with:
```
  node index.js
```

  Now in your web browser visit
```
    http://111.222.333.444/web-chat/
```

  It should display the _Hello world_ page as before.

## Firewall Tidy up

  Now we have access via Apache2 to the NodeJS Express web server, we
  no longer need the Firewall rule that open up port 3000.  There are
  a couple of ways to go about this.  You could:
  * Remove the Network Tag from the VM
    + Main Navigation Menu -> Compute Engine -> VM Instances
    + Select the VM
    + Click on 'Edit' in the top navigation bar
    + Remove `web-chat` from the _Network tags_
  Or:
  * Remove the Firewall rule
    + Main Navigation Menu -> VPC network -> Firewall
    + Check-box select `hey-you` and then click on the Delete trash can in
      the top navigation bar.

## Next Stage

  For some of you following this walk-through this might very well be the
  logical place to stop.  In the next stage we upgrade the Apache2
  web-server so it operates over _https_ rather than _http_, using the SSL
  certificate granting agency Let's Encrypt.  To successfully undertake
  this stage, however, you need to have DNS administration rights for a web
  domain.  This is so you can register the IP number of the GCE VM as being
  part of a registered domain, a requirement for Let's Encrypt to issue an
  SSL certificate.

  * [04-Apache-Reverse-Proxy-HTTPS.md](./04-Apache-Reverse-Proxy-HTTPS.md)
