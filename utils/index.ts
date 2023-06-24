import { Car } from '@/types/car';
import { Filters } from '@/types/filters';
import axios from 'axios';

export async function fetchCars({
  fuel = '',
  limit = 10,
  manufacturer = '',
  model = '',
  year = 2000,
}: Filters) {
  const options = {
    method: 'GET',
    url: 'https://cars-by-api-ninjas.p.rapidapi.com/v1/cars',
    params: { fuel_type: fuel, limit, make: manufacturer, model, year },

    headers: {
      'X-RapidAPI-Key': process.env.API_KEY,
      'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request<Car[]>(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const generateCarImageUrl = (car: Car, angle?: string) => {
  const url = new URL('https://cdn.imagin.studio/getimage');
  const { make, model, year } = car;

  url.searchParams.append('customer', process.env.NEXT_PUBLIC_IMAGIN_API_KEY!);
  url.searchParams.append('make', make);
  url.searchParams.append('modelFamily', model.split(' ')[0]);
  url.searchParams.append('zoomType', 'fullscreen');
  url.searchParams.append('modelYear', `${year}`);
  url.searchParams.append('angle', `${angle}`);

  return `${url}`;
};

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50;
  const mileageFactor = 0.1;
  const ageFactor = 0.05;

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(type, value);

  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
};

export const updateQueryParams = (model: string, manufacturer: string) => {
  const searchParams = new URLSearchParams(window.location.search);

  if (model) {
    searchParams.set('model', model);
  } else {
    searchParams.delete('model');
  }

  if (manufacturer) {
    searchParams.set('manufacturer', manufacturer);
  } else {
    searchParams.delete('manufacturer');
  }

  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
};

export const filterManufacturers = (query: string, manufacturers: string[]) => {
  return query === ''
    ? manufacturers
    : manufacturers.filter((manufacturer) =>
        manufacturer
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.toLowerCase().replace(/\s+/g, '')),
      );
};
