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
import { SpecialPriceTable } from './TabelSpecialPrice';
import { getDetailRoom } from '@/api/rooms';
import { AvailableRoomTable } from './TabelAvailableRoom';

export default function ModalRoomDetail({ onClose, isOpen, roomId }: any) {
  const [addSpecialPrice, setAddSpecialPrice] = useState(true);
  const [addAvailableRoom, setaddAvailableRoom] = useState(true);
  const toggleSpecialPrice = () => setAddSpecialPrice(!addSpecialPrice);
  const toggleAvailableRoom = () => setaddAvailableRoom(!addAvailableRoom);
  const [roomDetail, setRoomDetail] = useState<any>();
  const [specialPrice, setSpecialPrice] = useState<any>();
  const [availableRoom, setAvailableRoom] = useState<any>();

  const getDetailsRoom = async () => {
    try {
      const response = await getDetailRoom(parseInt(roomId));
      setRoomDetail(response.data.data);
      setSpecialPrice(response.data.data.special_price);
      setAvailableRoom(response.data.data.room_availability);
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
          <AvailableRoomTable
            room_id={roomId}
            addAvailableRoom={addAvailableRoom}
            toggleAvailableRoom={toggleAvailableRoom}
            dataAvailableRoom={availableRoom}
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
