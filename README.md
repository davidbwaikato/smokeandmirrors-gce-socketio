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


