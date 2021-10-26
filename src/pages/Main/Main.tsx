import style from './Main.module.scss';
import { useEffect, useState } from 'react';
import { currentWeather, weatherByTime } from '../../services/weatherAPI';
import { getHour } from '../../utils/time';
import WeatherData from '../../components/WeatherData/WeatherData';
import WeatherWithDate from '../../components/WeatherWithDate/WeatherWithDate';

const Main = () => {
  const localCity = window.localStorage.getItem('city');

  const [currentData, setCurrentData] = useState<any>(null);
  const [threeDaysData, setThreeDaysData] = useState<any>(null);
  const [city, setCity] = useState(localCity || 'Minsk');

  const changeCityHandle = (nameCity: string) => {
    setCity(nameCity);
    window.localStorage.setItem('city', nameCity);
  };

  useEffect(() => {
    currentWeather(city).then(({ data }) => {
      setCurrentData(data);
    });

    weatherByTime(city).then(({ data }) => {
      const dataThreeDays: any[] = [];
      let counterDays = 0;
      data.list.forEach((item: any) => {
        const time = item.dt_txt;
        const hour = getHour(time);
        if (+hour === 12 && counterDays <= 2) {
          dataThreeDays.push(item);
          counterDays++;
        }
      });
      setThreeDaysData(dataThreeDays);
    });
  }, [city]);

  return (
    <div className={style.main}>
      <div className={style.buttons}>
        {['Minsk', 'Moscow', 'Bratislava'].map((nameCity) => (
          <button
            className={`${style.button} ${style.cityButton}`}
            key={nameCity}
            onClick={() => changeCityHandle(nameCity)}
          >
            {nameCity}
          </button>
        ))}
      </div>
      <div className={style.data}>
        <h3 className={style.current}>Current weather</h3>
        <WeatherData currentData={currentData} />
      </div>
      <div className={style.threeDays}>
        <h3 className={style.title}>Weather for three days</h3>
        {threeDaysData &&
          threeDaysData.map((data: any) => (
            <WeatherWithDate data={data} key={data.dt} />
          ))}
      </div>
    </div>
  );
};

export default Main;
