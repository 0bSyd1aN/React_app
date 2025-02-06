# React Project Assignment

## Overview
- This is a React-based web application featuring a Counter, User Data Form, and Rich Text Editors. 
- The application utilizes **Chakra UI** for the frontend design, and **TinyMCE** for the rich text editor integration. 
- The frontend is built entirely using **React**.

![Demo App](frontend/public/screenshot-for-readme.png) 

## Functional Requirements

### 1. Counter Component
- Buttons for increment, decrement, and reset.
- Maintains count across re-renders.
- Background color increases in a linear manner.
- Reset button resets the background color to its initial state.

### 2. User Data Form
- A form for capturing user data (name, address, email, and phone).
- Auto-generates a user ID and saves the data to local storage/RTK upon form submission.
- Displays a pop-up warning when there are unsaved changes, if the user tries to close the browser.

### 3. Rich Text Editors
- Visualizes user data in a rich text editor powered by **TinyMCE**.
- Includes formatting options such as bold, italic, underline, and lists.
- Data is persisted across sessions.


## Tech Stack
- **Frontend:**
  - **React** (Functional Components, Hooks)
  - **Chakra UI** (for UI components and styling)
  - **TinyMCE** (for rich text editing)

## Features
- **Responsive Design:** Built using Chakra UI for a modern, responsive layout that adapts to all screen sizes.
- **State Management:** Uses React's `useState`, `useEffect`, and Context API to manage application state efficiently.
- **Smooth Animations:** Utilizes React Spring for smooth, interactive animations and transitions across the app.
- **Persistent Data:** Form data and user inputs are saved locally in the browser using localStorage or RTK.
- **Rich Text Editing:** Powered by TinyMCE, allowing users to format text and persist it in the app.

## Setup

1. Clone the repository:
   ```shell
   git clone <repo_link>
   ```
2. Setting vite
 
- Under root create vite 
  ```shell
  npm create vite@latest .
  ```
- Select react and javascript respectivelly  and follow steps as given in the terminal .

- Following the package.json file in the Repo , you can install required dependencies 
  ```shell
  npm i <dependencies>
  ```

## Running

-  Navigate to frontend and Run the project using 
  ```shell
  npm run dev
  ```