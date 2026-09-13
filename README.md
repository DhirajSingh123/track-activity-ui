# Track Activity UI

React + Vite frontend for the Spring Boot Track Activity backend.

## Expected backend
Backend base URL:
`http://localhost:8081`

Configured in `.env`:

```env
VITE_API_BASE_URL=http://localhost:8081
```

## Expected API endpoints

- `POST /users/register`
- `POST /users/login`
- `POST /plans`
- `GET /plans/{planId}`
- `POST /plans/{planId}/activities`

## Run

```bash
npm install
npm run dev
```

Vite normally starts on:
`http://localhost:5173`

## Backend CORS

Your Spring Boot backend must allow the React frontend origin.

Example global CORS config:

```java
package com.track.activity.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*");
    }
}
```

## Important

The plan creation code currently sends `userId` in the request body.

Expected example:

```json
{
  "userId": "USER-A8F921",
  "title": "Complete Python Course",
  "description": "Complete Python course in 30 days",
  "category": "LEARNING",
  "subCategory": "PYTHON",
  "targetMinutesPerDay": 120,
  "startDate": "2026-09-10",
  "targetDate": "2026-10-09"
}
```

If your actual Spring Boot `POST /plans` endpoint uses a different request body or path,
update `src/services/api.js` and `CreatePlan.jsx`.
"# track-activity-ui" 
