import { FC } from 'react';
import { IconType } from 'react-icons';

interface Props {
  label?: string;
  type: string;
  id: string;
  placeholder: string;
  required?: boolean;
  Icon?: IconType;
  IconButton?: IconType;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
}

const InputField: FC<Props> = ({
  label,
  type,
  id,
  placeholder,
  required,
  Icon,
  IconButton,
  onClick,
  value,
  onChange,
}) => {
  const onEnterDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onClick?.();
    }
  };

  return (
    <div>
      {label && (
        <label
          className="block mb-2 text-sm font-semibold text-slate-800"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <div className="relative w-full">
        {Icon && (
          <Icon
            className="absolute transform -translate-y-1/2 top-1/2 left-4 text-slate-400"
            size={20}
          />
        )}
        <input
          onKeyDown={onEnterDown}
          type={type}
          id={id}
          className={`z-0 w-full text-slate-800 text-sm font-semibold placeholder:text-slate-400 placeholder:font-semibold placeholder:text-sm h-12 px-4 border border-slate-300 rounded-2xl focus:outline-none focus:ring-1 focus:ring-blue-500 ${Icon ? 'pl-12' : ''} ${IconButton ? 'pr-12' : ''}`}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
        />
        {IconButton && (
          <IconButton
            className="absolute z-10 transform -translate-y-1/2 cursor-pointer top-1/2 right-4 text-slate-400"
            size={20}
            onClick={onClick}
          />
        )}
      </div>
    </div>
  );
};

export default InputField;
