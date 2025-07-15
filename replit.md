# LLM Learning Platform

## Overview

This is a comprehensive educational platform for learning about Large Language Models (LLMs). The application provides an interactive, step-by-step learning experience covering everything from basic concepts to advanced implementation techniques. The platform combines theoretical content with practical demonstrations, code examples, and simulated model interactions.

**Status**: Successfully migrated from Lovable to Replit environment with all model loading issues resolved through local simulation.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with CSS variables for theming
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **State Management**: Zustand with persistence for learning progress
- **Routing**: React Router for navigation
- **Build Tool**: Vite with development optimizations

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: Express sessions with PostgreSQL storage

### Development Setup
- **Monorepo Structure**: Shared schema and types between client and server
- **Hot Reload**: Vite development server with HMR
- **TypeScript**: Strict configuration with path mapping
- **Linting**: ESLint configuration for code quality

## Key Components

### Educational Content System
- **Chapter-based Learning**: 12 structured chapters covering LLM fundamentals
- **Interactive Components**: Real-time model inference, tokenization demos, training simulations
- **Progress Tracking**: User progress saved locally with completion status
- **Code Examples**: Multi-framework code snippets (PyTorch, TensorFlow)

### Real Model Integration
- **Hugging Face Transformers**: Browser-based model loading and inference
- **WebGPU Acceleration**: Hardware acceleration when available
- **Model Comparison**: Side-by-side model performance analysis
- **Tokenization Visualization**: Real-time BPE tokenization demonstration

### Interactive Learning Tools
- **Training Simulator**: Parameter adjustment with visual feedback
- **Attention Visualizer**: Transformer attention mechanism exploration
- **Embedding Space**: Vector space visualization
- **Gradient Flow**: Training dynamics demonstration

### User Interface
- **Responsive Design**: Mobile-first approach with desktop optimization
- **Dark/Light Mode**: System preference detection with manual toggle
- **Collapsible Sidebar**: Chapter navigation with progress indicators
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support

## Data Flow

### Client-Side State Management
1. **Learning Progress**: Chapter completion and user preferences stored in Zustand
2. **Model States**: Loading status, inference results, and error handling
3. **UI State**: Sidebar collapse, theme preference, current chapter

### Server-Side Data Flow
1. **Static Content**: Educational chapters served as React components
2. **Model Assets**: Hugging Face models loaded directly in browser
3. **Progress Persistence**: Local storage with optional server sync
4. **Error Handling**: Graceful degradation for model loading failures

### Real-Time Interactions
1. **Model Inference**: Direct browser execution using Transformers.js
2. **Training Simulation**: Client-side mathematical modeling
3. **Visualization Updates**: Real-time parameter adjustments
4. **Progress Updates**: Immediate feedback on learning activities

## External Dependencies

### Core Dependencies
- **@huggingface/transformers**: Browser-based ML model execution
- **@tanstack/react-query**: Data fetching and caching
- **@radix-ui/***: Accessible UI primitives
- **drizzle-orm**: Type-safe database operations
- **@neondatabase/serverless**: Serverless PostgreSQL driver

### Development Dependencies
- **Vite**: Fast build tool with HMR
- **TypeScript**: Type safety and developer experience
- **Tailwind CSS**: Utility-first styling
- **ESBuild**: Fast JavaScript bundling

### Educational Content Dependencies
- **Lucide React**: Consistent iconography
- **React Hook Form**: Form state management
- **Zustand**: Lightweight state management
- **Date-fns**: Date manipulation utilities

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with Express backend
- **Hot Module Replacement**: React Fast Refresh for instant updates
- **Environment Variables**: Database URL and configuration management
- **Error Overlay**: Runtime error modal for debugging

### Production Build
- **Static Assets**: Vite builds optimized client bundle
- **Server Bundle**: ESBuild creates Node.js production server
- **Database Migrations**: Drizzle Kit manages schema changes
- **Asset Optimization**: Automatic code splitting and minification

### Database Strategy
- **Schema Management**: Drizzle migrations with PostgreSQL dialect
- **Connection Pooling**: Neon serverless handles connection scaling
- **Data Persistence**: User progress and session storage
- **Backup Strategy**: Cloud provider automated backups

### Scalability Considerations
- **Client-Side ML**: Reduces server computational load
- **CDN Distribution**: Static assets served from edge locations
- **Progressive Loading**: Model assets loaded on-demand
- **Error Boundaries**: Graceful handling of component failures

The architecture prioritizes educational effectiveness with interactive demonstrations while maintaining performance through client-side model execution and efficient state management. The system is designed to scale from individual learners to classroom environments with minimal server infrastructure requirements.