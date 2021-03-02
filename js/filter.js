const selectFilterOptions = {
  type: [
    'any',
    'palace',
    'flat',
    'house',
    'bungalow',
  ],
};

const filter = document.querySelector('.map__filters');
const propertyTypeFilter = filter.querySelector('#housing-type');

const isTypeFilterValue = (elements) => {
  const propertyTypeFilterValue = propertyTypeFilter.value;
  const elementType = elements.offer.type;

  return propertyTypeFilterValue === elementType ? true : false;
};

const filterData = (elements) => {
  if (propertyTypeFilter.value === selectFilterOptions.type[0]) {
    return elements;
  }

  return elements.filter(isTypeFilterValue);
};

export {propertyTypeFilter, filterData};
