const apiUrl = '/ScheduleService/Monitor';
let monitorDatas = [];
let data = {}; //重送用
let calendar;

document.addEventListener('DOMContentLoaded', async function () {
  await readAll();
  console.log('ready-monitorDatas =', monitorDatas);
  const calendarEl = document.getElementById('calendar');
  // console.log("calendarEl =", calendarEl)

  calendar = new FullCalendar.Calendar(calendarEl, {
    timeZone: 'UTC',
    headerToolbar: false,
    initialView: 'timeGridWeek',
    allDaySlot: false,
    slotLabelFormat: {
      hour: '2-digit',
      hour12: false,
    },
    dayHeaderFormat: {
      weekday: 'short',
    },
    scrollTime: 0,
    slotDuration: '00:60:00',
    expandRows: true,
    locale: 'zh-tw',
    aspectRatio: 2,
    contentHeight: 3000,
    dayMaxEvents: true, // when too many events in a day, show the popover
    events: monitorDatas,
    eventDidMount: function (arg) {
      // console.log('eventContent-arg =', arg);
      // console.log('eventContent-arg.event.extendedProps =', arg.event._def);
      // console.log(
      //   '$(".fc-timegrid-event-harness") =',
      //   $('.fc-timegrid-event-harness'),
      // );
      // debugger;
      arg.el.id = arg.event._def.publicId;
      // console.log('arg =', arg);
    },
    windowResize: function (arg) {
      $('td.fc-timegrid-col > div.fc-timegrid-col-frame')
        .each(function () {
          console.log('windowResize-$(this) =', $(this));
          setTimeout(( () => {
            console.log('setTimeout');
            $(this)
            .children()
            .eq(1)
            .remove();

          } ), 100)
        })
    },
  });

  calendar.render();

  itemDisplay();
  itemBtn();
  scheduleTypeOptionChoice();
  regularWeek();
  regularHour();
  regularMinute();
  cycleHour();
  cycleMinute();
  monitor();
  control();
});

//讀取全部資料(API-006)
async function readAll() {
  const url = `${apiUrl}/read/`;
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });
  const res = await response.json();
  // ajax 結果新增到 event
  res.map((element) => {
    console.log(element);
    element.weekLog.forEach((item) => {
      const itemColor =
        item.processStatus == 'ok'
          ? '#D4EDDA'
          : item.processStatus == 'fail'
          ? '#F8D7DA'
          : '#E7E8EA';
      const time = moment(item.processDatetime).format('YYYY-MM-DD HH');
      // console.log('item =', item);
      const timeStr = `${time}:00:00`;
      const mqcli = JSON.stringify(item.MQCLI);
      monitorDatas.push({
        id: item._id,
        title: `${item.scheduleID}.${item.scheduleName}`,
        start: timeStr,
        backgroundColor: itemColor,
        MQCLI: mqcli,
        processDatetime: moment(item.processDatetime).format(
          'YYYY-MM-DD HH:mm:ss',
        ),
        schedule: item.schedule,
        scheduleID: item.scheduleID,
        scheduleName: item.scheduleName,
        scheduleType: item.scheduleType,
      });
    });
  });
  // $.ajax({
  //   url: `${apiUrl}/read/`,
  //   type: 'GET',
  //   dataType: 'json',
  //   success: function (response) {
  //     console.log(response);
  //     response.forEach((element) => {
  //       console.log('element =', element);
  //       element.weekLog.forEach((item) => {
  //         const itemColor =
  //           item.processStatus == 'ok'
  //             ? '#D4EDDA'
  //             : item.processStatus == 'fail'
  //             ? '#F8D7DA'
  //             : '#E7E8EA';
  //         const monitorData = {
  //           id: item._id,
  //           title: `${item.scheduleID}.${item.scheduleName}`,
  //           // start: item.processDatetime,
  //           start: '2022-11-24 10:00:00',
  //           backgroundColor: itemColor,
  //         };
  //         monitorDatas.push(monitorData);
  //       });
  //     });
  //     console.log('monitorDatas =', monitorDatas);
  //   },
  //   error: function (xhr) {
  //     console.log('xhr =', xhr);
  //     alert('Error: ' + xhr.status + ' ' + xhr.statusText);
  //   },
  // });
}

