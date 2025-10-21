
import { Body, Controller, Get, InternalServerErrorException, Logger, Post, Put } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { UpdateWeatherConfigDto } from './dto/updateWeather.dto';

@Controller('weather/util')
export class WeatherUtilController {
  private readonly logger = new Logger(WeatherUtilController.name);

  constructor(private readonly weatherService: WeatherService) {}

  @Get('config')
  getConfig() {
    this.logger.debug('GET /weather/util/config called');
    return this.weatherService.getConfig();
  }

  @Put('updateDelay')
  updateDelay(@Body('delayMs') delayMs: number) {
    this.logger.debug(`PUT /weather/util/updateDelay called with value: ${delayMs}`);
    try {
      this.weatherService.setDelayMs(delayMs);
      return { message: `Delay updated to ${delayMs}ms` };
    } catch (error) {
      this.logger.error('Error updating delay', error.stack);
      throw new InternalServerErrorException('Failed to update delay');
    }
  }

  @Post('updateConfig')
  updateConfig(@Body() dto: UpdateWeatherConfigDto) {
    this.logger.debug(`POST /weather/util/updateConfig called with: ${JSON.stringify(dto)}`);
    try {
      if (dto.delayMs !== undefined) this.weatherService.setDelayMs(dto.delayMs);
      if (dto.failRate !== undefined) this.weatherService.setFailRate(dto.failRate);

      return {
        message: 'Weather service configuration updated',
        newConfig: this.weatherService.getConfig(),
      };
    } catch (error) {
      this.logger.error('Error updating config', error.stack);
      throw new InternalServerErrorException('Failed to update config');
    }
  }
}
