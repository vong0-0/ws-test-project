# Frontend - Heritage Travel Site

This is **Module C - WorldSkills Web Technologies's** frontend side. Which in frontend side will dispaly pages of heritage site in Lyon, France with features usch as listing, tags, search, and SEO.

## Features

- List all heritag pages (articles).
- View content of each page.
- Filter by tags.
- Search by title or content ( Support multiple keywords separated by `/` in OR logic )
- SEO meta and Open Graph tag generator

## Tech Stack

- **vite** as build tool
- **React Router DOM** for routing
- **Tailwind CSS** for stying
- **Axios** for fetching data

## API Endpoints

This frontend connects to a backend API with the following endpoints:

| Method | Endpoint              | Description                       |
| ------ | --------------------- | --------------------------------- |
| GET    | /01_module_c/api/page | Get a single page by `path` query |
| GET    | /01_module_c/api/page | Get all pages                     |
