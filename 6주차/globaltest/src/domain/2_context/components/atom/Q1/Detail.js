import ContextQ1Detail2 from "./Detail2";
import { ModalContext } from "../../../../../store/2_context";
import { useContext } from "react";
const ContextQ1Detail = () => {
  const { isModalOpen, setIsModalOpen } = useContext(ModalContext);

  const onToggleModal = () => {
    //true   //false
    setIsModalOpen((prev) => [!prev[0], !!prev[1]]);
    console.log(isModalOpen);
  };

  return (
    <>
      <h2>ContextQ1Detail</h2>
      {isModalOpen[0] ? (
        <button onClick={onToggleModal}>숨기기</button>
      ) : (
        <button onClick={onToggleModal}>보이기</button>
      )}
      <ContextQ1Detail2 />
    </>
  );
};
export default ContextQ1Detail;
