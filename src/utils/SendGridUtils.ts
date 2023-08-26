import sgMail from '@sendgrid/mail'
import { MailDataRequired } from '@sendgrid/mail';

export class MessageType {
    public from = "no-reply-infinity@infinityproducao.com"
    public to
    public subject
    public text
    public html

    constructor(to: string, subject: string, text: string, html: string) {
        this.to = to;
        this.subject = subject;
        this.text = text;
        this.html = html;
    }
}

export class SendGridUtils {
    private static apiKey = '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'

    public static sendMail(message: MessageType) {
        const msg: MailDataRequired = {
            to: message.to,
            from: message.from,
            subject: message.subject,
            text: message.text,
            html: message.html
        }

        if(this.apiKey) {
            sgMail.setApiKey(this.apiKey)
        } else {
            console.log("Erro ApiKey")
            return
        }
        
        sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })
    }
}