//任務改橫向顯示 & 單元格增加srollbar
function itemDisplay() {
  // define static values
  const defaultItemHeight = 45;
  const defaultEventItemHeight = 40;
  // ...

  // find all rows and define a function to select one row with an specific time
  let rows = [];

  $('div.fc-timegrid-slots > table > tbody > tr').each(function () {
    rows.push($(this));
  });

  let rowIndex = 0;
  const getRowElement = function (time) {
    // console.log('rowIndex =', rowIndex)
    // console.log("rows[rowIndex].find('td.fc-timegrid-slot-lane').attr('data-time') =", rows[rowIndex].find('td.fc-timegrid-slot-lane').attr('data-time'))
    while (
      rowIndex < rows.length &&
      moment(
        rows[rowIndex].find('td.fc-timegrid-slot-lane').attr('data-time'),
        ['HH:mm:ss'],
      ) <= time
    ) {
      rowIndex++;
      // console.log('inWhile-rowIndex =', rowIndex)
    }
    // console.log('afterWhile-rowIndex =', rowIndex);
    const selectedIndex = rowIndex - 1;
    // console.log('selectedIndex =', selectedIndex)
    return selectedIndex >= 0 ? rows[selectedIndex] : null;
  };

  // reorder events items position and increment row height when is necessary
  $(
    'td.fc-timegrid-col > div.fc-timegrid-col-frame > div.fc-timegrid-col-events',
  ).each(function () {
    console.log('getTasks');

    rowIndex = 0;
    // for-each week column
    let accumulator = 0;
    let previousRowElement = null;
    let newHtmlStr = '';

    // console.log(
    //   "$('.fc-timegrid-col-events').length",
    //   $('.fc-timegrid-col-events').length,
    // );
    // console.log('$(this)', $(this));
    // console.log('$(this).children().length', $(this).children().length);
    // if ($(this).children().length > 0) {
    //   console.log('$(this).children().length > 0');
    $(this)
      .find('> div.fc-timegrid-event-harness.fc-timegrid-event-harness-inset')
      .each(function () {
        const cssInset = $(this).css('inset');
        const splitStr = cssInset.split(' ');
        let recombineStr = '';
        splitStr.forEach((element, index) => {
          if (index == 1) {
            recombineStr += '0 ';
          } else if (index == 3) {
            recombineStr += '0';
          } else {
            recombineStr += `${element} `;
          }
        });
        $(this).css('inset', recombineStr);
        console.log('each-1');
      })
      .find('> a.fc-timegrid-event.fc-v-event.fc-event')
      .each(function () {
        // for-each event on week column
        // select the current event time and its row
        console.log('each-2')
        // console.log("$(this).find('> div.fc-event-main > div') =", $(this).find('> div.fc-event-main > div'))
        const time = $(this)
          .find(
            '> div.fc-event-main > div.fc-event-main-frame > div.fc-event-time',
          )
          .text();
        let timeChange = '';
        if (time.indexOf('下午') != -1) {
          timeChange = time.replace('下午', '') + ' pm';
        } else if (time.indexOf('上午') != -1) {
          timeChange = time.replace('上午', '') + ' am';
        } else {
          console.log('else-timeChange');
        }
        const currentEventTime = moment(timeChange, 'HH:mm A');
        // console.log('currentEventTime =', currentEventTime);
        //拿掉task的時間
        $(this)
          .find(
            '> div.fc-event-main > div.fc-event-main-frame > div.fc-event-time',
          )
          .addClass('d-none');

        const currentEventRowElement = getRowElement(currentEventTime);
        // console.log('currentEventRowElement =', currentEventRowElement);
        // console.log('previousRowElement =', previousRowElement)
        // the current row has to more than one item
        if (currentEventRowElement === previousRowElement) {
          console.log('in-currentEventRowElement');
          accumulator++;

          // move down the event (with margin-top prop. IT HAS TO BE THAT PROPERTY TO AVOID CONFLICTS WITH FullCalendar BEHAVIOR)
          // console.log('$(this) =', $(this))
          // $(this).css(
          //   'margin-top',
          //   '+=' + (accumulator * defaultItemHeight).toString() + 'px',
          // );
          // console.log('after-$(this) =', $(this))
          console.log('currentEventRowElement =', currentEventRowElement);
          // increse the heigth of current row if it overcome its current max-items
          const maxItemsOnRow =
            currentEventRowElement.attr('data-max-items') || 1;
          if (accumulator >= maxItemsOnRow) {
            currentEventRowElement.attr('data-max-items', accumulator + 1);
            // currentEventRowElement.css(
            //   'height',
            //   '+=' + defaultItemHeight.toString() + 'px',
            // );
          }
        } else {
          console.log('false-currentEventRowElement');
          // reset count
          rowIndex = 0;
          accumulator = 0;
          // $(this).parent().wrapAll(document.createElement('div'));
        }

        // set default styles for event item and update previosRow
        $(this).css('left', '0');
        $(this).css('right', '0');
        $(this).css('height', defaultEventItemHeight.toString() + 'px');
        $(this).css('margin-right', '0');
        previousRowElement = currentEventRowElement;
        rowIndex = 0;
        // console.log('$(this) =', $(this));
        // console.log('$(this).parent() =', $($(this).parent().parent()))
        // $($(this).parent().parent()).each(function () {
        //   let itemCount = 0;
        //   let defaultInset = '';
        //   newHtmlStr = '<div class="fc-timegrid-col-events">';
        //   console.log('each-3')
        //   console.log('.parent()-$(this) =', $(this));
        //   $(this)
        //     .children()
        //     .each(function () {
        //       console.log('each-3-this =', $(this));
        //       const zIndex = $(this).css('z-index');
        //       console.log('zIndex =', zIndex);
        //       console.log('itemCount =', itemCount);
        //       if (zIndex > itemCount) {
        //         defaultInset = $(this).css('inset');
        //         console.log('zIndex > itemCount =', defaultInset);
        //         $(this).css('inset', '2px 0 0 0');
        //         // console.log(
        //         //   'zIndex > itemCount-$(this).prop("outerHTML") =',
        //         //   $(this).prop('outerHTML'),
        //         // );
        //         if (itemCount == 0) {
        //           newHtmlStr += `<div class="selfCell" style="inset:${defaultInset}">${$(
        //             this,
        //           ).prop('outerHTML')}`;
        //         } else {
        //           newHtmlStr += $(this).prop('outerHTML');
        //         }
        //         itemCount = zIndex;
        //       } else if (zIndex <= itemCount) {
        //         console.log('zIndex <= itemCount');
        //         defaultInset = $(this).css('inset');
        //         $(this).css('inset', '2px 0 0 0');
        //         newHtmlStr += `</div><div class="selfCell" style="inset:${defaultInset}">${$(
        //           this,
        //         ).prop('outerHTML')}`;
        //         itemCount = zIndex;
        //       } else {
        //         console.log('else');
        //         alert('else-302');
        //       }
        //     });
        //   // newHtmlStr += '</div>';
        //   newHtmlStr += '</div></div>';
        //   // console.log('newHtmlStr =', newHtmlStr);
        // })
        // .prop('outerHTML', newHtmlStr);
      })
      .parent()
      .parent()
      .each(function () {
        let itemCount = 0;
        let defaultInset = '';
        newHtmlStr = '<div class="fc-timegrid-col-events">';
        console.log('each-3')
        console.log('.parent()-$(this) =', $(this));
        $(this)
          .children()
          .each(function () {
            const zIndex = $(this).css('z-index');
            // console.log('zIndex =', zIndex);
            // console.log('itemCount =', itemCount);
            if (zIndex > itemCount) {
              defaultInset = $(this).css('inset');
              // console.log('zIndex > itemCount =', defaultInset);
              $(this).css('inset', `${2+((zIndex-1)*defaultItemHeight)}px 0 0 0`);
              // console.log(
              //   'zIndex > itemCount-$(this).prop("outerHTML") =',
              //   $(this).prop('outerHTML'),
              // );
              if (itemCount == 0) {
                newHtmlStr += `<div class="selfCell" style="inset:${defaultInset}">${$(
                  this,
                ).prop('outerHTML')}`;
              } else {
                newHtmlStr += $(this).prop('outerHTML');
              }
              itemCount = zIndex;
            } else if (zIndex <= itemCount) {
              console.log('zIndex <= itemCount');
              defaultInset = $(this).css('inset');
              $(this).css('inset', `${2+((zIndex-1)*defaultItemHeight)}px 0 0 0`);
              newHtmlStr += `</div><div class="selfCell" style="inset:${defaultInset}">${$(
                this,
              ).prop('outerHTML')}`;
              itemCount = zIndex;
            } else {
              console.log('else');
              alert('else-302');
            }
          });
        // newHtmlStr += '</div>';
        newHtmlStr += '</div></div>';
        // console.log('newHtmlStr =', newHtmlStr);
      })
      .prop('outerHTML', newHtmlStr);
    // }
    // console.log('before-newHtmlStr =', newHtmlStr);
    // newHtmlStr = '';
    // console.log('after-newHtmlStr =', newHtmlStr);
    console.log('end');
  });

  // $('td.fc-timegrid-col > div.fc-timegrid-col-frame').children().eq(2).remove()
}

