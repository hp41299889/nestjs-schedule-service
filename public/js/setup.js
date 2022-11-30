const apiUrl = '/ScheduleService/Setup';
const authUrl = '/ScheduleService/Auth/view'

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
      // const jsonParse = JSON.parse(response)
      // console.log('jsonParse =', jsonParse);
      // console.log('$("#enableScheduleService") =', $('#enableScheduleService'));
      // console.log('jsonParse.enableScheduleService =', `${jsonParse.enableScheduleService}`);
      $('#enableScheduleService').val(`${response.enableScheduleService}`);
      $('#bossRabbitMqIp').val(response.bossQueue.IP);
      $('#bossRabbitMqPort').val(response.bossQueue.port);
      $('#bossRabbitMqAccount').val(response.bossQueue.account);
      $('#bossRabbitMqPassword').val(response.bossQueue.password);
      $('#bossQueueNameInput').val(response.bossQueue.inputQueueName);
      $('#bossQueueNameOutput').val(response.bossQueue.outputQueueName);
      $('#jobRabbitMqIp').val(response.jobQueue.IP);
      $('#jobRabbitMqPort').val(response.jobQueue.port);
      $('#jobRabbitMqAccount').val(response.jobQueue.account);
      $('#jobRabbitMqPassword').val(response.jobQueue.password);
      $('#jobQueueNameInput').val(response.jobQueue.inputQueueName);
      $('#jobQueueNameOutput').val(response.jobQueue.outputQueueName);
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
    bossQueue: {
      IP: bossRabbitMqIp,
      port: bossRabbitMqPort,
      account: bossRabbitMqAccount,
      password: bossRabbitMqPassword,
      inputQueueName: bossQueueNameInput,
      outputQueueName: bossQueueNameOutput
    },
    jobQueue: {
      IP: jobRabbitMqIp,
      port: jobRabbitMqPort,
      account: jobRabbitMqAccount,
      password: jobRabbitMqPassword,
      inputQueueName: jobQueueNameInput,
      outputQueueName: jobQueueNameOutput
    },
    admin: {
      account: account,
      password: password
    },
    postgreSQL: {
      IP: postgreSqlIp,
      port: postgreSqlPort,
      account: postgreSqlAccount,
      password: postgreSqlPassword,
      DBName: postgreSqlDbName
    },
    mongoDB: {
      IP: mongoIp,
      port: mongoPort,
      account: mongoAccount,
      password: mongoPassword,
      DBName: mongoDbName
    }
  }

  $.ajax({
    url: `${apiUrl}/save/`,
    type: 'PATCH',
    data: saveData,
    dataType: 'json',
    success: function (response) {
      console.log(response);

    },
    error: function (xhr) {
      console.log('xhr =', xhr);
      // alert('Error: ' + xhr.status + ' ' + xhr.statusText);
      if (xhr) {
        // location.reload();
        setInterval(() => {
          fetch(authUrl)
            .then(res => {
              location.href = res.url;
            })
        }, 500);
      }
    },
  });
}
