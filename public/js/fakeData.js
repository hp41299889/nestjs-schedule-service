const scheduleData = [
  {
    scheduleID: '1',
    scheduleName: 'text',
    commandSource: 'text',
    scheduleType: 'regular',
    regular: [
      'regular#星期/小時/分鐘',
      'regular#星期/小時/分鐘'
    ],
    createDatetime: '2022/11/04',
    lastEditDatetime: '2022/11/04',
    MQCLI: 'text',
  },
  {
    scheduleID: '2',
    scheduleName: 'body',
    commandSource: 'text02',
    scheduleType: 'cycle',
    cycle: [
      'cycle#小時/分鐘',
    ],
    createDatetime: '2022/11/04',
    lastEditDatetime: '2022/11/04',
    MQCLI: 'text02',
  },
  {
    scheduleID: '3',
    scheduleName: 'body',
    commandSource: 'text03',
    scheduleType: 'text',
    regular: [
      'regular#星期/小時/分鐘',
      'regular#星期/小時/分鐘'
    ],
    cycle: 'text03',
    createDatetime: '2022/11/07',
    lastEditDatetime: '2022/11/07',
    MQCLI: 'text03',
  }
]

const executionLogData = [
  {
    scheduleLogID: '1',
    scheduleID: '1',
    scheduleName: 'text',
    scheduleType: 'regular',
    processDatetime: 'YYYY-MM-DD',
    processStatus: 'regular#星期/小時/分鐘',
    schedule: '2022/11/04',
    MQCLI: 'text',
  },
  {
    scheduleLogID: '2',
    scheduleID: '1',
    scheduleName: 'text',
    scheduleType: 'cycle',
    processDatetime: 'YYYY-MM-DD',
    processStatus: 'cycle#小時/分鐘',
    schedule: '2022/11/04',
    MQCLI: 'text',
  },
  {
    scheduleLogID: '3',
    scheduleID: '1',
    scheduleName: 'text',
    scheduleType: 'regular',
    processDatetime: 'YYYY-MM-DD',
    processStatus: 'regular#星期/小時/分鐘',
    schedule: '2022/11/04',
    MQCLI: 'text',
  }
]

const monitorData = [
  {
    id: 1,
    title: 'aaa',
    start: '2022-11-22 01:00:00',
    backgroundColor: '#ff0000'
  },
  {
    id: 2,
    title: 'bbb',
    start: '2022-11-22 01:00:00',
    backgroundColor:'#00ff00'
  },
  {
    id: 3,
    title: 'ccc',
    start: '2022-11-22 01:00:00',
  },
  {
    id: 4,
    title: 'aaa',
    start: '2022-11-23 01:00:00',
  },
  {
    id: 5,
    title: 'bbb',
    start: '2022-11-23 01:00:00',
  },
  {
    id: 6,
    title: 'aaa',
    start: '2022-11-22 02:00:00',
  },
  {
    id: 7,
    title: 'bbb',
    start: '2022-11-22 02:00:00',
  },
  {
    id: 8,
    title: 'ccc',
    start: '2022-11-22 02:00:00',
  },
  {
    id: 9,
    title: 'aaa',
    start: '2022-11-23 02:00:00',
  },
  {
    id: 10,
    title: 'bbb',
    start: '2022-11-23 02:00:00',
  },
  {
    id: 11,
    title: 'ccc',
    start: '2022-11-23 02:00:00',
  },
  {
    id: 12,
    title: 'aaa',
    start: '2022-11-24 02:00:00',
  },
  {
    id: 13,
    title: 'bbb',
    start: '2022-11-24 02:00:00',
  },
  // {
  //   id: 14,
  //   title: 'ccc',
  //   start: '2022-11-24 02:00:00',
  // },
  {
    id: 15,
    title: 'aaa',
    start: '2022-11-24 01:00:00',
  },
  {
    id: 16,
    title: 'bbb',
    start: '2022-11-24 01:00:00',
  },
  {
    id: 17,
    title: 'ccc',
    start: '2022-11-24 01:00:00',
  },
  {
    id: 18,
    title: 'aaa',
    start: '2022-11-21 02:00:00',
  },
  {
    id: 19,
    title: 'aaa',
    start: '2022-11-25 02:00:00',
  },
  {
    id: 20,
    title: 'bbb',
    start: '2022-11-25 02:00:00',
  },
  {
    id: 21,
    title: 'aaa',
    start: '2022-11-21 01:00:00',
  },
  {
    id: 22,
    title: 'bbb',
    start: '2022-11-21 01:00:00',
  },
  {
    id: 23,
    title: 'aaa',
    start: '2022-11-25 01:00:00',
  },
  {
    id: 24,
    title: 'ccc',
    start: '2022-11-25 02:00:00',
  },
  {
    id: 25,
    title: 'ccc',
    start: '2022-11-21 01:00:00',
  },
  {
    id: 26,
    title: 'bbb',
    start: '2022-11-21 02:00:00',
  },
  {
    id: 27,
    title: 'bbb',
    start: '2022-11-25 01:00:00',
  },
  {
    id: 28,
    title: 'ccc',
    start: '2022-11-21 02:00:00',
  },
  // {
  //   id: 29,
  //   title: 'aaa',
  //   start: '2022-11-20 02:00:00',
  // },
  // {
  //   id: 30,
  //   title: 'aaa',
  //   start: '2022-11-20 01:00:00',
  // },
  // {
  //   id: 31,
  //   title: 'bbb',
  //   start: '2022-11-20 02:00:00',
  // },
  // {
  //   id: 32,
  //   title: 'bbb',
  //   start: '2022-11-20 01:00:00',
  // },
  // {
  //   id: 33,
  //   title: 'ccc',
  //   start: '2022-11-20 01:00:00',
  // },{
  //   id: 34,
  //   title: 'ccc',
  //   start: '2022-11-20 02:00:00',
  // },
  // {
  //   id: 35,
  //   title: 'ccc',
  //   start: '2022-11-25 01:00:00',
  // },
]