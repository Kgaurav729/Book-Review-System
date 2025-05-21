# 📚 Book Review REST API

A RESTful API for managing books and user reviews built with Node.js, Express, and MongoDB. Includes JWT authentication, pagination, search, and secure review functionality.

---

## 🚀 Features

- JWT-based user authentication
- CRUD operations for books
- One review per user per book
- Review editing and deletion
- Pagination for books and reviews
- Search books by title or author
- Rate limiting and input validation
- ✅ Ready for future enhancements:
  - Role-based access control
  - Sorting
  - Favorites
  - Swagger docs

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Express Validator
- Express Rate Limit

---

## 📦 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Kgaurav729/Book-Review-System.git
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/bookreviews
JWT_SECRET=your_jwt_secret
```

### 4. Start the Server

```bash
npm run dev
```

---

## 📘 API Endpoints

### 🔐 Auth

```http
POST /api/signup
POST /api/login
```

### 📚 Books

```http
POST /api/books           # Auth required
GET  /api/books           # Pagination, filtering
GET  /api/books/:id       # Includes avg rating + paginated reviews
GET  /api/search?query=   # Search by title or author
```

### 📝 Reviews

```http
POST   /api/books/:id/reviews  # Auth, one per user
PUT    /api/reviews/:id        # Auth, own review only
DELETE /api/reviews/:id        # Auth, own review only
```

---

## 🔍 Example Requests

### Signup

```bash
curl -X POST http://localhost:3000/api/signup   -H "Content-Type: application/json"   -d '{"username": "john", "password": "secret123"}'
```

### Login

```bash
curl -X POST http://localhost:3000/api/login   -H "Content-Type: application/json"   -d '{"username": "john", "password": "secret123"}'
```

### Add Book

```bash
curl -X POST http://localhost:3000/api/books   -H "Authorization: Bearer <TOKEN>"   -H "Content-Type: application/json"   -d '{"title": "Clean Code", "author": "Robert Martin", "genre": "Programming"}'
```

### Submit Review

```bash
curl -X POST http://localhost:3000/api/books/<BOOK_ID>/reviews   -H "Authorization: Bearer <TOKEN>"   -H "Content-Type: application/json"   -d '{"rating": 5, "comment": "Must-read for developers!"}'
```

---

## 🧱 Database Schema

### User

```js
{
  username: String,
  password: String (hashed)
}
```

### Book

```js
{
  title: String,
  author: String,
  genre: String,
  reviews: [ObjectId]
}
```

### Review

```js
{
  rating: Number,
  comment: String,
  user: ObjectId,
  book: ObjectId
}
```

---

## 📌 Design Decisions & Assumptions

- One review per user per book
- Reviews are owned by the author; only they can edit/delete
- JWT secret and MongoDB URI stored in `.env`
- Pagination defaults can be adjusted via query params

---

## 🛣️ Roadmap

- ✅ Basic JWT Auth
- ✅ Book/Review CRUD
- ✅ Search & Pagination
- 🔜 Role-based access (admin, user)
- 🔜 Book sorting (by rating/date)
- 🔜 Favorite books per user
- 🔜 Swagger API documentation

---

## 📄 License

MIT License