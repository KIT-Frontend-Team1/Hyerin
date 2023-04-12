const play_list = {
  볼사: "나만 봄",
  십센치: "그라데이션",
  파테코: "rainy day",
  케플러: "wadada",
  아이유: "unlucky",
};
play_list["10cm"] = "그라데이션";
play_list["pateko"] = "rainy day";
play_list["kepler"] = "wadada";

function play(singer) {
  if (!play_list[singer]) return "이 곡은 없습니다";
  return play_list[singer];
}
console.log(play("파테코"));
console.log(play("10cm"));
console.log(play("IVE"));
