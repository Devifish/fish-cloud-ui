import Html2Canvas from "html2canvas";
import JsPdf from "jspdf";

/**
 * 导出PDF
 *
 * @param el HTMLElement
 * @param scale 缩放
 * @param filename 文件名
 */
export async function exportPdf(el: HTMLElement, scale: number, filename: string) {
  const canvas = await Html2Canvas(el, { scale });

  // 转换canvas为图片
  const image = canvas.toDataURL("image/jpeg", 1.0);

  // 计算相关常量
  const a4 = { width: 592.28, height: 841.89 };
  const content_scale = canvas.width / a4.width;
  const page_height = canvas.height / content_scale;
  const a4_height = content_scale * a4.height;

  // 将内容循环添加到PDF中
  let offset = 0;
  const pdf = new JsPdf("p", "pt", "a4");
  while (true) {
    const offset_y = 0 - offset / content_scale;
    pdf.addImage(image, "JPEG", 0, offset_y, a4.width, page_height);

    // 计算偏移量添加分页
    offset += a4_height;
    if (canvas.height - offset >= 0) {
      pdf.addPage();
    } else {
      break;
    }
  }
  pdf.save(filename);
}
