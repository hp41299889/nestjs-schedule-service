export class AppConfigDto {
    name: string;
    env: string;
    prefix: string;
    port: string;
};

export class AdminConfigDto {
    account: string;
    password: string;
};

export class MongoDBConfigDto {
    IP: string;
    port: string;
    account: string;
    password: string;
    DBName: string;
};

export class PostgreSQLConfigDto {
    IP: string;
    port: string;
    account: string;
    password: string;
    DBName: string;
};

export class QueueConfigDto {
    IP: string;
    port: string;
    account: string;
    password: string;
    inputQueueName: string;
    outputQueueName: string;
};