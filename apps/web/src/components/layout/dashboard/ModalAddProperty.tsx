import InputSelect from '@/components/ui/InputSelect';
import InputText from '@/components/ui/InputText';
import useCities from '@/hooks/property/useCities';
import useProvinces from '@/hooks/property/useProvinces';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useToast,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { useEffect, useMemo, useState } from 'react';
import { useFormik } from 'formik';
import { addDataProperty } from '@/api/property';

const propertySchema = Yup.object().shape({
  name: Yup.string()
    .required('name is required')
    .min(10, 'minimum caracter 10')
    .max(20, 'maximum caracter 20'),
  address: Yup.string()
    .required('address is required')
    .min(20, 'minimum caracter 10')
    .max(100, 'maximum caracter 20'),
  category_property: Yup.string().required('category is required'),
  city_name: Yup.string().required('city is required'),
  province_name: Yup.string().required('province is required'),
  tenant_id: Yup.number().required('tenant_id is required'),
});

export default function ModalAddProperty({ isOpen, onClose }: any) {
  const {
    provinces,
    loading: provincesLoading,
    error: provincesError,
  } = useProvinces();
  const {
    city,
    fetchCities,
    loading: citiesLoading,
    error: citiesError,
  } = useCities();
  const [selectedProvince, setSelectedProvince] = useState<number | null>(null);
  const [file, setFile] = useState<any>(null);
  const toast = useToast();

  const handleSubmit = async (values: any) => {
    try {
      const {
        name,
        address,
        category_property,
        city_name,
        province_name,
        tenant_id,
      } = values;
      const response = await addDataProperty(
        name,
        address,
        category_property,
        city_name,
        province_name,
        tenant_id,
        file,
      );
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
      address: '',
      category_property: '',
      city_name: '',
      province_name: '',
      tenant_id: 1,
    },
    validationSchema: propertySchema,
    onSubmit: (values: any) => {
      handleSubmit(values);
      onClose();
    },
  });

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files ? e.target.files[0] : null);
  };

  const handleProvinceClick = (e: any) => {
    formik.handleChange(e);
    fetchCities(e.target.value);
    setSelectedProvince(e.target.value);
  };

  return (
    <>
      <Modal onClose={onClose} size={'xl'} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Property</ModalHeader>
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
                <div style={{ color: 'red' }}>
                  {formik.errors.name as string}
                </div>
              )}
              <InputText
                placeholder={'address'}
                label={'Address'}
                name={'address'}
                value={formik.values.address}
                onChange={formik.handleChange}
              />
              {formik.touched.address && formik.errors.address && (
                <div style={{ color: 'red' }}>
                  {formik.errors.address as string}
                </div>
              )}
              <InputSelect
                label={'Category'}
                options={['Hotel', 'Vila', 'Home Stay']}
                placeholder={'Select Category'}
                onChange={formik.handleChange}
                name={'category_property'}
                value={formik.values.category_property}
              />
              {formik.touched.category_property &&
                formik.errors.category_property && (
                  <div style={{ color: 'red' }}>
                    {formik.errors.category_property as string}
                  </div>
                )}
              <InputSelect
                label={'Province'}
                options={[...provinces]}
                placeholder={'Select Province'}
                onChange={(e: any) => handleProvinceClick(e)}
                name={'province_name'}
                value={formik.values.province_name}
              />
              {formik.touched.province_name && formik.errors.province_name && (
                <div style={{ color: 'red' }}>
                  {formik.errors.province_name as string}
                </div>
              )}
              <InputSelect
                label={'City'}
                options={city?.map((item: any) => item.name)}
                placeholder={'Select City'}
                onChange={formik.handleChange}
                name={'city_name'}
                value={formik.values.city_name}
              />
              {formik.touched.city_name && formik.errors.city_name && (
                <div style={{ color: 'red' }}>
                  {formik.errors.city_name as string}
                </div>
              )}
              <div className=" my-6">
                <input
                  type="file"
                  onChange={handleChangeFile}
                  name={'file'}
                  value={formik.values.file}
                  className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100 border-2 rounded-md border-redDark"
                />
                {!file && <div style={{ color: 'red' }}>File is required</div>}
              </div>
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
