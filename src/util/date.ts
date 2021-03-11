export class DateUtil{
    static parseDate(oldDate: String){
        if (!oldDate) return null;
            const [day, month, year] = oldDate.split("/");
            let m = this.digitFormat(month);
            let d = this.digitFormat(day);
            return `${year}-${m}-${d}`;
    }
 
    static parseDateBR(oldDate: String){
        if (!oldDate) return null;
            const [year, month, day] = oldDate.split("-");
            let m = this.digitFormat(month);
            let d = this.digitFormat(day);
            return `${d}/${m}/${year}`;
    }

    static isBiggersThanDate(date1: String, date2: String){
        const d1 = new Date(date1.toString()) 
        const d2 = new Date(date2.toString())

        return d1.getTime() > d2.getTime() 
    }

    protected static digitFormat(value: String){
       return `${String(value).length > 1 ? '' : '0'}${value}`
    }
}