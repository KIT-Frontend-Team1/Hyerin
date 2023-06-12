import { Mobile, PC } from "./mobilePc";

//모바일일때 pc일때 보여줄 컴포넌트를 다르게 지정함으로서 반응형 구현
//npm install react-responsive
//react-responsive 라이브러리 사용함.
const ResponsivePage = () => {
  return (
    <div>
      <Mobile>
        <div>모바일일때 보임</div>
      </Mobile>
      <PC>
        <div>PC일때 보임</div>
      </PC>
    </div>
  );
};
export default ResponsivePage;
