// utils/pdfGenerator.js

export const downloadInvoice = async (placedOrder) => {
  if (!placedOrder) return;
  
  // ডাইনামিক ইমপোর্ট রাখা ভালো যাতে মেইন বান্ডেল সাইজ ছোট থাকে
  const { jsPDF } = await import("jspdf/dist/jspdf.es.min.js");
  const { default: autoTable } = await import("jspdf-autotable");
  
  const doc = new jsPDF();

  // আপনার আগের লজিক এখানে বসান
  doc.setFillColor(34, 197, 94);
  doc.rect(0, 0, 210, 35, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.text("INVOICE", 15, 22);
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Thank you for your business!", 150, 20);

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("BILL TO:", 15, 50);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Name: ${placedOrder.customer.name}`, 15, 56);
  doc.text(`Phone: ${placedOrder.customer.phone}`, 15, 61);
  doc.text(`Address: ${placedOrder.customer.address}`, 15, 66);

  doc.setDrawColor(200, 200, 200);
  doc.line(15, 72, 195, 72);

  const tableColumn = ["Product Name", "Qty", "Price ", "Total "];
  const tableRows = placedOrder.products.map((p) => [
    p.name,
    p.quantity,
    p.price.toLocaleString(),
    (p.price * p.quantity).toLocaleString(),
  ]);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 80,
    headStyles: { fillColor: [34, 197, 94], fontSize: 11, halign: 'center' },
    columnStyles: { 
        1: { halign: 'center' }, 
        2: { halign: 'right' }, 
        3: { halign: 'right' } 
    },
    theme: 'striped',
    margin: { left: 15, right: 15 },
  });

  const finalY = doc.lastAutoTable.finalY + 15;
  
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(`Shipping:`, 140, finalY);
  doc.text(`${placedOrder.shipping?.toLocaleString() || 0}`, 190, finalY, { align: 'right' });
  
  doc.setFontSize(14);
  doc.setTextColor(34, 197, 94);
  doc.text(`Total Amount:`, 140, finalY + 10);
  doc.text(`${placedOrder.total?.toLocaleString()}`, 190, finalY + 10, { align: 'right' });

  doc.setTextColor(100, 100, 100);
  doc.setFontSize(9);
  doc.text("This is a computer generated invoice.", 105, 285, { align: 'center' });

  doc.save(`Invoice_${placedOrder.orderId || 'Generated'}.pdf`);
};