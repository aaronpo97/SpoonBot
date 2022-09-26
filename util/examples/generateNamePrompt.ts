import { locations, cuisineAndKeywords } from './data';

const generateLocation = () => locations[Math.floor(Math.random() * locations.length)];

const generateCuisineAndKeywords = () => {
  const cuisineAndKeywordsObj =
    cuisineAndKeywords[Math.floor(Math.random() * cuisineAndKeywords.length)];
  const keywords: string[] = [];

  for (let i = 0; i < 5; i++) {
    const keyword =
      cuisineAndKeywordsObj.keywords[
        Math.floor(Math.random() * cuisineAndKeywordsObj.keywords.length)
      ];
    if (!keywords.includes(keyword)) {
      keywords.push(keyword);
    }
  }
  return { cuisine: cuisineAndKeywordsObj.cuisine, keywords: keywords.join(', ') };
};

const generateNamePrompt = () => {
  return { location: generateLocation(), ...generateCuisineAndKeywords() };
};
export default generateNamePrompt;
