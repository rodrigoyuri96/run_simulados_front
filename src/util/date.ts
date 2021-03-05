export class DateUtil{
    static parseDate(oldDate: String){
        if (!oldDate) return null;
            const [day, month, year] = oldDate.split("/");
            return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
}