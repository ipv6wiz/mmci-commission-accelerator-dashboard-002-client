import {ErrorHandler, Injectable} from "@angular/core";
import {AlertService} from "../service/alert.service";
import {ErrorObjInterface} from "../entities/error-obj.interface";

@Injectable()
export class GlobalErrorHandler extends ErrorHandler {
    constructor(private alertService: AlertService) {
        super();
    }
    override handleError(error: Error) {
        console.log('GlobalErrorHandler - handleError - Error: ', error);
        console.log('GlobalErrorHandler - handleError - Error Msg: ', error.message);
        const parts = error.message.split('::');
        let newMsg: string = '';
        let tmpMsg: string = '';
        let type: string = 'error';
        let group: string = '';
        let errObj: ErrorObjInterface = {} as ErrorObjInterface;
        if(parts.length > 1) {
            // For future use passing a JSON string as the Error Message
            if(parts[0] === 'json' && parts[1].indexOf('{') === 0) {
                errObj = JSON.parse(parts[1]);
                switch(errObj.code) {

                }
            }
        } else {
            let msg: string = error.message;
            msg = msg.split('\n').shift() || msg;
            console.log('Error handled - msg: ', msg);

            newMsg = 'An error has occurred';
            const parts = msg.split(':');
            tmpMsg = parts.pop() || newMsg;
            // console.log('ErrorHandler - FirebaseError - tmpMsg: ', tmpMsg);
            const open = tmpMsg.indexOf('(');
            const close = tmpMsg.indexOf(')');
            if(open !== -1 && close !== -1){
                // console.log(`Open: ${open} close: ${close}`);

                const subMsg = tmpMsg.slice(open+1, close);
                // console.log('subMsg: ', subMsg);
                const msgParts = subMsg.split('/');
                // console.log('msgParts: ', msgParts);
                switch(msgParts[0]) {
                    case 'auth':
                        newMsg = this.processAuth(msgParts[1]);
                        break;
                    default:
                        newMsg = 'Unknown Error';
                        break;
                }

            } else if(!!msg) {
                // parts.push(tmpMsg);
                // newMsg = parts.join(':');
                newMsg = tmpMsg;
            }
            // console.log('Before Alert newMsg: ', newMsg);
            this.alertService.error(newMsg);
        }
    }

    processAuth(msg: string): string {
        // console.log('processAuth - msg: ', msg);
        let newMsg: string = '';
        switch (msg) {
            case 'user-not-found':
                newMsg = 'You must register and be approved first'
                break;
            case 'wrong-password':
                newMsg = 'Password Invalid.';
                break;
            case 'too-many-requests':
                newMsg = 'Too many failed Login requests. Access to this account has been temporarily disabled';
                break;
            default:
                newMsg = msg;
                break;
        }
        // console.log('processAuth - newMsg: ', newMsg);
        return newMsg;
    }
}
