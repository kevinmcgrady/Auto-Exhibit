import { Hero, SearchBar, Filter, CarCard, ShowMore } from '@/components';
import { fuels, yearsOfProduction } from '@/constants';
import { Filters } from '@/types/filters';
import { fetchCars } from '@/utils';

type PageProps = {
  searchParams: Filters;
};

export default async function Home({ searchParams }: PageProps) {
  const allCars = await fetchCars(searchParams);
  console.log('cars', allCars);
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
            <Filter title='fuel' options={fuels} />
            <Filter title='year' options={yearsOfProduction} />
          </div>
        </div>
        {!isDataEmpty ? (
          <section>
            <div className='home__cars-wrapper'>
              {allCars?.map((car) => (
                <CarCard key={car.model} car={car} />
              ))}
            </div>
            <ShowMore
              pageNumber={(searchParams.limit || 10) / 10}
              isNext={(searchParams.limit || 10) > allCars.length}
            />
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
