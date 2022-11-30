//import packages
import { Module } from '@nestjs/common';

//import modules
import { SwaggerModule } from './swagger/swagger.module';
import { ProviderModule } from './provider/provider.module';
import { RoutesModule } from './routes/routes.module';
import { EnvModule } from './config/env/env.module';
import { DatabaseModule } from './database/database.module';
import { ServiceModule } from './service/service.module';
import { JsonModule } from './config/json/json.module';

@Module({
  imports: [
    EnvModule,
    JsonModule,
    SwaggerModule,
    ProviderModule,
    RoutesModule,
    DatabaseModule,
    ServiceModule
  ],
})
export class AppModule { }