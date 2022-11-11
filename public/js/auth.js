const apiUrl = '/ScheduleService/Auth';

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

    $.ajax({
      url: `${apiUrl}/login/`,
      type: 'POST',
      data: { account: account, password: password },
      dataType: 'json',
      success: function (response) {
        console.log(response);
        // window.location.reload();
      },
      error: function (xhr) {
        console.log('xhr =', xhr);
        alert('Error: ' + xhr.status + ' ' + xhr.statusText);
      },
    });
  });
}
