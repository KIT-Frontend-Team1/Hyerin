// //1번
const obj = {}; //return할 객체
function maxvalue(arr){
    obj['maxValue'] = Math.max(...arr);
    arr.sort((a,b)=>b-a);
    obj['sortArr'] = arr;
    return obj;
}

const a = maxvalue([10,5,2,1,5,100]);
console.log(a);

//2번
const itemsIndex = {
    야채곱창 : 5,
    바나나우유 : 10,
    삼각김밥 : 15,
    도시락 : 10,
    샌드위치 : 10,
}

function checkItem(item,num){
    if(!itemsIndex[item])
    return `${item} 품목없음` //arguments[0]
    if(itemsIndex[item] === num)
    return '전산표와 일치합니다.';
    return '전산표와 일치하지 않습니다.';
}
console.log(checkItem('도시락',10));

//3번
function checkNum(arr,num){
    let newArr = arr.map(e=>e+=10);
    return (newArr.includes(num))?
    newArr.filter(e => e!==num) :
    '결과값이 없습니다';
}
const arr = [1,2,3,4,5];
const b = checkNum(arr,11);
console.log(b);

//4번 
function oddEven(arr){
    let answer = [0,0];
    for(let i = 0 ; i < arr.length ; i++){
        (arr[i] % 2 === 0 ) ? answer[0] += 1 :
        answer[1] += 1;
    }
    return answer;
}
const arr1 = [1,2,3,4,5,6,7,8,9,10,11];
console.log(oddEven(arr1));

// const odd = [];
// const even = [];
// function solution(arr){
//     for(let i = 0 ; i< arr.length ; i++){
//         if(arr[i] % 2 === 0){
//             even.push(arr[i]);
//         }else{
//           odd.push(arr[i]);
//         }
//     }
//     return [even.length, odd.length]
// }
// console.log(solution([1,2,3,4,5,6,7]));

