import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import { saveAs } from "file-saver";

export const DownloadButtons = () => {
  const handleDownloadPNG = async () => {
    const element = document.getElementById('scout-report');
    if (!element) return;
    
    try {
      const dataUrl = await toPng(element);
      const link = document.createElement('a');
      link.download = 'scout-report.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error generating PNG:', err);
    }
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById('scout-report');
    if (!element) return;
    
    try {
      const canvas = await toPng(element);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [element.offsetWidth, element.offsetHeight]
      });
      
      pdf.addImage(canvas, 'PNG', 0, 0, element.offsetWidth, element.offsetHeight);
      pdf.save('scout-report.pdf');
    } catch (err) {
      console.error('Error generating PDF:', err);
    }
  };

  return (
    <div className="flex gap-4 mb-8">
      <Button onClick={handleDownloadPNG} variant="outline">
        <Download className="mr-2 h-4 w-4" />
        Download PNG
      </Button>
      <Button onClick={handleDownloadPDF} variant="outline">
        <Download className="mr-2 h-4 w-4" />
        Download PDF
      </Button>
    </div>
  );
};