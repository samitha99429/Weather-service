import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class WeatherService {
  private readonly logger = new Logger(WeatherService.name);
  private filePath: string;
  private weatherData: Record<string, any> = {};

  // Runtime values
  private delayMs = parseInt(process.env.WEATHER_DELAY_MS ?? '0');
  private failRate = parseFloat(process.env.WEATHER_FAIL_RATE ?? '0');

  constructor() {
    this.filePath = path.join(process.cwd(), 'src', 'weather', 'weather-data.json');
    this.loadData();
  }

  private loadData() {
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify({}, null, 2));
    }
    const file = fs.readFileSync(this.filePath, 'utf8');
    this.weatherData = JSON.parse(file);
  }

  private saveData() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.weatherData, null, 2));
  }

  async getWeather(destination: string) {
    // Simulate delay
    if (this.delayMs > 0) {
      await new Promise((res) => setTimeout(res, this.delayMs));
    }

    // Simulate random failure
    if (Math.random() < this.failRate) {
      throw new Error('Simulated weather service failure');
    }

    return (
      this.weatherData[destination] || {
        message: 'No weather data available for this destination',
      }
    );
  }

  addWeather(destination: string, forecast: any[]) {
    this.weatherData[destination] = { forecast };
    this.saveData();
    return { message: 'Weather forecast added successfully!' };
  }

  //Runtime config management
  setDelayMs(value: number) {
    this.delayMs = value;
    this.logger.log(`Weather delay updated to ${value}ms`);
  }

  setFailRate(value: number) {
    this.failRate = value;
    this.logger.log(`Weather fail rate updated to ${value}`);
  }

  getConfig() {
    return {
      delayMs: this.delayMs,
      failRate: this.failRate,
    };
  }
}
