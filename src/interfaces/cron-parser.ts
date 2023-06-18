
export interface InputCronSplitObject {
    minute: string,
    hour: string,
    dayOfMonth: string,
    month: string,
    dayOfWeek: string,
    command: string
}

export interface ParsedCronFields {
    minute: string[],
    hour: string[],
    dayOfMonth: string[],
    month: string[],
    dayOfWeek: string[],
    command: string
}

export enum CronAttributeType {
    Minute = "minute",
    Hour = "hour",
    DayOfMonth = "dayOfMonth",
    Month = "month",
    DayOfWeek = "dayOfWeek",
    Command = "command"
}