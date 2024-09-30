# CS 260 Startup Project
## Elevator Pitch
As a freshman starting her first semester of college, the number of assignments can be overwhelming. At the moment, I have a spreadsheet with all of my assignments for the semester, and I know some of my friends and roommates have similar solutions. My web app, an assignment planner, will aim to make organizing and remembering assignments easier.
![Main page mockup](./images/spec1.jpg)
![Log in mockup](./images/spec2.jpg)
![Sign up mockup](./images/spec3.jpg)
![New assignment mockup](./images/spec4.jpg)
## Key Features
- Create new assignments and specify a name, a class, the due date, and the date you want to finish the assignment
- Log in to save assignments
- Check off completed assignments
- View completed assignments in a separate tab
- Sort assignments by date
- Tap on part of an assignment (such as the due date) to edit it
## Technologies
- **HTML**: Website structure, including a header and footer, buttons, text and date input for assignments
- **CSS**: Style website to look nice and use whitespace well, and use an attractive color palette and font scheme
- **React**: Add interactivity such as switching between tabs, initiating login and logout, and adding and completing assignments
- **Web Service**: Email API to notify users if they have an assignment due
- **Authentication**: User logs in with an email (or username) and password to access their personal list of assignments
- **Database**: Save user's assignments so they can access them again later
- **WebSocket**: Real-time counter (in the footer) of how many assignments have been completed using the app
## HTML Deliverable
- [x] **HTML pages for each component of your application:** just one home page (I'm planning to have a login and a list of the user's images as popup dialogs)
- [x] **Proper use of HTML tags including BODY, NAV, MAIN, HEADER, FOOTER:** Only one HTML page means no nav is necessary, but all other tags are there
- [x] **Links between pages as necessary:** no other pages, but links that will trigger popup dialogs later on
- [x] **Application textual content:** done
- [x] **Placeholder for 3rd party service calls:** placeholder image, which will later display a preview of the output from the vector converter API
- [x] **Application images:** Icons for various settings, buttons, and links
- [x] **Login placeholder, including user name display:** done
- [x] **Database data placeholder showing content stored in the database:** placeholder list of user's previously converted images, done
- [x] **WebSocket data placeholder showing where realtime communication will go:** placeholder image will update in real time with a preview of the converted image
