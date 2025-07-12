# SwapIT Frontend

A modern React TypeScript frontend for the SwapIT skill exchange platform, built with Tailwind CSS and Framer Motion.

## 🚀 Features

- **TypeScript** - Full type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Framer Motion** - Smooth animations and transitions
- **React Router** - Client-side routing
- **Context API** - State management for auth and notifications
- **Axios** - HTTP client for API communication
- **Responsive Design** - Mobile-first approach
- **Modern UI/UX** - Clean, accessible, and intuitive interface

```

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript 4.9** - Type safety
- **Tailwind CSS 3.3** - Styling
- **Framer Motion 10** - Animations
- **React Router 6** - Routing
- **Axios** - HTTP client
- **React Hook Form** - Form handling
- **Zustand** - State management
- **Headless UI** - Accessible components
- **Heroicons** - Icons

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**
   ```bash
   npm start
   # or
   yarn start
   ```



### Environment Variables

Create a `.env` file in the frontend directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 📦 Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues



### Adding New Components

1. Create the component file in the appropriate directory
2. Export the component with proper TypeScript types
3. Add any necessary styles using Tailwind classes
4. Import and use in your pages

### Adding New Pages

1. Create the page component in `src/pages/`
2. Add the route in `src/App.tsx`
3. Implement the page functionality
4. Add any necessary navigation links

### API Integration

1. Create service files in `src/services/`
2. Use the base `apiService` for HTTP requests
3. Add proper TypeScript types for API responses
4. Handle loading states and errors

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

## 📱 Responsive Design

The app is built with a mobile-first approach using Tailwind's responsive utilities:

- **Mobile**: Default styles (no prefix)
- **Tablet**: `sm:` prefix (640px+)
- **Desktop**: `md:` prefix (768px+)
- **Large Desktop**: `lg:` prefix (1024px+)

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` directory.

### Environment Setup

Make sure to set the correct `REACT_APP_API_URL` for your production environment.

