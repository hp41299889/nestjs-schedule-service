//import packages
import { Module } from '@nestjs/common';

//import modules
import { ConfigModule } from './config/config.module';
import { SwaggerModule } from './swagger/swagger.module';
import { DatabaseModule } from './database/database.module';
import { ProviderModule } from './provider/provider.module';
import { RoutesModule } from './routes/routes.module';

@Module({
  imports: [
    ConfigModule,
    SwaggerModule,
    ProviderModule,
    DatabaseModule,
    RoutesModule,
  ]
})
export class AppModule { }