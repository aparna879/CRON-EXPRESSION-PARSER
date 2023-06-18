import { CronParser } from "./cron-parser";
import { CronOutputFormatter } from "./output-formatter";

const cronParser = new CronParser();
const cronOutputFormatter = new CronOutputFormatter();

if (process.argv[2]) {
    const cronExpression = process.argv[2];
    const [minute, hour, dayOfMonth, month, dayOfWeek, command] = cronExpression.split(" ");
    const inputValuesObject = {
        minute: minute,
        hour: hour,
        dayOfMonth: dayOfMonth,
        month: month,
        dayOfWeek: dayOfWeek,
        command
    }
    // Parse Cron Expression
    const parsedCronFields = cronParser.parseCronExpression(inputValuesObject);

    // Format Output
    const formattedOutput = cronOutputFormatter.formatOutput(parsedCronFields);
    console.log(formattedOutput);
} else {
    console.log('Argument for cron expression is missing from the command.');
}
