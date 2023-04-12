//5번
//다음과 같은 기능을 하는 오브젝트(자동차)를 반환하는 함수를 만드세요
//(상세 문제 생략)

//풀이과정1
//this, 생성자 함수로 푸는 방법
function Car(purpose){

    this.engine = false;
    this.location = 0; 

    //시동 켜는 메소드 : engine이 false일때만 실행
    this.start = function(){
      if(!this.engine){ //engine이 false일때
        this.engine = true ;  //시동이 걸리고
        console.log('시동걸림');
      } else{
        this.error(); //아니면 error가 뜸 
      }
    };
  
    //시동 끄는 메소드 : engine이 true일때만 실행
    this.end = function(){  //engine이 true일때 
      if(this.engine){
        this.engine = false; //시동이 꺼지고 
        console.log('시동이 꺼졌습니다'); 

      } else{
        this.error(); //아니면 error
      }
    };
    
    this.error = function(){
        console.log('에러가 났습니다.');
        return this.engine = false; //엔진이 에러가 남
    }
    //에러 메서드
  
    //주행 메소드
    this.drive = function(){
     //10이 되면 엔진이 꺼진다. 
      if (this.location === 10){
        return this.stop();
      }
      if(this.engine === true && this.location < purpose && this.location < 10)
      { 
        this.location++;  
        let answer = `현재 위치는 ${this.location}km입니다`;   
        console.log(answer);        
        return answer;
      }
      if(this.location === purpose && this.engine === true){
        this.engine = false;
        let answer = `목적지에 도착했습니다.`
        console.log(answer);
        return answer;
      }
      
    };
  
    //안전거리 이상시 강제 종료 메소드
    this.stop = function(){
      if(this.engine === true){
      this.engine = false;
      console.log('안전 위험 때문에 주행이 강제종료 됩니다') //return 삭제함
    }
      else{
      }
    };
  }

const car1 = new Car(6); //()에 목적지를 넣어 인스턴스 생성
car1.start();  //시동거는 메소드
car1.drive(); //달리는 메소드
car1.drive();
car1.drive();


//풀이과정2 
//if,for문으로 푸는 방법
function car(state, purpose) {
    let drive = 0;
    let engine = state === 'on' ? true : false;
    if (engine) {
      console.log('시동걸림');
      for (let i = 0; i < purpose; i++) {
        drive += 1;
        console.log(`${drive}km`);
        if (drive >= 40) {
          console.log('주행이 강제종료됩니다.');
          engine = false;
          break;
        } else if (drive === purpose) {
          console.log('주행이 완료되었습니다.');
          break;
        }
      }
    }
  
    if (engine === false) {
      console.log('시동꺼짐');
    }
  
    return engine;
  }
  
  console.log(car('on', 39));