export default function (context) {
  /*
  페이지가 최초 렌더링 될 시, nuxt는 서버 렌더링이기때문에, 서버에서 아래스크립트가 실행되고,
  이후 페이지 이동시에는, 단일페이지앱이기 때문에, 클라이언트단에서 아래스크립트가 실행됨
  */
  console.log('middleware the log middleware is running')
}