//依狀態添加按鈕
function itemBtn() {
  $('div.selfCell > .fc-timegrid-event-harness > a.fc-timegrid-event').each(
    function () {
      // console.log($(this))
      const backgroundColor = $(this).css('background-color');
      // console.log('backgroundColor =', backgroundColor)

      if (backgroundColor == 'rgb(248, 215, 218)') {
        console.log('backgroundColor-if');
        $(this)
          .find('> .fc-event-main > .fc-event-main-frame')
          .each(function () {
            // console.log('fc-event-main-this =', $(this))
            $(this).after(
              '<div class="twoBtnSpace"><button type="button" class="btn btn-outline-dark monitorBtn" id="reloadBtn" data-bs-toggle="modal" data-bs-target="#controlModal"><i class="bi bi-arrow-clockwise monitorIcon"></i></button><button type="button" class="btn btn-outline-dark monitorBtn" id="listBtn" data-bs-toggle="modal" data-bs-target="#listModal"><i class="bi bi-list-ul monitorIcon"></i></button></div>',
            );
          });
      } else {
        console.log('backgroundColor-else');
        $(this)
          .find('> .fc-event-main > .fc-event-main-frame')
          .each(function () {
            // console.log('fc-event-main-this =', $(this))
            $(this).after(
              `<div class="oneBtnSpace"><button type="button" class="btn btn-outline-dark monitorBtn" id="listBtn" data-bs-toggle="modal" data-bs-target="#listModal"><i class="bi bi-list-ul monitorIcon"></i></button></div>`,
            );
          });
      }
    },
  );
}

