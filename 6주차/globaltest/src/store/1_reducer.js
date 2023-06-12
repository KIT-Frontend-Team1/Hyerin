//상태 업데이트 로직

//dispatch({type: "ADD", name : 이름, id : 아이디, price : 가격})
const reducer = (initialstate, action) => {
  switch (action.type) {
    case "DELETE":
      return initialstate.filter((item) => item.id !== action.id);
    case "ADD":
      const newItem = {
        id: action.id, //payload
        name: action.name,
        price: action.price,
      };
      //[{},{},{},newItem]
      return [...initialstate, newItem];
    //전개연산자 => [],{}를 업앤다.
    default:
      return initialstate;
  }
};

export default reducer;
