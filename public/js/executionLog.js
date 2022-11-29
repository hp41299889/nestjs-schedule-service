const apiUrl = '/ScheduleService/ExecutionLog';
let table;

$(document).ready(function () {
  // readAll(); //讀取全部資料

  table = $('#executionLog').DataTable({
    // "lengthChange": false,
    // searching: true,
    pageLength: 10,
    dom: 'Brft<"bottom"lp>',
    buttons: ['excel'],
    // data: executionLogData,
    columns: executionLogColumns,
  });

  $('.dt-buttons').addClass('d-none');

  //搜尋框自訂義
  $('#executionLog_filter').hide();

  $('#searchFilter').on('keyup', function () {
    $('#executionLog')
      .DataTable()
      .search($('#searchFilter').val(), false, true)
      .draw();
  });
  //--

  datePicker();
  datePickerPosition();
  datePickerBlur();
  dateRangeOptionChoice();
});

//當前時間
function currentTime() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  $('#date').val(`${year}/${month}/${day}`);
}

//日期選擇器
function datePicker() {
  $('#date').datepicker({
    format: 'yyyy/mm/dd',
  });
  currentTime();
}
//--

//日期選擇器動態位置
function datePickerPosition() {
  $('#date').focus(function () {
    const offset_Top = $('#date').offset().top;
    const outerHeight = $('#date').outerHeight();

    const sum = offset_Top + outerHeight + 7;

    $('.datepicker').offset({
      top: sum,
    });
  });
}
//--

//日期選擇器失焦行為
function datePickerBlur() {
  $('#date').blur(function () {
    const value = $('#date').val();
    if (value == '') {
      currentTime();
    }
  });
}
//--

//日期區間option動態塞入
function dateRangeOptionChoice() {
  const dateRangeSelect = document.getElementById('dateRange');

  let dateRangeOption = '';
  dateRangeOptions.forEach((element) => {
    dateRangeOption =
      dateRangeOption +
      '<option value=' +
      element.value +
      '>' +
      element.label +
      '</option>';
  });

  dateRangeSelect.innerHTML = dateRangeOption;
}
//--

//查詢
function query() {
  const dateVal = $('#date').val();
  const newDateVal = dateVal.replace(/\//g, '-');
  const dateRangeVal = $('#dateRange').val();

  dateRangeOptions.forEach((item) => {
    if (item.value == dateRangeVal) {
      $.ajax({
        url: `${apiUrl}/query/`,
        type: 'POST',
        data: { startDate: newDateVal, dateInterval: item.label },
        dataType: 'json',
        success: function (response) {
          console.log(response);
          // location.reload();

          //將資料新增到table上
          table.rows.add(response).draw();
        },
        error: function (xhr) {
          console.log('xhr =', xhr);
          alert('Error: ' + xhr.status + ' ' + xhr.statusText);
        },
      });
    }
  });

  // console.log('dateVal =', dateVal);
  // console.log('dateRangeVal =', dateRangeVal);
}
//--
