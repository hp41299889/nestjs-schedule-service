const authApiUrl = '/ScheduleService/Auth';

$(document).ready(function () {
  
  logout()
});

function logout() {
  $('#logoutBtn').click(function (e) {
    e.preventDefault();
    console.log('e =', e);

    fetch(`${authApiUrl}/logout`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: 'GET',
      redirect: "follow"
    })
    .then(res => res.redirected && (location.href = res.url))
    .catch(err=>{
      console.log('err =', err)
    })
    sessionStorage.clear();
  });

}
