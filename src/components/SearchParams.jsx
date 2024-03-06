import { useState, useEffect } from "react";
import Pet from "./Pet";
import useBreedList from "../hooks/useBreedList";
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [location, setLocation] = useState("");
  const [animal, setanimal] = useState("");
  const [breed, setbreed] = useState("");
  const [pets, setPets] = useState([]);
  const Breeds = useBreedList(animal);
console.log(Breeds);
  useEffect(() => {
    const fetchPets = async () => {
      const res = await fetch(
        `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
      );
      const json = await res.json();
      setPets(json.pets);
    };
    fetchPets();
  }, [animal, location, breed]);

  return (
    <div className="search-params">
      <form>
        <label htmlFor="location">
          Location
          <input
            id="Loction"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
            placeholder="Location"
          />
        </label>
        <label htmlFor="animals">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => {
              setanimal(e.target.value);
              setbreed("");
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option value={animal} key={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="Breed">
          Breed
          <select
            id="breed"
            disabled={!Breeds.length}
            value={breed}
            onChange={(e) => {
              setbreed(e.target.value);
            }}
          >
            <option />
            {Breeds.map((breed) => (
              <option value={breed} key={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button>submit</button>
      </form>
      <div className="search">
        {!pets.length ? (
          <h1>No Pets Found</h1>
        ) : (
          pets.map((pet) => (
            <Pet
              key={pet.id}
              name={pet.name}
              animal={pet.animal}
              breed={pet.breed}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default SearchParams;
