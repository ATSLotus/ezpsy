use std::f32::consts;
use wasm_bindgen::prelude::*;
use rand::Rng;
use web_sys::{window, ImageData, CanvasRenderingContext2d};
use wasm_bindgen::Clamped;

fn search_map_124(num: u16) -> (u8, u8, u8) {
    let x = (num / 7) as u8;
    let mut rgb = (x, x, x);

    match num % 7 {
        0 => {}
        1 => {
            rgb.2 += 1; // b += 1
        }
        2 => {
            rgb.0 += 1; // r += 1
        }
        3 => {
            rgb.2 += 1; // b += 1
            rgb.0 += 1; // r += 1
        }
        4 => {
            rgb.1 += 1; // g += 1
        }
        5 => {
            rgb.2 += 1; // b += 1
            rgb.1 += 1; // g += 1
        }
        6 => {
            rgb.0 += 1; // r += 1
            rgb.1 += 1; // g += 1
        }
        _ => panic!("Unknown Error"),
    }

    rgb
}

fn singrat(radius: i32, pixels_per_degree: f32, spatial_frequency: f32, angle: f32, contrast: f32, phase: f32, gamma: f32) -> Result<ImageData, JsValue> {
    let maskband = radius / 2;
    let imagesize = maskband + radius;
    let width = (2 * imagesize + 1) as usize;
    let total_pixels = width * width * 4;  // 每个像素有4个分量 (RGBA)

    // 使用 Box<[u8]> 作为固定大小的数组
    let mut param = vec![0u8; total_pixels].into_boxed_slice();

    let radius_sq = (radius as f32).powi(2);
    let w = 2.0 * consts::PI * spatial_frequency / pixels_per_degree;
    let cos_a = (angle * consts::PI / 180.0).cos() * w;
    let sin_a = (angle * consts::PI / 180.0).sin() * w;

    let mut vec_x: Vec<f32> = Vec::with_capacity(width * width);
    let mut vec_y: Vec<f32> = Vec::with_capacity(width * width);
    
    for e_i in -imagesize..=imagesize {
        for e_j in -imagesize..=imagesize {
            vec_x.push(e_i as f32);
            vec_y.push(e_j as f32);
        }
    }

    let mut mask_ex: Vec<f32> = Vec::with_capacity(width * width);
    for i in 0..width * width {
        let m = vec_x[i].powi(2) + vec_y[i].powi(2);
        let res = (-4.0 * m / radius_sq).exp() * consts::E.powf(4.0);
        mask_ex.push(res.min(1.0));
    }

    let mut rng = rand::thread_rng();

    // 遍历 mask_ex 并填充 param 数组
    for i in 0..width * width {
        let p = 0.5 + 0.5 * contrast * mask_ex[i] * (cos_a * vec_x[i] + sin_a * vec_y[i] + phase).sin();
        let p = 1785.0 * p.powf(1.0 / gamma);
        let noise_value: f32 = rng.gen_range(-0.5..0.5);
        let p = p + noise_value + 0.5;
        let p: u16 = p.floor() as u16;

        let rgb = search_map_124(p);

        let index = i * 4;
        param[index] = rgb.0;
        param[index + 1] = rgb.1;
        param[index + 2] = rgb.2;
        param[index + 3] = 255;
    }

    let image_data = ImageData::new_with_u8_clamped_array_and_sh(Clamped(&mut param), width as u32, width as u32)?;

    Ok(image_data)
}

#[wasm_bindgen]
pub fn pre_singrat(id: &str, x: f64, y: f64, radius: i32, pixels_per_degree: f32, spatial_frequency: f32, angle: f32, contrast: f32, phase: f32, gamma: f32) -> Result<(), JsValue> {
    let document = window().unwrap().document().unwrap();
    let canvas = document.get_element_by_id(id).unwrap();
    let canvas: web_sys::HtmlCanvasElement = canvas.dyn_into::<web_sys::HtmlCanvasElement>()?;
    
    // 获取 CanvasRenderingContext2D
    let context = canvas
        .get_context("2d")?
        .unwrap()
        .dyn_into::<CanvasRenderingContext2d>()?;
    // JsValue::from(0)

    let image_data = singrat(radius, pixels_per_degree, spatial_frequency, angle, contrast, phase, gamma)?;

    context.put_image_data(&image_data, x, y)?;

    Ok(())
}
