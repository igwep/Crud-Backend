// src/swaggerSpec.ts
import swaggerJsdoc from "swagger-jsdoc";
import path from "path";

// Detect if we are in production (Render) or dev
const isProd = process.env.NODE_ENV === "production";

// Determine path to route files for Swagger
// - Dev: TypeScript files
// - Prod: Compiled JS files in dist
const apisPath = isProd
  ? path.join(__dirname, "routes/**/*.js")
  : path.join(__dirname, "routes/**/*.ts");

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CRUD Backend API",
      version: "1.0.0",
      description: "User Management API with Auth & RBAC",
    },
    servers: [
      {
        url: process.env.BASE_URL || "http://localhost:5000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: [apisPath],
});
