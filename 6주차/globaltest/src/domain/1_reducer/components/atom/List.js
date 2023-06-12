const ReducerQ1List = ({ ingredients, onDelete }) => {
  //삭제함수
  const handleDelete = (id) => {
    onDelete(id);
  };

  return (
    <tbody>
      {ingredients.map((ingredient) => (
        <tr key={ingredient.id}>
          <td>{ingredient.name}</td>
          <td>{ingredient.price}</td>
          <td>
            <button
              type="button"
              onClick={() => {
                handleDelete(ingredient.id);
              }}
            >
              삭제
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};
export default ReducerQ1List;
