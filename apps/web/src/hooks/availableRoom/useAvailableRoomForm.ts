import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useToast } from '@chakra-ui/react';
import { addAvailableRoom } from '@/api/availableroom';

const availableRoomSchema = Yup.object().shape({
  room_id: Yup.number().required('Room ID is required'),
  start_date: Yup.string().required('Start date is required'),
  end_date: Yup.string().required('End date is required'),
});

export function useAvailableRoomForm(
  initialValues: any,
  toggleAvailableRoom: any,
) {
  const toast = useToast();

  const handleSubmit = async (values: any) => {
    const { room_id, start_date, end_date } = values;
    try {
      const response = await addAvailableRoom({
        room_id,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
      });
      toast({
        title: 'Add available room successfuly',
        status: 'success',
        position: 'top',
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Failed to add available room',
        status: 'error',
        position: 'top',
        isClosable: true,
      });
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: availableRoomSchema,
    onSubmit: (values) => {
      toggleAvailableRoom();
      handleSubmit(values);
    },
  });

  return { formik };
}
