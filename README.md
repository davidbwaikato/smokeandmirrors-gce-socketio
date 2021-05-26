# Setting up your own Web Socket based Web Server running on Google Compute Engine (VM)

Accessing the Google Compute Engine (GCE) area of their Cloud Platform
allows you to experiment with creating, and running your own servers.  The
company provides new users with some [initial
credit](https://cloud.google.com/free), which lets you trial out a few
things to help get a sense of what is possible, without accruing costs
in that initial experimentation phase.

In this GitHub project we concentrate on spinning up a Debian (Linux)
server, and mapping out the steps necessary to get to the point where you
have a public facing web-site/server running over https.

The web-site/server setup we work through centres on the Getting Started
WebChat example from the [Socket.IO
website](https://socket.io/get-started/chat).

Webchat is a nifty example based on NodeJS that makes use of Web Sockets to
operate.  The instructions provided on at Socket.IO are well laid out,
taking you the process of how to get the example going on your local PC.
It turns out, however, that migrating this so it is running on a publicly
accessible server -- say operating over https for good measure -- is a bit
more complicated.

This is where this GitHub project comes in!

The WebChat example runs an NodeJS-based web server on Port 3000.  This
GitHub project walks you through the steps needed to place an Apache
Web Server running over https in front of this.

The Walk-through has been broken down into various phases, each one
serving as a useful checkpoint to ensure things are working out
according to plan.

  * First we get a VM up and running.
  * Then we setup and access the NodeJS web server directly over port 3000
(which requires the VM to have a firewall rule added to open
up that port).
  * Next we add in a front-facing Apache web server running over
  _http_ (which means we don't need port 3000 left open)
  * Finally, we upgrade the Apache web server so it operates
  over htttps (which means we can close port 80 used by _http_)


The first 3 steps can be done using the IP of the GCE Virtual Machine that
has been created.  To undertake the final step, you need to have
administration rights to a web domain where you can set up a DNS entry that
maps the IP number of the GCE Virtual Machine into your web domain name.
Having a qualified web domain name for your VM is a requirement for being
issued an SSL certificate.

The first step of the Walk-through is detailed in:

  * [01-Baseline-GCE-VM.md]

