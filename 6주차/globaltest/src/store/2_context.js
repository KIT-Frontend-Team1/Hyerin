import { createContext } from "react";
import { useState } from "react";

//1. createContext
export const ModalContext = createContext();

// 위의 상태를 전역으로 관리하여 ContextQ1Detail, ContextQ1Detail2 두 컴포넌트의 보이기 버튼이 눌려도 모달창이 열릴 수 있도록 해주세요 :)

// export const ModalContextProvider = ({ children }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   return (
//     <>
//       <ModalContext.Provider value={(isModalOpen, setIsModalOpen)}>
//         {children}
//       </ModalContext.Provider>
//     </>
//   );
// };
// export default ModalContextProvider;
