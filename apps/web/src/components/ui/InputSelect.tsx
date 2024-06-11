import { Box, Select, Text, Spinner } from '@chakra-ui/react';
import React from 'react';

interface InputSelectProps {
  label: string;
  options: any;
  placeholder: string;
  name: string;
  value: string;
  onChange: any | null | undefined;
  isLoading?: boolean;
  disabled?: boolean;
}

const InputSelect: React.FC<InputSelectProps> = ({
  label,
  options,
  placeholder,
  name,
  value,
  onChange,
  isLoading = false,
  disabled,
}) => {
  return (
    <Box mb={4}>
      <Text fontSize={'md'} fontWeight={'medium'} mb={2} mt={4}>
        {label}
      </Text>
      {isLoading ? (
        <Spinner size="md" />
      ) : (
        <Select
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
        >
          {options.map((opt: any) => (
            <option key={opt.id ? opt.id : opt} value={opt.id ? opt.id : opt}>
              {opt.name ? opt.name : opt}
            </option>
          ))}
        </Select>
      )}
    </Box>
  );
};

export default InputSelect;
