$(document).ready(function () {
  const apiUrl = '';

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

    console.log('this =', $(this));
    console.log('this[0] =', $(this)[0]);
    $('#edit').addClass('showBtn');
    $('#clone').addClass('showBtn');
    $('#delete').addClass('showBtn');
  });
  //--

  //排程類型option動態塞入
  const scheduleTypeSelect = document.getElementById('scheduleType');

  let scheduleTypeOption = '';
  scheduleTypeOptions.forEach((element) => {
    scheduleTypeOption = scheduleTypeOption + '<option value=' + element.value + '>' + element.label + '</option>';
  });

  scheduleTypeSelect.innerHTML = scheduleTypeOption;
  //--

  $('#scheduleType').change(function() { 
    // e.preventDefault();
    
    // console.log('e =', e)
    // console.log('e.value =', e.value)
    console.log('this =', this)
    console.log('this.value =', this.value)
  });

  //定期排程-新增
  $('#reqularAdd').on('click', function () {
    $('#reqularRecord').find('#reqularTemplate').clone().appendTo($('#reqularRecord')).removeClass('d-none').removeAttr('id')
  })
  //--

  //定期排程-星期
  const reqularWeekSelect = document.getElementById('reqularWeek');

  let reqularWeekOption = '';

  //空白選項
  // if(reqularWeekOption == ""){
  //   reqularWeekOption = reqularWeekOption+'<option value='+-1+'></option>'
  // }

  reqularWeekOptions.forEach((element) => {
    reqularWeekOption = reqularWeekOption + '<option value=' + element.value + '>' + element.label + '</option>';
  });

  // reqularWeekSelect.selectedIndex = -1
  reqularWeekSelect.innerHTML = reqularWeekOption;
  //--

  //定期排程-小時
  const reqularHourSelect = document.getElementById('reqularHour');

  let reqularHourOption = '';

  if (reqularHourOption == '') {
    reqularHourOption = reqularHourOption + '<option value=' + -1 + '>0-23</option>';
  }

  for (let i = 0; i < 24; i++) {
    reqularHourOption = reqularHourOption+'<option value='+i+'>'+i+'</option>'
  }

  reqularHourSelect.innerHTML = reqularHourOption;
  //--

  //定期排程-分鐘
  const reqularMinuteSelect = document.getElementById('reqularMinute');

  let reqularMinuteOption = '';

  if (reqularMinuteOption == '') {
    reqularMinuteOption = reqularMinuteOption + '<option value=' + -1 + '>0-59</option>';
  }

  for (let i = 0; i < 60; i++) {
    reqularMinuteOption = reqularMinuteOption+'<option value='+i+'>'+i+'</option>'
  }

  reqularMinuteSelect.innerHTML = reqularMinuteOption;
  //--

  //定期排程-新增
  $('#cycleAdd').on('click', function () {
    $('#cycleRecord').find('#cycleTemplate').clone().appendTo($('#cycleRecord')).removeClass('d-none').removeAttr('id')
  })
  //--
});
