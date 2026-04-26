// utils/pdfGenerator.js

// ── কোম্পানির তথ্য এখানে পরিবর্তন করুন ──────────────────────────────────────
const COMPANY = {
  name:    "Your Company Ltd.",
  tagline: "Quality You Can Trust",
  email:   "support@yourcompany.com",
  phone:   "+880 1700-000000",
  address: "123 Business Ave, Dhaka 1200, Bangladesh",
  website: "www.yourcompany.com",
};
// ─────────────────────────────────────────────────────────────────────────────

// রঙের প্যালেট (প্রিমিয়াম ডার্ক + গোল্ড অ্যাকসেন্ট)
const C = {
  dark:       [15,  23,  42],   // slate-900
  mid:        [30,  41,  59],   // slate-800
  accent:     [234, 179,  8],   // amber-500 (gold)
  accentDark: [180, 130,  0],   // amber-700
  white:      [255, 255, 255],
  light:      [248, 250, 252],  // slate-50
  muted:      [100, 116, 139],  // slate-500
  border:     [203, 213, 225],  // slate-300
  rowAlt:     [241, 245, 249],  // slate-100
};

/** ছোট helper: RGB অ্যারে থেকে setFillColor / setTextColor / setDrawColor */
const fill  = (doc, rgb) => doc.setFillColor  (...rgb);
const text  = (doc, rgb) => doc.setTextColor  (...rgb);
const draw  = (doc, rgb) => doc.setDrawColor  (...rgb);