//紀錄卡
function monitor() {
  $('#listBtn > i.monitorIcon').click(function (e) {
    e.preventDefault();
    const calendarEvents = calendar.getEvents();
    // console.log('calendarEvents =', calendarEvents);
    const calendarEventId = $(this)
      .parent()
      .parent()
      .parent()
      .parent()
      .attr('id');
    console.log('calendarEventId =', calendarEventId);
    calendarEvents.forEach((calendarEvent) => {
      const def = calendarEvent._def;
      const extendedProps = def.extendedProps;
      if (def.publicId == calendarEventId) {
        $('#scheduleId').val(extendedProps.scheduleID);
        $('#scheduleName').val(extendedProps.scheduleName);
        const scheduleType = extendedProps.scheduleType;
        $('#scheduleType').val(scheduleType);
        $('#processDatetime').val(extendedProps.processDatetime);
        // console.log('extendedProps =', extendedProps);

        if (scheduleType == 'regular') {
          $('#cycle').addClass('d-none');
          $('#regular').removeClass('d-none');
          const regularStr = extendedProps.schedule;
          // console.log('regularStr =', regularStr);
          const splitFinish = splitStr(regularStr);
          // console.log('splitFinish =', splitFinish);
          splitFinish.forEach((element) => {
            // console.log('element =', element);
            element.forEach((item, i) => {
              $('#regularRecord').children().eq(i).children().eq(1).val(item);
            });
          });
        } else if (scheduleType == 'cycle') {
          $('#regular').addClass('d-none');
          $('#cycle').removeClass('d-none');
          const cycleStr = extendedProps.schedule;
          // console.log('cycleStr =', cycleStr);
          const splitFinish = splitStr(cycleStr);
          // console.log('splitFinish =', splitFinish);
          splitFinish.forEach((element) => {
            element.forEach((item, i) => {
              $('#cycleRecord').children().eq(i).children().eq(1).val(item);
            });
          });
        }
        $('#MQCLI').val(extendedProps.MQCLI);
      }
    });
  });
}

//字串拆分
function splitStr(str) {
  let splitArr = [];
  const splitBr = str.split('<br>');
  // console.log('splitBr =', splitBr);
  splitBr.forEach((element, index) => {
    // console.log('element =', element);
    const splitHashtag = element.split('#');
    // console.log('splitHashtag =', splitHashtag);
    const splitSlash = splitHashtag[1].split('/');
    // console.log('splitSlash =', splitSlash);
    splitArr.push(splitSlash);
    // console.log('splitArr =', splitArr);
  });
  return splitArr;
}

