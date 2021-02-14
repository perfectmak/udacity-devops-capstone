import DataLoader from 'dataloader';

const indexResults = (results) => {
  const indexedResults = new Map();
  results.forEach((res) => {
    const key = res.id;
    indexedResults.set(key, res);
  });
  return indexedResults;
};

const normalize = (results, keys) => {
  const indexedResults = indexResults(results);
  return keys.map((key) => indexedResults.get(key) || null);
};

export const createDataLoader = (batchLoadFn) => (new DataLoader(
  (keys) => batchLoadFn(keys).then((results) => normalize(results, keys)),
));
