# Website UI

A modern, responsive website built with TypeScript, React, Vite, Tailwind CSS, and shadcn/ui components.

## 🚀 Features

- **TypeScript**: Type-safe JavaScript development
- **React**: Component-based architecture with compile-time optimizations
- **Vite**: Fast build tool with hot module replacement
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **shadcn/ui**: Reusable React UI components
- **SCSS**: Enhanced styling capabilities with CSS preprocessor
- **Font Awesome**: Comprehensive icon library
- **Internationalization (i18n)**: Multi-language support ready
- **Next.js Image Optimization**: Automatic image optimization and lazy loading

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS, SCSS
- **UI Components**: shadcn/ui
- **Icons**: Font Awesome
- **Build Tool**: Vite

## 📁 Project Structure

```
src/
├── components/
│   ├── layouts/     # Layout components
│   ├── sections/    # Page sections
│   └── ui/          # Reusable UI components
├── hooks/           # React hooks
├── i18n/            # Internationalization files
└── App.scss         # Global styles
```

## 📋 Prerequisites

- Node.js (version 16 or higher recommended)
- pnpm package manager

## 🚀 Getting Started

### Installation

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

### Development

Start the development server:

```bash
pnpm dev
```

This will start the Vite development server with hot module replacement. The application will be available at `http://localhost:5173`.

### Building for Production

Build the project for production:

```bash
pnpm build
```

Preview the production build:

```bash
pnpm preview
```

### Additional Scripts

- `pnpm check` - Check for TypeScript/React errors
- `pnpm check:watch` - Watch for TypeScript/React errors
- `pnpm ui:add` - Add new shadcn/ui components

## 🔧 Component Development

To add new shadcn/ui components, use:

```bash
pnpm ui:add
```

This command will help you add new pre-built components to your project.

## 🌐 Internationalization

The project is structured to support multiple languages. Translation files can be added to the `src/i18n` directory to support different languages. The internationalization system is ready for multi-language implementation.

## 🎨 Styling

- Global styles are in `src/App.scss`
- Component-specific styles can be added directly in the component files
- Tailwind CSS utilities are used for rapid styling
- SCSS features like variables, nesting, and mixins are also supported

## 🖼️ Image Handling

For optimal performance, always use Next.js `Image` component instead of the native HTML `<img>` tag. The `Image` component provides:

- Automatic image optimization
- Built-in lazy loading
- Proper responsive behavior
- Performance improvements

Example usage:

```jsx
import Image from 'next/image';

<Image
  src="/path/to/image.jpg"
  alt="Description of image"
  width={600}
  height={400}
  className="your-css-classes"
/>
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🐳 Docker Support

The project includes Docker configuration for containerized deployment. Check the `docker-compose.yml` file for container setup details.

## 🌟 Acknowledgments

- Built with [Vite](https://vitejs.dev/) for fast development
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Font Awesome](https://fontawesome.com/)
