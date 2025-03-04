const PersonForm = (props) => {
  const { addPerson, name, setName, number, setNumber } = props;
  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
          Name:{" "}
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          Phone number:{" "}
          <input type="text" value={number} onChange={(e) => setNumber(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};
export default PersonForm;