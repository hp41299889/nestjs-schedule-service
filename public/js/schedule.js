$(document).ready(function(){
  const apiUrl = ''

  const table = $("#schedule").DataTable({
    // "lengthChange": false,
    // searching: false,
    pageLength: 10,
    dom: 'rft<"bottom"lp>',
    data: scheduleData,
    columns: scheduleColumns
  })
})