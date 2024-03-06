import { useState } from "react";

const useBreedList = (animal) => {
  const [breedList, setBreedList] = useState([]);
  return breedList;
};

export default useBreedList;
