import { nameState } from "./atom";
import { useRecoilState } from "recoil";
const NameInput = () => {
  //useRecoilState는 useState와 사용법이 같다. 단지 인자에
  //내가 만든 atom을 넣어주면 된다.
  const [name, setName] = useRecoilState(nameState);
  const onChange = (e) => {
    setName(e.target.value);
  };
  return (
    <>
      <input type="text" value={name} onChange={onChange} />
      <div>Name : {name}</div>
    </>
  );
};

export default NameInput;
