import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { weatherByTime } from '../../services/weatherAPI';
import { IDataApi } from '../../utils/types';
import WeatherWithDate from '../../components/WeatherWithDate/WeatherWithDate';
import loadGif from '../../assets/images/load.gif';
import style from '../Details/Details.module.scss';

const Details = () => {
  const [inputValue, setInputValue] = useState('');
  const [list, setList] = useState<null | IDataApi[]>(null);
  const [loader, setLoader] = useState(true);
  const [fault, setFault] = useState(false);

  const { cityURL } = useParams<{ cityURL: string }>();
  const history = useHistory();

  const inputHandle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);

  const searchHandle = () => history.push(inputValue);

  const handleSearchOnEnter = (event: React.KeyboardEvent<HTMLInputElement>) =>
    event.key === 'Enter' && searchHandle();

  useEffect(() => {
    setLoader(true);
    weatherByTime(cityURL)
      .then(({ data }) => {
        setList(data.list);
        setFault(false);
      })
      .catch(() => {
        setFault(true);
      })
      .finally(() => {
        setLoader(false);
      });
  }, [cityURL]);

  return (
    <div className={style.details}>
      <div className={style.forUser}>
        <input
          type="text"
          placeholder={`example: ${cityURL}`}
          className={style.input}
          onChange={inputHandle}
          value={inputValue}
          onKeyPress={handleSearchOnEnter}
        />
        <button className={style.button} onClick={searchHandle}>
          Search
        </button>
      </div>
      {fault ? (
        <h2 className={style.fault}>Something went wrong, check the data</h2>
      ) : (
        <>
          {loader ? (
            <img src={loadGif} alt="load" />
          ) : (
            <>
              <div className={style.fiveDays}>
                {list &&
                  list.map((item: IDataApi) => (
                    <WeatherWithDate data={item} isTimeNeed key={item.dt} />
                  ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Details;
