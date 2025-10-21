
import { ForecastDto } from './weather.forcast.dto';

export class CreateWeatherDto {
  destination: string;
  forecast: ForecastDto[];
}
