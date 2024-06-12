import { Input, Text } from '@chakra-ui/react';
import React from 'react';

export default function InputText({
  placeholder,
  label,
  name,
  value,
  onChange,
}: {
  placeholder: string;
  label: string;
  name: string;
  value: string;
  onChange: any;
}) {
  return (
    <>
      <Text fontSize={'md'} fontWeight={'medium'} mb={2} mt={4}>
        {label}
      </Text>
      <Input
        placeholder={placeholder}
        size="md"
        name={name}
        value={value}
        onChange={onChange}
      />
    </>
  );
}
