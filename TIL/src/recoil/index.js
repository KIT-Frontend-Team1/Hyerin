import "./App.css";
import { RecoilRoot } from "recoil";
import NameInput from "./components/name";
import Counter from "./components/selector2";

function App() {
  return (
    <RecoilRoot>
      <div>useRecoilState</div>
      <br />
      <NameInput />
      <br />
      <br />
      <div>useRecoilValue</div>
      <br />
      {/* <SomeOtherComponentWithName /> */}
      <br />
      <br />
      <div>useSetRecoilState</div>
      <br />
      {/* <SetName /> */}
      <br />
      <br />
      <br />
      <br />
      <Counter />
    </RecoilRoot>
  );
}

export default App;
