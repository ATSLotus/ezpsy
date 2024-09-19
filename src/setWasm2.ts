// @ts-ignore
import sample from "../static/singrat_opt_bg.wasm"

let wasm;

const heap = new Array(128).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 132) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

const cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

if (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); }

let cachedUint8ArrayMemory0 = null;

function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

let WASM_VECTOR_LEN = 0;

const cachedTextEncoder = (typeof TextEncoder !== 'undefined' ? new TextEncoder() : { encode: () => { throw Error('TextEncoder not available') } } );

const encodeString = (
    "encodeInto" in cachedTextEncoder && typeof cachedTextEncoder.encodeInto === 'function'
    ? 
    function (arg, view) {
        return cachedTextEncoder.encodeInto(arg, view);
    }
    : 
    function (arg, view) {
        const buf = cachedTextEncoder.encode(arg);
        view.set(buf);
        return {
            read: arg.length,
            written: buf.length
        }
    }
);

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachedDataViewMemory0 = null;

function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}
/**
* @param {string} id
* @param {number} x
* @param {number} y
* @param {number} radius
* @param {number} pixels_per_degree
* @param {number} spatial_frequency
* @param {number} angle
* @param {number} contrast
* @param {number} phase
* @param {number} gamma
*/
export function pre_singrat(id, x, y, radius, pixels_per_degree, spatial_frequency, angle, contrast, phase, gamma) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.pre_singrat(retptr, ptr0, len0, x, y, radius, pixels_per_degree, spatial_frequency, angle, contrast, phase, gamma);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        if (r1) {
            throw takeObject(r0);
        }
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

export function pre_noise_singrat(r,pixelsPerDegree,spatialFrequency,angle,contrast,phase,level,gamma) {
    const ret = wasm.pre_singrat();
    return takeObject(ret);
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        wasm.__wbindgen_exn_store(addHeapObject(e));
    }
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

let cachedUint8ClampedArrayMemory0 = null;

function getUint8ClampedArrayMemory0() {
    if (cachedUint8ClampedArrayMemory0 === null || cachedUint8ClampedArrayMemory0.byteLength === 0) {
        cachedUint8ClampedArrayMemory0 = new Uint8ClampedArray(wasm.memory.buffer);
    }
    return cachedUint8ClampedArrayMemory0;
}

function getClampedArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ClampedArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

