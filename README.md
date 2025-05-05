# QuoteNest

QuoteNest is a personal quote journal application that allows you to collect, organize, and reflect on your favorite quotes.

![QuoteNest Screenshot](screenshot.png)

## Features

- **Quote Management**: Add, edit, and delete quotes with author and source information
- **Tagging System**: Organize quotes with customizable tags
- **Favorites**: Mark quotes as favorites for quick access
- **Search**: Search quotes by content, author, source, or tags
- **Pagination**: Browse through your quotes with efficient pagination
- **Responsive Design**: Works on desktop and mobile devices

## Technology Stack

- **Frontend**: React, styled-components
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **State Management**: React Hooks

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- MongoDB (running locally or a remote MongoDB URI)

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/quotenest.git
   cd quotenest
   ```

2. Install dependencies for both server and client

   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. Create environment files

   **For server (.env in server directory)**:

   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/quotenest
   ```

   **For client (.env in client directory)**:

   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

### Running the Application

1. Start the server

   ```bash
   # From the server directory
   npm run dev
   ```

2. Start the client

   ```bash
   # From the client directory
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

The API provides the following endpoints:

- `GET /api/quotes` - Get all quotes (paginated)
- `GET /api/quotes/search?q=searchterm` - Search quotes
- `GET /api/quotes/tags/:tag` - Get quotes by tag
- `GET /api/quotes/favorites` - Get favorite quotes
- `GET /api/quotes/:id` - Get a single quote
- `POST /api/quotes` - Create a new quote
- `PUT /api/quotes/:id` - Update a quote
- `PATCH /api/quotes/:id/favorite` - Toggle favorite status
- `DELETE /api/quotes/:id` - Delete a quote

## Project Structure

```
quotenest/
│
├── client/                 # React frontend
│   ├── public/             # Static files
│   └── src/                # Source code
│       ├── components/     # Reusable components
│       ├── pages/          # Page components
│       └── services/       # API services
│
└── server/                 # Node.js backend
    ├── models/             # MongoDB models
    ├── routes/             # API routes
    └── middleware/         # Express middleware
```

## Future Enhancements

- User authentication and personal quote collections
- Export quotes to PDF or image
- Quote sharing via social media
- Daily quote notifications
- Collections or folders for organizing quotes
- More advanced search filters

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Inspired by the love of collecting meaningful quotes
- Built with React, Express, and MongoDB
