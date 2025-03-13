## PDP Employability Assistant

### Overview
The **PDP Employability Assistant** is a web-based chat application developed to assist users in navigating the **Professional Development Program (PDP)**. The chatbot allows users to inquire about the program's eligibility requirements, workshop schedules, volunteer work experience options, and the application process. It is built with a user-friendly interface that supports both light and dark modes, providing an engaging and interactive experience.

### Project Structure

This project consists of three main files:
1. **index.html**: The main HTML structure that sets up the web page, including the header, chat container, and input fields.
2. **script.js**: The JavaScript file responsible for the interactive functionality of the chat application, including handling user input, fetching responses from the server, and managing animations.
3. **styles.css**: The CSS file that handles the styling and layout of the chat interface, including dark mode support, animations, and responsive design adjustments.

### Features
- **Chat Interface**: A conversational interface where users can ask questions related to the PDP program.
- **Dynamic Replies**: Based on user input, the assistant provides detailed responses and suggests quick reply buttons for further actions.
- **Dark Mode**: A toggle button allows users to switch between light and dark modes.
- **Smooth Animations**: Both the user messages and bot responses come with smooth animations, enhancing the user experience.
- **Quick Replies**: Predefined options for common questions about the PDP program, which the user can click to instantly send as a message.

### Installation Instructions
To get the **PDP Employability Assistant** up and running on your local environment, follow these steps:

1. **Clone the repository** or download the project files to your local machine.
2. Open the **index.html** file in your browser.
3. The chatbot should now be accessible in your browser. Start interacting by typing in the text input box.

### Code Walkthrough

#### 1. `index.html`
- The structure of the webpage includes a chat container (`chat-container`), header (`chat-header`), messages area (`chat-messages`), and an input field (`chat-input`).
- External libraries for Markdown parsing (`marked.min.js`) and HTML sanitization (`dompurify.min.js`) are used to ensure safe and formatted text rendering in the chat.
- The page uses a responsive design that adapts to different screen sizes, ensuring a seamless experience on both desktop and mobile devices.

#### 2. `script.js`
- **sendMessage**: Handles sending user messages and fetching bot responses. If no message is provided, the function fetches input from the user.
- **addMessage**: Adds messages to the chat container, including both user and bot messages. It animates messages as they appear on the screen.
- **quickReplies**: A set of predefined responses like "Eligibility requirements?" or "How to apply?" which are presented to the user as clickable buttons.
- **showTypingIndicator**: Displays a typing indicator that animates to simulate the assistant's typing process before providing a response.
- **addDarkModeToggle**: A function to add a button that toggles between light and dark modes.

#### 3. `styles.css`
- **General Styles**: Defines the font, background, and layout properties, including the chat container's size, color scheme, and animation effects.
- **Dark Mode**: Specific styles are applied when the `.dark-mode` class is added to the body. These styles include dark backgrounds, text color adjustments, and button changes for a better experience in low-light environments.
- **Animations**: Smooth transitions for message bubbles, button clicks, and quick reply button animations, making the chat interface more dynamic and engaging.

### Key Technologies
- **HTML5** for the structure and layout of the webpage.
- **CSS3** for styling, animations, and responsive design.
- **JavaScript** for interactivity, message handling, and dark mode toggle.
- **Marked.js** for parsing and rendering Markdown content in bot messages.
- **DOMPurify** for sanitizing HTML content to prevent XSS (cross-site scripting) attacks.

### Future Enhancements
- **Backend Integration**: The current version sends chat data to a local API (`localhost:3000/api/chat`). A backend can be set up to handle dynamic and intelligent responses using machine learning or natural language processing (NLP).
- **User Authentication**: Adding authentication features to allow users to save their conversations and preferences across sessions.
- **Multilingual Support**: Expanding the chatbot to support multiple languages, providing a more inclusive experience for international students.

### License
This project is open-source and available for free. You can modify, distribute, and use the code under the terms of the MIT License.

### Contact
For any questions or suggestions, feel free to reach out to the development team at **pdprogram@unsw.edu.au**.

---

This README provides an overview of the PDP Employability Assistant project and how to use and customize it. Let me know if you need any further clarifications or help!
