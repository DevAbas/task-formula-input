import { useQuery } from "react-query";
import axios from "axios";

interface Suggestion {
  name: string;
  category: string;
  value: string | number;
  id: string;
}

const fetchSuggestions = async (): Promise<Suggestion[]> => {
  const { data } = await axios.get(
    "https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete"
  );
  return data;
};

const useAutocomplete = () => {
  return useQuery("autocomplete", fetchSuggestions);
};

export default useAutocomplete;
