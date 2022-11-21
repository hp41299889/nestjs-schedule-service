//import packages
import { Module } from '@nestjs/common';

//import modules
import { SwaggerModule } from './swagger/swagger.module';
import { DatabaseModule } from './database/database.module';
import { ProviderModule } from './provider/provider.module';
import { RoutesModule } from './routes/routes.module';
import { EnvModule } from './config/env/env.module';

@Module({
  imports: [
    EnvModule,
    SwaggerModule,
    ProviderModule,
    DatabaseModule,
    RoutesModule,
  ],
})
export class AppModule { }