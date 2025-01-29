# Mock Server UI

This project is a simple mock server management interface built with React and Express. It allows users to create, update, delete, and manage mock API routes. The frontend is built using React with Vite as the build tool, while the backend is a simple Express server that stores mock data in a JSON file.

## Features

- **Add New Routes**: Users can add new mock routes by specifying the path, HTTP method, response, and description.
- **Edit Existing Routes**: Users can edit existing routes to update their path, method, response, or description.
- **Delete Routes**: Users can delete routes that are no longer needed.
- **Search Routes**: Users can search for routes by path, method, or description.
- **Dynamic Mock Responses**: The server dynamically responds to requests based on the configured mock routes.

## Project Structure

- **Frontend**: The React application is located in the `src` directory.
  - `App.jsx`: The main application component that manages the state and routing.
  - `RouteForm.jsx`: A form component for adding or editing mock routes.
  - `RouteList.jsx`: A component that displays the list of mock routes.
  - `Sidebar.jsx`: A sidebar component that includes the search functionality and the list of routes.
  - `dev.js`: A script to start both the mock server and the Vite development server.

- **Backend**: The Express server is located in the `src/server` directory.
  - `index.js`: The main server file that handles CRUD operations for mock routes and serves mock responses.

## Getting Started

### Prerequisites

- Node.js (v20 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/lpcv5/mockserver-ui.git
   cd mockserver-ui
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development environment:
   ```bash
   npm run dev
   ```

   This will start both the mock server and the Vite development server.

### Running the Application

- **Mock Server**: The mock server will run on `http://localhost:3000`.
- **Vite Dev Server**: The React application will run on `http://localhost:5173`.

### Available Scripts

- `npm run dev`: Starts both the mock server and the Vite development server.
- `npm run build`: Builds the React application for production.
- `npm run serve`: Serves the production build of the React application.

## Usage

1. **Add a New Route**:
   - Click the "Add New Route" button in the sidebar.
   - Fill in the path, method, response (JSON), and description.
   - Click "Add Route" to save the new route.

2. **Edit an Existing Route**:
   - Click on a route in the sidebar to select it.
   - Modify the route details in the form.
   - Click "Save Changes" to update the route.

3. **Delete a Route**:
   - Select a route from the sidebar.
   - Click the delete button (not shown in the current code, but can be added).

4. **Search Routes**:
   - Use the search bar in the sidebar to filter routes by path, method, or description.

## Backend API Endpoints

- **GET `/admin/mock`**: Fetch all mock routes.
- **POST `/admin/mock`**: Add a new mock route.
- **PUT `/admin/mock/:id`**: Update an existing mock route.
- **DELETE `/admin/mock/:id`**: Delete a mock route.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
