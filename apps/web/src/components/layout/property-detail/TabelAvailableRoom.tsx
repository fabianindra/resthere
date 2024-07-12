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
import { useAvailableRoomForm } from '@/hooks/availableRoom/useAvailableRoomForm';
import { deleteAvailableRoom, editAvailableRoom } from '@/api/availableroom';

export function AvailableRoomTable({
  addAvailableRoom: boleanData,
  toggleAvailableRoom,
  dataAvailableRoom,
  room_id,
}: any) {
  const { formik } = useAvailableRoomForm(
    {
      room_id: room_id,
      start_date: '',
      end_date: '',
    },
    toggleAvailableRoom,
  );

  const toast = useToast();

  const formatDate = (dateString: string) => {
    return dateString.split('T')[0];
  };

  const handleDelete = async (roomavailability_id: string) => {
    try {
      const response = await deleteAvailableRoom(roomavailability_id);
      toast({
        title: 'Delete available room successfuly',
        status: 'success',
        position: 'top',
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Failed to delete available room',
        status: 'error',
        position: 'top',
        isClosable: true,
      });
    }
  };

  const handleEdit = async (
    roomavailability_id: string,
    start_date: string,
    end_date: string,
  ) => {
    try {
      const response = await editAvailableRoom({
        roomavailability_id,
        start_date,
        end_date,
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
          onClick={toggleAvailableRoom}
          mb={4}
          colorScheme={!boleanData ? 'orange' : 'blue'}
          size="xs"
        >
          {!boleanData ? `Cancel` : `Add available room`}
        </Button>
      </HStack>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>available room</Th>
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
                    type="text"
                    placeholder="Not Available"
                    size="xs"
                    disabled
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
          {dataAvailableRoom?.map((value: any, index: number) => (
            <Tr key={index}>
              <Td>
                <Input
                  type="text"
                  placeholder="Not Available"
                  size="xs"
                  disabled
                />
              </Td>
              <Td>
                <EditTableDate
                  value={formatDate(value.start_date)}
                  type="date"
                  onSubmit={(e: any) =>
                    handleEdit(value.id, `${e}T00:00:00.000Z`, value.end_date)
                  }
                />
              </Td>
              <Td>
                <EditTableDate
                  value={formatDate(value.end_date)}
                  type="date"
                  onSubmit={(e: any) =>
                    handleEdit(value.id, value.start_date, `${e}T00:00:00.000Z`)
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
