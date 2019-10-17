The Project:
Create a grocery list web-application that can be shared in real-time by multiple people. Upon arriving at the grocery store, users can log in to see their grocery list and can check off the items when they acquire them. Meanwhile, the rest of the family can see which items have been acquired and which still need to be found. When you check off an item on your list, it appears checked off on everyone else's list, preventing duplicate items.

Required user stories:
As a user, I want to save, update, and delete items from a database of my choosing
As a user, I want to be able to sign in on multiple devices via authentication
As a user, I want to be able to add, edit, delete, 'mark as purchased', and 'unmark as purchased' on each individual item
As a user, I want the list to be synced in real time on each device

Using the app-
1- Create a User account
2- Log in to begin creating Lists 
3- Create a list and populate it with Grocery items. The list and items can be edited or deleted as needed
4- Grocery items will appear on the list with a "Need It" bubble
5- Grab the family and log into the family account on each device
6- As you shop, tap the 'Need It' bubble to change it to a 'Got It' bubble, indicating the item is acquired

Built with express and Node.js, using EJS for scripting

Real-time updating with Socket.io - real-time API that works with node.js & allows bidirectional and event-based communication between the browser and the server. This is used in the groceryList app to listen for user changes to the checklist, and when they happen, to emit the changes back to all the other users.

Styled with Bootstrap, the design is simple but functional and optimized for use on mobile devices

Database & ORM - postgresql & Sequelize - The structure for user creation, list and grocery creation and management 

Validations- express-validator
Flash messaging - express-session, express-flash
Password hashing - bcrypt

Project notes - If I were to spend additional time on the project, I would make the grocery item database public to the app instead of localized to individual users and lists - the framework for these changes is commented in the Grocery model, but I had to drop this for the first release in the interest of getting to a minimum viable product within the deadline
- The naming of the Purchase model is a little clumsy, if I were to go back I would rename it 'Mark' as its function is to mark whether an item is purchased or not purchased, and because 'Marks' makes more sense in context than 'Purchaseds'
- I'm currently only using the Socket.io API to refresh the page on everyone's device when one user changes an item on their list. If I had more time, I would consider using this for more interesting features, like sending notifications to everyone when a list item was picked up, or when the full list was finished ('Meet at the front! Shopping done') 
- I know that richer front-end presentations are doable, but I went very simple as I'm not visual arts/graphic design oriented. If I were doing this project long term, I would enlist the help of someone with these skills to help me with some wireframes and go deeper into front end design 

Known issues: Test coverage is included, but since implementing user authentication, integration test suites  for groceries and lists have not been passing because of a problem with the mock-authentication for users. Tests are not registering a 'signed-in user' so they are not functioning as they should