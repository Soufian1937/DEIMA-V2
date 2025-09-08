# Direction des études - Management & Gestion

## Overview

This is a comprehensive team management platform built as a React-based single-page application. The system provides a complete dashboard for managing team actions, emails, meetings, and reports with Excel export capabilities and dark mode support. It features a French interface with modules for tracking global actions, processing emails, managing manager meetings, team stand-ups, generating reports, and team member management. The application serves as a centralized hub for team coordination and project oversight with local data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development practices
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: Tailwind CSS for utility-first styling with PostCSS for processing
- **State Management**: React's built-in useState hooks for local component state management
- **Icons**: Lucide React for consistent iconography throughout the application
- **Component Structure**: Modular component architecture with separate components for each major feature

### Application Structure
- **Single Page Application**: Tab-based navigation system with conditional rendering
- **Layout Component**: Centralized layout with responsive sidebar navigation
- **Feature Modules**: Six main modules (Dashboard, Global Actions, Email Processing, Manager Meetings, Team Meetings, Reports, Team Management)
- **Type Safety**: Comprehensive TypeScript interfaces for all data structures (Action, Email, SujetReunion, MembreEquipe, Rapport)

### Data Management
- **Client-Side State**: All data managed through React state with complete CRUD functionality
- **Excel Export Service**: Comprehensive service for exporting all data types to Excel format
- **Local File System**: Data can be saved locally as Excel files for persistence
- **Theme Management**: Context-based theme switching with localStorage persistence
- **Data Models**: Well-defined interfaces for actions, emails, meeting subjects, team members, and reports

### Development Tooling
- **Linting**: ESLint configuration with TypeScript support and React-specific rules
- **Development Server**: Vite dev server configured for host 0.0.0.0 on port 5000 for Replit compatibility
- **Hot Module Replacement**: Enabled for fast development feedback

## Key Features
- **Excel Export System**: Complete data export functionality for all modules with local file saving
- **Dark Mode Support**: Full dark/light theme switching with system preference detection
- **CRUD Operations**: Working create, read, update, delete operations across all data types
- **Modal System**: Comprehensive modal interface for all data entry and editing
- **Configuration Sections**: Settings for notifications, auto-save, and preferences in each module
- **Responsive Design**: Mobile-friendly interface with collapsible sidebar

## External Dependencies

### Core Dependencies
- **React & React DOM**: ^18.3.1 - Core React framework
- **Lucide React**: ^0.344.0 - Icon library for UI components
- **XLSX**: ^0.18.5 - Excel file generation and manipulation
- **File-Saver**: ^2.0.5 - Client-side file downloading

### Development Dependencies
- **Vite**: ^5.4.2 - Build tool and development server
- **TypeScript**: ^5.5.3 - Type checking and compilation
- **Tailwind CSS**: ^3.4.1 - Utility-first CSS framework
- **ESLint**: ^9.9.1 - Code linting and quality enforcement
- **PostCSS & Autoprefixer**: CSS processing and vendor prefixing

### No External Services
- No database connections
- No API integrations
- No authentication services
- No third-party data sources
- Application is fully self-contained with mock data