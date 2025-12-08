# CLAUDE Development Setup Guide

This document describes the development setup for the project using TypeScript + React + Vite + Tailwind CSS + shadcn + SCSS.

## Technology Stack

- **TypeScript**: For type-safe JavaScript development
- **React**: Component framework with compile-time optimizations
- **Vite**: Fast build tool with hot module replacement
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn**: Reusable UI components for React
- **SCSS**: CSS preprocessor for enhanced styling capabilities
- **Font Awesome**: Icon library

## Setup Instructions

1. Initialize the react project with TypeScript and Vite
2. Configure Tailwind CSS
3. Install and configure shadcn/react components
4. Set up SCSS support
5. Install Font Awesome for icons
6. Set up development scripts

## Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the project for production
- `pnpm preview` - Preview the production build
- `pnpm check` - Check for TypeScript/React errors
- `pnpm check:watch` - Watch for TypeScript/React errors
- `ui:add` - Add shadcn/ui components

## Project Structure

The project is organized into the following components:

- `src/hooks` - React hooks
- `src/components/layouts` - Layout components
- `src/components/sections` - Page sections
- `src/components/ui` - Reusable UI components
- `src/i18n` - Internationalization files (future implementation)

## Internationalization (i18n)

The project is structured to support multiple languages. Translation files can be added to the `src/i18n` directory to support different languages.

## Styling

- Global styles are in `src/App.scss`
- Component-specific styles can be added directly in the component files
- Tailwind CSS utilities are used for rapid styling
- SCSS features like variables, nesting, and mixins are also supported

## Hot Module Replacement

Vite's hot module replacement is configured to exclude the `.claude` directory.
