import { CronParser } from "../src/cron-parser";
import { CronAttributeType } from "../src/interfaces/cron-parser";

const cronParser = new CronParser();

describe('Test Cron Field parser', () => {
    it('Test "*" case', () => {
        expect(cronParser.parseField(CronAttributeType.DayOfWeek, '*', 0, 6))
            .toEqual([...Array(7).keys()].map(i => String(i)));
        expect(cronParser.parseField(CronAttributeType.Month, '*', 1, 31))
            .toEqual([...Array(31).keys()].map(i => i + 1).map(i => String(i)));
    });

    it('Test "-" (Range) case', () => {
        expect(cronParser.parseField(CronAttributeType.Month, '3-5', 1, 31)).toEqual(['3', '4', '5']);
        expect(cronParser.parseField(CronAttributeType.Hour, '15-19', 0, 23)).toEqual(['15', '16', '17', '18', '19']);
    });

    it('Test "," (list) case', () => {
        expect(cronParser.parseField(CronAttributeType.DayOfWeek, '4,5', 0, 6)).toEqual(['4', '5']);
        expect(cronParser.parseField(CronAttributeType.Minute, '15,20,25', 0, 59)).toEqual(['15', '20', '25']);
    });

    it('Test "/" (step/increment) case', () => {
        expect(cronParser.parseField(CronAttributeType.Minute, '*/15', 0, 59)).toEqual(['0', '15', '30', '45']);
        expect(cronParser.parseField(CronAttributeType.Hour, '*/10', 0, 23)).toEqual(['0', '10', '20']);
    });

    it('Test single numeric value', () => {
        expect(cronParser.parseField(CronAttributeType.DayOfWeek, '2', 0, 6)).toEqual(['2']);
        expect(cronParser.parseField(CronAttributeType.DayOfMonth, '12', 1, 31)).toEqual(['12']);
    });

    it('Invalid Input cases', () => {
        expect(cronParser.parseField(CronAttributeType.Hour, '*/0', 0, 23)).toEqual([]); // Invalid increment, results in an empty array
        expect(cronParser.parseField(CronAttributeType.Minute, '6-', 0, 59)).toEqual(['6-']); // Invalid range, treated as a single value
        expect(cronParser.parseField(CronAttributeType.Minute, 'test', 0, 59)).toEqual(['test']); // Invalid field, treated as a single value
    });

});