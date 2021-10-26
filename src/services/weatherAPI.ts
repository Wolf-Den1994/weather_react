import axios, { AxiosResponse } from 'axios';
import { IDataApi, IDataApiWithList } from '../utils/types';

const API_KEY = 'f61a61c4ba631867eeab1afc85576e06';

export const currentWeather = async (
  city: string
): Promise<AxiosResponse<IDataApi>> => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&appid=${API_KEY}&units=metric`
  );
  return response;
};

export const weatherByTime = async (
  city: string
): Promise<AxiosResponse<IDataApiWithList>> => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=en&appid=${API_KEY}&units=metric`
  );
  return response;
};
