import { useEffect, useState } from 'react';
import { currentWeather, weatherByTime } from '../../services/weatherAPI';
import { getHour } from '../../utils/time';
import { IDataApi, Cities } from '../../utils/types';
import loadGif from '../../assets/images/load.gif';
import WeatherData from '../../components/WeatherData/WeatherData';
import WeatherWithDate from '../../components/WeatherWithDate/WeatherWithDate';
import style from './Main.module.scss';

const NOON = 12;
const COUNT_DAYS = 2;

const Main = () => {
  const localCity = window.localStorage.getItem(Cities.City);

  const [currentData, setCurrentData] = useState<IDataApi | null>(null);
  const [threeDaysData, setThreeDaysData] = useState<IDataApi[] | null>(null);
  const [city, setCity] = useState(localCity || Cities.Minsk);
  const [fault, setFault] = useState(false);
  const [loaderCurrentData, setLoaderCurrentData] = useState(true);
  const [loaderThreeDaysData, setLoaderThreeDaysData] = useState(true);

  const changeCityHandle = (nameCity: string) => {
    setCity(nameCity);
    window.localStorage.setItem(Cities.City, nameCity);
  };

  useEffect(() => {
    setLoaderCurrentData(true);
    currentWeather(city)
      .then(({ data }) => {
        setCurrentData(data);
        setFault(false);
      })
      .catch(() => {
        setFault(true);
      })
      .finally(() => {
        setLoaderCurrentData(false);
      });

    setLoaderThreeDaysData(true);
    weatherByTime(city)
      .then(({ data }) => {
        const dataThreeDays: IDataApi[] = [];
        let counterDays = 0;
        data.list.forEach((item: IDataApi) => {
          const time = item.dt_txt;
          const hour = getHour(time);
          if (+hour === NOON && counterDays <= COUNT_DAYS) {
            dataThreeDays.push(item);
            counterDays++;
          }
        });
        setThreeDaysData(dataThreeDays);
        setFault(false);
      })
      .catch(() => {
        setFault(true);
      })
      .finally(() => {
        setLoaderThreeDaysData(false);
      });
  }, [city]);

  return (
    <div className={style.main}>
      <div className={style.buttons}>
        {[Cities.Minsk, Cities.Moscow, Cities.Bratislava].map((nameCity) => (
          <button
            className={`${style.button} ${style.cityButton} ${
              localCity === nameCity ? style.active : ''
            }`}
            key={nameCity}
            onClick={() => changeCityHandle(nameCity)}
          >
            {nameCity}
          </button>
        ))}
      </div>
      {fault ? (
        <h2 className={style.fault}>Something went wrong, check the data</h2>
      ) : (
        <>
          <div className={style.data}>
            <h3 className={style.current}>Current weather</h3>
            {loaderCurrentData ? (
              <img src={loadGif} alt="load" className={style.load} />
            ) : (
              currentData && <WeatherData currentData={currentData} />
            )}
          </div>
          <div className={style.threeDays}>
            <h3 className={style.title}>Weather for three days</h3>
            {loaderThreeDaysData ? (
              <img src={loadGif} alt="load" className={style.load} />
            ) : (
              threeDaysData &&
              threeDaysData.map((data: IDataApi) => (
                <WeatherWithDate data={data} key={data.dt} />
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Main;
