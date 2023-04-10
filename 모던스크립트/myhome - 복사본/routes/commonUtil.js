// 공통으로 쓰는 유틸을 만들어서 여기저기 사용할 수 있게 하겠다.
function getPaging(pg, totalCnt, pageGroupSize=10){
/*
 1   2    3    4   5   6   7   8   9   10     1~10    1그룹
11   12   13  14  15  16  17  18   19   20     11~20  2그룹 ...

*/ 
// 전체 페이지 개수 확인! 어느 그룹에 속하는지 확인!
// : 그래야 넘어가는 total 페이지 몇갤 만들지 알 수 있음
// 한 페이지당 행은 10개가 최대. (ex. 11개면 페이지 2개 필요. 무조건 올림으로 생각.)

 // 필요한 전체 페이지 개수 구하기.
pnTotal = Math.ceil( totalCnt/10 ) ;

//그룹 만들기 공식
// (1-1)/10*10 = 0 -> 0그룹
// (2-1)/10*10 = 0 ...
// (10-1)/10*10 = 0
// (11-1)/10*10 = 10 ... -> 1그룹
// (21-1)/10*10 = 20 ... -> 2그룹
pgGroupStart = parseInt((pg - 1) / pageGroupSize) * pageGroupSize+1;
pgGroupEnd = pgGroupStart+10;
//출력
if(pgGroupEnd > pnTotal)
    pgGroupEnd = pnTotal+1;
    console.log( pg, pgGroupStart, pgGroupEnd );

//함수는 반환값이 하나이어야 함. 그래서 json 객체로 만들어서 묶어보낸다.
return {pnTotal:pnTotal, pnStart:pgGroupStart, pnEnd:pgGroupEnd, pg:pg}
}
// 출력 예시
// for(i=1; i<=32; i++)
//     getPaging(i, 320);

exports.getPaging = getPaging; //이거 해야 db에서 사용가능함.