# Installing and Running a NodeJS Web-Server 

For this phase of the walk-through, we assume you are logged into the VM in
a terminal window and have a copy of the project checked out as the
directory _web-chat_.  See the last step of
[01-Baseline-GCE-VM.md](./01-Baseline-GCE-VM.md) if this is not the case.

You are also going to need to know what static IP address that has
been assigned to your VM.  There are various places this is display.
For example, from the Main Navigation Menu:
  * VPC network -> External IP Address

Below we use the following placeholder for this:
```  
  111.222.333.444
```

## Make sure your VM is up to date

  VM images tend to be a little bit behind the very latest updates for
  their operating system distribution, so it is always good practice
  to run the package managers update command first.  For Debian, the
  package manager is _apt_.  In the terminal window, enter:
  
  * sudo apt-get update
  * Press 'y' if prompted

## Decide on a text editor to use

  As things develop on the VM we are going to need to edit some
  configuration files using a text editor.  There are several choices
  here:
  * _vi_ is available by default, but has a reputation for being quite esoteric
  *  _nano_ is also available by default, and is probably a bit more intuitive to use
  
  My preference is to use _emacs_.  This can be installed by entering:

  *  sudo apt-get install emacs-nox

  We're also going to work with NodeJS and its package manager _npm_.
  Both can be installed by entering:
  * sudo apt-get install npm


## Hello World Web-Server with NodeJS (Part I)

  We're now ready to start working through the WebChat example
  detailed on the [Socket.IO web site](https://socket.io/get-started/chat).
  This uses the NodeJS package Express to run a web-server.  The example
  then adds in Web Sockets.  For now we're interested in running a
  basic Express web-server, displaying a web page that says _Hello world_

  In the terminal, first _cd_ into the project directory:
```
  cd web-chat
```
  
  Our git checked-out project already has
  
  Now install the Express (version 4)
```
    npm install express@4
```

  At this point in the Socket.IO Getting Started example, they run the
  server and test it, by running the command `node index.js`, which runs
  the simple _Hello world_ web-server on port 3000.  We want to do the
  same, but because we are doing this remotely on a VM, we need to first
  set up a Firewall rule that allows access to port 3000.
  

## Firewall Rule to Open Up Port 3000

  To set up a Firewall rule that allows in-coming connections on port 3000
  to the external IP number that is the VM.  We do this in two stages,
  first to add a Network Tag to the VM, then create a Firewall rule that
  matches to the tag we have just added to the VM

###  Step 1 (Add a Network Tag to the VM)
  * Main Navigation Menu -> Compute Engine -> VM Instances
  * Select 'web-chat'

  * Click on 'Edit' in top navigation bar:
    + Scroll down to 'Network tags'
    + Enter 'web-chat'
  * __Save__

###  Step 2 (Create a Firewall rule matched to the VM Network Tag)
  * Main Navigation Menu -> VPN network -> Firewall
  * Create Firewall Rule
  
    + Name: _web-chat_
    + Targets: _Target tags_
    + Source filter: _IP ranges_
    + Source IP ranges: _0.0.0.0/0_
    + Specified protocols and ports
        - tcp: _3000_

  * __Save__


## Hello World Web-Server with NodeJS (Part II)

  We're now ready to connect to the NodeJS-based Express web-server.

  Back in the terminal for the VM enter:
```
    node index.js
```

  Now in your web browser, visit:
```
    http://111.222.333.444:3000/
```

  Your browser should display the text _Hello world_


  Note: that at this stage, the URL entered needs to be prefixed with
   __http__.  In some browsers, skipping this means it defaults to
   trying _https_, which will then fails.

## Next Stage

  The next stage is to install the Apache2 Http Web-Server and configure it
  to be the Public Facing Front-end to the NodeJS Express Web-Server:


  * [03-Apache-Reverse-Proxy-HTTP.md](./03-Apache-Reverse-Proxy-HTTP.md)
