import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export const DownloadButtons = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleDownloadPNG = async () => {
    const element = document.getElementById('scout-report');
    if (!element) return;
    
    setIsLoading(true);
    try {
      const dataUrl = await toPng(element);
      const link = document.createElement('a');
      link.download = 'scout-report.png';
      link.href = dataUrl;
      link.click();
      toast({
        title: "Success",
        description: "PNG file downloaded successfully",
      });
    } catch (err) {
      console.error('Error generating PNG:', err);
      toast({
        title: "Error",
        description: "Failed to generate PNG file",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById('scout-report');
    if (!element) return;
    
    setIsLoading(true);
    try {
      // Standard US Letter size in points (72 points per inch)
      const pageWidth = 8.5 * 72;
      const pageHeight = 11 * 72;
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: [pageWidth, pageHeight]
      });

      // Convert the element to a canvas
      const canvas = await toPng(element);
      
      // Calculate the aspect ratio of the content
      const contentWidth = element.offsetWidth;
      const contentHeight = element.offsetHeight;
      const aspectRatio = contentHeight / contentWidth;
      
      // Calculate dimensions to fit within page margins (0.5 inch margins)
      const margin = 36; // 0.5 inch in points
      const maxWidth = pageWidth - (margin * 2);
      const maxHeight = pageHeight - (margin * 2);
      
      // Calculate scaled dimensions
      let scaledWidth = maxWidth;
      let scaledHeight = scaledWidth * aspectRatio;
      
      // If the height is too large, scale based on height instead
      if (scaledHeight > maxHeight) {
        scaledHeight = maxHeight;
        scaledWidth = scaledHeight / aspectRatio;
      }
      
      // Calculate number of pages needed
      const totalHeight = element.offsetHeight * (scaledWidth / element.offsetWidth);
      const pagesNeeded = Math.ceil(totalHeight / maxHeight);
      
      // Add content to pages
      for (let i = 0; i < pagesNeeded; i++) {
        if (i > 0) {
          pdf.addPage();
        }
        
        // Calculate the portion of the image to use for this page
        const sourceY = (i * element.offsetHeight / pagesNeeded);
        const sourceHeight = element.offsetHeight / pagesNeeded;
        
        // Add image with correct clipping
        pdf.addImage(
          canvas,
          'PNG',
          margin,
          margin,
          scaledWidth,
          scaledHeight,
          undefined,
          'FAST'
        );
      }
      
      pdf.save('scout-report.pdf');
      toast({
        title: "Success",
        description: "PDF file downloaded successfully",
      });
    } catch (err) {
      console.error('Error generating PDF:', err);
      toast({
        title: "Error",
        description: "Failed to generate PDF file",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex gap-4 mb-8">
      <Button 
        onClick={handleDownloadPNG} 
        variant="outline"
        disabled={isLoading}
      >
        <Download className="mr-2 h-4 w-4" />
        {isLoading ? "Generating..." : "Download PNG"}
      </Button>
      <Button 
        onClick={handleDownloadPDF} 
        variant="outline"
        disabled={isLoading}
      >
        <Download className="mr-2 h-4 w-4" />
        {isLoading ? "Generating..." : "Download PDF"}
      </Button>
    </div>
  );
};
