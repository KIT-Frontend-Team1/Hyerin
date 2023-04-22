import mockPost from "./mock.json" assert { type: "json" };
console.log(mockPost);

// id가져오기
const postDetailEl = document.getElementById("post-detail");
const repliesListEl = document.getElementById("replies-list");
const $input = document.querySelector("input");
// 게시물에 mockpost의 post부분 가져오기
const postHtml = `
<h2>${mockPost.post.title}</h2>
<p>${mockPost.post.content}</p>
<p>작성자: ${mockPost.post.User.nickName}</p>
`;

// 댓글에 Replies을 가져오기
const renderComments = () => {
  const repliesHtml = mockPost.post.Replies.map(
    (reply) => `
  <li class="content-container">
  <p>${reply.content}</p>
  <p>작성자: ${reply.User.nickName}</p>
  </li>
  `
  ).join("");
  repliesListEl.innerHTML = repliesHtml;
  $input.value = "";
};

const deleteFunc = () => {};
//추가 기능 구현
const $plusBtn = document.querySelector("#plusBtn");
const addNewComments = () => {
  //인풋값
  const newComment = {
    User: {
      nickName: "잇츠미",
    },
    content: $input.value,
  };
  //댓글 추가됨
  mockPost.post.Replies.push(newComment);
  console.log(mockPost);
  repliesListEl.innerHTML = "";
  renderComments();
};
$plusBtn.addEventListener("click", addNewComments);

renderComments();
// innerHTML로 콘텐츠 넣기
postDetailEl.innerHTML = postHtml;

//mockPost라는 객체에 내가 추가한 댓글을 새로운 요소로 추가해야 한다.

/* 
    import(참조)한 json data를
    게시글 상세와 댓글창에 나타내고 게시글 객체의 상세 내용은 console.log로 출력해두었습니다
    댓글 추가 버튼을 누르면 댓글이 추가되도록 해보세요 :)
    삭제 및 수정기능은 본인의 자유로 구현하시면 됩니다 :)
*/
