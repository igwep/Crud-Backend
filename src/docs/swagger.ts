import swaggerJsdoc from "swagger-jsdoc";

const isProd = process.env.NODE_ENV === "production";

// Dev: TS files, Prod: compiled JS files
const apisPath = isProd
  ? "./dist/routes/**/*.js"   // compiled JS in dist
  : "./src/routes/**/*.ts";   // TS files in src

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
