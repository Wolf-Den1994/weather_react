import style from './WeatherWithDate.module.scss';
import { getDate, getFullTime } from '../../utils/time';
import WeatherData from '../WeatherData/WeatherData';

const WeatherWithDate = ({ data, isTimeNeed }: any) => {
  return (
    <div className={style.disc}>
      <div className={style.day}>
        {isTimeNeed ? getFullTime(data.dt_txt) : getDate(data.dt_txt)}
      </div>
      <WeatherData currentData={data} />
    </div>
  );
};

export default WeatherWithDate;
