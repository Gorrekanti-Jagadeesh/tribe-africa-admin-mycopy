# Tribe Africa Admin Platform

## Overview

Tribe Africa Admin is a comprehensive management platform that powers Tribe Africa's digital ecosystem. It serves as the central hub for managing travel services, business listings, and professional networking across African countries.

## Key Features

### 1. Travel & Tourism Management

- **Destinations**: Manage holiday destinations and travel guides
- **Accommodations**: Handle hotel listings, bookings, and property management
- **Activities**: Curate must-see attractions and local experiences
- **Events**: Organize and manage travel-related events
- **Country Guides**: Maintain detailed country-specific travel information

### 2. Business Services Hub

- **Directory**: Manage business listings and profiles
- **Networking**: Facilitate professional connections and partnerships
- **Recruitment**: Handle job postings and hiring processes
- **Events**: Organize business events and conferences
- **Remote Work**: Manage remote work opportunities and listings

### 3. Content Management System

- **Blog Platform**: Manage articles and blog content
- **Business Profiles**: Handle business listing content
- **Accommodation Details**: Manage property information
- **Event Content**: Organize event details and schedules
- **Country Information**: Maintain country-specific content
- **Professional Profiles**: Manage professional user profiles

### 4. User Management System

- **Dashboard**: User control panel and analytics
- **Forms**: Business and professional profile creation
- **Bookings**: Accommodation and event booking management
- **Registration**: Event and service registration
- **Q&A**: Community question and answer management
- **Notifications**: User notification system

## Technology Stack

### Core Technologies

- **Frontend**: React 18 + TypeScript
- **Build System**: Vite
- **Styling**: TailwindCSS
- **State Management**: React Query
- **Routing**: React Router v6

### Integrations

- **CMS**: Sanity.io
- **Forms**: React Hook Form
- **Internationalization**: i18next
- **Maps**: Leaflet
- **Rich Text**: Quill Editor
- **File Handling**: React Dropzone
- **Payments**: Stripe
- **Authentication**: Firebase

## Getting Started

### System Requirements

- Node.js v16 or higher
- npm or yarn package manager
- Modern web browser
- Git

### Required Accounts

- Sanity.io account
- Firebase project
- Stripe account (for payment processing)

### Installation Steps

1. **Clone the Repository**

   ```bash
   git clone [https://github.com/ert-developer/tribe-africa-admin.git]
   cd tribe-africa-admin
   ```

2. **Install Dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Environment**
   Create a `.env` file in the root directory:

   ```env
   # Sanity.io Configuration
   VITE_SANITY_PROJECT_ID = "set_me"
   VITE_SANITY_DATASET = "set_me"
   VITE_SANITY_TOKEN = "set_me"
   VITE_SANITY_IMAGE_URL_PREFIX = https://cdn.sanity.io/images

   # Currency converter API key for 'exchangerate'
   VITE_CURRENCY_API_KEY = "set_me"
   VITE_WEATHER_API_KEY = "set_me"

   #Stripe Payment:
   VITE_STRIPE_API_KEY_DEV="set_me"
   VITE_STRIPE_SERVER_URL_DEV="set_me"
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Project Structure

```
src/
├── api/          # API integration and services
├── atoms/        # Basic UI components
├── context/      # React context providers
├── hooks/        # Custom React hooks
├── molecules/    # Composite UI components
├── pages/        # Page components
├── routes/       # Application routing
├── schemas/      # TypeScript type definitions
├── service-urls/ # API endpoint configurations
├── types/        # TypeScript interfaces
└── utils/        # Utility functions
```

## Available Commands

### Development

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build

### Code Quality

- `npm run lint` - Run ESLint
- `npm run clean` - Clean TypeScript build

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react';

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
});
```
