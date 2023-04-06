//프라미스
// : 비동기식 처리 => 동기식 처리로 사용할 수 있게 해주는 것.
// 제작코드(가수) / 소비코드(팬) / 프라미스(앨범구독리스트) 총 3개로 구성되어있음.


let promise = new Promise( (resolve, reject)=>{
    //여기서 시간이 많이 걸리는 코드를 넣는다.
    //성공 시 resolve => then에 콜백함수의 매개변수로 전달된다.
    resolve("success!");

})
    .then( (result)=>{
        console.log("then", result);
    })
    .catch( (error)=>{
        console.log("catch", error);
    })
