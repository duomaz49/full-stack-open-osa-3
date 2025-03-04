const PersonsList = (props) => {
  const { filterPersons, triggerDelete } = props;
  return (
    <>
      {filterPersons?.map(({ name, number, id }) => (
        <li key={id}>
          {name} {number} <button type="button" onClick={() => triggerDelete(id, name)}>delete</button>
        </li>
      ))}
    </>
  );
};
export default PersonsList;