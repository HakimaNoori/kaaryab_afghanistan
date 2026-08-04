# KaarYab Afghanistan – Opportunity Finder Platform

## Overview
KaarYab Afghanistan is a modern web application that helps Afghan youth discover jobs, internships, scholarships, remote work, online courses, and skill-building opportunities in one place.

## Live Demo
[Add your Vercel link here]

## GitHub Repository
https://github.com/HakimaNoori/kaaryab_afghanistan

## Problem Statement
Information about opportunities in Afghanistan is often scattered across websites, social media pages, and online communities. This makes it difficult for students and job seekers to find reliable opportunities. KaarYab centralizes these opportunities into a single, user-friendly platform.

## Objectives
- Centralize opportunities in one platform
- Help users search and filter efficiently
- Provide a modern and responsive UI
- Demonstrate modern frontend development practices with Next.js

## Features
- Browse and search opportunities
- Filter by category, type, and location
- View opportunity details (dynamic route)
- Save opportunities using LocalStorage + Context API
- Add new opportunities with form validation
- Edit opportunities
- Delete opportunities with confirmation modal
- Dashboard with live statistics
- Multi-language support (English, Dari, Pashto)
- Dark Mode
- Fully responsive design (Mobile, Tablet, Desktop)
- Localized opportunity content for sample data

## Technology Stack

### Core
- Next.js (App Router)
- React
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
  page.tsx
  layout.tsx
  opportunities/
    page.tsx
    [id]/
      page.tsx
      edit/
        page.tsx
  saved/
  dashboard/
  add-opportunity/
  about/
  contact/
components/
context/
data/
lib/

## Developer
**Hakima Noori**

## License
This project is intended for educational and portfolio purposes.
