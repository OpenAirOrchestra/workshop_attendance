=== Workshop Attendance ===
Contributors: Darryl F, Richard K
Donate link: http://www.thecarnivalband.com/
Tags: users, logging
Requires at least: 4.0
Tested up to: 5.8.2
Stable tag: 1.5.16

A simple workshop attendance plugin for The Carnival Band

== Description ==

Take attendance for carnival band workshops.  Attendees expected to be
mainly wordpress users.


== Installation ==

1. Upload this plugin to the `/wp-content/plugins/` directory
2. Activate the plugin through the 'Plugins' menu in WordPress

== Frequently Asked Questions ==

= Why did you create this plugin =

Taking attendance at workshops was tedious.

== Changelog ==

= 1.0 =
* Initial Version.

= 1.1 = 
* put user_id into attendance table

= 1.2 =
* Filter out users with user role.
* On attendence form, put users who have attended workshops recently on
  a different tab of the form.
* Put the add new users functionality on a different tab of the form.
* Sort users in attendace form by first name.

= 1.3 =
* make what tab users are on "sticky" so users don't jump between tabs
  while taking attendance.

= 1.4 =
* reduce data sent to avoid php maximum post fields limit.

= 1.4.1 = 
* bugfix release

= 1.4.2
* GitHub updater integration

= 1.5
* React attendance form

= 1.5.1
* Fix delete record permissions bug that only manifsted in production.

= 1.5.2
* Fix fetch user records bug.

= 1.5.3
* Fetch more users at a time.

= 1.5.4
* Double number of recents.

= 1.5.5
* Update attendance REST component to be usable by other plugin.

= 1.5.6
* Fetch more users at a time to speed up load time.

= 1.5.7
* Speed up load time.

= 1.5.8
* Bug fixes

= 1.5.9
* Load initial data in parallel

= 1.5.10
* move export to tools menu.
* add workshop categories.

= 1.5.11
* Proper tagging

= 1.5.12
* Handle removing all categories

= 1.5.13
* Use date input type

= 1.5.14
* Fix text empty field bug.

= 1.5.15
* change font to Helvetica for react attendance component.
* Increase number of recents for react attendance component.
* Truncate notes shown in react attendance component.

= 1.5.16
* Configurable recents in attendance component.
