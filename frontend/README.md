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

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Auth/           # Authentication components
│   ├── Layout/         # Layout components
│   └── UI/             # Basic UI components (Button, Input, Card, etc.)
├── contexts/           # React Context providers
│   ├── AuthContext.tsx # Authentication state management
│   └── NotificationContext.tsx # Notification system
├── pages/              # Page components
│   ├── HomePage.tsx    # Landing page
│   ├── LoginPage.tsx   # Login form
│   ├── RegisterPage.tsx # Registration form
│   ├── OnboardingPage.tsx # User onboarding
│   ├── SwipePage.tsx   # Main swipe interface
│   ├── ProfilePage.tsx # User profile
│   ├── MatchesPage.tsx # View matches
│   └── RequestsPage.tsx # Manage requests
├── services/           # API services
│   ├── api.ts          # Base API configuration
│   └── authService.ts  # Authentication API calls
├── types/              # TypeScript type definitions
│   └── index.ts        # Main type definitions
├── App.tsx             # Main app component with routing
├── index.tsx           # App entry point
└── index.css           # Global styles with Tailwind
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

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

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

## 🎨 Design System

### Colors

The app uses a custom color palette defined in `tailwind.config.js`:

- **Primary**: Blue gradient (#0ea5e9 to #0284c7)
- **Secondary**: Purple gradient (#d946ef to #c026d3)
- **Success**: Green (#22c55e)
- **Warning**: Yellow (#f59e0b)
- **Error**: Red (#ef4444)

### Components

#### Button
```tsx
<Button variant="primary" size="md" loading={false}>
  Click me
</Button>
```

#### Input
```tsx
<Input
  label="Email"
  type="email"
  value={email}
  onChange={setEmail}
  placeholder="Enter your email"
  required
/>
```

#### Card
```tsx
<Card className="p-6" hover>
  <h2>Card Title</h2>
  <p>Card content</p>
</Card>
```

## 🔧 Development

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

## 🤝 Contributing

1. Follow the existing code style and patterns
2. Use TypeScript for all new code
3. Add proper error handling
4. Test your changes
5. Update documentation as needed

## 📄 License

This project is part of the SwapIT platform. See the main project README for license information.

## 🆘 Support

For support, please contact the development team:
- Vraj Parmar: vrajparmar.087.ce@gmail.com
- Dev Parikh: devparikh200479@gmail.com
- FarhaanAli Vohra: farhaanali.work@gmail.com
- Yash Vasani: vasaniyash784@gmail.com 