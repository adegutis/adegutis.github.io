---
layout: post
title: Automating a Conference Image - Intro
---

*This is the first in a series of posts about how we use automation, in particular PowerShell, to set up and manage over 500 computers used for hands on training at a users' conference.*

## Conference Overview

Over the years I've been involved in many projects such as data center migrations, setting up automated process to streamline SaaS Operations tasks and providing self-service options for other departments. One of the larger projects I am involved with is the company's annual users' conference. As the technical lead for the conference I am responsible for the initial set up of, and ongoing updates to, the laptop image used for training. The 4-day conference is attended tax professionals that want in-depth training on our company's tax software. The conference sessions consist of speaker presentations and demos, as well as instructor-led hands-on learning in 8 different rooms. In addition to the hands-on training sessions there's a Workshop where attendees can request one-on-one assistance, see demos of existing features and get a sneak peak at soon to be released features. The same laptop image is applied to over 500 computers which are used in all these sessions.

## The Master Image

The master laptop image is an all-in-one machine that runs the web front end server, our server application, the backend database and all of the required client-side software. We've toyed with the idea of running a *SaaS-in-a-box* server in each room that would host the web front end and database backend for all of the users in that room and only installing the client-side software on the laptops. Unfortunately the networking that is set up less than 48 hours before the conference begins have never been reliable enough. The rental company that provides the hardware does an amazing job setting up rooms with up to 100 computers for hands-on training in such a short period of time. The reality is that this is rental hardware and cabling that is being reused many times over. Also, as much as they try to tied down the cables and power cords there is no way to stop an attendee from accidentally causing a localized power outage by knocking the power cable out of the back of a router, or worse yet, unplugging a piece of hardware so they can plug in their phone or laptop. Using the all-in-one laptop approach protects the users for losing their work during a half-day workshop if the network becomes disconnected. Also, the localized all-in-one laptop allows us to set them all up identically and not have to worry about creating and maintaining multiple copies of the same database, one for each user, and unique user accounts. Each laptop gets the exact same database (5 databases actually but more on that later).

In previous years, the master laptop image was painstakingly created by manaually install the operating system, configuring dozens of systems setting, installing corporate and 3rd party software (e.g. Microsoft Office apps), and then configuring dozens of user specific settings to provide a pre-define desktop experience. Again, all of this was done manually and it took about 3 weeks. A Word document served as a checklist of what software was installed and what system and user settings needed to be modified. As you could probably imagine, trying to maintain a checklist of software and settings becomes a moving target, especially as the pace picks up the the days leading up to the conference.

## The Automation

Once the master image was created, it is updated using PowerShell scripts that update the corporate software and data. The same PowerShell scripts are used at the conference to push last minute software and data updates to all 500+ computers before the conference begins and then to reset the image each night of the conference.

## The Next Level of Automation

I gave myself a few new goals for 2018.

1. Create an image validation test to confirm the master image set up.

    This would be become the new checklist to verify the installed software and settings.

1. Automate as much as possible of the initial master image set up.

    Last year I did a relatively small portion of the master laptop image set up using PowerShell Desired State Configuration (DSC), although it did include some hefty steps such as installing Microsoft SQL 2016. This year I switched to using Ansible for the automation since it is the official corporate product.

In the upcoming posts I will share my journey including various stumbling blocks, workarounds and kludges that I utilized. The goal is not to provide a how-to document but to share my approach, hopefully giving you some possible takes aways and ideas that you may be able to apply to some situations you face.

 