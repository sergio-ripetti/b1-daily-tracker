# B1 Ripe Deli Daily Tracker

B1 Ripe Deli Daily Tracker is a React demo application designed to help a deli / food production business track daily product requests, returns, and sold quantities.

The main purpose of this app is to support daily production decisions by showing what products are being requested, what products are being returned, what products are selling well, and what products may need to be sent in lower or higher quantities during the week.

This version is a front-end demo using `localStorage`. The next major goal is to migrate the project to TypeScript and connect it to a real database.

## Project Purpose

This app was created for a deli / food production workflow where staff need to track daily product movement from Monday to Friday.

The app helps answer questions such as:

- How many items were requested each day?
- How many items were returned?
- How many items were sold?
- Which products are the most popular?
- Which products are selling less?
- What items should be sent in higher or lower quantities during the week?

The goal is to make daily production easier to understand and improve future planning.

## Screenshots

Add your screenshots inside this folder:

```bash
screenshots
```

Recommended screenshot names:

```bash
daily-grid.png
items.png
dashboard.png
settings.png
```

After adding the images, they will appear below.

### Daily Grid

![Daily Grid](screenshots/daily-grid.png)

### Items

![Items](screenshots/items.png)

### Dashboard

![Dashboard](screenshots/dashboard.png)

### Settings

![Settings](screenshots/settings.png)

## Features

- Add new items
- Edit existing items
- Delete items with confirmation modal
- Daily Grid from Monday to Friday
- Previous Week / Next Week / This Week selector
- Requested quantity input
- Returned quantity input
- Automatic Sold calculation
- Dashboard with weekly metrics
- Most popular item
- Least popular item
- Total requested
- Total sold
- Total returned
- Return rate
- Dark mode and light mode
- Logo changes based on selected theme
- Toast notifications with Sonner
- Settings page
- Clear selected week records
- Data saved in browser `localStorage`

## Tech Stack

- React
- React Router DOM
- JavaScript
- CSS
- Vite
- Sonner
- localStorage

## Current Status

This project is currently a working demo.

The app is functional with `localStorage` and does not require a backend or database at this stage.

Completed sections:

- Items page
- Daily Grid page
- Dashboard page
- Settings page
- Dark / Light mode
- Theme-based logo switching
- Local data persistence
- Weekly record clearing

## Important Note About localStorage

This app currently stores data in the browser using `localStorage`.

This means data is saved only in the current browser and device. If browser data is cleared, the saved records may be lost.

This is intentional for the demo version.

In a future version, this project will be migrated to TypeScript and connected to a database.

## Project Structure

```bash
src/
  assets/
  constants/
  dashboard/
  grid/
  hooks/
  items/
  pages/
  ui/
  utils/
  App.jsx
  main.jsx
  index.css
```

## Main Pages

### Daily Grid

The Daily Grid is used to enter daily quantities from Monday to Friday.

Each item has:

- Requested quantity
- Returned quantity
- Sold quantity calculated automatically

The grid allows users to move between weeks using:

- Previous Week
- Next Week
- This Week

Each week stores its own records based on item and date.

### Items

The Items page allows users to manage the product list.

Users can:

- Add items
- Edit items
- Delete items

Deleting an item uses a confirmation modal to avoid accidental deletion.

### Dashboard

The Dashboard shows weekly performance based on the selected week.

It includes:

- Total requested
- Total sold
- Total returned
- Return rate
- Most popular item
- Least popular item

The dashboard helps identify what products are selling better and what products may need quantity adjustments.

### Settings

The Settings page allows users to manage app preferences and clear records from a selected week.

The app does not currently include a Reset All Data option because the data could become important over time.

Only selected weekly records can be cleared.

## Future Improvements

Planned improvements for future versions:

- Migrate the project to TypeScript
- Connect the app to a real database
- Add backend with Node.js and Express
- Add MongoDB or another database
- Add user login
- Improve mobile responsive design
- Reduce spacing and sizes on mobile to use screen space better
- Add export / import backup
- Add CSV reports
- Add monthly reports
- Add product categories
- Add active / inactive items instead of deleting items permanently
- Add comparison with previous weeks
- Improve dashboard charts and analytics
- Add better production recommendations
- Improve the Daily Grid visual layout
- Add a date picker to the Week Selector
- Improve navbar responsiveness
- Add better backup protection before using real data

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Go to the project folder:

```bash
cd <project-folder>
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## GitHub Setup

Initialize Git if the project does not already have Git configured:

```bash
git init
```

Check the current status:

```bash
git status
```

Add all files:

```bash
git add .
```

Create the first commit:

```bash
git commit -m "Complete B1 Ripe Deli daily tracker demo"
```

Add the remote repository:

```bash
git remote add origin <repository-url>
```

Push the project to GitHub:

```bash
git branch -M main
git push -u origin main
```

For future updates:

```bash
git status
git add .
git commit -m "Update project"
git push
```

## Deployment on Vercel

This project can be deployed on Vercel.

Recommended Vercel settings:

```txt
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

## React Router and Vercel

If refreshing pages like `/dashboard`, `/items`, or `/settings` causes a 404 error on Vercel, create a file in the root of the project called:

```bash
vercel.json
```

Add this code:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ]
}
```

Then commit and push again:

```bash
git add .
git commit -m "Add Vercel rewrite configuration"
git push
```

## Deployment Checklist

Before deploying, check the following:

```bash
npm run build
```

If the build works, the project is ready to deploy.

Recommended checklist:

- Check that there are no console errors
- Check that all pages work
- Check that Daily Grid saves records
- Check that Items can be added, edited, and deleted
- Check that Dashboard reads the correct weekly data
- Check that Settings can clear selected week records
- Check that Dark / Light mode works
- Check that logos change correctly by theme
- Check that screenshots are saved inside `public/screenshots`

## Demo Version

This project is a demo version and is not yet intended to be used as a final production system.

The next major step is to migrate the app to TypeScript and connect it to a database.

## Author

Created by Sergio Ripetti Campos as part of a React portfolio project.