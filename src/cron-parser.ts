import { CronAttributeType, InputCronSplitObject, ParsedCronFields } from "./interfaces/cron-parser";

export class CronParser {

    parseCronExpression = (cronFieldValues: InputCronSplitObject): ParsedCronFields => {

        return {
            minute: this.parseField(CronAttributeType.Minute, cronFieldValues.minute, 0, 59),
            hour: this.parseField(CronAttributeType.Hour, cronFieldValues.hour, 0, 23),
            dayOfMonth: this.parseField(CronAttributeType.DayOfMonth, cronFieldValues.dayOfMonth, 1, 31),
            month: this.parseField(CronAttributeType.Month, cronFieldValues.month, 1, 12),
            dayOfWeek: this.parseField(CronAttributeType.DayOfWeek, cronFieldValues.dayOfWeek, 0, 6),
            command: cronFieldValues.command
        };
    }

    parseField = (fieldName: CronAttributeType, fieldValue: string, minValue: number, maxValue: number): string[] => {

        if (fieldValue === '*') {
            if (fieldName === CronAttributeType.DayOfMonth || fieldName === CronAttributeType.Month)
                return [...Array(maxValue - minValue + 1).keys()].map(i => i + 1).map(i => String(i)); // Leveraging Array Indexing + converting the valus to string
            else
                return [...Array(maxValue - minValue + 1).keys()].map(i => String(i));
        }

        if (fieldValue.includes(',')) { // Recursive call to the parse method for each split value
            const splitValues = fieldValue.split(',');
            return splitValues.flatMap(value => this.parseField(fieldName, value, minValue, maxValue));
        }

        if (fieldValue.includes('-')) {
            const [start, end] = fieldValue.split('-').map(item => parseInt(item));
            if (start && end)
                return [...Array(end - start + 1).keys()].map(i => i + start).map(i => String(i));
            else
                return [fieldValue]; // In case of Invalid input
        }

        if (fieldValue.includes("/")) {
            const [value, increment] = fieldValue.split("/").map((item) => parseInt(item));
            if (!increment) {
                console.log(`Please pass the valid cron string value for ${fieldName}.`);
                return [];
            }
            const length = Math.floor((maxValue - minValue) / increment) + 1;
            return [...Array(length).keys()].map(i => i * increment + minValue).map(i => String(i));
        }

        return [fieldValue];
    }
}