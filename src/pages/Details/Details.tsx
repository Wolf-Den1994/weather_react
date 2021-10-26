import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import style from '../Details/Details.module.scss';
import { weatherByTime } from '../../services/weatherAPI';
import WeatherWithDate from '../../components/WeatherWithDate/WeatherWithDate';

const Details = () => {
  const [inputValue, setInputValue] = useState('');
  const [data, setData] = useState<any>(null);

  const { cityURL } = useParams<{ cityURL: string }>();
  const history = useHistory();

  const inputHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const searchHandle = () => {
    history.push(inputValue);
  };

  useEffect(() => {
    weatherByTime(cityURL).then(({ data }) => {
      setData(data.list);
    });
  }, [cityURL]);

  return (
    <div className={style.details}>
      <div className={style.forUser}>
        <input
          type="text"
          placeholder="example: Minsk"
          className={style.input}
          onChange={inputHandle}
          value={inputValue}
        />
        <button className={style.button} onClick={searchHandle}>
          Search
        </button>
      </div>
      <div className={style.fiveDays}>
        {data &&
          data.map((item: any) => (
            <WeatherWithDate data={item} isTimeNeed key={item.dt} />
          ))}
      </div>
    </div>
  );
};

export default Details;