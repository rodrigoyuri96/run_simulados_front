import {TypeMessage} from "@/models/validation/TypeMessage";

export default class ValidationMessage{
    public message: string
    public type: TypeMessage
    public duration?: number
    public active: boolean

    constructor(message: string, type: TypeMessage) {
        this.message = message;
        this.type = type;
        this.duration = 3000;
        this.active = true;
    }
}
