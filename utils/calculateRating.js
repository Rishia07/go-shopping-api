const calculateRating = (ratings) => {
  if (!ratings || ratings.length === 0) return 0;

  const ratingValues = ratings.map(ratingObj => ratingObj.rating);

  const total = ratingValues.reduce((sum, rating) => sum + rating, 0);
  const average = total / ratingValues.length;

  return Math.round(average * 10) / 10;
};

module.exports = calculateRating