declare class time {
    hour: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
    constructor();
}
export declare class Time0 {
    startTime: time;
    instantTime: Array<time>;
    timeStamp: Array<time>;
    item: number;
    timeValue: Array<number>;
    constructor();
    start(): void;
    record(): void;
}
export declare function WaitSecs0(delay: number, message?: any): Promise<unknown>;
export declare function delay_frame(num1: any): Promise<unknown>;
export {};
