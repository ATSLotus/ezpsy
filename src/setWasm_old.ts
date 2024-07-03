/*
 * @Author: ATSLotus/时桐
 * @Date: 2022-11-17 11:11:19
 * @LastEditors: ATSLotus/时桐
 * @LastEditTime: 2022-11-17 11:40:02
 * @Description: 
 * @FilePath: /ezpsy/src/setWasm.ts
 */
// @ts-ignore
import sample from "../static/singrat_bg.wasm"

let wasm = null

export async function  getWasm(){
    const instance = sample({});
    let res = await instance.then()
    wasm = res.instance.exports
    return wasm;
}

function getInt32Memory0(wasm) {
    let cachegetInt32Memory0 = null;
    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
        cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }

    return cachegetInt32Memory0;
}

let cachegetUint8Memory0 = null;

function getUint8Memory0(wasm) {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }

    return cachegetUint8Memory0;
}


function getArrayU8FromWasm0(wasm, ptr, len) {
    return getUint8Memory0(wasm).subarray(ptr / 1, ptr / 1 + len);
}


export function pre_singrat(radius, pixels_per_degree, spatial_frequency, angle, contrast, phase, gamma) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);

        wasm.pre_singrat(retptr, radius, pixels_per_degree, spatial_frequency, angle, contrast, phase, gamma);
        var r0 = getInt32Memory0(wasm)[retptr / 4 + 0];
        var r1 = getInt32Memory0(wasm)[retptr / 4 + 1];
        var v0 = getArrayU8FromWasm0(wasm, r0, r1).slice();

        wasm.__wbindgen_free(r0, r1 * 1);

        return v0;
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

export function pre_noise_singrat(radius, pixels_per_degree, spatial_frequency, angle, contrast, phase, level, gamma) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.pre_noise_singrat(retptr, radius, pixels_per_degree, spatial_frequency, angle, contrast, phase, level, gamma);
        var r0 = getInt32Memory0(wasm)[retptr / 4 + 0];
        var r1 = getInt32Memory0(wasm)[retptr / 4 + 1];
        var v0 = getArrayU8FromWasm0(wasm, r0, r1).slice();
        wasm.__wbindgen_free(r0, r1 * 1);
        return v0;
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}