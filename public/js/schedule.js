$(document).ready(function () {
  const apiUrl = '/ScheduleServcie/Schedule';
  let datas = [];

  //讀取全部資料(未完成)
  // $.ajax({
  //   url: `${apiUrl}/readAll/`,
  //   type: "GET",
  //   dataType: "json",
  //   // data: data,
  //   success: function (response) {
  //     console.log(response);
  // res = response
  // $.each(response, function (indexInArray, valueOfElement) {
  // console.log("indexInArray =", indexInArray);
  // console.log("valueOfElement =", valueOfElement);
  // $.each(valueOfElement.fiducial, function (index, item) {
  //   let a = {};
  //   count = count++;
  //   a.weekday = valueOfElement.weekday;
  //   a.count = count++;
  // console.log("index =", index);
  // },
  //   error: function (xhr) {
  //     console.log("xhr =", xhr);
  //     alert("Error: " + xhr.status + " " + xhr.statusText);
  //   },
  // });console.log("row =", item);
  // a.hour = index;
  // a.bv = item;
  // console.log("a =", a);
  // datas.push(a);
  // console.log("datas =", datas);
  // });
  // });
  // 將資料新增到table上
  // table.rows.add(datas).draw();
  //
  //--

  // scheduleData.forEach(element=>{
  //   let dataArray = []
  //   console.log('element =', element)
  //   const scheduleID = element.scheduleID
  //   console.log('scheduleID =', scheduleID)
  //   dataArray.push(scheduleID)
  //   const scheduleName = element.scheduleName
  //   dataArray.push(scheduleName)
  //   const commandSource = element.commandSource
  //   dataArray.push(commandSource)
  //   const scheduleType = element.scheduleType
  //   dataArray.push(scheduleType)
  //   const reqular = element.reqular
  //   dataArray.push(reqular)
  //   const cycle = element.cycle
  //   dataArray.push(cycle)
  //   const createDatetime = element.createDatetime
  //   dataArray.push(createDatetime)
  //   const lastEditDatetime = element.lastEditDatetime
  //   dataArray.push(lastEditDatetime)
  //   const MQCLI = element.MQCLI
  //   dataArray.push(MQCLI)
  //   console.log('dataArray =', dataArray)
  // })
  // sessionStorage.setItem()

  const table = $('#schedule').DataTable({
    // "lengthChange": false,
    // searching: false,
    pageLength: 10,
    dom: 'rft<"bottom"lp>',
    data: scheduleData,
    columns: scheduleColumns,
  });

  //搜尋框自訂義
  $('#schedule_filter').hide();

  $('#searchFilter').on('keyup', function () {
    $('#schedule')
      .DataTable()
      .search($('#searchFilter').val(), false, true)
      .draw();
  });
  //--

  //點擊列觸發反藍和按鈕顯示
  $('#schedule tbody').on('click', 'tr', function () {
    if ($(this).hasClass('selected')) {
      $(this).removeClass('selected');
    } else {
      table.$('tr.selected').removeClass('selected');
      $(this).addClass('selected');
    }

    // let newData = []
    console.log('this =', this);
    console.log('$(this) =', $(this));
    console.log('$(this).children() =', $(this).children());
    const children = Array.from($(this).children());
    console.log('children =', children);
    children.forEach((element) => {
      console.log('element =', element.innerHTML);
      sessionStorage.setItem();
      // scheduleID;
      // scheduleName;
      // commandSource;
      // scheduleType;
      // reqular;
      // cycle;
      // createDatetime;
      // lastEditDatetime;
      // MQCLI;
    });
    $('#edit').addClass('showBtn');
    $('#clone').addClass('showBtn');
    $('#delete').addClass('showBtn');
  });
  //--

  //動態 modal title
  const scheduleModal = document.getElementById('scheduleModal');

  scheduleModal.addEventListener('show.bs.modal', (event) => {
    // Button that triggered the modal
    const button = event.relatedTarget;
    // Extract info from data-bs-* attributes
    const scheduleModalLabel = button.getAttribute('data-bs-title');
    // If necessary, you could initiate an AJAX request here
    // and then do the updating in a callback.
    //
    // Update the modal's content.
    const modalTitle = scheduleModal.querySelector('.modal-title');

    modalTitle.textContent = `${scheduleModalLabel}表單`;

    //打開的表單類別
    const scheduleModalWhatever = button.getAttribute('data-bs-whatever');
    if (scheduleModalWhatever == 'edit') {
      console.log('edit true');
      console.log('edit-$(this) =', $(this));
    } else if (scheduleModalWhatever == 'clone') {
      console.log('clone true');
    } else {
      //new or other
      console.log('new or other true');
    }
  });
  //--

  //排程類型option動態塞入
  const scheduleTypeSelect = document.getElementById('scheduleType');

  let scheduleTypeOption = '';
  scheduleTypeOptions.forEach((element) => {
    scheduleTypeOption =
      scheduleTypeOption +
      '<option value=' +
      element.value +
      '>' +
      element.label +
      '</option>';
  });

  scheduleTypeSelect.innerHTML = scheduleTypeOption;
  //--

  //依照排程類型選項顯示不同內容
  $('#scheduleType').change(function () {
    console.log('this =', this);
    console.log('this.value =', this.value);
    if (this.value == 'cycle') {
      $('#reqular').addClass('d-none');
      $('#cycle').removeClass('d-none');
    } else {
      $('#cycle').addClass('d-none');
      $('#reqular').removeClass('d-none');
    }
  });
  //--

  //定期排程-新增
  $('#reqularAdd').on('click', function () {
    $('#reqularRecord')
      .find('#reqularTemplate')
      .clone()
      .appendTo($('#reqularRecord'))
      .removeClass('d-none')
      .removeAttr('id');
  });
  //--

  //定期排程-刪除
  //132行

  //定期排程-星期
  const reqularWeekSelect = document.getElementById('reqularWeek');

  let reqularWeekOption = '';

  //空白選項
  // if(reqularWeekOption == ""){
  //   reqularWeekOption = reqularWeekOption+'<option value='+-1+'></option>'
  // }

  reqularWeekOptions.forEach((element) => {
    reqularWeekOption =
      reqularWeekOption +
      '<option value=' +
      element.value +
      '>' +
      element.label +
      '</option>';
  });

  // reqularWeekSelect.selectedIndex = -1
  reqularWeekSelect.innerHTML = reqularWeekOption;
  //--

  //定期排程-小時
  const reqularHourSelect = document.getElementById('reqularHour');

  let reqularHourOption = '';

  if (reqularHourOption == '') {
    reqularHourOption =
      reqularHourOption + '<option value=' + -1 + '>0-23</option>';
  }

  for (let i = 0; i < 24; i++) {
    reqularHourOption =
      reqularHourOption + '<option value=' + i + '>' + i + '</option>';
  }

  reqularHourSelect.innerHTML = reqularHourOption;
  //--

  //定期排程-分鐘
  const reqularMinuteSelect = document.getElementById('reqularMinute');

  let reqularMinuteOption = '';

  if (reqularMinuteOption == '') {
    reqularMinuteOption =
      reqularMinuteOption + '<option value=' + -1 + '>0-59</option>';
  }

  for (let i = 0; i < 60; i++) {
    reqularMinuteOption =
      reqularMinuteOption + '<option value=' + i + '>' + i + '</option>';
  }

  reqularMinuteSelect.innerHTML = reqularMinuteOption;
  //--

  //週期排程-新增
  $('#cycleAdd').on('click', function () {
    $('#cycleRecord')
      .find('#cycleTemplate')
      .clone()
      .appendTo($('#cycleRecord'))
      .removeClass('d-none')
      .removeAttr('id');
  });
  //--
});

//定期/週期排程-刪除
function deleteItem(e) {
  $(e).parent().parent().remove();
}
