## Project Overview

**Project Name:** College Project Archive Platform  

**Hosted at:** [https://projects.tcioe.edu.np](https://projects.tcioe.edu.np) (live)

<img width="1470" height="804" alt="Screenshot 2025-08-09 at 08 47 24" src="https://github.com/user-attachments/assets/6a619940-5a70-482b-8bf9-6bb566202aa2" />


The College Project Archive Platform is a central repository for storing and browsing past college student projects. Projects are organized by department, subject, batch, and tags so students and faculty can easily find, download, and reference previous works.

## Key Features:

1. Organized project listings with metadata such as title, year, department, and authors.
2. Search and filter functionality for quick access to specific topics or domains.
3. File uploads: PDFs, source code, images
4. Admin review and approval system to maintain content quality.
5. Clean, responsive UI for seamless experience across devices.

This platform serves as a long-term archive for student work and a reference hub for academic growth within the college community.

## Tech Stack:

- **Framework:** Next.js 15 
- **Styling:** Tailwind CSS + shadcn/ui  
- **State Management:** Redux Toolkit (RTK)  
- **Data Fetching:** Axios / RTK Query  
- **Icons:** Lucide-react (via shadcn/ui)  
- **Deployment:** Vercel  

## System Requirements:

- **Node.js:** v20 or above  
- **npm** or **yarn** (npm is bundled with Node.js)  
- **Git** for cloning the repository  
- A modern web browser (Chrome, Firefox, Edge, etc.)  
- Internet connection for API integration with the backend

---

## Installation & Setup Guide

Follow these steps to run the frontend locally:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/bibekjoshi01/project-hive
   cd project-hive

2. **Install Dependencies**
   ```bash
   yarn install
   
3. **Configure Environment Variables**
   - Create a .env file in the project root using .env.example with proper credentials.

4. **Run the development server**
   ```bash
   yarn dev
   
5. **Access the Application**
   ```bash
   http://localhost:3000
