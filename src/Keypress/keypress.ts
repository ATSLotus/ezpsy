import { judgeKey } from "../Judge/judge"

interface Func {
    funcList?: Array<Function>
    complete?: Function
}
interface RES {
    index: number
    key: string
}

let keyCodeDictionary = {
    8: 'Backspace',
    9: 'Tab',
    12: 'Clear',
    13: 'Enter',
    16: 'Shift',
    17: 'Control',
    18: 'Alt',
    19: 'Pause',
    20: 'CapsLock',
    27: 'Escape',
    32: ' ',
    33: 'Prior',
    34: 'Next',
    35: 'End',
    36: 'Home',
    37: 'Left',
    38: 'Up',
    39: 'Right',
    40: 'Down',
    41: 'Select',
    42: 'Print',
    43: 'Execute',
    45: 'Insert',
    46: 'Delete',
    47: 'Help',
    48: '0',
    49: '1',
    50: '2',
    51: '3',
    52: '4',
    53: '5',
    54: '6',
    55: '7',
    56: '8',
    57: '9',
    65: 'a',
    66: 'b',
    67: 'c',
    68: 'd',
    69: 'e',
    70: 'f',
    71: 'g',
    72: 'h',
    73: 'i',
    74: 'j',
    75: 'k',
    76: 'l',
    77: 'm',
    78: 'n',
    79: 'o',
    80: 'p',
    81: 'q',
    82: 'r',
    83: 's',
    84: 't',
    85: 'u',
    86: 'v',
    87: 'w',
    88: 'x',
    89: 'y',
    90: 'z',
    96: 'KP_0',
    97: 'KP_1',
    98: 'KP_2',
    99: 'KP_3',
    100: 'KP_4',
    101: 'KP_5',
    102: 'KP_6',
    103: 'KP_7',
    104: 'KP_8',
    105: 'KP_9',
    106: 'KP_Multiply',
    107: 'KP_Add',
    108: 'KP_Separator',
    109: 'KP_Subtract',
    110: 'KP_Decimal',
    111: 'KP_Divide',
    112: 'F1',
    113: 'F2',
    114: 'F3',
    115: 'F4',
    116: 'F5',
    117: 'F6',
    118: 'F7',
    119: 'F8',
    120: 'F9',
    121: 'F10',
    122: 'F11',
    123: 'F12',
    124: 'F13',
    125: 'F14',
    126: 'F15',
    127: 'F16',
    128: 'F17',
    129: 'F18',
    130: 'F19',
    131: 'F20',
    132: 'F21',
    133: 'F22',
    134: 'F23',
    135: 'F24',
}

export class keypress {
    keyType: string
    keyEvent: KeyboardEvent
    key: Array<any>
    keyCombination: Array<any>
    map: Map<string, (e: any) => void>
    constructor(keyType?: string) {
        if (keyType) {
            if (keyType === 'keydown' || keyType === 'keyup' || keyType === 'keypress') {
                this.keyType = keyType
            }
            else {
                this.keyType = 'keydown'
            }
        }
        else {
            this.keyType = 'keydown'
        }
        this.key = []
        this.keyEvent = new KeyboardEvent(this.keyType);
        this.map = new Map()
    }
    listen(
        id: string,
        key: string | number | Array<string | number>,
        fun?: Func | Function,
        isDestroy: boolean = true
    ) {
        let func: Func = {
            funcList: []
        };
        this.key = new Array()
        if (fun instanceof Function) {
            func.funcList = [fun];
        }
        else {
            func = fun;
        }
        if (key instanceof Array) {
            this.key = key
        }
        else {
            this.key.push(key)
        }
        for (let i = 0; i < this.key.length; i++) {
            if (typeof this.key[i] === 'number')
                this.key[i] = judgeKey(this.key[i], keyCodeDictionary);
        }
        return new Promise((res, rej) => {
            const linstenner = createLinstenner(
                id,
                this.key, 
                this.keyType, 
                func, 
                {
                    destroy: isDestroy,
                    map: this.map
                },
                res
            )
            this.map.set(id, linstenner)
        })
    }
    destroy(id: string) {
        const linstenner = this.map.get(id)
        if(linstenner) {
            document.removeEventListener(this.keyType, linstenner);
            this.map.delete(id)
        }
    }
}

const createLinstenner = (
    id: string,
    key: Array<string>,
    keyType: string,
    func: Func,
    IsDestroy: {
        destroy: boolean,
        map: Map<string, (e: any) => void>
    },
    callback: (value: RES | PromiseLike<RES>) => void
) => {
    let res:RES={
        index: -1,
        key: 'null'
    }
    const linstenner = (e) => {
        for (let i = 0; i < key.length; i++) {
            if (key[i] === (<KeyboardEvent>e).key) {
                res = {
                    index: i,
                    key: (<KeyboardEvent>e).key
                }
                if (res.index >= 0) {
                    if (func.complete)
                        func.complete();
                }
                if (func.funcList) {
                    if (func.funcList[res.index])
                        func.funcList[res.index]()
                    else
                        console.dir(res.key)
                }
                else
                    console.dir(res.key)
                if (IsDestroy.destroy) {
                    document.removeEventListener(keyType, linstenner);
                    IsDestroy.map.delete(id)
                }
                callback(res)
            }
        }
    }
    document.addEventListener(keyType, linstenner);
    return linstenner
}