//   helper function to create <option> tags for each filter
export const renderFilter = (filterArray) =>
  filterArray.map((filter) => {
    return (
      <option value={filter} key={filter}>
        {filter}
      </option>
    );
  });
