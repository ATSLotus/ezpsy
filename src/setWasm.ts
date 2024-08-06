/*
 * @Author: ATSLotus/时桐
 * @Date: 2022-11-17 11:11:19
 * @LastEditors: ATSLotus/时桐
 * @LastEditTime: 2022-11-17 11:40:02
 * @Description: 
 * @FilePath: /ezpsy/src/setWasm.ts
 */
// @ts-ignore
import sample from "../static/singrat_bg_0.wasm"

let wasm

const heap = new Array(128).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        wasm.__wbindgen_exn_store(addHeapObject(e));
    }
}
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

export async function  getWasm(){
    const instance = sample({
        wbg: {
            __wbg_self_ce0dbfc45cf2f5be: function() { return handleError(function () {
                const ret = self.self;
                return addHeapObject(ret);
            }, arguments) },
            __wbg_window_c6fb939a7f436783: function() { return handleError(function () {
                const ret = window.window;
                return addHeapObject(ret);
            }, arguments) },
            __wbindgen_object_drop_ref: function(arg0) {
                takeObject(arg0);
            },
            __wbg_globalThis_d1e6af4856ba331b: function() { return handleError(function () {
                const ret = globalThis.globalThis;
                return addHeapObject(ret);
            }, arguments) },
            __wbg_global_207b558942527489: function() { return handleError(function () {
                const ret = global.global;
                return addHeapObject(ret);
            }, arguments) },
            __wbindgen_is_undefined: function(arg0) {
                const ret = getObject(arg0) === undefined;
                return ret;
            },
            __wbg_newnoargs_e258087cd0daa0ea: function(arg0, arg1) {
                const ret = new Function(getStringFromWasm0(arg0, arg1));
                return addHeapObject(ret);
            },
            __wbg_call_27c0f87801dedf93: function() { return handleError(function (arg0, arg1) {
                const ret = getObject(arg0).call(getObject(arg1));
                return addHeapObject(ret);
            }, arguments) },
            __wbindgen_object_clone_ref: function(arg0) {
                const ret = getObject(arg0);
                return addHeapObject(ret);
            },
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
            __wbg_call_b3ca7c6051f9bec1: function() { return handleError(function (arg0, arg1, arg2) {
                const ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
                return addHeapObject(ret);
            }, arguments) },
            __wbg_msCrypto_eb05e62b530a1508: function(arg0) {
                const ret = getObject(arg0).msCrypto;
                return addHeapObject(ret);
            },
            __wbg_newwithlength_e9b4878cebadb3d3: function(arg0) {
                const ret = new Uint8Array(arg0 >>> 0);
                return addHeapObject(ret);
            },
            __wbindgen_memory: function() {
                const ret = wasm.memory;
                return addHeapObject(ret);
            },
            __wbg_buffer_12d079cc21e14bdb: function(arg0) {
                const ret = getObject(arg0).buffer;
                return addHeapObject(ret);
            },
            __wbg_newwithbyteoffsetandlength_aa4a17c33a06e5cb: function(arg0, arg1, arg2) {
                const ret = new Uint8Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
                return addHeapObject(ret);
            },
            __wbg_randomFillSync_5c9c955aa56b6049: function() { return handleError(function (arg0, arg1) {
                getObject(arg0).randomFillSync(takeObject(arg1));
            }, arguments) },
            __wbg_subarray_a1f73cd4b5b42fe1: function(arg0, arg1, arg2) {
                const ret = getObject(arg0).subarray(arg1 >>> 0, arg2 >>> 0);
                return addHeapObject(ret);
            },
            __wbg_getRandomValues_3aa56aa6edec874c: function() { return handleError(function (arg0, arg1) {
                getObject(arg0).getRandomValues(getObject(arg1));
            }, arguments) },
            __wbg_new_63b92bc8671ed464: function(arg0) {
                const ret = new Uint8Array(getObject(arg0));
                return addHeapObject(ret);
            },
            __wbg_set_a47bac70306a19a7: function(arg0, arg1, arg2) {
                getObject(arg0).set(getObject(arg1), arg2 >>> 0);
            },
            __wbindgen_throw: function(arg0, arg1) {
                throw new Error(getStringFromWasm0(arg0, arg1));
            }
        }
    });
    let res = await instance.then()
    wasm = res.instance.exports
    return wasm;
}

let cachedInt32Memory0 = null;

function getInt32Memory0() {
    if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
}

let cachedUint8Memory0 = null;

function getUint8Memory0() {
    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

const cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}


function getArrayU8FromWasm0(ptr, len) {
    return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}

let cachedUint16Memory0 = null;

function getUint16Memory0() {
    if (cachedUint16Memory0 === null || cachedUint16Memory0.byteLength === 0) {
        cachedUint16Memory0 = new Uint16Array(wasm.memory.buffer);
    }
    return cachedUint16Memory0;
}

function getArrayU16FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint16Memory0().subarray(ptr / 2, ptr / 2 + len);
}


export function pre_singrat(radius, pixels_per_degree, spatial_frequency, angle, contrast, phase, gamma) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.pre_singrat(retptr, radius, pixels_per_degree, spatial_frequency, angle, contrast, phase, gamma);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        var v1 = getArrayU16FromWasm0(r0, r1).slice();
        wasm.__wbindgen_free(r0, r1 * 2, 2);
        return v1;
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

export function pre_noise_singrat(radius, pixels_per_degree, spatial_frequency, angle, contrast, phase, level, gamma) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.pre_noise_singrat(retptr, radius, pixels_per_degree, spatial_frequency, angle, contrast, phase, level, gamma);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        var v1 = getArrayU8FromWasm0(r0, r1).slice();
        wasm.__wbindgen_free(r0, r1 * 1, 1);
        return v1;
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}