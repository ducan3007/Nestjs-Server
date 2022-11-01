### Modules, Providers, Services in NestJs

@Module(){}

### imports:[]

Import các Module đến từ database : TypeOrmModule và MongooseModule hoặc `Module KHÁC` bên trong project (ví dụ Module Authentication mà cung cấp Service Authentication ). Các Module được `import` sẽ được dùng trong cả `controllers` và `providers`

### controllers: []

API end-point. Controller thường sẽ sử dụng `Module Khác`

### providers:[] 

Service xử lý logic (xử lý upload, query đến DB)

### exports:[]

Trong Nest, ta có thể exports các Providers hoặc exports Module. Khi một Module A exports Module B khác, nó sẽ exports các Providers mà Module B exports. Đặc biệt dùng khi mà Module B được import từ thư viện.

  ```Typescript
    import { PassportModule } from '@nestjs/passport';
    @Module({
        exports:[PassportModule,AuthService]
    })
    class AuthModule

    @Module({
    imports: [AuthenticationModule],
    controllers: [],
    providers: [],
    })
    class AccountModule
  ```
