import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

interface Game {
  result: "W" | "L";
  opponent: string;
  location: "Home" | "Away" | "Neutral";
  score: string;
}

interface LeadingScorer {
  lastName: string;
  number: string;
  stats: string;
}

export const TeamStats = () => {
  const [games, setGames] = useState<Game[]>(Array(5).fill({
    result: "W",
    opponent: "",
    location: "Home",
    score: "",
  }));

  const [leadingScorers, setLeadingScorers] = useState<LeadingScorer[]>(
    Array(3).fill({
      lastName: "",
      number: "",
      stats: "",
    })
  );

  const [strengths, setStrengths] = useState("");
  const [weaknesses, setWeaknesses] = useState("");
  const [keysToVictory, setKeysToVictory] = useState("");

  const updateGame = (index: number, field: keyof Game, value: string) => {
    const newGames = [...games];
    newGames[index] = { ...newGames[index], [field]: value };
    setGames(newGames);
  };

  const updateScorer = (index: number, field: keyof LeadingScorer, value: string) => {
    const newScorers = [...leadingScorers];
    newScorers[index] = { ...newScorers[index], [field]: value };
    setLeadingScorers(newScorers);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8 space-y-8">
      <div>
        <h3 className="text-xl font-semibold mb-4">Last 5 Games</h3>
        <div className="space-y-4">
          {games.map((game, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <div>
                <Label>Result</Label>
                <RadioGroup
                  value={game.result}
                  onValueChange={(value) => updateGame(index, "result", value)}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="W" id={`W-${index}`} />
                    <Label htmlFor={`W-${index}`}>Win</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="L" id={`L-${index}`} />
                    <Label htmlFor={`L-${index}`}>Loss</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <Label>Opponent</Label>
                <Input
                  value={game.opponent}
                  onChange={(e) => updateGame(index, "opponent", e.target.value)}
                  placeholder="Opponent name"
                />
              </div>
              
              <div>
                <Label>Location</Label>
                <RadioGroup
                  value={game.location}
                  onValueChange={(value) => updateGame(index, "location", value)}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Home" id={`Home-${index}`} />
                    <Label htmlFor={`Home-${index}`}>Home</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Away" id={`Away-${index}`} />
                    <Label htmlFor={`Away-${index}`}>Away</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Neutral" id={`Neutral-${index}`} />
                    <Label htmlFor={`Neutral-${index}`}>Neutral</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <Label>Score</Label>
                <Input
                  value={game.score}
                  onChange={(e) => updateGame(index, "score", e.target.value)}
                  placeholder="Score (e.g., 85-79)"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Leading Scorers</h3>
        <div className="space-y-4">
          {leadingScorers.map((scorer, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Last Name</Label>
                <Input
                  value={scorer.lastName}
                  onChange={(e) => updateScorer(index, "lastName", e.target.value)}
                  placeholder="Player's last name"
                />
              </div>
              <div>
                <Label>Number</Label>
                <Input
                  value={scorer.number}
                  onChange={(e) => updateScorer(index, "number", e.target.value)}
                  placeholder="#"
                />
              </div>
              <div>
                <Label>Quick Stats</Label>
                <Input
                  value={scorer.stats}
                  onChange={(e) => updateScorer(index, "stats", e.target.value)}
                  placeholder="e.g., 22pts, 5/10 from 3"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label>Team Strengths</Label>
          <Textarea
            value={strengths}
            onChange={(e) => setStrengths(e.target.value)}
            placeholder="Enter team strengths..."
            className="h-32"
          />
        </div>
        <div>
          <Label>Team Weaknesses</Label>
          <Textarea
            value={weaknesses}
            onChange={(e) => setWeaknesses(e.target.value)}
            placeholder="Enter team weaknesses..."
            className="h-32"
          />
        </div>
      </div>

      <div>
        <Label>Keys to Victory</Label>
        <Textarea
          value={keysToVictory}
          onChange={(e) => setKeysToVictory(e.target.value)}
          placeholder="Enter keys to victory..."
          className="h-32"
        />
      </div>
    </div>
  );
};