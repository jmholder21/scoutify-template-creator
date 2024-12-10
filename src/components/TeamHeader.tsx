import { UploadCloud } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TeamHeaderProps {
  onColorChange: (color: string) => void;
}

export const TeamHeader = ({ onColorChange }: TeamHeaderProps) => {
  const [logo, setLogo] = useState<string>("");
  const [teamName, setTeamName] = useState("");
  const [opponent, setOpponent] = useState("");
  const [opponentRecord, setOpponentRecord] = useState("");
  const [gameDate, setGameDate] = useState("");

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-primary text-white p-6 rounded-lg mb-8">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-shrink-0 w-24 h-24 relative">
          {logo ? (
            <img src={logo} alt="Team logo" className="w-full h-full object-contain" />
          ) : (
            <div className="w-full h-full border-2 border-dashed border-white/50 rounded-lg flex items-center justify-center">
              <UploadCloud className="w-8 h-8 text-white/50" />
            </div>
          )}
          <Input
            type="file"
            onChange={handleLogoUpload}
            className="absolute inset-0 opacity-0 cursor-pointer"
            accept="image/*"
          />
        </div>
        
        <div className="flex-grow space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="teamName" className="text-white/90">Team Name</Label>
              <Input
                id="teamName"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="bg-white/10 border-white/20 text-white"
                placeholder="Enter team name"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="opponent" className="text-white/90">Opponent</Label>
                <Input
                  id="opponent"
                  value={opponent}
                  onChange={(e) => setOpponent(e.target.value)}
                  className="bg-white/10 border-white/20 text-white"
                  placeholder="Enter opponent"
                />
              </div>
              <div>
                <Label htmlFor="opponentRecord" className="text-white/90">Record</Label>
                <Input
                  id="opponentRecord"
                  value={opponentRecord}
                  onChange={(e) => setOpponentRecord(e.target.value)}
                  className="bg-white/10 border-white/20 text-white"
                  placeholder="0-0"
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="gameDate" className="text-white/90">Game Date</Label>
              <Input
                id="gameDate"
                type="date"
                value={gameDate}
                onChange={(e) => setGameDate(e.target.value)}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
            <div>
              <Label htmlFor="teamColor" className="text-white/90">Team Color</Label>
              <Input
                id="teamColor"
                type="color"
                onChange={(e) => onColorChange(e.target.value)}
                className="h-10 p-1 bg-white/10 border-white/20"
                defaultValue="#8B1F41"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};