# BrainFlix API

BrainFlix API is the back-end server for the BrainFlix video sharing platform. It handles video data storage, retrieval, and management.

## Features

- Allows users to retrieve a list of videos
- Allows users to retrieve details of a specific video
- Allows users to upload new videos
- Allows users to post comments on videos
- Allows users to delete comments on videos
- Allows users to like comments on videos

## Technologies Used

- Node.js
- Express.js
- Multer for handling file uploads
- UUID for generating unique IDs
- fs (File System) module for reading and writing files

## Getting Started

To run the app locally, follow these steps:

1. Clone this repository:
https://github.com/xxl-2016/xixi-liang-brain-flix-api

2. Navigate to the project directory:

3. Install dependencies:
npm install

4. Run Node:
node index.js

5. The server will start running on [http://localhost:3000](http://localhost:3000).

## API Endpoints

- `GET /videos`: Retrieve a list of all videos.
- `GET /videos/:id`: Retrieve details of a specific video.
- `POST /videos`: Upload a new video.
- `POST /videos/:id/comments`: Post a comment on a specific video.
- `DELETE /videos/:id/comments/:commentId`: Delete a comment on a specific video.
- `PUT /videos/:id/comments/:commentId/likes`: Like a comment on a specific video.