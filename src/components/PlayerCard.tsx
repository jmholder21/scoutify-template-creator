import { UploadCloud } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface PlayerCardProps {
  previewMode?: boolean;
}

export const PlayerCard = ({ previewMode = false }: PlayerCardProps) => {
  const [headshot, setHeadshot] = useState<string>("");
  const [playerData, setPlayerData] = useState({
    number: "",
    name: "",
    position: "",
    height: "",
    weight: "",
    year: "",
    stats: {
      gpgs: "",
      min: "",
      pts: "",
      fgp: "",
      threep: "",
      ftp: "",
      reb: "",
    },
    notes: "",
    emphasis: "",
    defenders: "",
  });
  const { toast } = useToast();
  
  const handleHeadshotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5000000) {
        toast({
          title: "Error",
          description: "Image must be less than 5MB",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setHeadshot(reader.result as string);
        toast({
          title: "Success",
          description: "Image uploaded successfully",
        });
      };
      reader.onerror = () => {
        toast({
          title: "Error",
          description: "Failed to upload image",
          variant: "destructive",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setPlayerData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setPlayerData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0">
          <div className="w-32 h-40 relative mb-4">
            {!previewMode && (
              <label className="block w-full h-full cursor-pointer">
                {headshot ? (
                  <img src={headshot} alt="Player headshot" className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <div className="w-full h-full border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                    <UploadCloud className="w-8 h-8 text-gray-400" />
                  </div>
                )}
                <Input
                  type="file"
                  onChange={handleHeadshotUpload}
                  className="hidden"
                  accept="image/*"
                />
              </label>
            )}
            {previewMode && headshot && (
              <img src={headshot} alt="Player headshot" className="w-full h-full object-cover rounded-lg" />
            )}
            {previewMode && !headshot && (
              <div className="w-full h-full border rounded-lg flex items-center justify-center bg-gray-50">
                <span className="text-gray-400 text-sm">No photo</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex-grow space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {previewMode ? (
              <>
                <div className="text-center">
                  <span className="text-2xl font-bold">{playerData.number || '#'}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-xl font-semibold">{playerData.name || 'Player Name'}</span>
                </div>
                <div>
                  <span className="text-lg">{playerData.position || 'POS'}</span>
                </div>
              </>
            ) : (
              <>
                <div>
                  <Input 
                    placeholder="#" 
                    className="text-center"
                    value={playerData.number}
                    onChange={(e) => handleInputChange('number', e.target.value)}
                  />
                  <label className="text-xs text-gray-500 mt-1 block text-center">Number</label>
                </div>
                <div className="col-span-2">
                  <Input 
                    placeholder="Player Name"
                    value={playerData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                  <label className="text-xs text-gray-500 mt-1 block">Name</label>
                </div>
                <div>
                  <Input 
                    placeholder="G"
                    value={playerData.position}
                    onChange={(e) => handleInputChange('position', e.target.value)}
                  />
                  <label className="text-xs text-gray-500 mt-1 block">Position</label>
                </div>
              </>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4">
            {previewMode ? (
              <>
                <div>
                  <span>{playerData.height || 'Height N/A'}</span>
                </div>
                <div>
                  <span>{playerData.weight ? `${playerData.weight} lbs` : 'Weight N/A'}</span>
                </div>
                <div>
                  <span>{playerData.year || 'Year N/A'}</span>
                </div>
              </>
            ) : (
              <>
                <div>
                  <Input 
                    placeholder="6'2&quot;"
                    value={playerData.height}
                    onChange={(e) => handleInputChange('height', e.target.value)}
                  />
                  <label className="text-xs text-gray-500 mt-1 block">Height</label>
                </div>
                <div>
                  <Input 
                    placeholder="180"
                    value={playerData.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                  />
                  <label className="text-xs text-gray-500 mt-1 block">Weight (lbs)</label>
                </div>
                <div>
                  <Input 
                    placeholder="JR"
                    value={playerData.year}
                    onChange={(e) => handleInputChange('year', e.target.value)}
                  />
                  <label className="text-xs text-gray-500 mt-1 block">Year</label>
                </div>
              </>
            )}
          </div>

          <table className="stats-table">
            <thead>
              <tr>
                <th>GP-GS</th>
                <th>MIN</th>
                <th>PTS</th>
                <th>FG%</th>
                <th>3P%</th>
                <th>FT%</th>
                <th>REB</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {previewMode ? (
                  <>
                    <td>{playerData.stats.gpgs || '0'}</td>
                    <td>{playerData.stats.min || '0'}</td>
                    <td>{playerData.stats.pts || '0'}</td>
                    <td>{playerData.stats.fgp || '0'}</td>
                    <td>{playerData.stats.threep || '0'}</td>
                    <td>{playerData.stats.ftp || '0'}</td>
                    <td>{playerData.stats.reb || '0'}</td>
                  </>
                ) : (
                  <>
                    <td><Input placeholder="0" className="h-8 text-sm" value={playerData.stats.gpgs} onChange={(e) => handleInputChange('stats.gpgs', e.target.value)} /></td>
                    <td><Input placeholder="0" className="h-8 text-sm" value={playerData.stats.min} onChange={(e) => handleInputChange('stats.min', e.target.value)} /></td>
                    <td><Input placeholder="0" className="h-8 text-sm" value={playerData.stats.pts} onChange={(e) => handleInputChange('stats.pts', e.target.value)} /></td>
                    <td><Input placeholder="0" className="h-8 text-sm" value={playerData.stats.fgp} onChange={(e) => handleInputChange('stats.fgp', e.target.value)} /></td>
                    <td><Input placeholder="0" className="h-8 text-sm" value={playerData.stats.threep} onChange={(e) => handleInputChange('stats.threep', e.target.value)} /></td>
                    <td><Input placeholder="0" className="h-8 text-sm" value={playerData.stats.ftp} onChange={(e) => handleInputChange('stats.ftp', e.target.value)} /></td>
                    <td><Input placeholder="0" className="h-8 text-sm" value={playerData.stats.reb} onChange={(e) => handleInputChange('stats.reb', e.target.value)} /></td>
                  </>
                )}
              </tr>
            </tbody>
          </table>

          <div>
            <label className="text-sm font-medium mb-2 block">Notes</label>
            {previewMode ? (
              <div className="prose max-w-none">
                <p className="whitespace-pre-wrap">{playerData.notes || 'No notes available'}</p>
              </div>
            ) : (
              <Textarea 
                placeholder="Enter player notes and tendencies..."
                className="min-h-[100px]"
                value={playerData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
              />
            )}
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Point of Emphasis</label>
            {previewMode ? (
              <div className="prose max-w-none">
                <p className="whitespace-pre-wrap">{playerData.emphasis || 'No points of emphasis'}</p>
              </div>
            ) : (
              <Textarea 
                placeholder="Enter key points to emphasize..."
                className="min-h-[80px]"
                value={playerData.emphasis}
                onChange={(e) => handleInputChange('emphasis', e.target.value)}
              />
            )}
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Defender(s)</label>
            {previewMode ? (
              <div>{playerData.defenders || 'No defenders assigned'}</div>
            ) : (
              <Input 
                placeholder="Enter defender initials (e.g., JD, MK)"
                value={playerData.defenders}
                onChange={(e) => handleInputChange('defenders', e.target.value)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};