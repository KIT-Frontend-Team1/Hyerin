import ContextQ2Form2 from "./Form2";
import { useUserContext } from "../../../../../store/3_context";
const ContextQ2Form = () => {
  const [userList, dispatch] = useUserContext();

  const addUser = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD",
      name: e.target.name.value,
      nickName: e.target.nickName.value,
    });
  };

  console.log(userList);
  return (
    <form onSubmit={addUser}>
      <h1>Q2Form</h1>
      <input placeholder="name" name="name" />
      <input placeholder="nick-name" name="nickName" />
      <button>추가</button>
      <div>
        {userList.map((user) => (
          <div>
            <span>{user.name}</span>
            <span>{user.nickName}</span>
            <span>{user.isEdit}</span>
          </div>
        ))}
      </div>
      <ContextQ2Form2 />
    </form>
  );
};
export default ContextQ2Form;
