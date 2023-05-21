import { useContextSafely } from '@src/common/hooks/useContextSafely';
import { createContext, ReactNode, useMemo, useState } from 'react';

type DateSortingOption = 'none' | 'newer' | 'older';

interface FilterContextValue {
  dateSortedBy: DateSortingOption;
}

interface FilterUpdateContextValue {
  setDateSortedBy: (option: DateSortingOption) => void;
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

  const setters = useMemo(() => {
    return { setDateSortedBy };
  }, []);

  const getters = useMemo(() => {
    return { dateSortedBy };
  }, [dateSortedBy]);

  return (
    <FilterUpdateContext.Provider value={setters}>
      <FilterContext.Provider value={getters}>
        {children}
      </FilterContext.Provider>
    </FilterUpdateContext.Provider>
  );
};

export const useFilter = () => useContextSafely(FilterContext);
export const useFilterUpdate = () => useContextSafely(FilterUpdateContext);
