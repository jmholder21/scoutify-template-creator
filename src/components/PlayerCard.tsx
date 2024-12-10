import { UploadCloud } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const PlayerCard = () => {
  const [headshot, setHeadshot] = useState<string>("");
  
  const handleHeadshotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setHeadshot(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0">
          <div className="w-32 h-40 relative mb-4">
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
              className="absolute inset-0 opacity-0 cursor-pointer"
              accept="image/*"
            />
          </div>
        </div>

        <div className="flex-grow space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <Input placeholder="#" className="text-center" />
              <label className="text-xs text-gray-500 mt-1 block text-center">Number</label>
            </div>
            <div className="col-span-2">
              <Input placeholder="Player Name" />
              <label className="text-xs text-gray-500 mt-1 block">Name</label>
            </div>
            <div>
              <Input placeholder="G" />
              <label className="text-xs text-gray-500 mt-1 block">Position</label>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Input placeholder="6'2&quot;" />
              <label className="text-xs text-gray-500 mt-1 block">Height</label>
            </div>
            <div>
              <Input placeholder="180" />
              <label className="text-xs text-gray-500 mt-1 block">Weight (lbs)</label>
            </div>
            <div>
              <Input placeholder="JR" />
              <label className="text-xs text-gray-500 mt-1 block">Year</label>
            </div>
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
                <td><Input placeholder="0" className="h-8 text-sm" /></td>
                <td><Input placeholder="0" className="h-8 text-sm" /></td>
                <td><Input placeholder="0" className="h-8 text-sm" /></td>
                <td><Input placeholder="0" className="h-8 text-sm" /></td>
                <td><Input placeholder="0" className="h-8 text-sm" /></td>
                <td><Input placeholder="0" className="h-8 text-sm" /></td>
                <td><Input placeholder="0" className="h-8 text-sm" /></td>
              </tr>
            </tbody>
          </table>

          <div>
            <label className="text-sm font-medium mb-2 block">Notes</label>
            <Textarea 
              placeholder="Enter player notes and tendencies..."
              className="min-h-[100px]"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Point of Emphasis</label>
            <Textarea 
              placeholder="Enter key points to emphasize..."
              className="min-h-[80px]"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Defender(s)</label>
            <Input 
              placeholder="Enter defender initials (e.g., JD, MK)"
            />
          </div>
        </div>
      </div>
    </div>
  );
};