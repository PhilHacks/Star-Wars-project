1. I want to see an empty list of characters at start in the console
   //Se empty list

2. I want to be asked to add a star wars character to my list, by entering the name of the character
   //Add functionallity

I want to automatically see the updated list in the console after inputing the character
//Auto update in Nodemon?

3. I want to be asked to delete a character from my list
   //Delete function

4. I want to be asked to move characters from one index to another in the list
   //Move items from diffrent lists

Bonus: 5. I want to be asked to remove multiple characters by names
//Delete/remove multiple characters by name

6. I want to be asked to add multiple characters by names
   //add multiple characters by name

---

Separation of concerns is a software design principle that suggests separating different functionalities of a program into distinct modules, classes, or functions. This helps to improve code readability, maintainability, and reusability. Here are some suggestions for implementing separation of concerns in the given code:

1.Move the database-related code to a separate module or file. This will help to keep the database code separate from the application logic and make it more reusable.

2.Move the API-related code to a separate module or file. This will help to keep the API code separate from the application logic and make it more reusable.

3.Move the user input/output code (e.g., prompt, console.log) to a separate module or file. This will help to keep the user interface separate from the application logic and make it more reusable.

4.Split the main logic into smaller functions or modules. This will make the code more modular and easier to read, test, and maintain.

5.Use dependency injection or inversion of control to decouple the different modules or functions. This will make the code more flexible and easier to test and maintain.

6.Use error handling techniques to handle errors in a consistent and modular way. This will make the code more robust and easier to debug.
