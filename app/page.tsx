import { Hero, SearchBar, Filter, CarCard } from '@/components';
import { Filters } from '@/types/filters';
import { fetchCars } from '@/utils';

type PageProps = {
  searchParams: Filters;
};
export default async function Home({ searchParams }: PageProps) {
  const allCars = await fetchCars(searchParams);
  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className='overflow-hidden'>
      <Hero />
      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>
        <div className='home__filters'>
          <SearchBar />
          <div className='home__filter-container'>
            <Filter title='fuel' />
            <Filter title='year' />
          </div>
        </div>
        {!isDataEmpty ? (
          <section>
            <div className='home__cars-wrapper'>
              {allCars?.map((car) => (
                <CarCard key={car.model} car={car} />
              ))}
            </div>
          </section>
        ) : (
          <div className='home__error-container'>
            <h2 className='text-black text-xl font-bold'>Opps, no results</h2>
          </div>
        )}
      </div>
    </main>
  );
}
