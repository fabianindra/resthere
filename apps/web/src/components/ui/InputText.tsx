import { Input, Text } from '@chakra-ui/react';
import React from 'react';

export default function InputText({
  placeholder,
  label,
  name,
  value,
  onChange,
  type,
}: {
  placeholder: string;
  label: string;
  name: string;
  value: string;
  onChange: any;
  type?: string;
}) {
  return (
    <>
      <Text fontSize={'md'} fontWeight={'medium'} mb={2} mt={4}>
        {label}
      </Text>
      <Input
        type={type ? type : 'text'}
        placeholder={placeholder}
        size="md"
        name={name}
        value={value}
        onChange={onChange}
      />
    </>
  );
}
