const FilterPerson = (props) => {
  const { setQuery } = props;
  return <input type="text" onChange={(e) => setQuery(e.target.value)} />;
};
export default FilterPerson;