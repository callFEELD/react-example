# React example

This is a test application to learn React with Typescript.

This is a pure frontend development project.

The frontend displays individual water levels of rivers and lakes in germany.

## Technologies

- Typescript
- React
  - create-react-app
  - React-Router
  - React-Query (TanStack Query)
- OpenAPI (openapi-generator-cli)


## Backend

The backend of this project is a public available API server with an OpenAPI specification.

Using the specification, the API client is generated.

The backend server is: https://pegel-online.api.bund.dev/

## OpenAPI client

The `openapi-client-cli` is used.

To generate the typescript client do the following:

```bash
openapi-generator-cli generate -i https://pegel-online.api.bund.dev/openapi.yaml -g typescript-fetch
```

This project uses the client generator for Typescript using the fetch browser api.

## Getting started

### Folder structure

```none
.
├── public/             # Public assets like logos, favicon etc.
│   ├── index.html
│   └── favicon.ico
|
├── src/                # Source code of the website
│   ├── api/            # OpenAPI generated client
│   ├── components/     # Components used in pages/routes
│   ├── routes/         # Routes and Pages of the frontend
│   └── App.tsx         # Main application starting point
|
└── README.md
```

### Setup

Install all dependencies
```bash
npm install
```

Generate the openapi client

```bash
cd src/api/
openapi-generator-cli generate -i https://pegel-online.api.bund.dev/openapi.yaml -g typescript-fetch
```

### Development

```bash
npm start
```

http://localhost:3000
