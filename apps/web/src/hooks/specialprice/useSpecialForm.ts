import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useToast } from '@chakra-ui/react';
import { addSpecialPrice } from '@/api/specialprice';

const specialPriceSchema = Yup.object().shape({
  room_id: Yup.number().required('Room ID is required'),
  start_date: Yup.string().required('Start date is required'),
  end_date: Yup.string().required('End date is required'),
  special_price: Yup.number().required('Special price is required'),
});

export function useSpecialPriceForm(
  initialValues: any,
  toggleSpecialPrice: any,
) {
  const toast = useToast();

  const handleSubmit = async (values: any) => {
    const { room_id, start_date, end_date, special_price } = values;
    try {
      const response = await addSpecialPrice({
        room_id,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        special_price,
      });
      toast({
        title: 'Add special price successfuly',
        status: 'success',
        position: 'top',
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Failed to add special price',
        status: 'error',
        position: 'top',
        isClosable: true,
      });
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: specialPriceSchema,
    onSubmit: (values) => {
      toggleSpecialPrice();
      handleSubmit(values);
    },
  });

  return { formik };
}