export const downloadInvoice = async (placedOrder) => {
  if (!placedOrder) return;

  const { jsPDF }           = await import("jspdf/dist/jspdf.es.min.js");
  const { default: autoTable } = await import("jspdf-autotable");

  const doc  = new jsPDF({ unit: "mm", format: "a4" });
  const PW   = 210;   // page width
  const ML   = 14;    // margin left
  const MR   = 196;   // margin right

  // ── 1. HEADER BACKGROUND ─────────────────────────────────────────────────
  fill(doc, C.dark);
  doc.rect(0, 0, PW, 50, "F");

  // সোনালি accent strip (বাম পাশের পাতলা বার)
  fill(doc, C.accent);
  doc.rect(0, 0, 5, 50, "F");

  // ── 2. কোম্পানির নাম + ট্যাগলাইন ─────────────────────────────────────────
  text(doc, C.accent);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text(COMPANY.name, ML + 6, 20);

  text(doc, [180, 190, 210]);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(9);
  doc.text(COMPANY.tagline, ML + 6, 27);

  // ── 3. INVOICE টেক্সট (ডান দিকে) ─────────────────────────────────────────
  text(doc, C.white);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.text("INVOICE", MR, 22, { align: "right" });

  // অর্ডার আইডি + তারিখ
  text(doc, C.accent);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  const date = new Date().toLocaleDateString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
  });
  doc.text(`#${placedOrder.orderId || "0000"}`, MR, 30, { align: "right" });
  doc.text(`Date: ${date}`, MR, 36, { align: "right" });

  // ── 4. GOLD DIVIDER LINE ─────────────────────────────────────────────────
  fill(doc, C.accent);
  doc.rect(0, 50, PW, 1.5, "F");

  // ── 5. BILL TO সেকশন ──────────────────────────────────────────────────────
  // ব্যাকগ্রাউন্ড কার্ড
  fill(doc, C.light);
  doc.roundedRect(ML, 57, 88, 40, 2, 2, "F");
  draw(doc, C.border);
  doc.setLineWidth(0.3);
  doc.roundedRect(ML, 57, 88, 40, 2, 2, "S");

  // "BILL TO" লেবেল
  fill(doc, C.dark);
  doc.rect(ML, 57, 88, 8, "F");
  text(doc, C.accent);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text("BILL TO", ML + 4, 62.5);

  text(doc, C.dark);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text(placedOrder.customer?.name || "—", ML + 4, 71);

  text(doc, C.muted);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(`Phone: ${placedOrder.customer?.phone || "—"}`, ML + 4, 77);

  // ঠিকানা দীর্ঘ হতে পারে তাই splitTextToSize ব্যবহার
  const addrLines = doc.splitTextToSize(
    `Address: ${placedOrder.customer?.address || "—"}`, 80
  );
  doc.text(addrLines, ML + 4, 83);

  // ── 6. ORDER SUMMARY কার্ড (ডান দিকে) ────────────────────────────────────
  fill(doc, C.light);
  doc.roundedRect(110, 57, 86, 40, 2, 2, "F");
  draw(doc, C.border);
  doc.roundedRect(110, 57, 86, 40, 2, 2, "S");

  fill(doc, C.dark);
  doc.rect(110, 57, 86, 8, "F");
  text(doc, C.accent);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text("ORDER DETAILS", 114, 62.5);

  const details = [
    ["Order ID",  `#${placedOrder.orderId || "—"}`],
    ["Date",      date],
    ["Status",    "Confirmed"],
    ["Payment",   "Cash on Delivery"],
  ];
  details.forEach(([label, val], i) => {
    const y = 71 + i * 6.5;
    text(doc, C.muted);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.text(label, 114, y);

    text(doc, C.dark);
    doc.setFont("helvetica", "bold");
    doc.text(val, 193, y, { align: "right" });
  });

  // ── 7. ITEMS TABLE ────────────────────────────────────────────────────────
  const tableRows = placedOrder.products.map((p, i) => [
    i + 1,
    p.name,
    p.quantity,
    `${Number(p.price).toLocaleString()} `,
    `${(p.price * p.quantity).toLocaleString()} `,
  ]);

  autoTable(doc, {
    head: [["#", "Product Name", "Qty", "Unit Price", "Total"]],
    body: tableRows,
    startY: 103,
    margin: { left: ML, right: PW - MR },
    tableWidth: MR - ML,

    headStyles: {
      fillColor:   C.dark,
      textColor:   C.accent,
      fontStyle:   "bold",
      fontSize:    9.5,
      halign:      "center",
      cellPadding: 4,
    },
    columnStyles: {
      0: { halign: "center", cellWidth: 10  },
      1: { halign: "left",   cellWidth: "auto" },
      2: { halign: "center", cellWidth: 16  },
      3: { halign: "right",  cellWidth: 32  },
      4: { halign: "right",  cellWidth: 32  },
    },
    bodyStyles: {
      fontSize:    9,
      cellPadding: 3.5,
      textColor:   C.dark,
    },
    alternateRowStyles: { fillColor: C.rowAlt },
    theme: "plain",

    // header-এর নিচে একটা গোল্ড লাইন
    didDrawCell(data) {
      if (data.section === "head" && data.row.index === 0) {
        const { x, y, width, height } = data.cell;
        fill(doc, C.accent);
        doc.rect(x, y + height - 0.8, width, 0.8, "F");
      }
    },
  });

  // ── 8. SUMMARY BOX (ডানদিকে নিচে) ───────────────────────────────────────
  const tableBottom = doc.lastAutoTable.finalY;
  const SY = tableBottom + 6;      // summary শুরুর Y
  const SX = 118;                   // summary বক্সের X
  const SW = MR - SX;              // বক্সের প্রস্থ

  // বক্স ব্যাকগ্রাউন্ড
  fill(doc, C.light);
  doc.roundedRect(SX, SY, SW, 32, 2, 2, "F");
  draw(doc, C.border);
  doc.setLineWidth(0.3);
  doc.roundedRect(SX, SY, SW, 32, 2, 2, "S");

  // Subtotal
  const subtotal = placedOrder.products.reduce(
    (sum, p) => sum + p.price * p.quantity, 0
  );
  const shipping = placedOrder.shipping || 0;
  const total    = placedOrder.total ?? subtotal + shipping;

  const drawRow = (label, value, y, bold = false, highlight = false) => {
    text(doc, bold ? C.dark : C.muted);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(bold ? 10 : 9);
    doc.text(label, SX + 5, y);

    text(doc, highlight ? C.accent : C.dark);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(bold ? 11 : 9);
    doc.text(value, MR - 3, y, { align: "right" });
  };

  drawRow("Subtotal",  `${subtotal.toLocaleString()} `,  SY + 9);
  drawRow("Shipping",  `${shipping.toLocaleString()} `,  SY + 17);

  // divider
  draw(doc, C.border);
  doc.setLineWidth(0.4);
  doc.line(SX + 4, SY + 20, MR - 2, SY + 20);

  // Total (বড় + গোল্ড)
  text(doc, C.dark);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Grand Total", SX + 5, SY + 28);

  text(doc, C.accent);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text(`${total.toLocaleString()} `, MR - 3, SY + 28, { align: "right" });

  // ── 9. THANK YOU NOTE ─────────────────────────────────────────────────────
  const noteY = SY + 6;
  fill(doc, C.rowAlt);
  doc.roundedRect(ML, noteY, SW - 2, 22, 2, 2, "F");
  draw(doc, C.border);
  doc.setLineWidth(0.25);
  doc.roundedRect(ML, noteY, SW - 2, 22, 2, 2, "S");

  // গোল্ড বাম বর্ডার
  fill(doc, C.accent);
  doc.rect(ML, noteY, 3, 22, "F");

  text(doc, C.dark);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("Thank You for Your Order!", ML + 7, noteY + 8);

  text(doc, C.muted);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text(
    "We appreciate your business. For any queries, feel free to contact us.",
    ML + 7, noteY + 14, { maxWidth: SW - 14 }
  );

  // ── 10. FOOTER ────────────────────────────────────────────────────────────
  const FY = 272;  // footer শুরুর Y

  // গাঢ় ফুটার ব্যাকগ্রাউন্ড
  fill(doc, C.mid);
  doc.rect(0, FY, PW, 25, "F");

  // গোল্ড top border
  fill(doc, C.accent);
  doc.rect(0, FY, PW, 1.2, "F");

  // কোম্পানি তথ্য — তিন কলামে
  const colW = PW / 3;
  const items = [
    { icon: "✉", label: COMPANY.email   },
    { icon: "☎", label: COMPANY.phone   },
    { icon: "🌐", label: COMPANY.website },
  ];

  items.forEach(({ icon, label }, i) => {
    const cx = colW * i + colW / 2;

    text(doc, C.accent);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(icon, cx, FY + 8, { align: "center" });

    text(doc, [200, 210, 220]);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.text(label, cx, FY + 14, { align: "center" });
  });

  // কোম্পানির ঠিকানা + disclaimer
  text(doc, [150, 160, 175]);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(6.5);
  doc.text(
    `${COMPANY.address}  |  This is a computer-generated invoice. No signature required.`,
    PW / 2, FY + 21, { align: "center" }
  );

  // ── 11. সেভ ──────────────────────────────────────────────────────────────
  doc.save(`Invoice_${placedOrder.orderId || "Generated"}.pdf`);
};