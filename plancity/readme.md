# Plan City

> A web application for easily browsing and managing city events in an organized and accessible way, depending on the user's role.

## 📌 About the Project

**Plan City** is a web application developed to make browsing events and categories simple and organized.

The application allows visitors to explore available events and categories without authentication. Authenticated users have additional features, such as saving events to their favorites, while administrators have tools to manage the platform's content.

The project was developed by **Jonathan Rodriguez** as part of a **performance assessment for educational purposes**, applying knowledge of frontend development, API consumption, authentication, routing, and web application organization.

## ✨ Features

### Visitors

Users who access the application without authentication can:

* Browse available categories.
* Browse available events.
* View event information.
* Navigate through the different public sections of the application.
* Log in.
* Register.
* Log out.

### Authenticated Users

In addition to the features available to visitors, authenticated users can:

* Browse categories.
* Browse events associated with a category.
* Add events to their favorites.
* View their favorite events from the **Favorites** section.
* Log out.

### Administrators

Administrators have content management capabilities:

* Create categories.
* View categories.
* Edit categories.
* Delete categories.
* View events belonging to a category.
* Create events.
* Edit events.
* Delete events.

Access to administrative operations is controlled by the backend, while the frontend uses conditional rendering to display the appropriate options according to the user's role.

## 🛠️ Technologies

### Frontend

| Technology   | Purpose                                        |
| ------------ | ---------------------------------------------- |
| React        | Building the user interface                    |
| TypeScript   | Static typing and development-time type safety |
| Vite         | Development environment and project build      |
| Tailwind CSS | Styling and UI design                          |
| React Router | Routing and navigation                         |
| Axios        | API communication                              |
| ESLint       | Code analysis and quality                      |

### Backend

The frontend consumes an API developed with **NestJS and TypeScript**.

The backend uses:

* NestJS
* TypeScript
* TypeORM
* PostgreSQL
* JWT
* Passport
* Swagger

The API includes Swagger documentation and uses migrations to manage the database structure.

## 🎨 Design / UI

Plan City uses a simple and clean design focused on making navigation and information browsing easy.

The interface primarily uses:

* White backgrounds.
* Light blue buttons.
* Dark blue buttons and highlighted elements.
* A layout focused on keeping information clear and easy to access.

The main goal of the design is to avoid an overloaded interface and allow users to quickly find available events and categories.

## 🚀 Demo

Plan City currently runs locally.

Once the development server is started, the application can be accessed at:

```text
http://localhost:5173/
```

## 📋 Requirements

To run the frontend, you need to have installed:

* Node.js
* npm
* Git

The project uses npm for dependency installation and package management.

## ⚙️ Installation

### 1. Clone the repository

Open a terminal and run:

```bash
git clone [REPOSITORY_LINK]
```

### 2. Navigate to the project

```bash
cd [PROJECT_NAME]
```

### 3. Install dependencies

```bash
npm install
```

This command automatically installs the dependencies defined in `package.json`.

### 4. Start the development server

```bash
npm run dev
```

Vite will display the local URL where the application is available.

By default:

```text
http://localhost:5173/
```

## 📁 Project Structure

The project is organized using a **separation of responsibilities**, keeping each part of the application in a specific location to make the code easier to understand and maintain.

```text
src/
├── AppRouter.tsx
├── components/
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── PrivateHeader.tsx
│   └── layouts/
│       ├── PrivateLayoute.tsx
│       └── PublicLayout.tsx
│
├── context/
│   └── AuthContext.tsx
│
├── loaders/
│   └── requiresAuth.ts
│
├── pages/
│   ├── private/
│   │   ├── CategoriesPage.tsx
│   │   ├── EventsPage.tsx
│   │   └── FavoritesPage.tsx
│   │
│   └── public/
│       ├── LoginPage.tsx
│       ├── MainDashboard.tsx
│       ├── PublicPage.tsx
│       ├── PublicsEvent.tsx
│       └── RegisterPage.tsx
│
├── services/
│   ├── delete.ts
│   ├── get.ts
│   ├── patch.ts
│   └── post.ts
│
├── types/
│   ├── Categories.ts
│   ├── Events.ts
│   ├── Images.ts
│   └── Users.ts
│
├── index.css
└── main.tsx
```

### Folder Organization

* **`components/`**: Contains reusable UI components.
* **`components/layouts/`**: Contains the layouts used to structure the different sections of the application.
* **`context/`**: Contains the context used to manage authentication.
* **`loaders/`**: Contains the logic used to verify access to private routes.
* **`pages/`**: Contains the main application pages, separated into public and private sections.
* **`services/`**: Centralizes HTTP requests made through Axios.
* **`types/`**: Contains the TypeScript interfaces and types used throughout the application.
* **`AppRouter.tsx`**: Contains the main routing configuration.
* **`main.tsx`**: Entry point of the application.

## 🧭 Routes

### Public Routes

| Route                | Description            |
| -------------------- | ---------------------- |
| `/`                  | Plan City's main page  |
| `/publicsevents/:id` | View event information |
| `/login`             | User login             |
| `/register`          | User registration      |

### Private Routes

These routes require the user to be authenticated.

| Route             | Description                           |
| ----------------- | ------------------------------------- |
| `/categories`     | Browse categories                     |
| `/categories/:id` | Browse events belonging to a category |
| `/favorites`      | View favorite events                  |

Private routes use an authentication loader to verify that the user has a valid session before granting access.

## 🔄 Application Flow

