Project 
Border-Radius Feature in Shapes with HTML5 Canvas and TypeScript


Project Overview
This project allows users to draw shapes (rectangles and circles) on an HTML5 canvas and dynamically adjust their border-radius to create rounded corners. The application is built using HTML5, CSS, and TypeScript to manage shape properties and rendering logic. The goal is to provide a simple, interactive tool for manipulating shapes in real-time with a focus on the border-radius feature.

Features
Shape Selection: Choose between rectangles and circles to draw on the canvas.
Border-Radius Control: Adjust the border-radius value using input sliders to create rounded corners for the shapes.
Real-Time Rendering: The canvas updates automatically as you adjust the border-radius, allowing you to see the changes immediately.

Additional Options:
Color Selection: Change the fill color of the shapes.
Stroke Settings: Adjust the border/stroke color and width.
Save Canvas as Image: Download the canvas content as a PNG image.

Technologies Used
HTML5: For rendering the canvas element and basic layout.
CSS: For styling the page and canvas element.
TypeScript: For managing the shape logic, user inputs, and canvas rendering.
JavaScript: Automatically generated from TypeScript during the build process.

How to Use
Clone or Download the Repository: Clone this repository to your local machine or download the ZIP file.

Open the Project: Open the index.html file in a web browser to run the application.

Draw Shapes:

Select a shape type (Rectangle or Circle) using the provided radio buttons.
Use the Border Radius slider to adjust the roundness of the shape's corners.
Change the Fill Color using the color picker to change the interior color of the shape.
Adjust the Stroke Width and Stroke Color for the border of the shape.
Click the Save Canvas as Image button to download the canvas content as a PNG image.

Interact with the Canvas:
Every time you change the border-radius, the shape on the canvas will update in real-time.
You can experiment with different combinations of border-radius, colors, and stroke settings to create unique designs.
File Structure

/your-repository
  ├── index.html           # Main HTML file
  ├── style.css            # Styles for the page and canvas
  ├── app.ts               # TypeScript logic for rendering shapes and handling user input
  ├── app.js               # Compiled JavaScript file
  ├── tsconfig.json        # TypeScript configuration file
  ├── README.md            # Project documentation
             
How It Works
HTML Canvas:

The <canvas> element is used to render the shapes.
The size and properties of the canvas can be adjusted dynamically.

TypeScript Logic:

The application is built around a Shape class, which includes properties for shape type (rectangle or circle), fill color, border radius, stroke color, and stroke width.
Event listeners are attached to the input elements (sliders, color pickers) to detect changes and update the shape's properties in real time.
Rendering:

When the user interacts with the inputs, the draw() function is called to redraw the shape on the canvas with updated properties.
Saving the Canvas:

The user can click a button to download the canvas content as a PNG image using the toDataURL() method of the canvas.
Installation Instructions
Install Dependencies: If you want to modify the TypeScript code or work on this project locally, first make sure you have Node.js and npm installed.

Install TypeScript globally (if you haven't already) by running the below in your vscode terminal:

npm install -g typescript

Build the Project:
Navigate to the project folder and install the necessary dependencies (if any). Typically, you would have a package.json file with dependencies by running the below:

npm install

Compile the TypeScript code by running the below:

tsc

This will generate the compiled JavaScript in app.js.

Run the Project:

Open the index.html file in your browser to view the app in action.
