import { cn } from '@/lib/utils';

const Checkbox = ({
  isChecked,
  onCheckboxChange,
}: {
  isChecked: boolean;
  onCheckboxChange: (checked: boolean) => void;
}) => {
  return (
    <div className="relative inline-block w-12 h-6">
      <input
        type="checkbox"
        id="cb1-6"
        checked={isChecked}
        onChange={(e) => onCheckboxChange(e.target.checked)}
        className="absolute opacity-0 w-0 h-0"
      />
      <label
        htmlFor="cb1-6"
        className={cn(
          'block w-full h-full cursor-pointer rounded-full bg-gray-200 transition-all duration-400 ease-in-out',
          isChecked ? 'bg-slate-700' : '',
        )}
      >
        <span
          className={cn(
            `absolute left-0 top-0 w-4 h-4 bg-white rounded-full transition-all duration-200 ease-in-out m-1`,
            isChecked ? 'left-1/2 ' : '',
          )}
        ></span>
      </label>
    </div>
  );
};

export default Checkbox;