//控制卡
function control() {
  $('#reloadBtn > i.monitorIcon').click(function (e) {
    e.preventDefault();
    const calendarEvents = calendar.getEvents();
    // console.log('calendarEvents =', calendarEvents);
    const calendarEventId = $(this)
      .parent()
      .parent()
      .parent()
      .parent()
      .attr('id');
    console.log('calendarEventId =', calendarEventId);
    calendarEvents.forEach((calendarEvent) => {
      const def = calendarEvent._def;
      const extendedProps = def.extendedProps;
      if (def.publicId == calendarEventId) {
        $('#controlScheduleId').val(extendedProps.scheduleID);
        $('#controlScheduleName').val(extendedProps.scheduleName);
        const scheduleType = extendedProps.scheduleType;
        $('#controlScheduleType').val(scheduleType);
        $('#controlMQCLI').val(extendedProps.MQCLI);
        data = {
          scheduleID: extendedProps.scheduleID,
          scheduleName: extendedProps.scheduleName,
          scheduleType: scheduleType,
          schedule: extendedProps.schedule,
          MQCLI: extendedProps.MQCLI,
        };
      }
    });
  });
}

//排程類型option動態塞入
function scheduleTypeOptionChoice() {
  const scheduleTypeSelect = document.getElementById('scheduleType');
  const controlScheduleTypeSelect = document.getElementById(
    'controlScheduleType',
  );

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
  controlScheduleTypeSelect.innerHTML = scheduleTypeOption;
}

//定期排程-星期
function regularWeek() {
  const regularWeekSelect = document.getElementById('regularWeek');

  let regularWeekOption = '';

  //空白選項
  // if(regularWeekOption == ""){
  //   regularWeekOption = regularWeekOption+'<option value='+-1+'></option>'
  // }

  regularWeekOptions.forEach((element) => {
    regularWeekOption =
      regularWeekOption +
      '<option value=' +
      element.value +
      '>' +
      element.label +
      '</option>';
  });

  regularWeekSelect.innerHTML = regularWeekOption;
}

//定期排程-小時
function regularHour() {
  const regularHourSelect = document.getElementById('regularHour');

  let regularHourOption = '';

  if (regularHourOption == '') {
    regularHourOption = regularHourOption + '<option value="">0-23</option>';
  }

  for (let i = 0; i < 24; i++) {
    regularHourOption =
      regularHourOption + '<option value=' + i + '>' + i + '</option>';
  }

  regularHourSelect.innerHTML = regularHourOption;
}

//定期排程-分鐘
function regularMinute() {
  const regularMinuteSelect = document.getElementById('regularMinute');

  let regularMinuteOption = '';

  if (regularMinuteOption == '') {
    regularMinuteOption =
      regularMinuteOption + '<option value="">0-59</option>';
  }

  for (let i = 0; i < 60; i++) {
    regularMinuteOption =
      regularMinuteOption + '<option value=' + i + '>' + i + '</option>';
  }

  regularMinuteSelect.innerHTML = regularMinuteOption;
}

//週期排程-小時
function cycleHour() {
  const cycleHourSelect = document.getElementById('cycleHour');

  let cycleHourOption = '';

  if (cycleHourOption == '') {
    cycleHourOption = cycleHourOption + '<option value="">0-23</option>';
  }

  for (let i = 0; i < 24; i++) {
    cycleHourOption =
      cycleHourOption + '<option value=' + i + '>' + i + '</option>';
  }

  cycleHourSelect.innerHTML = cycleHourOption;
}

//週期排程-分鐘
function cycleMinute() {
  const cycleMinuteSelect = document.getElementById('cycleMinute');

  let cycleMinuteOption = '';

  if (cycleMinuteOption == '') {
    cycleMinuteOption = cycleMinuteOption + '<option value="">0-59</option>';
  }

  for (let i = 0; i < 60; i++) {
    cycleMinuteOption =
      cycleMinuteOption + '<option value=' + i + '>' + i + '</option>';
  }

  cycleMinuteSelect.innerHTML = cycleMinuteOption;
}

//重送命令(SD-API-007)
function resend() {
  console.log('data =', data);

  fetch(`${apiUrl}/resend`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    redirect: 'follow',
  }).then((res) => {
    res.redirected && (location.href = res.url);
    data = {};
  });
}
