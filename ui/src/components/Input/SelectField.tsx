import { FC, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

interface Option {
  label: string;
  value?: string;
}

interface Props {
  className?: string;
  options: Option[];
  selected?: string;
  onChange?: (value?: string) => void;
  disabled?: boolean;
}

const SelectField: FC<Props> = ({
  className,
  options,
  selected,
  onChange,
  disabled,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((opt) => opt.value === selected);
  return (
    <div className={`relative ${className}`}>
      <button
        className={`flex items-center justify-between w-full h-12 px-4 text-sm font-semibold border border-slate-300 rounded-2xl focus:outline-none focus:ring-1 focus:ring-blue-500 ${disabled ? 'bg-slate-100 text-slate-400' : 'text-slate-800'}`}
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
      >
        {selectedOption ? selectedOption.label : 'Выберите вариант'}
        <FiChevronDown
          className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          size={24}
        />
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white border shadow-lg border-slate-300 rounded-2xl">
          {options.map((option, index) => (
            <div
              key={index}
              className="p-4 text-sm font-semibold cursor-pointer text-slate-800 hover:bg-slate-100"
              onClick={() => {
                onChange?.(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectField;
