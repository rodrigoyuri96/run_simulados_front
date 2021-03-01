import {TypeMessage} from "@/models/validation/TypeMessage";

export default class ValidationMessage{
    public message: string
    public type: TypeMessage
    public color?: string
    public duration?: number
    public active: boolean

    constructor(message: string, type: TypeMessage,  active: boolean, color?: string, duration?: number) {
        this.message = message;
        this.type = type;
        this.color = color;
        this.duration = duration;
        this.active = active;
    }
}
