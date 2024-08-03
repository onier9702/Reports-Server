<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Report Server with NestJs. This is a course to learn and become a pro developer creating reports from server side.

## Instalations
1. Prisma
```npx prisma init```

2. Prisma client
```npm i @prisma/client```

3. Prisma DB Pull. Execute this command from the root directory
```npx prisma db pull```

4. Prisma generate (to generate the client)
```npx prisma generate```

5. Install pdfMake to create reports
```npm i pdfmake```

6. Axios
```npm i axios```

7. Make colors with opacity (Not necessary)
```npm i @kurkle/color```

8. Html to pdfMake
```npm i html-to-pdfmake```

9. Jsdom
```npm i jsdom```

## Execute development environment to launch the server
1. Clone the repository if it is new
2. Install dependencies `npm i`
3. Clone the `env.template` file to `.env` with environment variables
4. Rise up database `docker compose up -d`
5. Generate Prisma client `npx prisma generate` (this will read the database schema created by prisma)
6. Execute the server `npm run start:dev`

## Errors solutions
1. ERROR [ExceptionsHandler] pdfmake_1.default is not a constructor
To solve this problem set this property on the `tsconfig.json` file
`"esModuleInterop": true,`
