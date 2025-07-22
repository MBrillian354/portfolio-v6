# Portfolio Template

A modern, mobile-first portfolio website built with React, Vite, and Tailwind CSS.

## Features

- 📱 **Mobile-First Design**: Optimized for all screen sizes
- 🎨 **Clean & Modern UI**: Professional design using Tailwind CSS
- 📊 **Data-Driven**: All content is stored in an editable JSON file
- ⚡ **Fast & Lightweight**: Built with Vite for optimal performance
- 🔧 **Easy to Customize**: Modular component structure

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Customization

### Editing Your Information

All portfolio data is stored in `src/data/portfolio.json`. Edit this file to update:

- Personal information (name, contact details, summary)
- Work experiences and projects
- Skills and certifications
- Education details

### Customizing the Design

The portfolio uses Tailwind CSS for styling. You can customize:

- **Colors**: Update color classes throughout the components
- **Layout**: Modify component structures in `src/components/`
- **Typography**: Change font sizes and weights using Tailwind classes

### Adding New Sections

1. Create a new component in `src/components/`
2. Add the component to `src/App.jsx`
3. Update the navigation in `src/components/Header.jsx` if needed

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.jsx      # Navigation header
│   ├── Hero.jsx        # Hero/About section
│   ├── Experience.jsx  # Work experience & projects
│   ├── Skills.jsx      # Skills and expertise
│   ├── Education.jsx   # Education & certifications
├── data/
│   └── portfolio.json  # All portfolio data
├── App.jsx             # Main app component
└── index.css          # Global styles
```

## Deployment

### Build for Production

```bash
npm run build
```

This creates a `dist/` folder with optimized files ready for deployment.

### Deploy Options

- **Netlify**: Drag and drop the `dist/` folder
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Use GitHub Actions to deploy
- **Any static hosting**: Upload the contents of `dist/`

## Responsive Design

The portfolio is designed mobile-first with breakpoints:

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Feel free to submit issues and enhancement requests!
