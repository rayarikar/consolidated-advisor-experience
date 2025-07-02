# Prudential Advisor Portal

A comprehensive life insurance advisor experience built with React TypeScript and Material-UI.

## Features

✅ **Authentication System**
- Login/Register with Prudential branding
- Demo credentials: `jadams` / `password`
- State persistence via localStorage

✅ **Core Components**
- **Unified Dashboard**: Cases & policies with filtering, search, status tracking
- **Profile Management**: Editable advisor information with licensing details
- **Navigation**: Professional sidebar with user profile and notifications

✅ **Design System**
- **Prudential Theme**: Official colors (#003f7f blue)
- **Material-UI Components**: Professional, accessible UI
- **Responsive Design**: Mobile-friendly layouts

✅ **Mock Data**
- 5+ realistic insurance cases with various statuses
- 4+ active policies with different product types
- Complete user profiles and business information

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation & Running

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

The application will open at `http://localhost:3000`

## Demo Credentials

**Username**: `jadams`  
**Password**: `password`

Or register a new account using the registration form.

## Project Structure

```
src/
├── components/
│   ├── auth/           # Login and registration forms
│   ├── dashboard/      # Unified cases & policies dashboard
│   ├── layout/         # App layout with navigation
│   └── profile/        # Profile management component
├── data/
│   └── mockData.ts     # Realistic mock insurance data
├── theme/
│   └── prudentialTheme.ts  # Prudential brand theme
├── types/
│   └── index.ts        # TypeScript type definitions
└── App.tsx             # Main application component
```

## Key Features

### Dashboard
- **Cases Tab**: View all insurance applications with filtering by status, product type
- **Policies Tab**: Manage issued policies and track book of business
- **Search**: Find cases/policies by client name or number
- **Metrics**: Key performance indicators and statistics

### Profile Management
- Edit advisor information (name, contact details, licensing)
- View licensed states and agency information
- Save changes with success feedback

### Professional UI
- Prudential brand colors and styling
- Responsive design for desktop and mobile
- Material-UI components for consistency
- Professional navigation with user avatar

## Architecture

- **Frontend**: React 18 + TypeScript + Material-UI v7
- **State Management**: React hooks + localStorage persistence
- **No Backend**: Pure frontend mock (ready for API integration)
- **Build Tool**: Create React App

## Future Enhancements

Additional components are planned for:
- Preferences Management
- Self-Service Options (address changes, beneficiary updates)
- Commission Dashboard
- Marketing Resource Portal

The architecture is designed for easy extension and API integration.

## Development Notes

Built with defensive security principles - no malicious code generation, focus on legitimate business functionality for insurance advisors.