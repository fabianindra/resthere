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
import axios from 'axios';
import Cookies from 'js-cookie';
import { User } from '@/types'

const getUserFromCookie = (): User | null => {
  const userCookie = Cookies.get('user');
  if (userCookie) {
    try {
      return JSON.parse(userCookie);
    } catch (error) {
      console.error('Error parsing user cookie:', error);
      return null;
    }
  }
  return null;
};

const user = getUserFromCookie();
const userId = user?.id;

export default function ModalRoomDetail({
  onClose,
  isOpen,
  roomId,
  dashboard,
  title,
}: any) {
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
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleBooking = async () => {
    try {
      const price = roomDetail?.price;
      const response = await axios.post('http://localhost:6570/api/transaction/booking', {
        roomId,
        userId,
        price,
      });
      window.location.href = `/profile`;
    } catch (error: any) {
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
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <RoomImage />
          <RoomInfo
            user={roomDetail?.capacity_person}
            bed={roomDetail?.capacity_room}
            size={roomDetail?.room_size}
          />
          {dashboard ? (
            <>
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
            </>
          ) : null}
        </ModalBody>
        <ModalFooter justifyContent={'space-between'}>
          <Heading size={'md'}>Rp. {roomDetail?.price}</Heading>
          <Button onClick={handleBooking} colorScheme="blue">Booking</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}