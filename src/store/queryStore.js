import { create } from 'zustand';

const useQueryStore = create((set, get) => ({
  selectedQuery: {
    value: '',
    label: ''
  },
  setSelectedQuery: (query) => set({ selectedQuery: query }),
  clearSelectedQuery: () => set({ selectedQuery: { value: '', label: '' } }),
  
}));

export default useQueryStore;
