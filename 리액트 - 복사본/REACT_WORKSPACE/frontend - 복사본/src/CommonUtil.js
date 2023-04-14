// 백엔드 <-> 프론트엔드를 개발하는 컴퓨터가 달라서 ip주소가 다를 수 있음
// 그럴 때, js파일마다 특정 ip주소를 기재해버리면,
// ip주소 변경될 때마다 일일이 바꾸어주는 불편함을 없애기 위해,
// CommimUtil.js 파일에 공통으로 사용하는 ip주소를 넣고,
// 이를 각각 라우터 파일에 import & useEffect(url 지정)하면 쉬움!
const SERVERIP = "http://127.0.0.1:9090";

exports.SERVERIP = SERVERIP;