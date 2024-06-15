import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  VStack,
  Heading,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { RoomImage } from './RoomImage';
import { RoomInfo } from './RoomInfo';
import { SpecialPriceTable } from '../../ui/Tabel';
import { getDetailRoom } from '@/api/rooms';

export default function ModalRoomDetail({ onClose, isOpen, roomId }: any) {
  const [addSpecialPrice, setAddSpecialPrice] = useState(true);
  const toggleSpecialPrice = () => setAddSpecialPrice(!addSpecialPrice);
  const [roomDetail, setRoomDetail] = useState<any>();
  const [specialPrice, setSpecialPrice] = useState<any>();

  const getDetailsRoom = async () => {
    try {
      const response = await getDetailRoom(parseInt(roomId));
      setRoomDetail(response.data.data);
      setSpecialPrice(response.data.data.special_price);
      console.log(roomId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetailsRoom();
  }, [isOpen]);

  return (
    <Modal onClose={onClose} size={'xl'} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <RoomImage />
          <RoomInfo
            user={roomDetail?.capacity_person}
            bed={roomDetail?.capacity_room}
            size={roomDetail?.room_size}
          />
          <SpecialPriceTable
            room_id={roomId}
            addSpecialPrice={addSpecialPrice}
            toggleSpecialPrice={toggleSpecialPrice}
            dataSpecialPrice={specialPrice}
          />
        </ModalBody>
        <ModalFooter justifyContent={'space-between'}>
          <Heading size={'md'}>Rp. {roomDetail?.price}</Heading>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
