import { getDate, getFullTime } from '../../utils/time';
import { IDataApi } from '../../utils/types';
import WeatherData from '../WeatherData/WeatherData';
import style from './WeatherWithDate.module.scss';

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
