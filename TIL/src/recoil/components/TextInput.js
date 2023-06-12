import { useRecoilState } from "recoil";
import { TextState } from "./atom";
function TextInput() {
  const [text, setText] = useRecoilState(TextState);

  const onChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <input type="text" value={text} onChange={onChange} />
      <br />
      Echo: {text}
    </div>
  );
}
export default TextInput;
