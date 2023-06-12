import { useUserContext } from "../../../../../store/3_context";

const ContextQ2Form3 = () => {
  const [userList, dispatch] = useUserContext();

  const onReset = () => {
    dispatch({ type: "RESET" });
  };

  return (
    <div>
      <h1>Q2Form3</h1>
      <button onClick={onReset}>RESET</button>
    </div>
  );
};
export default ContextQ2Form3;
