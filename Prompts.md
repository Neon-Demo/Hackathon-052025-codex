# Vibe Coding Hackathon Prompts

This file contains useful prompts for participants to use with Vibe Coding during the hackathon. Each prompt is designed to help you create different aspects of your project, from requirements to implementation.

## How to Use These Prompts

1. Copy the prompt you need
2. Paste it into your Vibe Coding interface
3. Modify any paths or project-specific details as needed
4. Run the prompt

> **Important**: The prompts use specific folder naming conventions with numeric prefixes (e.g., "1-SystemRequirements") to ensure folders appear in the correct order in file explorers. Please keep these naming conventions when creating your own project.

---

## 1. Generate Business Requirements

```
With the information in the preliminary documents (like meeting transcripts or project briefs), please craft a set of business requirements for my [YOUR PROJECT NAME] application. Include:

1. System Overview
2. Core Requirements
3. Technical Requirements
4. Performance Requirements
5. Constraints
6. Success Criteria

Save the output in a new folder called "1-SystemRequirements". Use this exact folder name to maintain proper sorting order.
```

---

## 2. Generate Technical Documents

```
With the information in my 1-SystemRequirements folder, create the following technical documents:

1. Technical Architecture (include a system architecture diagram)
2. Screen Breakdown (list all screens and key components)
3. API Specification (define all endpoints with request/response formats)
4. Database Design (Entity Relationship diagram)
5. Sequence Diagrams (for key workflows)

Please be detailed and thorough. Save all files into a new folder called "2-TechnicalDocuments". Use this exact folder name to maintain proper sorting order.
```

---

## 3. Generate Design Documents

```
With the information in my 1-SystemRequirements folder, create the following design documents:

1. Design Guidelines (typography, spacing, component guidelines)
2. Color Palette (primary, secondary, accent colors with hex codes)
3. Screen Designs (basic wireframes or descriptions of key screens)

Save all files into a new folder called "3-DesignDocuments". Use this exact folder name to maintain proper sorting order.
```

---

## 4. Generate Implementation

Choose one of the following implementation options based on your project requirements:

### 4.1 Next.js Web Application

```
With the information in my 1-SystemRequirements, 2-TechnicalDocuments, and 3-DesignDocuments folders, please help me generate a Next.js web application.

Requirements:
1. Follow the screen breakdown and technical architecture specified in the documentation
2. Implement Google and Microsoft SSO
3. Create a demo login option for testing purposes
4. Use TypeScript for type safety
5. Implement responsive design for mobile and desktop
6. Use a modern component library like Material UI or Tailwind CSS

Please create the application in a folder called "4-Implementation/web-nextjs". Use this exact folder name to maintain proper sorting order.
```

### 4.2 React Native Mobile Application

```
With the information in my 1-SystemRequirements, 2-TechnicalDocuments, and 3-DesignDocuments folders, please help me generate a React Native mobile application.

Requirements:
1. Follow the screen breakdown and technical architecture specified in the documentation
2. Implement Google and Microsoft SSO
3. Create a demo login option for testing purposes
4. Use TypeScript for type safety
5. Support both iOS and Android platforms
6. Implement offline-first data synchronization
7. Use React Navigation for app navigation

Please create the application in a folder called "4-Implementation/mobile-reactnative". Use this exact folder name to maintain proper sorting order.
```

### 4.3 Full-Stack Application (Next.js + Express + PostgreSQL)

```
With the information in my 1-SystemRequirements, 2-TechnicalDocuments, and 3-DesignDocuments folders, please help me generate a full-stack application with Next.js frontend, Express backend, and PostgreSQL database.

Requirements:
1. Follow the screen breakdown and technical architecture specified in the documentation
2. Implement Google and Microsoft SSO
3. Create a demo login option for testing purposes
4. Use TypeScript for type safety throughout the stack
5. Implement responsive design for mobile and desktop
6. Set up a RESTful API with Express
7. Include database migrations and seeding
8. Implement proper error handling and logging

Please create the application in a folder called "4-Implementation/fullstack". Use this exact folder name to maintain proper sorting order.
```

---

## Example: Greenhouse Management System

The repository contains an example project (Greenhouse Management System) that was created using similar prompts. Notice how the folders follow a consistent naming pattern:

- `0-Prelim`: Preliminary information
- `1-SystemRequirements`: Business requirements 
- `2-TechnicalDocuments`: Technical specifications
- `3-DesignDocuments`: Visual and UX guidelines

This numeric prefix pattern makes folders appear in a logical order in file explorers and is easier to navigate. Always maintain this naming convention in your own project.

Feel free to modify these prompts to better suit your specific project needs!