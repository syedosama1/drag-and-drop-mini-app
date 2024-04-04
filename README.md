# Drag and Drop Page Builder

## Functionality

This project implements a drag and drop page builder, allowing users to create custom pages by dragging and dropping components from the sidebar onto a blank canvas. Key features include:

1. **Sidebar with Components**: The sidebar contains draggable components - Label, Input, and Button.
2. **Drag and Drop**: Users can drag components from the sidebar and drop them onto the blank canvas to add them to the page.
3. **Configuration Modal**: When a component is dropped onto the canvas, a modal appears allowing users to configure its position (X and Y coordinates) and other properties.
4. **Save Changes**: Upon configuring a component, users can save changes, and the component will be drawn on the canvas at the specified position.
5. **Draggable Elements**: Users can drag elements already on the canvas to change their position.
6. **Selection and Editing**: Clicking on an element on the canvas selects it, displaying a red border around the component. Pressing Enter allows users to edit the component's configuration through a modal, while pressing Delete removes the selected component.
7. **Automatic Local Storage**: All changes made by the user, including adding, updating, or deleting components, are automatically saved to local storage, ensuring persistence across sessions.

## Responsiveness

This page builder is designed to be responsive and adapt to various screen sizes. Key considerations for responsiveness include:

- **Flexible Layout**: Using CSS Grid or Flexbox to create a flexible layout that adjusts to different screen sizes.
- **Media Queries**: Applying media queries to adjust styles and layout based on screen width breakpoints.
- **Testing**: Testing the page builder across different devices and screen sizes to ensure consistent behavior and appearance.

## Installation

To run the project locally, follow these steps:

1. Clone the repository to your local machine:

    ```bash
    git clone <repository-url>
    ```

2. Navigate to the project directory:

    ```bash
    cd drag-and-drop-page-builder
    ```

3. Install dependencies using npm:

    ```bash
    npm install
    ```

4. Start the development server:

    ```bash
    npm start
    ```

5. Open your browser and visit `http://localhost:3000` to view the page builder.

