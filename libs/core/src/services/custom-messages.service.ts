import { EventEmitter, Injectable, Output } from '@angular/core';
import { MessageService } from '@progress/kendo-angular-l10n';

import { elComponentMessages, elCustomMessages } from './i18n/el-GR';
import { enComponentMessages, enCustomMessages } from './i18n/en-US';

const componentMsgs: any = {
    ['el-GR']: elComponentMessages,
    ['en-US']: enComponentMessages
};

const customMsgs: any = {
    ['el-GR']: elCustomMessages,
    ['en-US']: enCustomMessages
};

@Injectable()
export class CustomMessagesService extends MessageService {
    @Output() public localeChange = new EventEmitter();
    private localeId = 'en-US';

    public set language(value: string) {
        const locale = componentMsgs[value];
        if (locale) {
            this.localeId = value;
            this.localeChange.emit();
            this.notify();
        }
    }

    public get language(): string {
        return this.localeId;
    }

    private get messages(): any {
        const messages = componentMsgs[this.localeId];
        if (messages) {
            return messages;
        }
    }

    public override get(key: string): string {
        return this.messages[key];
    }

    //public override get(key: string): string {
    //    const messages = this.messages[key];
    //    return key.split('.').reduce((acc, part) => acc?.[part], messages) || key;
    //}

    // Translate custom messages
    public _translate(word: string): string {
        const messages = customMsgs[this.localeId];
        return messages[word];
    }

    public translate(key: string): string {
        const messages = customMsgs[this.localeId];
        return key.split('.').reduce((acc, part) => acc?.[part], messages) || key;
    }
}
