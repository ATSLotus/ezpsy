export declare class Time {
    startTime: number;
    timeStamp: Array<number>;
    timeContinueValue: Array<number>;
    timeIntervalValue: Array<number>;
    constructor();
    record(): void;
    getStamp(): number[];
    getContinueValue(): number[];
    getIntervalValue(): number[];
}
export declare function sleep(delay: number): Promise<unknown>;
export declare function WaitSecs(delay: number): Promise<number>;
