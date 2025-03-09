# Instagram Stories Clone

A simplified Instagram Stories clone built with **React.js**, **TypeScript**, and **Parcel**. This project demonstrates a mobile-first, high-performance, and scalable approach to building interactive, temporary story viewers.

## Table of Contents

- [Features](#features)
- [Design & Architecture](#design--architecture)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [Performance & Scalability](#performance--scalability)
- [License](#license)

## Features

### Mobile-First UI:

Designed exclusively for mobile devices with a horizontally scrollable list of story thumbnails.

### Stories Viewer:

Users can view stories with automatic progression every 5 seconds, and manually navigate between stories by tapping the left or right sides of the screen.

### Loading State:

Displays a loader while images are being fetched and preloads the next image for smooth transitions.

### Test Coverage:

Includes unit and integration tests written using **Jest** and **React Testing Library**.

## Design & Architecture

### Component Breakdown

- **StoriesContainer**: Renders a horizontally scrollable list of story circles, each representing a user's story.
- **StoryCircle**: Displays an avatar with an optional unseen indicator. Click events on each story circle trigger the story viewer.
- **StoryViewer**: The main component that handles image loading, automatic progression, and manual navigation between stories.

### Key Design Choices

- **Mobile-First Approach**: The UI is designed specifically for mobile devices to ensure a clean and focused experience.

#### Optimized Image Loading:

- **Lazy Loading & Preloading**: Images are loaded asynchronously. The current image is fetched and displayed while the next image is preloaded in the background.
- **Blob Conversion & Object URLs**: Images are fetched as blobs and converted into object URLs for efficient caching and memory management.

#### State Management & Performance:

- **Efficient State Updates**: The component minimizes unnecessary re-renders by batching state updates and using appropriate hooks (`useState`, `useEffect`).
- **Timer Management**: Uses Jest’s fake timers during testing to simulate time-based interactions.

### Scalability:

The modular design of the components and clean separation of concerns make it easy to extend functionality. The application architecture supports future integration with backend services, additional features, and improved performance optimizations such as code splitting.

## Installation

### Clone the Repository:

```bash
git clone https://github.com/krptic07/insta-stories-clone.git
cd insta-stories-clone
```

### Install Dependencies:

```bash
npm install
```

## Running the Application

To start the development server using Parcel, run:

```bash
npm start
```

The application will be served at `http://localhost:1234` (default Parcel port).

## Testing

This project uses **Jest** and **React Testing Library** for unit and integration tests.

### Run Tests

```bash
npm test
```

### Test Configuration

**Jest Config**: See `jestconfig.json` for details. It includes:

- TypeScript support via `ts-jest`
- A jsdom test environment with custom HTML
- Module name mapping for aliasing and stubbing out CSS/SCSS modules

## Performance & Scalability

### Image Preloading:

The **StoryViewer** component preloads the next image to ensure a smooth transition between stories.

### Batched State Updates:

Optimized state management minimizes re-renders, which is critical for performance on mobile devices.

### Scalable Component Design:

Each component is designed with a clear responsibility, making it easier to extend or refactor parts of the application without affecting the entire codebase.

### Efficient Timer Management:

Timer-based progress is implemented to manage automatic story advancement, and tests use fake timers to simulate these behaviors reliably.

## Deployment

You can view the deployed application at: [Insta Stories Clone](https://insta-stories-clone-nu.vercel.app/)

## License
