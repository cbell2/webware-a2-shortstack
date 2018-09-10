## Beer Recommender Website - Brew Bros
Include a very brief summary of your project here.
Images are encouraged, along with concise, high-level text.

Users over 21 are able to fill out a form with parameters such as alcohol by volume, style, category, brewer, and country and our webapp randomly selects a random beer that fits their preferances. We created a clean user interface that makes it easy to get a customized beer recommendation. Access to an open beer database allowed our team to fetch results given user preferences to get exactly what the user is craving. The website gives a recommendation if one exists, however in some cases we are not able to accomodate a specific taste because a beer of that nature does not exist. In the future, a possible option that would complete the application would be a link on where to buy the beer or where it is available locally for that user.

***DELETE THIS LATER***
Here is a sample formula for summarizing your activities, talk about:
- the domain area the project pertains to
- the main challenges or problems the application addresses
- the key innovations that make it possible to address the problem
- the main results of the implementation, does it really address the problem?
- any additional implications of the resulting application, or possibly areas for future work that have been discovered as part of the design and implementation activities

(Note that when I use the above formula, I aim to have only one sentence per thought in order to remain concise.)

## Team and Team Members
Team Brew-Bros
https://brew-bros.herokuapp.com/

Christopher Bell,
Jason King,
Kamil Gumienny

## Technical Achievements
- **Tech Achievement 1**: Submitting a form through an XMLHTTPRequest and getting results that populate the html page.
- **Tech Achievement 2**: Making a custom function call to an API based on form selection on the index page 
- **Tech Achievement 3**: Adding an Audio snippet in the baby.html page that plays on click.
- **Tech Achievement 4**: Added an age-gate popup that verifies a user's age
- **Tech Achievement 5**: Created a callback function in the server that contacts the beer database
- **Tech Achievement 6**: Routing multiple HTML pages
- **Tech Achievement 7**:
- **Tech Achievement 8**:
- **Tech Achievement 9**:

### Design/Evaluation Achievements
- **Design Achievement 1**: Javascript Animation that fills a beer 
- **Design Achievement 2**: CSS and HTML design of the pages and form
- **Design Achievement 3**: Creating a clickable image (beer tap) that calls a JS function
- **Design Achievement 4**: 
- **Design Achievement 5**: 
- **Design Achievement 6**: 

### Team Coordination Activities

We met up as a group on multiple occasions and discussed our vision for the webpage. In our groupchat we would allocate the work and ask questions as necessary. Together we were able to figure out how to send and recieve a JSON file using XMLHTTPRequests, populate a webpage with results that are returned from the server, we learned how to select elements based on their ID's, making API calls to external databases. The hardest concept to grasp was getting form data and sending it over an XML request as opposed to letting the form submit with a method="post"or "get" in the form header. We also encountered some trouble when trying to display the data on the front-end. While we did get back a JSON object, we sometimes had difficulty parsing it correctly or pulling the correct information from it. The data from the form was manually pulled upon submission and added to a json object that was sent over to the backend. The reason we chose to do it this way was because an XML request allowed us to go obtain results after  POSTing the data and update the webpage accordingly.  



In this section, document any learning and design activities you complete as a group.

The main responsibility of every team is to ensure that all members would be comfortable implementing the basic functionalities and requirements defined in this document **on their own**. 

This may mean that you allocate less time for features, and more time for team collaboration and learning activities.
Once a team-wide baseline understanding is achieved, team-members are encouraged to use their interests and skillsets to pursue technical and design achievements that enhance the web application's functionality and design.
