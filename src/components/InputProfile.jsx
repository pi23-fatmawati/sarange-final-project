import { TextInput, Textarea, FileInput } from "flowbite-react";

export default function InputProfile({
  type,
  name,
  value,
  onChange,
  disabled,
  accept,
}) {
  if (type === "text-area") {
    return (
      <Textarea
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-3/4 md:w-2/3 lg:w-2/3"
        style={{ fontSize: "medium" }}
      />
    );
  } else if (type === "file") {
    return (
      <FileInput
        type={type}
        accept={accept}
        onChange={onChange}
        disabled={disabled}
      />
    );
  }
  return (
    <TextInput
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-3/4 md:w-2/3 lg:w-2/3"
      style={{ fontSize: "medium" }}
    />
  );
}
