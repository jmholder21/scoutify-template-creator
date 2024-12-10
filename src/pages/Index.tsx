import { useState } from "react";
import { TeamHeader } from "@/components/TeamHeader";
import { TeamStats } from "@/components/TeamStats";
import { PlayerCard } from "@/components/PlayerCard";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle } from "lucide-react";
import { DownloadButtons } from "@/components/DownloadButtons";

const Index = () => {
  const [primaryColor, setPrimaryColor] = useState("#8B1F41");
  const [players, setPlayers] = useState([0]);
  const [otherNotes, setOtherNotes] = useState("");

  const addPlayer = () => {
    setPlayers([...players, players.length]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <DownloadButtons />
        
        <div id="scout-report">
          <TeamHeader onColorChange={setPrimaryColor} />
          <TeamStats />
          
          <div className="space-y-6">
            {players.map((index) => (
              <PlayerCard key={index} />
            ))}
          </div>
          
          <Button 
            onClick={addPlayer}
            className="mt-6 w-full"
            variant="outline"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Player
          </Button>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2 text-primary">Other Notes</h3>
            <Textarea
              value={otherNotes}
              onChange={(e) => setOtherNotes(e.target.value)}
              placeholder="Enter additional notes about the team, game plan, or specific strategies..."
              className="min-h-[200px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;