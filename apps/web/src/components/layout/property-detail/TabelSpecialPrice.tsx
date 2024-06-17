import React from 'react';
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Tfoot,
  HStack,
  Button,
  Input,
  useToast,
} from '@chakra-ui/react';
import { EditTableDate } from '@/components/ui/EditTableDate';
import { TrashSimple } from '@phosphor-icons/react';
import { useSpecialPriceForm } from '../../../hooks/specialprice/useSpecialForm';
import { deleteSpecialPrice, editSpecialPrice } from '@/api/specialprice';

export function SpecialPriceTable({
  addSpecialPrice: boleanData,
  toggleSpecialPrice,
  dataSpecialPrice,
  room_id,
}: any) {
  const { formik } = useSpecialPriceForm(
    {
      room_id: room_id,
      start_date: '',
      end_date: '',
      special_price: 0,
    },
    toggleSpecialPrice,
  );

  const toast = useToast();

  const formatDate = (dateString: string) => {
    return dateString.split('T')[0];
  };

  const handleDelete = async (specialprice_id: string) => {
    try {
      const response = await deleteSpecialPrice(specialprice_id);
      toast({
        title: 'Delete special price successfuly',
        status: 'success',
        position: 'top',
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Failed to delete special price',
        status: 'error',
        position: 'top',
        isClosable: true,
      });
    }
  };

  const handleEdit = async (
    specialprice_id: string,
    start_date: string,
    end_date: string,
    special_price: number,
  ) => {
    try {
      const response = await editSpecialPrice({
        specialprice_id,
        start_date,
        end_date,
        special_price,
      });
      toast({
        title: 'Edit successfuly',
        status: 'success',
        position: 'top',
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Failed to edit',
        status: 'error',
        position: 'top',
        isClosable: true,
      });
    }
  };

  return (
    <TableContainer mt={8} w={'full'}>
      <HStack w={'full'} justifyContent={'end'}>
        <Button
          onClick={toggleSpecialPrice}
          mb={4}
          colorScheme={!boleanData ? 'orange' : 'blue'}
          size="xs"
        >
          {!boleanData ? `Cancel` : `Add Special Price`}
        </Button>
      </HStack>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Special Price</Th>
            <Th>Start Date</Th>
            <Th>End Date</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr hidden={boleanData}>
            <Td colSpan={4}>
              <form onSubmit={formik.handleSubmit}>
                <HStack spacing={2}>
                  <Input
                    type="number"
                    placeholder="Rp.0"
                    size="xs"
                    {...formik.getFieldProps('special_price')}
                  />
                  <Input
                    type="date"
                    placeholder="YYYY-MM-DD"
                    size="xs"
                    {...formik.getFieldProps('start_date')}
                  />
                  <Input
                    type="date"
                    placeholder="YYYY-MM-DD"
                    size="xs"
                    {...formik.getFieldProps('end_date')}
                  />
                  <Button
                    minW={'fit-content'}
                    colorScheme="blue"
                    size="xs"
                    type="submit"
                  >
                    Submit
                  </Button>
                </HStack>
              </form>
            </Td>
          </Tr>
          {dataSpecialPrice.map((value: any, index: number) => (
            <Tr key={index}>
              <Td>
                <EditTableDate
                  onSubmit={(e: any) =>
                    handleEdit(value.id, value.start_date, value.end_date, e)
                  }
                  value={value.special_price}
                  type="number"
                />
              </Td>
              <Td>
                <EditTableDate
                  value={formatDate(value.start_date)}
                  type="date"
                  onSubmit={(e: any) =>
                    handleEdit(
                      value.id,
                      `${e}T00:00:00.000Z`,
                      value.end_date,
                      value.special_price,
                    )
                  }
                />
              </Td>
              <Td>
                <EditTableDate
                  value={formatDate(value.end_date)}
                  type="date"
                  onSubmit={(e: any) =>
                    handleEdit(
                      value.id,
                      value.start_date,
                      `${e}T00:00:00.000Z`,
                      value.special_price,
                    )
                  }
                />
              </Td>
              <Td>
                <HStack
                  className="cursor-pointer"
                  onClick={() => handleDelete(value.id)}
                >
                  <TrashSimple color={'red'} size={20} />
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Total</Th>
            <Th></Th>
            <Th></Th>
            <Th>1</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
}
