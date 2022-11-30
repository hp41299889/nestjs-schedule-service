const apiUrl = '/ScheduleService/Setup';

$(document).ready(function () {
  enableOptionChoice();
  readAll();

});

//讀取全部資料(API-010)
function readAll() {
  $.ajax({
    url: `${apiUrl}/read/`,
    type: 'GET',
    dataType: 'json',
    success: function (response) {
      console.log('setup-read-res', response);
      // console.log("$('#enableScheduleService') =", $('#enableScheduleService'));
      // const a = response.enableScheduleService;
      // console.log('a =', a);
      // console.log(typeof response.enableScheduleService);
      // console.log('enableOptions.value =', enableOptions.value);
      // console.log(typeof enableOptions)

      // enableOptions.forEach(item=>{
      //   console.log(typeof item.value)
      // })
      const jsonParse = JSON.parse(response)
      console.log('jsonParse =', jsonParse);
      // console.log('$("#enableScheduleService") =', $('#enableScheduleService'));
      // console.log('jsonParse.enableScheduleService =', `${jsonParse.enableScheduleService}`);
      $('#enableScheduleService').val(`${jsonParse.enableScheduleService}`);
      $('#bossRabbitMqIp').val(jsonParse.bossQueue.IP);
      $('#bossRabbitMqPort').val(jsonParse.bossQueue.port);
      $('#bossRabbitMqAccount').val(jsonParse.bossQueue.account);
      $('#bossRabbitMqPassword').val(jsonParse.bossQueue.password);
      $('#bossQueueNameInput').val(jsonParse.bossQueue.inputQueueName);
      $('#bossQueueNameOutput').val(jsonParse.bossQueue.outputQueueName);
      $('#jobRabbitMqIp').val(jsonParse.jobQueue.IP);
      $('#jobRabbitMqPort').val(jsonParse.jobQueue.port);
      $('#jobRabbitMqAccount').val(jsonParse.jobQueue.account);
      $('#jobRabbitMqPassword').val(jsonParse.jobQueue.password);
      $('#jobQueueNameInput').val(jsonParse.jobQueue.inputQueueName);
      $('#jobQueueNameOutput').val(jsonParse.jobQueue.outputQueueName);
      $('#account').val(jsonParse.admin.account);
      $('#password').val(jsonParse.admin.password);
      $('#postgreSqlIp').val(jsonParse.postgreSQL.IP);
      $('#postgreSqlPort').val(jsonParse.postgreSQL.port);
      $('#postgreSqlAccount').val(jsonParse.postgreSQL.account);
      $('#postgreSqlPassword').val(jsonParse.postgreSQL.password);
      $('#postgreSqlDbName').val(jsonParse.postgreSQL.DBName);
      $('#mongoIp').val(jsonParse.mongoDB.IP);
      $('#mongoPort').val(jsonParse.mongoDB.port);
      $('#mongoAccount').val(jsonParse.mongoDB.account);
      $('#mongoPassword').val(jsonParse.mongoDB.password);
      $('#mongoDbName').val(jsonParse.mongoDB.DBName);
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
  const bossRabbitMqIp = $('#bossRabbitMqIp').val();
  const bossRabbitMqPort = $('#bossRabbitMqPort').val();
  const bossRabbitMqAccount = $('#bossRabbitMqAccount').val();
  const bossRabbitMqPassword = $('#bossRabbitMqPassword').val();
  const bossQueueNameInput = $('#bossQueueNameInput').val();
  const bossQueueNameOutput = $('#bossQueueNameOutput').val();
  const jobRabbitMqIp = $('#jobRabbitMqIp').val();
  const jobRabbitMqPort = $('#jobRabbitMqPort').val();
  const jobRabbitMqAccount = $('#jobRabbitMqAccount').val();
  const jobRabbitMqPassword = $('#jobRabbitMqPassword').val();
  const jobQueueNameInput = $('#jobQueueNameInput').val();
  const jobQueueNameOutput = $('#jobQueueNameOutput').val();
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
    bossQueue:{
      IP:bossRabbitMqIp,
      port:bossRabbitMqPort,
      account:bossRabbitMqAccount,
      password:bossRabbitMqPassword,
      inputQueueName:bossQueueNameInput,
      outputQueueName:bossQueueNameOutput
    },
    jobQueue:{
      IP:jobRabbitMqIp,
      port:jobRabbitMqPort,
      account:jobRabbitMqAccount,
      password:jobRabbitMqPassword,
      inputQueueName:jobQueueNameInput,
      outputQueueName:jobQueueNameOutput
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
