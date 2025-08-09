# 🏠 Property Search API

A Node.js-based API for searching properties and fetching nearby amenities using query parameters and property IDs.  
Designed for scalability and ready for performance improvements like Redis caching.

---

## 📦 Project Setup

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/property-search-api.git
cd property-search-api```


### 2. Install Dependency in both Frontend and Backend Folder

npm install


### 3. Run the Project

    npm run dev

Running at :http://localhost:4000

### 1. Search Properties
 Endpoint:
 GET /api/property/search?queryparams

### 2. Nearby Amenities
   Endpoint:
  GET /api/property/:id/nearby-amenities



Design Decisions & Trade-offs
Node.js + Express: Chosen for rapid API development and scalability.

MongoDB: Flexible schema for property data.

Google Places API: Reliable external data source for nearby amenities.

Trade-off: External API calls may increase latency. Caching strategies are needed for speed.

Error Handling: Implemented basic try-catch with descriptive error messages.

Security: API keys stored in .env file (not committed to repo).



 Future Improvements
Redis Caching: Cache search results and amenities data to reduce API call latency.

Pagination: For large property datasets.

Rate Limiting: To prevent abuse of API endpoints.

Unit Tests: Using Jest or Mocha for robust testing.

Dockerization: To containerize the application for easier deployment.



