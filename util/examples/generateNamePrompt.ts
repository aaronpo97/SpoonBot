const locations: string[] = [
  'San Francisco',
  'Toronto',
  'New York',
  'Los Angeles',
  'Chicago',
  'Montreal',
  'Vancouver',
  'Boston',
  'Seattle',
  'Portland',
  'Austin',
  'Denver',
  'Miami',
  'Atlanta',
  'Houston',
  'Philadelphia',
  'Washington DC',
  'Dallas',
  'San Diego',
  'Calgary',
  'Edmonton',
  'Phoenix',
  'Salt Lake City',
  'Las Vegas',
  'Minneapolis',
  'Detroit',
  'Pittsburgh',
  'Columbus',
  'Charlotte',
  'San Jose',
  'St. Louis',
  'Sacramento',
  'Raleigh',
];

const cuisineAndKeywords = [
  {
    cuisine: 'American',
    keywords: [
      'Burgers',
      'Steak',
      'BBQ',
      'Chicken',
      'Wings',
      'Sandwiches',
      'Salads',
      'Pizza',
      'Pasta',
      'Seafood',
      'Breakfast',
      'Brunch',
      'Dessert',
      'Bakery',
      'Cafe',
    ],
  },
  {
    cuisine: 'Italian',
    keywords: [
      'Pizza',
      'Pasta',
      'Calzones',
      'Salads',
      'Breadsticks',
      'Lasagna',
      'Ravioli',
      'Spaghetti',
    ],
  },
  {
    cuisine: 'Mexican',
    keywords: [
      'Tacos',
      'Burritos',
      'Enchiladas',
      'Quesadillas',
      'Nachos',
      'Tortas',
      'Tostadas',
      'Chimichangas',
      'Chilaquiles',
      'Tamales',
    ],
  },
  {
    cuisine: 'Chinese',
    keywords: [
      'Dumplings',
      'Spring Rolls',
      'Egg Rolls',
      'Fried Rice',
      'Lo Mein',
      'Sesame Chicken',
      'Sweet and Sour Chicken',
      "General Tso's Chicken",
      'Orange Chicken',
      'Kung Pao Chicken',
      'Szechuan Chicken',
      'Beef and Broccoli',
      'Mongolian Beef',
      'Orange Beef',
    ],
  },
  {
    cuisine: 'Vietnamese',
    keywords: [
      'Pho',
      'Banh Mi',
      'Bun Bo Hue',
      'Bun Rieu',
      'Bun Cha',
      'Banh Xeo',
      'Banh Cuon',
      'Banh Canh',
      'Banh Beo',
      'Banh Tom',
      'Banh Bot Loc',
      'Banh Khot',
      'Banh Trang Nuong',
    ],
  },
  {
    cuisine: 'Japanese',
    keywords: [
      'Sushi',
      'Sashimi',
      'Ramen',
      'Udon',
      'Soba',
      'Tempura',
      'Teriyaki',
      'Miso Soup',
      'Gyoza',
      'Edamame',
      'Mochi',
      'Okonomiyaki',
      'Onigiri',
      'Sukiyaki',
      'Yakitori',
    ],
  },
];

const generateLocation = () => locations[Math.floor(Math.random() * locations.length)];

const generateCuisineAndKeywords = () => {
  const cuisineAndKeywordsObj =
    cuisineAndKeywords[Math.floor(Math.random() * cuisineAndKeywords.length)];
  const keywords: string[] = [];
  // eslint-disable-next-line no-plusplus
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
