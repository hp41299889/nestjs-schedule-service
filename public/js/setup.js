const apiUrl = '/ScheduleService/Setup';

$(document).ready(function () {
  readAll();
  enableOptionChoice();
});

//讀取全部資料(API-010)
function readAll() {
  $.ajax({
    url: `${apiUrl}/read/`,
    type: 'GET',
    dataType: 'json',
    success: function (response) {
      console.log(response);
      // console.log("$('#enableScheduleService') =", $('#enableScheduleService'));
      // const a = response.enableScheduleService;
      // console.log('a =', a);
      // console.log(typeof response.enableScheduleService);
      // console.log('enableOptions.value =', enableOptions.value);
      // console.log(typeof enableOptions)

      // enableOptions.forEach(item=>{
      //   console.log(typeof item.value)
      // })

      $('#enableScheduleService').val(response.enableScheduleService);
      $('#rabbitMqIp').val(response.queue.IP);
      $('#rabbitMqPort').val(response.queue.port);
      $('#rabbitMqAccount').val(response.queue.account);
      $('#rabbitMqPassword').val(response.queue.password);
      $('#queueNameInput').val(response.queue.inputQueueName);
      $('#queueNameOutput').val(response.queue.outputQueueName);
      $('#account').val(response.admin.account);
      $('#password').val(response.admin.password);
      $('#postgreSqlIp').val(response.postgreSQL.IP);
      $('#postgreSqlPort').val(response.postgreSQL.port);
      $('#postgreSqlAccount').val(response.postgreSQL.account);
      $('#postgreSqlPassword').val(response.postgreSQL.password);
      $('#postgreSqlDbName').val(response.postgreSQL.DBName);
      $('#mongoIp').val(response.mongoDB.IP);
      $('#mongoPort').val(response.mongoDB.port);
      $('#mongoAccount').val(response.mongoDB.account);
      $('#mongoPassword').val(response.mongoDB.password);
      $('#mongoDbName').val(response.mongoDB.DBName);
    },
    error: function (xhr) {
      console.log('xhr =', xhr);
      alert('Error: ' + xhr.status + ' ' + xhr.statusText);
    },
  });
}
//--

//日期區間option動態塞入
function enableOptionChoice() {
  const enableSelect = document.getElementById('enableScheduleService');

  let enableOption = '';
  enableOptions.forEach((element) => {
    enableOption =
      enableOption +
      '<option value=' +
      element.value +
      '>' +
      element.label +
      '</option>';
  });

  enableSelect.innerHTML = enableOption;
}
//--

//SD-API-011
function postgreSqlTest() {
  const ip = $('#postgreSqlIp').val();
  const port = $('#postgreSqlPort').val();
  const account = $('#postgreSqlAccount').val();
  const password = $('#postgreSqlPassword').val();
  const dbName = $('#postgreSqlDbName').val();
  let dataObj = {
    IP: ip,
    port: port,
    account: account,
    password: password,
    DBName: dbName,
  };

  $.ajax({
    url: `${apiUrl}/postgreConnectTest/`,
    type: 'POST',
    data: dataObj,
    dataType: 'json',
    success: function (response) {
      console.log(response);
      $('#postgreSuccess').removeClass('d-none');
      $('#postgreFail').addClass('d-none');
    },
    error: function (xhr) {
      console.log('xhr =', xhr);
      // alert('Error: ' + xhr.status + ' ' + xhr.statusText);
      $('#postgreFail').removeClass('d-none');
      $('#postgreSuccess').addClass('d-none');
    },
  });
}

//SD-API-012
function mongoTest() {
  const ip = $('#mongoIp').val();
  const port = $('#mongoPort').val();
  const account = $('#mongoAccount').val();
  const password = $('#mongoPassword').val();
  const dbName = $('#mongoDbName').val();
  let dataObj = {
    IP: ip,
    port: port,
    account: account,
    password: password,
    DBName: dbName,
  };

  $.ajax({
    url: `${apiUrl}/mongoConnectTest/`,
    type: 'POST',
    data: dataObj,
    dataType: 'json',
    success: function (response) {
      console.log(response);
      $('#mongoSuccess').removeClass('d-none');
      $('#mongoFail').addClass('d-none');
    },
    error: function (xhr) {
      console.log('xhr =', xhr);
      // alert('Error: ' + xhr.status + ' ' + xhr.statusText);
      $('#mongoFail').removeClass('d-none');
      $('#mongoSuccess').addClass('d-none');
    },
  });
}

//儲存 SD-API-013
function save() {
  const enableScheduleService = $('#enableScheduleService').val();
  const rabbitMqIp = $('#rabbitMqIp').val();
  const rabbitMqPort = $('#rabbitMqPort').val();
  const rabbitMqAccount = $('#rabbitMqAccount').val();
  const rabbitMqPassword = $('#rabbitMqPassword').val();
  const queueNameInput = $('#queueNameInput').val();
  const queueNameOutput = $('#queueNameOutput').val();
  const account = $('#account').val();
  const password = $('#password').val();
  const postgreSqlIp = $('#postgreSqlIp').val();
  const postgreSqlPort = $('#postgreSqlPort').val();
  const postgreSqlAccount = $('#postgreSqlAccount').val();
  const postgreSqlPassword = $('#postgreSqlPassword').val();
  const postgreSqlDbName = $('#postgreSqlDbName').val();
  const mongoIp = $('#mongoIp').val();
  const mongoPort = $('#mongoPort').val();
  const mongoAccount = $('#mongoAccount').val();
  const mongoPassword = $('#mongoPassword').val();
  const mongoDbName = $('#mongoDbName').val();

  const saveData = {
    enableScheduleService: enableScheduleService,
    queue:{
      IP:rabbitMqIp,
      port:rabbitMqPort,
      account:rabbitMqAccount,
      password:rabbitMqPassword,
      inputQueueName:queueNameInput,
      outputQueueName:queueNameOutput
    },
    admin:{
      account:account,
      password:password
    },
    postgreSQL:{
      IP:postgreSqlIp,
      port:postgreSqlPort,
      account:postgreSqlAccount,
      password:postgreSqlPassword,
      DBName:postgreSqlDbName
    },
    mongoDB:{
      IP:mongoIp,
      port:mongoPort,
      account:mongoAccount,
      password:mongoPassword,
      DBName:mongoDbName
    }
  }

  $.ajax({
    url: `${apiUrl}/save/`,
    type: 'PATCH',
    data: saveData,
    dataType: 'json',
    success: function (response) {
      console.log(response);
      location.reload();
    },
    error: function (xhr) {
      console.log('xhr =', xhr);
      alert('Error: ' + xhr.status + ' ' + xhr.statusText);
    },
  });
}
