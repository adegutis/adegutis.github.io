---
layout: post
title: Intro to the Conference Automation
---

## Conference Overview

One of the larger projects I am involved with is my company's annual user conference. I am the technical lead for the conference, responsible for the initial set up of, and ongoing updates to, the laptop image used for training. The 4-day conference is attended by over 1,000 professionals that use, or wish to learn about, our company's software. Conference sessions consist of speaker presentations and demos, as well as instructor-led hands-on learning in 8 different rooms. In addition to the hands-on training sessions, there's a Workshop where attendees can request one-on-one assistance, demos of existing features and get a sneak peak at soon to be released features. The laptop image is applied to over 500 computers which are used for these various sessions.

## The Master Image

In previous years, the master laptop image was painstakingly created by manaually install the operating system, configuration dozens of systems setting, installing software (corporate and 3rd party), and then configurging dozens of user specific settings. Again, all of this was done manually and it took almost about 3 weeks. A Word document served as a checklist of what software was installed, and what system and user settings needed to be modified. 

## The Automation

Once the master image was created, it is updated using PowerShell scripts that update the corporate software and data. The same PowerShell scripts are used at the conference to push last minute software and data updates to all 500+ computers before the conference begins and to reset the image each night of the conference.

## The Next Level of Automation

I gave myself a few new goals this year.

1. Create an image validation test to confirm the master image set up.

    This would be become the new checklist to verify the installed software and settings.

1. Automate as much as possible of the initial master image set up.

    Last year I did a relatively small portion of the master image set up using PowerShell Desired State Configuration (DSC), although it did include the installation of SQL. This year I switched to using Ansible for the automation since it was deemed the official product by corporate.

 