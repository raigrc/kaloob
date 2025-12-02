// components/ToggleButtonCheckbox.tsx
import { ControllerRenderProps } from "react-hook-form";

type Props = {
  field: ControllerRenderProps<any, any>;
};

export function ToggleButtonCheckbox({ field }: Props) {
  return (
    <button
      type="button"
      onClick={() => field.onChange(!field.value)}
      className={`px-6 py-2 rounded-lg transition-all duration-300 font-medium
        ${field.value ? "bg-green-600 text-white" : "bg-gray-200 text-gray-800"}
      `}
    >
      {field.value ? "Selected" : "Select"}
    </button>
  );
}
