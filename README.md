Injury Tracking System

Welcome to the Injury Tracking System project! This web application is designed to help organizations, like the police, record and monitor reported injuries efficiently. Below are the features implemented in this project.

1. Report

Users can create, view, update, and delete an injury report, including:

    Name of Reporter
    Date & Time of Injury
    Body Map: Users can encircle different areas of injury on a body map image. Each encircled area is automatically labeled.
    List of Injuries: Users can provide details for each encircled area.

2. List of Reports

Users can view a list/table of all reported injuries with options to:

    See reporter's name, injury date & time, and report date
    Sort and search by various fields
    Filter by start and end dates of injury and report
    Download report as a CSV file format

3. User Authentication

Users can register using username/password or log in with Google/email via Auth0. Authenticated users can log in/out and view task history.
4. UI/UX

The application features a clean, user-friendly interface built with Tailwind CSS & Ant design library. It is responsive, visually appealing, and works seamlessly on both desktop and mobile devices.
Bonus Features
5. Progressive Web App (PWA)

The application is built as a Progressive Web App, allowing users to install it on their home screen. It works offline and provides an app-like experience across devices and platforms.
6. Automatic Location Detection

Instead of just numbering, the system automatically detects and labels injured areas (e.g., 'left hand' or 'left foot').
7. Analytics Dashboard

The application includes an analytics dashboard displaying relevant metrics in visually appealing visualizations.
Getting Started


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
