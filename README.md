## Description

App to withdraw money from user

## Project setup

```bash
$ npm install
$ copy .env.example .env
```
Configure database connection in .env file, fill DATABASE_URL 

```bash
$ npx prisma migrate dev
$ npm run prisma:seed
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

### Run Redis locally

```bash
$ docker run -p 6379:6379 -d redis
```

### To test withdraw functionality

use test_endpoints/payments.http file and test_endpoints/users.http file.

These files are an extension for WebStorm IDE.

# Project Architecture
## Layers
- Controllers
- Business Services
- Transactional Services (to encapsulate transactional logic)
- Repositories

## Modules
### Payments Module
- **PaymentController** - to handle payment requests
- **PaymentService** - to handle payment logic
- **PaymentsTransactionService** - to handle payment transaction logic
- **PaymentRepository** - to handle payment data
- **CreatePaymentDto** - to create payment
- **Action** - enum for action type

### Users Module
- **User Controller** - to handle user requests
- **User Service** - to handle user logic
- **User Repository** - to handle user data

## Database
- **ORM**: Prisma with PostgreSQL
- **Schema**: `prisma/schema.prisma` defines User, Payment, and Action models
