const reviewKeywords = [
  'Family friendly',
  'Great location',
  'Amazing food',
  'Great location',
  'Affordable',
  'Good food',
  'Good service',
  'Delicious',
  'Fun atmosphere',
  'Casual atmosphere',
  'Good for kids',
  'Kid-friendly',
  'Good for groups',
  'Inexpensive',
  'Great burgers',
  'Nachos were amazing',
  'Cheap drinks',
  'Great for happy hour',
  'Amazing service',
];
const generateReviewKeywords = () => {
  const review: string[] = [];
  const numKeywords = Math.floor(Math.random() * 4) + 2;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < numKeywords; i++) {
    const keyword = reviewKeywords[Math.floor(Math.random() * reviewKeywords.length)];
    if (!review.includes(keyword)) {
      review.push(keyword);
    }
  }
  return review.join(', ');
};

export default generateReviewKeywords;
