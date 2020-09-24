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

  //转换canvas为图片
  const image = canvas.toDataURL("image/jpeg", 1.0);

  //计算相关常量
  const a4 = [592.28, 841.89];
  const content_scale = canvas.width / a4[0];
  const a4_height = content_scale * a4[1];

  //将内容循环添加到PDF中
  let offset = 0;
  const pdf = new JsPdf("p", "pt", "a4");
  while (true) {
    const start_y = 0 - offset / content_scale;
    const height = canvas.height / content_scale;
    pdf.addImage(image, "JPEG", 0, start_y, a4[0], height);

    //计算偏移量添加分页
    offset += a4_height;
    if (canvas.height - offset >= 0) {
      pdf.addPage();
    } else {
      break;
    }
  }
  pdf.save(filename);
}
