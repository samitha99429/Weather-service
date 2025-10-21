import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import {WeatherUtilController} from './weather.util.controller'

@Module({
  controllers: [WeatherController, WeatherUtilController],
  providers: [WeatherService],
})
export class WeatherModule {}
