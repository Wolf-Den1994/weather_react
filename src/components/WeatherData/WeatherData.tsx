import { IDataApi } from '../../utils/types';
import style from './WeatherData.module.scss';

interface IWeatherDataProps {
  currentData: IDataApi;
}

const WeatherData = ({ currentData }: IWeatherDataProps) => {
  return (
    <div>
      <div className={style.temperature}>
        <div>Temperature: {currentData.main.temp}°C</div>
        <div>Weather conditions: {currentData.weather[0].description}</div>
      </div>
      <div className={style.weatherDescription}>
        <div>Wind speed: {currentData.wind.speed} meter/sec</div>
        <div>Clouds: {currentData.clouds.all} %</div>
      </div>
    </div>
  );
};

export default WeatherData;
