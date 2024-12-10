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
  leadingScorers: {
    lastName: string;
    number: string;
    stats: string;
  }[];
}

export const TeamStats = () => {
  const [games, setGames] = useState<Game[]>(
    Array(5).fill({
      result: "W",
      opponent: "",
      location: "Home",
      score: "",
      leadingScorers: Array(3).fill({
        lastName: "",
        number: "",
        stats: "",
      }),
    })
  );

  const [strengths, setStrengths] = useState("");
  const [weaknesses, setWeaknesses] = useState("");
  const [keysToVictory, setKeysToVictory] = useState("");

  const updateGame = (index: number, field: keyof Omit<Game, "leadingScorers">, value: string) => {
    const newGames = [...games];
    newGames[index] = { ...newGames[index], [field]: value };
    setGames(newGames);
  };

  const updateScorer = (gameIndex: number, scorerIndex: number, field: string, value: string) => {
    const newGames = [...games];
    newGames[gameIndex] = {
      ...newGames[gameIndex],
      leadingScorers: newGames[gameIndex].leadingScorers.map((scorer, idx) =>
        idx === scorerIndex ? { ...scorer, [field]: value } : scorer
      ),
    };
    setGames(newGames);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8 space-y-8">
      <div>
        <h3 className="text-xl font-semibold mb-4">Last 5 Games</h3>
        <div className="space-y-8">
          {games.map((game, gameIndex) => (
            <div key={gameIndex} className="border-b pb-6 last:border-b-0">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center mb-4">
                <div>
                  <Label>Result</Label>
                  <RadioGroup
                    value={game.result}
                    onValueChange={(value) => updateGame(gameIndex, "result", value)}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="W" id={`W-${gameIndex}`} />
                      <Label htmlFor={`W-${gameIndex}`}>Win</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="L" id={`L-${gameIndex}`} />
                      <Label htmlFor={`L-${gameIndex}`}>Loss</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div>
                  <Label>Opponent</Label>
                  <Input
                    value={game.opponent}
                    onChange={(e) => updateGame(gameIndex, "opponent", e.target.value)}
                    placeholder="Opponent name"
                  />
                </div>
                
                <div>
                  <Label>Location</Label>
                  <RadioGroup
                    value={game.location}
                    onValueChange={(value) => updateGame(gameIndex, "location", value)}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Home" id={`Home-${gameIndex}`} />
                      <Label htmlFor={`Home-${gameIndex}`}>Home</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Away" id={`Away-${gameIndex}`} />
                      <Label htmlFor={`Away-${gameIndex}`}>Away</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Neutral" id={`Neutral-${gameIndex}`} />
                      <Label htmlFor={`Neutral-${gameIndex}`}>Neutral</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div>
                  <Label>Score</Label>
                  <Input
                    value={game.score}
                    onChange={(e) => updateGame(gameIndex, "score", e.target.value)}
                    placeholder="Score (e.g., 85-79)"
                  />
                </div>
              </div>

              <div className="mt-4">
                <Label className="mb-2 block">Leading Scorers</Label>
                <div className="space-y-2">
                  {game.leadingScorers.map((scorer, scorerIndex) => (
                    <div key={scorerIndex} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Input
                          value={scorer.lastName}
                          onChange={(e) => updateScorer(gameIndex, scorerIndex, "lastName", e.target.value)}
                          placeholder="Last name"
                        />
                      </div>
                      <div>
                        <Input
                          value={scorer.number}
                          onChange={(e) => updateScorer(gameIndex, scorerIndex, "number", e.target.value)}
                          placeholder="#"
                        />
                      </div>
                      <div>
                        <Input
                          value={scorer.stats}
                          onChange={(e) => updateScorer(gameIndex, scorerIndex, "stats", e.target.value)}
                          placeholder="Quick stats"
                        />
                      </div>
                    </div>
                  ))}
                </div>
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