import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';
import { useContextSafely } from '../hooks/useContextSafely';

type DateSortingOption = 'none' | 'newer' | 'older';
interface FilterContextValue {
  dateSortedBy: DateSortingOption;
}
interface FilterUpdateContextValue {
  setDateSortedBy: Dispatch<SetStateAction<DateSortingOption>>;
}

const FilterContext = createContext<FilterContextValue | null>(null);
const FilterUpdateContext = createContext<FilterUpdateContextValue | null>(
  null,
);

interface FilterProviderProps {
  children: ReactNode;
}

export const FilterProvider = ({ children }: FilterProviderProps) => {
  const [dateSortedBy, setDateSortedBy] = useState<DateSortingOption>('none');
  return (
    <FilterUpdateContext.Provider value={{ setDateSortedBy }}>
      <FilterContext.Provider value={{ dateSortedBy }}>
        {children}
      </FilterContext.Provider>
    </FilterUpdateContext.Provider>
  );
};

export const useFilter = () => useContextSafely(FilterContext);
export const useFilterUpdate = () => useContextSafely(FilterUpdateContext);
