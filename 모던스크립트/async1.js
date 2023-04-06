async function sigma(limit=0){
    sum=0;
    for(i=1; i<=limit; i++){
        sum +=i;
        return sum; //async에 의해서 무조건 promise객체로 바뀐 뒤 전달한다.
    }
}
//async 표현방법.
async function showDispaly(){ //await 쓰려면 자기자신도 async 여야한다.

// sigma(100)
// .then( (result)=>{
//     console.log( result);
// })
//
let result = await sigma(1000); // await : 다른 프라미스들을 기다린다. 반환값은 프라미스 객체 X
console.log( result);
}

showDispaly();