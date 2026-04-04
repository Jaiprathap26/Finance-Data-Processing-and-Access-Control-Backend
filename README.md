# Finance Dashboard Backend

A RESTful backend API for a Finance Dashboard application built with Node.js, Express, PostgreSQL, Prisma, and JWT authentication.

## Tech Stack

- **Runtime**: Node.js + TypeScript
- **Framework**: Express
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: Zod

## Features

- JWT-based authentication with role-based access control
- Three user roles: Viewer, Analyst, Admin
- Full CRUD for financial records (Admin only)
- Dashboard analytics — summary, category totals, trends, recent activity
- User management — role updates, status toggle, delete (Admin only)
- Zod validation on all request inputs
- Centralized error handling with consistent API response format

## Roles and Access

| Action | Viewer | Analyst | Admin |
|---|---|---|---|
| View records | Yes | Yes | Yes |
| View summary & recent activity | Yes | Yes | Yes |
| View category totals & trends | No | Yes | Yes |
| Create / Update / Delete records | No | No | Yes |
| Manage users | No | No | Yes |

## Project Structure
finance-dashboard-backend/
── prisma/ schema.prisma
── src/
── config/
── controllers/
── services/
── repositories/
── middleware/
── validators/
── routes/
── types/
── utils/
── app.ts 
── .env.example
── package.json
── tsconfig.json

## Getting Started

### Prerequisites

- Node.js v18+
- PostgreSQL database

### Installation

``bash
git clone https://github.com/Jaiprathap26/Finance-Data-Processing-and-Access-Control-Backend.git
cd finance-dashboard-backend
npm install

Database Setup
npx prisma migrate dev
npx prisma generate
Run the Server
# Development
npm run dev

# Production
npm run build
npm start
API Endpoints
Auth
Method	Endpoint	Access	Description
POST	/api/auth/register	Public	Register new user
POST	/api/auth/login	Public	Login, returns JWT
Financial Records
Method	Endpoint	Access	Description
GET	/api/records	Viewer+	List records with filters
GET	/api/records/:id	Viewer+	Get single record
POST	/api/records	Admin	Create record
PATCH	/api/records/:id	Admin	Update record
DELETE	/api/records/:id	Admin	Delete record
Dashboard
Method	Endpoint	Access	Description
GET	/api/dashboard/summary	Viewer+	Total income, expenses, net balance
GET	/api/dashboard/recent-activity	Viewer+	Last 10 records
GET	/api/dashboard/category-totals	Analyst+	Category-wise totals
GET	/api/dashboard/trends	Analyst+	Monthly trends
Users
Method	Endpoint	Access	Description
GET	/api/users	Admin	List all users
GET	/api/users/:id	Admin	Get user by ID
PATCH	/api/users/:id/role	Admin	Update user role
PATCH	/api/users/:id/status	Admin	Toggle active/inactive
DELETE	/api/users/:id	Admin	Delete user
Response Format
// Success
{ "success": true, "data": {}, "message": "optional" }

// Error
{ "success": false, "error": { "message": "description" } }
License
MIT
