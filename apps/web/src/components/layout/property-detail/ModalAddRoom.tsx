import InputText from '@/components/ui/InputText';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useToast,
  Box,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik } from 'formik';
import { addDataRoom } from '@/api/rooms';

const propertySchema = Yup.object().shape({
  name: Yup.string().required('name is required'),
  price: Yup.number().required('price is required'),
  weekend_price: Yup.number().required('weekend price is required'),
  capacity_person: Yup.number().required('category person is required'),
  capacity_room: Yup.number().required('category room is required'),
  room_size: Yup.string().required('room size is required'),
  property_id: Yup.number().required('property id is required'),
});

export default function ModalAddRoom({ isOpen, onClose, id, fetchRooms }: any) {
  const [file, setFile] = useState<any>(null);
  const toast = useToast();

  const handleSubmit = async (values: any) => {
    try {
      const {
        name,
        price,
        weekend_price,
        capacity_person,
        capacity_room,
        room_size,
        property_id,
      } = values;
      const response = await addDataRoom(
        name,
        price,
        weekend_price,
        capacity_person,
        capacity_room,
        room_size,
        id,
        file,
      );
      fetchRooms();
      toast({
        title: 'Add property succesfuly',
        status: 'success',
        position: 'top',
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Failed to add property',
        status: 'error',
        position: 'top',
        isClosable: true,
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      price: 0,
      weekend_price: 0,
      capacity_person: 0,
      capacity_room: 0,
      room_size: '',
      property_id: id,
    },
    validationSchema: propertySchema,
    onSubmit: (values: any) => {
      handleSubmit(values);
      //console.log(values, file);
      onClose();
    },
  });

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files ? e.target.files[0] : null);
  };

  return (
    <>
      <Modal onClose={onClose} size={'xl'} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Rooms</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={formik.handleSubmit}>
              <InputText
                placeholder={'name'}
                label={'Name'}
                name={'name'}
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              {formik.touched.name && formik.errors.name && (
                <Box style={{ color: 'red' }}>
                  {formik.errors.name as string}
                </Box>
              )}
              <InputText
                placeholder={'price'}
                type="number"
                label={'Price'}
                name={'price'}
                value={formik.values.price}
                onChange={formik.handleChange}
              />
              {formik.touched.price && formik.errors.price && (
                <Box style={{ color: 'red' }}>
                  {formik.errors.price as string}
                </Box>
              )}
              <InputText
                placeholder={'weekend_price'}
                type="number"
                label={'Weekend price'}
                name={'weekend_price'}
                value={formik.values.weekend_price}
                onChange={formik.handleChange}
              />
              {formik.touched.weekend_price && formik.errors.weekend_price && (
                <Box style={{ color: 'red' }}>
                  {formik.errors.weekend_price as string}
                </Box>
              )}
              <InputText
                placeholder={'capacity_person'}
                type="number"
                label={'Capacity person'}
                name={'capacity_person'}
                value={formik.values.capacity_person}
                onChange={formik.handleChange}
              />
              {formik.touched.capacity_person &&
                formik.errors.capacity_person && (
                  <Box style={{ color: 'red' }}>
                    {formik.errors.capacity_person as string}
                  </Box>
                )}
              <InputText
                placeholder={'capacity_room'}
                type="number"
                label={'Capacity room'}
                name={'capacity_room'}
                value={formik.values.capacity_room}
                onChange={formik.handleChange}
              />
              {formik.touched.capacity_room && formik.errors.capacity_room && (
                <Box style={{ color: 'red' }}>
                  {formik.errors.capacity_room as string}
                </Box>
              )}
              <InputText
                placeholder={'room_size'}
                label={'Room size'}
                name={'room_size'}
                value={formik.values.room_size}
                onChange={formik.handleChange}
              />
              {formik.touched.room_size && formik.errors.room_size && (
                <Box style={{ color: 'red' }}>
                  {formik.errors.room_size as string}
                </Box>
              )}
              <Box className=" my-6">
                <input
                  type="file"
                  onChange={handleChangeFile}
                  name={'file'}
                  value={formik.values.file}
                  className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100 border-2 rounded-md border-redDark"
                />
                {!file && <Box style={{ color: 'red' }}>File is required</Box>}
              </Box>
              <Button type="submit" mb={10} w={'full'} colorScheme="blue">
                Submit
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
