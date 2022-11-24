const apiUrl = '/ScheduleService/Monitor';

$(document).ready(function () {
  readAll()
  // console.log("$('#calendar')[0] =", $('#calendar')[0])
  const calendarEl = document.getElementById('calendar');
  // console.log("calendarEl =", calendarEl)

  const calendar = new FullCalendar.Calendar(calendarEl, {
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
    events: monitorData,
  });

  calendar.render();

  ItemDisplay()
});

//讀取全部資料(API-006)
function readAll() {
  $.ajax({
    url: `${apiUrl}/read/`,
    type: 'GET',
    dataType: 'json',
    success: function (response) {
      console.log(response);

    },
    error: function (xhr) {
      console.log('xhr =', xhr);
      alert('Error: ' + xhr.status + ' ' + xhr.statusText);
    },
  });
}

//任務改橫向顯示 & 單元格增加srollbar
function ItemDisplay(){
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
    // console.log('afterWhile-rowIndex =', rowIndex)
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
    let newHtmlStr = '<div class="fc-timegrid-col-events">';
    
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
      .find(
        '> a.fc-timegrid-event.fc-v-event.fc-event.fc-event-start.fc-event-end',
      )
      .each(function () {
        // for-each event on week column
        // select the current event time and its row
        // console.log('$(this) =', $(this))
        // console.log("$(this).find('> div.fc-event-main > div.fc-event-main-frame > div.fc-event-time') =", $(this).find('> div.fc-event-main > div.fc-event-main-frame > div.fc-event-time'))
        const currentEventTime = moment(
          $(this)
            .find(
              '> div.fc-event-main > div.fc-event-main-frame > div.fc-event-time',
            )
            .text(),
          ['HH:mm'],
        );
        // console.log('currentEventTime =', currentEventTime)
        //拿掉task的時間
        $(this)
          .find(
            '> div.fc-event-main > div.fc-event-main-frame > div.fc-event-time',
          )
          .addClass('d-none');

        const currentEventRowElement = getRowElement(currentEventTime);
        // console.log('currentEventRowElement =', currentEventRowElement)
        // console.log('previousRowElement =', previousRowElement)
        // the current row has to more than one item
        if (currentEventRowElement === previousRowElement) {
          console.log('in-currentEventRowElement');
          accumulator++;

          // move down the event (with margin-top prop. IT HAS TO BE THAT PROPERTY TO AVOID CONFLICTS WITH FullCalendar BEHAVIOR)
          // console.log('$(this) =', $(this))
          $(this).css(
            'margin-top',
            '+=' + (accumulator * defaultItemHeight).toString() + 'px',
          );
          // console.log('after-$(this) =', $(this))

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
        // console.log('$(this).parent() =', $(this).parent())
      })
      .parent().parent()
      .each(function () {
        let itemCount = 0;
        let defaultInset = ''
        let firstItem = true

        // console.log('after-a-$(this) =',$(this))
        $(this).children().each(function(){
          const zIndex = $(this).css('z-index');
          // console.log('zIndex =', zIndex);
          if (zIndex > itemCount) {
            // console.log('c>a-$(this) =', $(this));
            defaultInset = $(this).css('inset')
            // console.log('c>a-e =', defaultInset);
            $(this).css('inset', '2px 0 0 0')
            // console.log('c>a-$(this).prop("outerHTML") =', $(this).prop("outerHTML"));
            if(firstItem == true){
              newHtmlStr += `<div class="selfCell" style="inset:${defaultInset}">${$(this).prop("outerHTML")}`;
              firstItem = false
            }else{
              newHtmlStr += $(this).prop("outerHTML");
            }
            itemCount = zIndex;
          } else if (zIndex < itemCount) {
            // console.log('c < a');
            defaultInset = $(this).css('inset')
            $(this).css('inset', '2px 0 0 0')
            newHtmlStr += `</div><div class="selfCell" style="inset:${defaultInset}">${$(this).prop("outerHTML")}`;
            itemCount = zIndex;
            firstItem = false
          }
        })
        newHtmlStr += '</div></div>';
        // console.log('newHtmlStr =', newHtmlStr);
      })
      .prop("outerHTML", newHtmlStr);
  });
}