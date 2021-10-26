export interface IDataApi {
  main: { temp: number };
  wind: { speed: number };
  weather: [{ description: string; icon: string; id: number; main: string }];
  clouds: { all: number };
  dt_txt: string;
  dt: number;
  message: string;
}

export interface IDataApiWithList {
  list: IDataApi[];
}
