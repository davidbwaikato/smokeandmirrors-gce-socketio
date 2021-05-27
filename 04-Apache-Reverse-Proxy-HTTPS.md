

# Configuring your Apache2 installation to operate over HTTPS

  To get setup with HTTPS, we are going make use of Let's Encrypt's
  `certbot` command-line utility.  As noted at the end of the last stage of
  the walk-through this can only be done if you can map the IP address of
  the VM your have created (i.e. what we have been using with the
  placeholder 111.222.333.444) to be part of a registered domain.


  For the Debian distribution of Linux, the `certbot` tool is installed
  through (sigh!) yet another package manager (called _snap_), so we need
  to install that, before we can install `certbot`.

  Following to the letter the commands Let's Encrypt gave for Debian, when
  I ran them some printed out message that sounded a bit concerning, but
  ultimately turned out to be benign.  One seemed to be styled as a warning
  (install core), and another (refresh core) said there was nothing to do.
  The full sequence is:
 
```
  sudo apt install snapd
  sudo snap install core
  sudo snap refresh core
  sudo snap install --classic certbot
  sudo ln -s /snap/bin/certbot /usr/bin/certbot
	
  sudo certbot --apache
```

  On running the final command, at the command-line prompt you will need to
  answer a series of questions.  When it comes to the question about
  the domain:
```  
No names were found in your configuration files. Please enter in your domain
name(s) (comma and/or space separated)  (Enter 'c' to cancel):
```
  Let's say you own 'mydomain.com' and you want your VM to appear as
  the subdomain `webchat` within that, then you would enter:
```
  webchat.mydomain.com
```

  This has made a new file in the Apache2 config file area:
```
  /etc/apache2/sites-enabled/000-default-le-ssl.conf

```
  which is very similar to your `000-default.conf` except it has additional
  entries (down near the bottom of the file) that bind in the SSL
  Certificate files.

  It is worth double-checking that the Reverse Proxy rules we added in
  to `000-default.conf`:
```
       ProxyPass /web-chat/ http://localhost:3000/ 
       ProxyPassReverse /web-chat/ http://localhost:3000/
```
  are also present in `000-default-le-ssl.conf`.  If not, use a comparable
  `sudo` edit command to put these lines in:
```  
  sudo emacs /etc/apache2/sites-enabled/000-default-le-ssl.conf
```

  And now restart the Apache2 web server:
```
  sudo systemctl restart apache2 
```

## Update the VM settings to allow HTTPS traffic and disable HTTP

  Back in the Google Cloud Platform dashboard, select:
  * Main Navigation Menu -> Compute Engine -> VM Instances
  * Click on the _web-chat_ VM
  * Click on 'Edit' in the top navigation bar

  Scroll down to locate 'Firewalls'
  * Check-box on for 'Allow HTTPS traffic'
  * Check-box _off_ fpr 'Allow HTTPS traffic'

  * __Save__
  


## Check the web server is now operating of HTTPS

  To check that Apache2 web server is operating correctly over https, let's
  break down the checks to run into two steps:

### Step 1 -- Check the Main Apache2 Web Page

  In a fresh tab or window in your web browser, visit:
```
    https://webchat.mydomain.com/
```

### Step 2 -- Check the https connection to the NodeJS Express Hello World

  Now visit:
```
    https://webchat.mydomain.com/webchat/
```



