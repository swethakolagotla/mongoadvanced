const cleanUp = (query) => {
  for (let n of Object.keys(query)) {
    if (typeof query[n] === "object") cleanUp(query[n]);
    if (!isNaN(Number(query[n]))) query[n] = Number(query[n]);
  }

  return query;
};
const whiteFields = (query) => {
  const workingQuery = JSON.parse(JSON.stringify(query)); //req.query ka copy
  const excludeFields = ["sort", "fields", "limit", "page"]; /*these are the keys in req.query, if these keys are present in req.query, 
   ,then we will take  them off and the remaining will send to the findquery*/
  excludeFields.forEach((item) => delete workingQuery[item]);
  return workingQuery
};

export { cleanUp, whiteFields };

// http://localhost:4000/api/products?price[$gte]=100&price[$lte]=110&rating.rate[$gte]=3
