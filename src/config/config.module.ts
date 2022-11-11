import { Module } from '@nestjs/common';

import { EnvModule } from './env/env.module';
import { JsonModule } from './json/json.module';
import { JsonService } from './json/json.service';

@Module({
    imports: [JsonModule, EnvModule],
    providers: [JsonService],
    exports: [JsonService]
})
export class ConfigModule { }
