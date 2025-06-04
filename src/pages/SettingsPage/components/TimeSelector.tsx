import { Check, Clock3, Clock6, Clock9, X } from "lucide-react";

interface TimeSelectorProps {
  selectedTime: number;
  setSelectedTime: (time: number) => void;
}
interface TimeSelectorItemProps {
  value: number;
  isSelected: boolean;
  onSelect: (value: number) => void;
}

const TimeSelector: React.FC<TimeSelectorProps> = ({ selectedTime, setSelectedTime }) => {
  return <div>
    <h2 className="font-bold mb-4">Время на ход</h2>
    <div className="flex justify-between items-center">
      <TimeSelectorItem
        value={30}
        isSelected={selectedTime === 30}
        onSelect={setSelectedTime}
      />
      <TimeSelectorItem
        value={60}
        isSelected={selectedTime === 60}
        onSelect={setSelectedTime}
      />
      <TimeSelectorItem
        value={90}
        isSelected={selectedTime === 90}
        onSelect={setSelectedTime}
      />
    </div>
  </div>;
};

const TimeSelectorItem: React.FC<TimeSelectorItemProps> = ({ value, isSelected, onSelect }) => {
  const timeIcon = value === 30
    ? <Clock3 className="w-6 h-6 text-gray" />
    : value === 60
      ? <Clock6 className="w-6 h-6 text-gray" />
      : <Clock9 className="w-6 h-6 text-gray" />;

  return <div
    style={{transition: 'opacity 0.2s ease'}}
    className={`flex flex-col items-center gap-1 relative ${isSelected ? 'opacity-100' : 'opacity-30'}`}
    onClick={() => onSelect(value)}
  >
    {
      isSelected &&
      <span className={`absolute -top-[13%] right-[8%] rounded-full w-4 h-4 flex items-center justify-center bg-white border`}>
        <Check className="w-3 h-3 text-green-500" />
      </span>
    }
    {timeIcon}
    <p className="text-sm text-gray font-bold">{value} сек</p>
  </div>;
};

export default TimeSelector;
