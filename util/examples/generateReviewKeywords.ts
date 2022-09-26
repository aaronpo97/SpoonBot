import { reviewKeywords } from './data';

const generateReviewKeywords = () => {
  const review: string[] = [];
  const numberOfKeywords = Math.floor(Math.random() * 4) + 2;
  for (let i = 0; i < numberOfKeywords; i++) {
    const keyword = reviewKeywords[Math.floor(Math.random() * reviewKeywords.length)];
    if (!review.includes(keyword)) {
      review.push(keyword);
    }
  }
  return review.join(', ');
};

export default generateReviewKeywords;