export async function setWasm(){
    const instance = sample({
        wbg: {
            __wbg_instanceof_Window_5012736c80a01584: function(arg0) {
                let result;
                try {
                    result = getObject(arg0) instanceof Window;
                } catch (_) {
                    result = false;
                }
                const ret = result;
                return ret;
            },
            __wbindgen_object_drop_ref: function(arg0) {
                takeObject(arg0);
            },
            __wbg_document_8554450897a855b9: function(arg0) {
                const ret = getObject(arg0).document;
                return isLikeNone(ret) ? 0 : addHeapObject(ret);
            },
            __wbg_getElementById_f56c8e6a15a6926d: function(arg0, arg1, arg2) {
                const ret = getObject(arg0).getElementById(getStringFromWasm0(arg1, arg2));
                return isLikeNone(ret) ? 0 : addHeapObject(ret);
            },
            __wbg_instanceof_HtmlCanvasElement_1a96a01603ec2d8b: function(arg0) {
                let result;
                try {
                    result = getObject(arg0) instanceof HTMLCanvasElement;
                } catch (_) {
                    result = false;
                }
                const ret = result;
                return ret;
            },
            __wbg_getContext_69ec873410cbba3c: function() { return handleError(function (arg0, arg1, arg2) {
                const ret = getObject(arg0).getContext(getStringFromWasm0(arg1, arg2));
                return isLikeNone(ret) ? 0 : addHeapObject(ret);
            }, arguments) },
            __wbg_instanceof_CanvasRenderingContext2d_a0c4f0da6392b8ca: function(arg0) {
                let result;
                try {
                    result = getObject(arg0) instanceof CanvasRenderingContext2D;
                } catch (_) {
                    result = false;
                }
                const ret = result;
                return ret;
            },
            __wbg_newwithu8clampedarrayandsh_aa7545d0ba5b755e: function() { return handleError(function (arg0, arg1, arg2, arg3) {
                const ret = new ImageData(getClampedArrayU8FromWasm0(arg0, arg1), arg2 >>> 0, arg3 >>> 0);
                return addHeapObject(ret);
            }, arguments) },
            __wbg_putImageData_d8c261486f99879a: function() { return handleError(function (arg0, arg1, arg2, arg3) {
                getObject(arg0).putImageData(getObject(arg1), arg2, arg3);
            }, arguments) },
            __wbg_self_3093d5d1f7bcb682: function() { return handleError(function () {
                const ret = self.self;
                return addHeapObject(ret);
            }, arguments) },
            __wbg_window_3bcfc4d31bc012f8: function() { return handleError(function () {
                const ret = window.window;
                return addHeapObject(ret);
            }, arguments) },
            __wbg_globalThis_86b222e13bdf32ed: function() { return handleError(function () {
                const ret = globalThis.globalThis;
                return addHeapObject(ret);
            }, arguments) },
            __wbg_global_e5a3fe56f8be9485: function() { return handleError(function () {
                const ret = global.global;
                return addHeapObject(ret);
            }, arguments) },
            __wbindgen_is_undefined: function(arg0) {
                const ret = getObject(arg0) === undefined;
                return ret;
            },
            __wbg_newnoargs_76313bd6ff35d0f2: function(arg0, arg1) {
                const ret = new Function(getStringFromWasm0(arg0, arg1));
                return addHeapObject(ret);
            },
            __wbg_call_1084a111329e68ce: function() { return handleError(function (arg0, arg1) {
                const ret = getObject(arg0).call(getObject(arg1));
                return addHeapObject(ret);
            }, arguments) },
            __wbindgen_object_clone_ref: function(arg0) {
                const ret = getObject(arg0);
                return addHeapObject(ret);
            },
            __wbg_call_89af060b4e1523f2: function() { return handleError(function (arg0, arg1, arg2) {
                const ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
                return addHeapObject(ret);
            }, arguments) },
            __wbg_crypto_1d1f22824a6a080c: function(arg0) {
                const ret = getObject(arg0).crypto;
                return addHeapObject(ret);
            },
            __wbindgen_is_object: function(arg0) {
                const val = getObject(arg0);
                const ret = typeof(val) === 'object' && val !== null;
                return ret;
            },
            __wbg_process_4a72847cc503995b: function(arg0) {
                const ret = getObject(arg0).process;
                return addHeapObject(ret);
            },
            __wbg_versions_f686565e586dd935: function(arg0) {
                const ret = getObject(arg0).versions;
                return addHeapObject(ret);
            },
            __wbg_node_104a2ff8d6ea03a2: function(arg0) {
                const ret = getObject(arg0).node;
                return addHeapObject(ret);
            },
            __wbindgen_is_string: function(arg0) {
                const ret = typeof(getObject(arg0)) === 'string';
                return ret;
            },
            __wbg_require_cca90b1a94a0255b: function() { return handleError(function () {
                const ret = module.require;
                return addHeapObject(ret);
            }, arguments) },
            __wbindgen_is_function: function(arg0) {
                const ret = typeof(getObject(arg0)) === 'function';
                return ret;
            },
            __wbindgen_string_new: function(arg0, arg1) {
                const ret = getStringFromWasm0(arg0, arg1);
                return addHeapObject(ret);
            },
            __wbg_msCrypto_eb05e62b530a1508: function(arg0) {
                const ret = getObject(arg0).msCrypto;
                return addHeapObject(ret);
            },
            __wbg_newwithlength_ec548f448387c968: function(arg0) {
                const ret = new Uint8Array(arg0 >>> 0);
                return addHeapObject(ret);
            },
            __wbindgen_memory: function() {
                const ret = wasm.memory;
                return addHeapObject(ret);
            },
            __wbg_buffer_b7b08af79b0b0974: function(arg0) {
                const ret = getObject(arg0).buffer;
                return addHeapObject(ret);
            },
            __wbg_newwithbyteoffsetandlength_8a2cb9ca96b27ec9: function(arg0, arg1, arg2) {
                const ret = new Uint8Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
                return addHeapObject(ret);
            },
            __wbg_randomFillSync_5c9c955aa56b6049: function() { return handleError(function (arg0, arg1) {
                getObject(arg0).randomFillSync(takeObject(arg1));
            }, arguments) },
            __wbg_subarray_7c2e3576afe181d1: function(arg0, arg1, arg2) {
                const ret = getObject(arg0).subarray(arg1 >>> 0, arg2 >>> 0);
                return addHeapObject(ret);
            },
            __wbg_getRandomValues_3aa56aa6edec874c: function() { return handleError(function (arg0, arg1) {
                getObject(arg0).getRandomValues(getObject(arg1));
            }, arguments) },
            __wbg_new_ea1883e1e5e86686: function(arg0) {
                const ret = new Uint8Array(getObject(arg0));
                return addHeapObject(ret);
            },
            __wbg_set_d1e79e2388520f18: function(arg0, arg1, arg2) {
                getObject(arg0).set(getObject(arg1), arg2 >>> 0);
            },
        }
    });
    let res = await instance.then()
    wasm = res.instance.exports
    return wasm;
}