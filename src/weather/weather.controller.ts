import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { CreateWeatherDto } from './dto/weather.dto';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  getWeather(@Query('destination') destination: string) {
    return this.weatherService.getWeather(destination);
  }

  @Post()
  addWeather(@Body() createWeatherDto: CreateWeatherDto) {
    const { destination, forecast } = createWeatherDto;
    return this.weatherService.addWeather(destination, forecast);
  }
}
