/// <reference types="sweetalert2" />
import 'sweetalert2/src/sweetalert2.scss';
import '../Style/dialogue.scss';
export declare function test(): void;
export declare class Dialogue {
    id: number;
    inputValue: Array<Data>;
    constructor();
    inputDlg(dlgContent: DlgContent): Promise<unknown>;
    errorDlg(dlgContent: DlgContent): void;
    helpDlg(dlgContent: DlgContent): void;
    listDlg(dlgContent: DlgContent): Promise<import("sweetalert2").SweetAlertResult<any[]>>;
    questDlg(dlgContent: DlgContent): Promise<unknown>;
    warnDlg(dlgContent: DlgContent): void;
    msgDlg(dlgContent: DlgContent): Promise<unknown>;
}
interface Data {
    dataName: string;
    data: string;
}
export interface DlgContent {
    title: string;
    content?: string;
    imgUrl?: string;
    imgWidth?: number;
    imgHeight?: number;
    confirm?: string;
    cancel?: string;
    input?: Array<string> | string;
    value?: Array<string> | string;
    list?: Object;
    IsMulti?: boolean;
}
export declare function DlgInit(): Dialogue;
export {};
