// @ts-ignore
import sample from "../static/singrat_bg.wasm"

let wasm: any

export async function  initWasm(){
    const instance = sample({
        wbg: {}
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

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
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