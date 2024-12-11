import { useState } from "react";
import { TeamHeader } from "@/components/TeamHeader";
import { TeamStats } from "@/components/TeamStats";
import { PlayerCard } from "@/components/PlayerCard";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Save, Upload, Eye, EyeOff } from "lucide-react";
import { DownloadButtons } from "@/components/DownloadButtons";
import { useToast } from "@/hooks/use-toast";

interface ReportData {
  primaryColor: string;
  players: number[];
  otherNotes: string;
}

const Index = () => {
  const [primaryColor, setPrimaryColor] = useState("#8B1F41");
  const [players, setPlayers] = useState([0]);
  const [otherNotes, setOtherNotes] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const { toast } = useToast();

  const addPlayer = () => {
    setPlayers([...players, players.length]);
  };

  const handleSaveReport = () => {
    const reportData: ReportData = {
      primaryColor,
      players,
      otherNotes,
    };
    
    const blob = new Blob([JSON.stringify(reportData)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'scout-report.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Success",
      description: "Report saved successfully",
    });
  };

  const handleLoadReport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const reportData: ReportData = JSON.parse(content);
        
        setPrimaryColor(reportData.primaryColor);
        setPlayers(reportData.players);
        setOtherNotes(reportData.otherNotes);

        toast({
          title: "Success",
          description: "Report loaded successfully",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load report",
          variant: "destructive",
        });
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap gap-4 mb-8 items-center justify-between">
          <div className="flex flex-wrap gap-4">
            <DownloadButtons />
            <Button 
              onClick={handleSaveReport}
              variant="outline"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Report
            </Button>
            <label>
              <Button 
                variant="outline"
                className="cursor-pointer"
                asChild
              >
                <span>
                  <Upload className="w-4 h-4 mr-2" />
                  Load Report
                </span>
              </Button>
              <input
                type="file"
                onChange={handleLoadReport}
                accept=".json"
                className="hidden"
              />
            </label>
          </div>
          <Button
            onClick={() => setIsPreview(!isPreview)}
            variant="outline"
            className="ml-auto"
          >
            {isPreview ? (
              <>
                <EyeOff className="w-4 h-4 mr-2" />
                Edit Mode
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 mr-2" />
                Preview Mode
              </>
            )}
          </Button>
        </div>
        
        <div id="scout-report" className="space-y-8">
          <TeamHeader onColorChange={setPrimaryColor} previewMode={isPreview} />
          <TeamStats previewMode={isPreview} />
          
          <div className="space-y-6">
            {players.map((index) => (
              <PlayerCard key={index} previewMode={isPreview} />
            ))}
          </div>
          
          {!isPreview && (
            <Button 
              onClick={addPlayer}
              className="mt-6 w-full"
              variant="outline"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Add Player
            </Button>
          )}

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2 text-primary">Other Notes</h3>
            {isPreview ? (
              <div className="prose max-w-none">
                {otherNotes ? (
                  <p className="whitespace-pre-wrap">{otherNotes}</p>
                ) : (
                  <p className="text-gray-500 italic">No additional notes</p>
                )}
              </div>
            ) : (
              <Textarea
                value={otherNotes}
                onChange={(e) => setOtherNotes(e.target.value)}
                placeholder="Enter additional notes about the team, game plan, or specific strategies..."
                className="min-h-[200px]"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;