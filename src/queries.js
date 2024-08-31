import { Op } from 'sequelize';
import { Animal, Human } from './model.js';

// Get the human with the primary key 2
export const query1 = await Human.findOne({ where: { humanId: 2 } });
// console.log(query1);

// Get the first animal whose species is "fish"
export const query2 = await Animal.findOne({ where: { species: 'fish' } });
// console.log(query2);

// Get all animals belonging to the human with primary key 5
export const query3 = await Animal.findAll({ where: { humanId: 5 } });
// console.log(query3);

// Get all animals born in a year greater than (but not equal to) 2015.
export const query4 = await Animal.findAll({
  where: { birth_year: { [Op.gt]: 2015 } },
});
// console.log(query4);

// Get all the humans with first names that start with "J"
export const query5 = await Human.findAll({
  where: { fname: { [Op.like]: 'J%' } },
});
// console.log(query5);

// Get all the animals who don't have a birth year
export const query6 = await Animal.findAll({ where: { birth_year: null } });
// console.log(query6);

// Get all the animals with species "fish" OR "rabbit"
export const query7 = await Animal.findAll({
  where: { species: { [Op.or]: ['fish', 'rabbit'] } },
});
// console.log(query7);

// Get all the humans who DON'T have an email address that contains "gmail"
export const query8 = await Human.findAll({
  where: { email: { [Op.notLike]: '%gmail%' } },
});
// console.log(query8);

// Continue reading the instructions before you move on!

// Print a directory of humans and their animals

async function printHumansAndAnimals() {
  try {
    // Fetch all humans along with their associated animals
    const humans = await Human.findAll({
      include: {
        model: Animal,
        as: 'animals', // This should match the alias in your relationship setup
      },
    });

    // Prepare the output
    const output = [];

    humans.forEach((human) => {
      // Get the full name using the getFullName method
      const fullName = human.getFullName();
      output.push(`${fullName}`);

      // List all animals associated with the human
      human.animals.forEach((animal) => {
        output.push(`- ${animal.name}, ${animal.species}`);
      });
    });

    // Join the array into a single string with newlines
    return output.join('\n');
  } catch (error) {
    console.error('Error fetching humans and animals:', error);
  }
}

// Example usage
printHumansAndAnimals().then(console.log);

// Return a Set containing the full names of all humans
// with animals of the given species.
async function getHumansByAnimalSpecies(species) {
  try {
    // Find all humans who own animals of the given species
    const humans = await Human.findAll({
      include: {
        model: Animal,
        as: 'animals', // This should match the alias in your relationship setup
        where: {
          species: species, // Filter by the given species
        },
      },
    });

    // Create a Set to store the full names of humans
    const humanNamesSet = new Set();

    // Add the full names of humans to the Set
    humans.forEach((human) => {
      humanNamesSet.add(human.getFullName());
    });

    // Return the Set containing the full names
    return humanNamesSet;
  } catch (error) {
    console.error('Error fetching humans by animal species:', error);
  }
}

// Example usage:
getHumansByAnimalSpecies('dog').then((humanNamesSet) => {
  console.log(humanNamesSet); // Outputs a Set of full names of humans who own dogs
});
