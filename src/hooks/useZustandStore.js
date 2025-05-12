import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useLandingStore = create(
  persist(set => ({ landing: {}, addLanding: landing => set({ landing }) }), {
    name: 'landing-store'
  })
);

export const useLandingFiltersStore = create(
  persist(set => ({ places: {}, setPlaces: places => set({ places }) }), {
    name: 'places-store'
  })
);

export const useHotelStore = create(
  persist(set => ({ hotel: {}, setHotel: hotel => set({ hotel }) }), {
    name: 'hotel-store'
  })
);

export const useFilterStore = create(set => ({
  selectedCheckboxesFilter: {},

  setSelectedCheckboxesFilter: (key, selectedIds) =>
    set(state => ({
      selectedCheckboxesFilter: {
        ...state.selectedCheckboxesFilter,
        [key]: selectedIds
      }
    })),
  resetSelectedCheckboxesFilter: () =>
    set(() => ({
      selectedCheckboxesFilter: {}
    }))
}));

export const useSelectionStore = create(
  persist(
    set => ({ selection: {}, setSelection: selection => set({ selection }) }),
    {
      name: 'selection-store'
    }
  )
);

export const usePackageFilterStore = create(
  persist(
    set => ({
      packageFilter: {
        code: null,
        selectedDuration: null,
        selectedDate: null,
        selectedRooms: null,
        selectedPeople: null,
        selectedRoute: null,
        selectedConcept: null,
        selectedRoomPackage: null,
        selectedHotelOnlyDuration: null,
        selectedOutward: null,
        selectedInward: null
      },
      setPackageFilter: packageFilter => set({ packageFilter }),
      resetPackageFilter: code =>
        set({
          packageFilter: {
            code,
            selectedDuration: null,
            selectedDate: null,
            selectedRooms: null,
            selectedPeople: null,
            selectedRoute: null,
            selectedConcept: null,
            selectedRoomPackage: null,
            selectedHotelOnlyDuration: null
          }
        })
    }),
    {
      name: 'package-filter-store'
    }
  )
);

export const useReselectionStore = create(
  persist(
    set => ({
      reselection: {},
      setReselection: reselection => set({ reselection })
    }),
    {
      name: 'reselection-store'
    }
  )
);

export const useHotelOnlyFilterStore = create(set => ({
  hotelOnly: {
    code: null,
    checkInDate: null,
    numRooms: null,
    checkOutDate: null,
    roomData: null
  },
  setHotelOnlyFilter: hotelOnly => set({ hotelOnly }),
  resetHotelOnlyFilter: () =>
    set({
      hotelOnly: {
        code: null,
        checkInDate: null,
        numRooms: null,
        checkOutDate: null,
        roomData: null
      }
    })
}));

export const useStepOneStore = create(set => ({
  formData: {},
  setFormData: formData => set({ formData }),
  resetFormDataOne: () => set({ formData: {} })
}));

export const useStepOnePassngersStore = create(set => ({
  formData: [],
  setFormData: newPassenger =>
    set(state => {
      const updatedFormData = state.formData.some(p => p.id === newPassenger.id)
        ? state.formData.map(p =>
            p.id === newPassenger.id ? { ...p, ...newPassenger } : p
          )
        : [...state.formData, newPassenger];
      return { formData: updatedFormData };
    }),
  resetFormData: () => set({ formData: [] })
}));

export const useBreadCrumbs = create(set => ({
  links: [],
  setLinks: links => set({ links })
}));
