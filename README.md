# KaarYab Afghanistan – Opportunity Finder Platform

## Overview
KaarYab Afghanistan is a modern web application that helps Afghan youth discover jobs, internships, scholarships, remote work, online courses, and skill-building opportunities in one place.

## Problem Statement
Information about opportunities in Afghanistan is often scattered across websites, social media pages, and online communities. This makes it difficult for students and job seekers to find reliable opportunities. KaarYab centralizes these opportunities into a single, user-friendly platform.

## Objectives
- Centralize opportunities in one platform.
- Help users search efficiently.
- Provide a modern and responsive UI.
- Demonstrate modern frontend development practices.

## Features
- Browse and search opportunities
- Filter by category, type, and location
- View opportunity details
- Save opportunities using LocalStorage
- Add new opportunities with validation
- Delete opportunities
- Dashboard with live statistics
- Dark Mode
- Fully responsive design

## Technology Stack

### Core
- Next.js 16.2.12
- React 19.2.4
- TypeScript

### Styling
- Tailwind CSS
- Tailwind Merge
- clsx
- Vazirmatn Font
- Lucide React

### Forms & Validation
- React Hook Form
- Zod
- @hookform/resolvers

### Utilities
- date-fns

### Development Tools
- ESLint
- PostCSS
- Autoprefixer

## Project Structure

```text
app/
components/
context/
lib/
public/
types/
```

## Installation

```bash
git clone <repository-url: https://github.com/HakimaNoori/kaaryab_afghanistan>
npm install
npm run dev
```

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## State Management
The application uses React Context API for global state management and LocalStorage for persisting saved opportunities.

## Form Validation
Forms are built with React Hook Form and validated using Zod.

## Responsive Design
Optimized for mobile, tablet, laptop, and desktop devices.

## Future Improvements
- User Authentication
- Admin Dashboard
- Backend API
- Database Integration
- Email Notifications
- Advanced Search
- Multi-language Support (English, Dari, Pashto)
- AI-based recommendations

## Developer
**Hakima Noori**

## License
This project is intended for educational and portfolio purposes.
