export const MODULE = {
    CONNECTION_NAME: 'SCHEDULE_QUEUE',
    SETUP_ALIAS: 'queue'
};

export const SERVICE = {
    CONNECTION_NAME: 'SCHEDULE_QUEUE',
    BASEMETHOD: 'ScheduleService/ScheduleSetup/',
    BUILDMESSAGE_METHOD: 'buildMessage()',
    SENDMESSAGE_METHOD: 'sendMessage()',
};