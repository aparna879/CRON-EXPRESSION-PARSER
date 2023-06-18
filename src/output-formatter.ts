import { ParsedCronFields } from "./interfaces/cron-parser";

// Output Format in table format
export class CronOutputFormatter {

    formatOutput = (parsedCronFields: ParsedCronFields): string => {
        let output = "";
        for (const key in parsedCronFields) {
            const value = parsedCronFields[key as keyof ParsedCronFields];
            switch (typeof value) {
                case 'object': // i.e. string[]
                    output += key.padEnd(14) + (parsedCronFields[key as keyof ParsedCronFields] as string[]).join(' ') + "\n";
                    break;
                case 'string':
                    output += key.padEnd(14) + parsedCronFields[key as keyof ParsedCronFields] + "\n";
                    break;
            }
        }
        return output.slice(0, -1);
    }

}