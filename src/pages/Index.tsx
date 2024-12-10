import { useState } from "react";
import { TeamHeader } from "@/components/TeamHeader";
import { PlayerCard } from "@/components/PlayerCard";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const Index = () => {
  const [primaryColor, setPrimaryColor] = useState("#8B1F41");
  const [players, setPlayers] = useState([0]); // Array of player card indices

  const addPlayer = () => {
    setPlayers([...players, players.length]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <TeamHeader onColorChange={setPrimaryColor} />
        
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
      </div>
    </div>
  );
};

export default Index;