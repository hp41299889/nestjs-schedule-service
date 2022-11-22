export const MODULE = {
    CONNECTION_NAME: 'JOB_QUEUE',
    SETUP_ALIAS: 'queue'
};

export const SERVICE = {
    CONNECTION_NAME: 'JOB_QUEUE',
    BASEMETHOD: 'ScheduleService/ScheduleSetup/',
    BUILDMESSAGE_METHOD: 'buildMessage()',
    SENDMESSAGE_METHOD: 'sendMessage()',
};