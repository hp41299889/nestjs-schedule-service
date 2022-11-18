const authApiUrl = '/ScheduleService/Auth';

$(document).ready(function () {
  showModal();
  login();
});

function showModal() {
  new bootstrap.Modal($('#loginModal')).show();
}

function login() {
  $('#loginBtn').click(function (e) {
    e.preventDefault();
    console.log('e =', e);
    const account = $('#account').val();
    const password = $('#password').val();
    console.log('account =', account);
    console.log('password =', password);

    // $.ajax({
    //   url: `${apiUrl}/login/`,
    //   type: 'POST',
    //   data: { account: account, password: password },
    //   dataType: 'json',
    //   success: function (response) {
    //     console.log(response);
    //     location.href(response);
    //   },
    //   error: function (xhr) {
    //     console.log('xhr =', xhr);
    //     alert('Error: ' + xhr.status + ' ' + xhr.statusText);
    //   },
    // });
    fetch(`${authApiUrl}/login`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: 'POST',
      body: JSON.stringify({
        account: account,
        password: password
      }),
      redirect: "follow"
    }).then(res => {
      console.log('res =', res)
      res.redirected && (location.href = res.url)
      sessionStorage.setItem('account', account);
    }).catch(err=>{
      console.log('err =', err)
    })
  });
}

