# Spinning up a Baseline Google Compute Engine (VM)

For the purposed of this walk-through, we assume the name of the project
you are creating is called _web-chat_, and that you have access to Google
account.  You will see that we drawn upon the project name in several
places in the walk-through instructions: we use it for the name of the VM
we spin up, the name of the boot-up disk, for the name of the Firewall
rule, and so on.  Feel free to substitute your own project name in place of
_web-chat_.

Concerning creating VMs through the Google Cloud Platform, our experience
is that personal Google accounts (i.e. one you have set up privately) have
the right level of access to initiate the [Initial
Credit](https://cloud.google.com/free) free-tier, however the same is not
necessarily true for Organization where employee/staff accounts are also
linked as Google Accounts.  It depends on the settings your Organization
has granted you by default.  If it does look to be an issue, you can either
go the private account route, or else talk to your friendly Tech Support
personal within your organization to see if the setting can be changed.

## Create VM:

  The VM we create is mostly left on defaults

  Main Navigation Menu -> Compute Engine -> VM Instances
  * Click on _Create Instance_ in the top navigation bar

  Edit the following: 
  
  * Instance Name: web-chat
  * Increase boot-disk size
    + Stay with Debian GNU/Linux 10 (buster)
    + But change its disk size increased from 10G to 15G
  * __Create__

## Make its external IP address static:

  From the Main Navigation Menu:
  * VPC network -> External IP Address

  This shows a list of current VM network interfaces in use
    * The new VM (web-chat) shows: _Ephemeral_
    * Click on this and change to: _Static_
    * To "Reserve a new static IP address" you will be asked to name it
    * Keep the same name as the VM: _web-chat_

  Note down somewhere handy the IP address that has been allocated for your
  VM, we are going to need it in later phases of this walk-through.

  To help simplify our instructions later on, we are going to use
  the following placeholder for this:
```  
  111.222.333.444
```

  
## Set VM so disk not deleted when VM deleted:

  Main Navigation Menu -> Compute Engine -> VM Instances
  * Select 'web-chat'

  * Click on 'EDIT' in top nav bar
  * Change Boot Disk from:
     + Delete Disk => Keep Disk
  * __Save__

## Start the VM

  From the Main Navigation Menu:
  * Compute Engine -> VM Instances

  For the 'web-chat' VM, click on the 'SSH' drop-down menu, select:
  * Open in browser window

  Watch out for your web browser triggering its popup-window blocker
  * You might like to add an exception for _cloud.google.com_ as if
  your browser triggered the popup blocker this time, it is likely
  to do this every subsequent time you open up an _ssh_ terminal
  this way.

  Your web browser should have now opened up a new tab or window,
  and in it you have a command-line terminal access to your Debian
  Linux Distribution VM.  There won't be much to see at this stage,
  but type in a few commands to confirm things are as they should
  be:

  * _ls_
  * _ls -la_
  * _date_


### Checking out the Project Files

  As a final bit of preparation work, let's check out this GitHub
  repository on the VM

```
  cd ~/.
  git clone https://github.com/davidbwaikato/smokeandmirrors-gce-socketio.git web-chat
```

## Next Step

The next step is to install and run a NodeJS web server running over
http on port 3000, which you will access in the first instance directly.

  * [02-NodeJS-WebServer.md](./02-NodeJS-WebServer.md)

