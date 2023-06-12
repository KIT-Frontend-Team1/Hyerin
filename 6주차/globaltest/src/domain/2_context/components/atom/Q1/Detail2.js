import { ModalContext } from "../../../../../store/2_context";
import { useContext } from "react";

const ContextQ1Detail2 = () => {
  const { isModalOpen, setIsModalOpen } = useContext(ModalContext);

  const onToggleModal = () => {
    setIsModalOpen((prev) => [prev[0], !prev[1]]);
    console.log(isModalOpen);
  };

  return (
    <>
      <h2>ContextQ1Detail2</h2>
      {isModalOpen[1] ? (
        <button onClick={onToggleModal}>숨기기</button>
      ) : (
        <button onClick={onToggleModal}>보이기</button>
      )}
    </>
  );
};
export default ContextQ1Detail2;
