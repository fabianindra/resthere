import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Image,
  VStack,
  Heading,
  HStack,
  Text,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { User } from '@phosphor-icons/react';
import {
  Bed,
  PencilSimple,
  Ruler,
  TrashSimple,
} from '@phosphor-icons/react/dist/ssr';
import React from 'react';

export default function ModalRoomDetail({ onClose, isOpen }: any) {
  return (
    <Modal onClose={onClose} size={'xl'} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Image
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            alt="Green double couch with wooden legs"
            borderRadius="lg"
          />
          <VStack alignItems={'start'} my={8}>
            <Heading size={'sm'}>Room Information</Heading>
            <HStack mt={2} gap={6}>
              <HStack>
                <User size={20} weight="fill" />
                <Text fontSize="sm">2</Text>
              </HStack>
              <HStack>
                <Bed size={20} weight="fill" />
                <Text fontSize="sm">2</Text>
              </HStack>
              <HStack>
                <Ruler size={20} />
                <Text fontSize="sm">20M2</Text>
              </HStack>
            </HStack>
            <TableContainer mt={8} w={'full'}>
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
                  <Tr>
                    <Td>inches</Td>
                    <Td>millimetres (mm)</Td>
                    <Td>25.4</Td>
                    <Td>
                      <HStack>
                        <TrashSimple color={'red'} size={20} />
                        <PencilSimple color={'blue'} size={20} />
                      </HStack>
                    </Td>
                  </Tr>
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
            <TableContainer mt={8} w={'full'}>
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
                  <Tr>
                    <Td>inches</Td>
                    <Td>millimetres (mm)</Td>
                    <Td>25.4</Td>
                    <Td>
                      <HStack>
                        <TrashSimple color={'red'} size={20} />
                        <PencilSimple color={'blue'} size={20} />
                      </HStack>
                    </Td>
                  </Tr>
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
          </VStack>
        </ModalBody>
        <ModalFooter justifyContent={'space-between'}>
          <Heading size={'md'}>Rp. 400000</Heading>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
