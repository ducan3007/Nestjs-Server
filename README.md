## Modules, Providers, Services in NestJs

[https://docs.nestjs.com/modules](https://docs.nestjs.com/modules)

### `imports:[]`

- A list of Moudules.
- Modules could be external module like (TypeOrmModule, MongooseModule) or internal module (Authentication, Services ..).
- Modules imported will be available in both Controller and Providers.

### `controllers: []`

Commonly is a list of end-point, API

### `providers:[]`

A list of Services that handle logic (Database query, Authorize, ..)

A Providers must be start with `@Injectable()`

### `exports:[]`

In Nestjs, we can exports Providers (Services that handle logic) or exports Modules (any Modules, but typically external module)

Ex: Module A exports Module B: means it exports any Providers that exported from Module B. Module B can be external

```Typescript
  import { PassportModule } from '@nestjs/passport';
  @Module({
      exports:[ `PassportModule` - External Module from passport, `AuthService` - Service that handles Authentication Logic]
  })
  class AuthenticationModule


  @Module({
  imports: [`AuthenticationModule` - Import PassportModule and AuthService],
  controllers: [],
  providers: [],
  })
  class AccountModule
```

### `Dynamic Module`

[https://wanago.io/2022/08/15/api-with-nestjs-dynamic-modules/](https://wanago.io/2022/08/15/api-with-nestjs-dynamic-modules/)

## Guards

A class with `@Injectable()` and implements `CanActive` interface

## Validation

[class-validator](https://github.com/typestack/class-validator) and [class-transformer](https://github.com/typestack/class-transformer) are powerful tools for validation in Nestjs

First, in `main.ts` we enable globlal-scoped Pipe so that it is applied to every route handler

```Typescript
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
```

- Validate Nested Object

```Typescript
  class Contact {

    @IsNotEmpty()
    @IsNumber()
    phone: number;

    @IsNotEmpty()
    address: string;

  }

  class User{

    @IsNotEmpty({ message: 'Contact_2 is required' })
    @Type(() => Contact)
    @ValidateNested()
    contact_object: Contact;

  }
```

- Validate Nested Array of Objects

```Typescript
  class Contact {

    @IsNotEmpty()
    @IsNumber()
    phone: number;

    @IsNotEmpty()
    address: string;

  }

  class User{

    @ArrayNotEmpty({
      message: 'Contact_1 is required',
    })
    @Type(() => Contact)
    @ValidateNested({ each: t#rue })
    contact_array: Contact[];
  }
```
## Redis

## Token-based authentication strategies

1. Save on localhost: 
- Easy for test


2. JWT httpOnly Cookie
- Auth server `/login` and your `/api` must be hosted on the same domain


## Mongoose

## Typeorm

## Logger Winston

## Cron Jobs

## GraphQL

## Socket

## Nodemailer

#1 You must enable 2 factor Authentication in your Gmail Account
#2 Add App Password