### Visitor

```text
Enter Plan City
        │
        ▼
Main Page
        │
        ├── Browse Categories
        │
        └── Browse Events
                 │
                 ▼
           Event Information
```

Visitors can explore the public content of the application without having to log in.

### Authenticated User

```text
Login
        │
        ▼
Authentication Validation
        │
        ▼
Private Section
        │
        ▼
Categories
        │
        ▼
Events in Category
        │
        ▼
Add to Favorites
        │
        ▼
View Favorites
```

### Administrator

```text
Login
        │
        ▼
Authentication Validation
        │
        ▼
Administrative Section
        │
        ├── Category Management
        │      ├── Create
        │      ├── View
        │      ├── Edit
        │      └── Delete
        │
        └── Event Management
               ├── Create
               ├── View
               ├── Edit
               └── Delete
```

## 🏗️ Architecture

Plan City follows an architecture based on **separation of responsibilities**.

Each part of the application is separated according to its purpose, making the code easier to understand, reuse, and maintain.

The application is mainly divided into:

```text
User Interface
   │
   ├── Pages
   ├── Components
   └── Layouts
          │
          ▼
       Routing
          │
          ▼
    Context / Loaders
          │
          ▼
       Services
          │
          ▼
          API
          │
          ▼
       Backend
```

This structure keeps the presentation layer separate from authentication logic and API communication.

## 🧩 Main Components

### `Header.tsx`

Contains the header used in the public section of the application and provides the main navigation elements.

### `PrivateHeader.tsx`

Contains the header used within the private section and provides the appropriate navigation options for authenticated users.

### `PublicLayout.tsx`

Defines the visual structure used by the public routes of the application.

### `PrivateLayoute.tsx`

Defines the structure used by private routes and provides a common layout for authenticated pages.

### `Footer.tsx`

Contains the footer displayed in the public section of Plan City.

### `AuthContext.tsx`

Manages authentication-related information and allows the authentication state to be shared across different parts of the application.

### `requiresAuth.ts`

Loader used to verify authentication before granting access to private routes.

## 🔌 API / Backend

Plan City consumes a REST API developed with **NestJS and TypeScript**.

The API handles logic related to:

* Users.
* Authentication.
* Categories.
* Events.
* Favorites.

The frontend uses **Axios** to make HTTP requests through separate services for `GET`, `POST`, `PATCH`, and `DELETE` operations.

### Authentication

Authentication is implemented using **JWT (JSON Web Token)**.

The general authentication flow is:

```text
User
   │
   ▼
Login
   │
   ▼
Backend
   │
   ▼
JWT
   │
   ▼
Frontend
   │
   ▼
Authentication Loader
   │
   ▼
Private Route
```

The backend is also responsible for validating the permissions associated with each user.

Swagger API documentation is available when the backend is running:

```text
http://localhost:3000/api/docs
```

### Database

The backend uses **PostgreSQL** and **TypeORM** for database communication and management.

For this project, the database was deployed using **Supabase**, and the corresponding migrations were executed.

## 🧪 Scripts

The following scripts are available in the frontend:

### Development

```bash
npm run dev
```

Starts the development server using Vite.

### Build

```bash
npm run build
```

Builds the project for production using TypeScript and Vite.

### Lint

```bash
npm run lint
```

Runs ESLint to analyze the project code.

### Preview

```bash
npm run preview
```

Runs a local preview of the production build.

## 🧹 Code Quality

Several practices were applied during development to keep the code organized and maintainable:

* TypeScript is used to keep the code properly typed.
* Responsibilities are separated through the project structure.
* Reusable components are created whenever possible.
* Code duplication is minimized.
* Form validation is implemented.
* ESLint is used to detect potential issues in the code.
* HTTP requests are separated into independent service modules.

## 🔒 Security

Plan City implements authentication using **JWT**.

Private routes use loaders to verify that the user is authenticated and has a valid token before granting access.

Administrative permissions are validated by the backend. The frontend uses conditional rendering to show or hide the appropriate options according to the user's role, primarily to provide a better user experience.

Therefore, authorization does not rely exclusively on the frontend; the backend is responsible for enforcing the actual permissions.

## 📱 Responsive Design

Currently, Plan City **does not have a responsive design**.

The interface is mainly designed for desktop screens. Adaptation for mobile devices and tablets remains a future improvement.

## 🚧 Future Features

Planned features and improvements for future versions include:

* Complete the favorites functionality.
* Improve the general browsing experience for all events.
* Add a user profile.
* Improve the user experience across different sections.
* Implement responsive design for mobile devices and tablets.
* Improve date validation in event creation and editing forms.
* Make date selection and validation easier and more intuitive for users.

## 🐛 Known Issues

The following aspects are currently pending or require improvement:

* The favorites functionality is not yet fully completed.
* Date validation in event creation and editing forms is still pending.
* Some forms could provide a better user experience through improved validation and more intuitive controls.
* The application is not currently adapted for mobile devices.

## 👥 Contribution

This project is not open to external contributions.

The repository is primarily intended as a demonstration and educational project. Users are welcome to run and use the application by following the installation instructions provided in this document.

## 📄 License

This project currently **does not have a specific software license**.

The code was developed by **Jonathan Rodriguez** as part of a performance assessment for educational purposes.

Redistribution, modification, or reuse of the code is not authorized without permission from the author.

## 👨‍💻 Author

**Jonathan Rodriguez**

Project developed for educational purposes as part of a performance assessment.
