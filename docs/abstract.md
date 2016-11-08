# Project Abstrct

## Bridge
> A way to **bridge** the communication gap between teachers and students

### About the project

We are living in an age where the art of technology and the art of teaching has come a long way.
With **bridge** we intent to interlace those by helping to **bridge** the communication gap between teachers and students.
Currently, even though teachers use technology to reach out to students the solutions are more or less ad-hoc.
The communication is spread over different channels, sometimes a phone call, sometimes a text message, and sometimes nothing at all.
There lacks an efficient way for teachers to communicate to students directly as a group or individually.
Also there is no easy way for the students and teachers to keep track of the tasks they have in hand.
It is at times really hard for teachers to reach students most of time and they end up relying on the class representative to deliver the message which in itself is not bad, but is less efficient.

**Bridge** intents to solve all the above stated problems by implementing a application using which the teachers and students can communicate seamlessly with each other,
keep track of everything that they have to do, get replies asap and just about anything that helps make the student teacher communication much more effective and easy.

In here we will have ways in which

* Teachers will be able to contact to a group of students ( a class ) or specifically to an individual student.
* Teachers will be able to post all details about assignments and schedule exams to a common calender which will be visible to the respective students at any time.
* Teachers can also publish any results as well as remarks about a student or a group.
* Students will be able to post queries which can be answered by teachers

Now, for students

* They can always see what is coming up next in their calender
* They will be able to chat with a teacher to clarify anything he/she has doubts on.

### Interface

#### Students

The initial window of the project will be a quick glance of the list of things that are coming up.
From there they will be able to navigate to any specific list item or view be able to have a conversation with someone.
The student will also be able to mark tasks as completed once they have been done with something so that they will not be reminded of it again.
Through this they can also get their doubts cleared or queries answered.

#### Teachers

Teachers essentially get a platform to communicate with the students easily and without much hassle once they are out of college.
Teachers can at any time respond to any doubts by students so as to help them with their studies.
They can also add in any assignments that is due or any tests that is coming up to a calender which is viewable to all.

### Technology used

The project is meant to be developed on both `web` and `mobile` devices.
The backend will be written in `python 2` using the `django` framework and `flask` or `falcon` for additional microservices.
The frontend will be developed initially on `pug`, `stylus` and `coffescript`  which will be precompiled to `html`, `css` and `javascript` for delivery.
We will be using an `SQL` database to store and retrieve data essential for the project to function.
All of the database interaction to the `SQL` server will be done through a python interface in order to go along with the other python components of the project.
