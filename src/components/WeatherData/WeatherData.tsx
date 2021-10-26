import style from './WeatherData.module.scss';

const WeatherData = ({ currentData }: any) => {
  return (
    <div>
      <div className={style.temperature}>
        <div>Temperature: {currentData && currentData.main.temp}°C</div>
        <div>
          Weather conditions:{' '}
          {currentData && currentData.weather[0].description}
        </div>
      </div>
      <div className={style.weatherDescription}>
        <div>Wind speed: {currentData && currentData.wind.speed} meter/sec</div>
        <div>Clouds: {currentData && currentData.clouds.all} %</div>
      </div>
    </div>
  );
};

export default WeatherData;
