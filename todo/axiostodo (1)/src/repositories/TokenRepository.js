//Token_repository

//토큰 키를 고민할 필요가 없다.
//이건 그냥 토큰의 이름일 뿐이기 때문이다.
const TOKEN_KEY = "access_token";

//localStorage를 sesstionStory로 바꿔주거나
//TOKEN_KEY를 바꿔야 하거나..
const TokenRepository = {
  setToken(token) {
    return localStorage.setItem(TOKEN_KEY, token);
  },
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },
  removeToken() {
    return localStorage.removeItem(TOKEN_KEY);
  },
};

export default TokenRepository;
