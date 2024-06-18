import {
  Editable,
  EditableInput,
  EditablePreview,
  Input,
  Text,
} from '@chakra-ui/react';

export function EditTableDate({
  type,
  value,
  onSubmit,
}: {
  type: string;
  value: any;
  onSubmit: any;
}) {
  return (
    <Editable
      textAlign="center"
      defaultValue={
        type == 'date' ? (value ? value : 'YYYY-MM-DD') : value ? value : '0'
      }
      onSubmit={onSubmit}
    >
      <EditablePreview />
      <Input type={type} as={EditableInput} />
    </Editable>
  );
}
