
This is a sample project which includes a solution and improvements to the existing solution provided in the PDF

To run this project please do an npm install for one time followed by npm start everytime you run the project

The file IntervalHolder.tsx contains the updated changes as compared to the pdf provided . Following are the changes which have been accomodated and solution

**Why the code breaks**

1) The code initially breaks because there is no access to this context inside the handlers. The changes which have been done to accomodate it is by using arrow functions for the functions which solves the issue. Have provided the alternate approach of binding the event handlers in the constructor which is commented

**Changes which  been done to the existing solution in terms of optimisations and best practices**

1) Defining the state interface called StopwatchState. StopwatchState contains laps which is added in the state instead of  being a class variable.

2) clearInterval in handleStopClick has a condition check before performing clearInterval. Similar change is done in handleResetClick

3) handleLabClick handles the creation of laps based on clicks. Spread operator is used to add new elements to laps .

4) In order to handle the lap deletion in handleDeleteClick we use slice for generating portions of 2 array which is merged. 

5) componentWillUnmount is added which contains the cleanup function for interval timer before component is destroyed from the screen

6) The return type for handleDeleteClick is changed to accomodate the new change in deletion 

Another implementation I would consider is using React hooks. Primarily overthere I would try to have a similar pattern with handlers being added the usecallback hook and I would have a reference of the incrementer in a reference using useRef hook.
