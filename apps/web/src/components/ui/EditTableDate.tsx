import {
  Editable,
  EditableInput,
  EditablePreview,
  Input,
  Text,
} from '@chakra-ui/react';

export function EditTableDate({ type, value }: { type: string; value: any }) {
  return (
    <Editable
      textAlign="center"
      defaultValue={type == 'date' ? 'YYYY-MM-DD' : '0'}
      value={value}
    >
      <EditablePreview />
      <Input type={type} as={EditableInput} />
    </Editable>
  );
}
