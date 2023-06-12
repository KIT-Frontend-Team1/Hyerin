import { useUserContext } from "../../../../../store/3_context";

const ContextQ2Form2 = () => {
  const [userList, dispatch] = useUserContext();

  const onAddStatus = () => {
    dispatch({
      type: "ADDSTATUS",
    });
  };

  return (
    <div>
      <h1>Q2Form2</h1>
      <button onClick={onAddStatus} type="button">
        STATUS 추가
      </button>
    </div>
  );
};
export default ContextQ2Form2;
