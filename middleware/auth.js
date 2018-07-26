export default function (context) {
  //admin 페이지이동시, 로그인되지 않은경우, 로그인 페이지로 redirect
  if (!context.store.getters.isAuthenticated) {
    context.redirect('/admin/auth')
  }
}
