import style from './WeatherWithDate.module.scss';
import { getDate, getFullTime } from '../../utils/time';
import WeatherData from '../WeatherData/WeatherData';
import { IDataApi } from '../../utils/types';

interface IWeatherWithDateProps {
  data: IDataApi;
  isTimeNeed?: boolean;
}

const WeatherWithDate = ({ data, isTimeNeed }: IWeatherWithDateProps) => {
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
