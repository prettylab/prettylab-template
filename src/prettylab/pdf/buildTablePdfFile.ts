import { UserOptions } from "jspdf-autotable";
import { jsPDF } from "jspdf";

type SlotProps = {
  autoTable?: UserOptions;
  pdfProps?: jsPDF;
};

type Options = {
  head?: Array<any>;
  body?: any;
  fileName?: string;
  font?: string;
  fontSize?: number;
  slotProps?: SlotProps;
  docWrapper?: (doc: jsPDF) => void;
};

export const buildTablePdfFile = async ({
  head,
  body,
  fileName,
  font = "Roboto-Regular",
  fontSize = 16,
  slotProps,
  docWrapper,
}: Options) => {
  const jsPDFModule = await import("jspdf");
  const autoTable = (await import("jspdf-autotable")).default;

  // @ts-ignore
  const doc = new jsPDFModule.jsPDF({
    orientation: "landscape",
    unit: "pt",
    format: "a4",
    ...slotProps?.pdfProps,
  });

  doc.setFont(font);
  doc.setFontSize(fontSize);

  if (docWrapper) {
    docWrapper(doc);
  }

  autoTable(doc, {
    startY: 60,
    head,
    body,
    styles: {
      fontSize: 8,
      cellPadding: 4,
      halign: "left",
      valign: "middle",
      font: "Roboto-Regular",
    },
    headStyles: {
      fillColor: [0, 49, 40],
      textColor: 255,
      fontStyle: "bold",
      font: "Roboto-Regular",
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
    margin: { left: 40, right: 40 },
    ...slotProps?.autoTable,
  });

  doc.save(fileName);
};
