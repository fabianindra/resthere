import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Heading,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { RoomImage } from './RoomImage';
import { RoomInfo } from './RoomInfo';
import { SpecialPriceTable } from './TabelSpecialPrice';
import { AvailableRoomTable } from './TabelAvailableRoom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { User } from '@/types';
import useDetailRoom from '@/hooks/room/useDetailRoom';
import { apiUrl } from '@/api';

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
const role = Cookies.get('role');

export default function ModalRoomDetail({
  onClose,
  isOpen,
  roomId,
  dashboard,
  title,
  startDate: initialStartDate,
  endDate: initialEndDate,
  price,
  image,
}: any) {
  const [addSpecialPrice, setAddSpecialPrice] = useState(true);
  const [addAvailableRoom, setaddAvailableRoom] = useState(true);
  const toggleSpecialPrice = () => setAddSpecialPrice(!addSpecialPrice);
  const toggleAvailableRoom = () => setaddAvailableRoom(!addAvailableRoom);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [checkIn, setCheckIn] = useState<string>('');
  const [checkOut, setCheckOut] = useState<string>('');
  const { room, loading, error, setStartDate, setEndDate, fetchRoom } =
    useDetailRoom();

  const preBooking = async () => {
    if (!userId) {
      setIsAlertOpen(true);
      return;
    }
    setIsConfirmationOpen(true);
  };

  const handleBooking = async () => {
    try {
      const response = await axios.post(`${apiUrl}/transaction/booking`, {
        roomId,
        userId,
        price,
        startDate: checkIn,
        endDate: checkOut,
      });
      window.location.href = `/transaction`;
    } catch (error: any) {
    } finally {
      setIsConfirmationOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setStartDate(new Date(initialStartDate));
      setEndDate(new Date(initialEndDate));
      fetchRoom(parseInt(roomId));
      setCheckIn(initialStartDate);
      setCheckOut(initialEndDate);
    }
  }, [isOpen, initialStartDate, initialEndDate, roomId]);

  function formatRupiah(number: number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  return (
    <>
      <Modal onClose={onClose} size={'xl'} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <RoomImage image={image} />
            <RoomInfo
              user={room?.capacity_person}
              bed={room?.capacity_room}
              size={room?.room_size}
            />
            {dashboard ? (
              <>
                <SpecialPriceTable
                  room_id={roomId}
                  addSpecialPrice={addSpecialPrice}
                  toggleSpecialPrice={toggleSpecialPrice}
                  dataSpecialPrice={room?.special_price}
                />
                <AvailableRoomTable
                  room_id={roomId}
                  addAvailableRoom={addAvailableRoom}
                  toggleAvailableRoom={toggleAvailableRoom}
                  dataAvailableRoom={room?.room_availability}
                />
              </>
            ) : null}
          </ModalBody>
          <ModalFooter justifyContent={'space-between'}>
            <Heading size={'md'}>Rp. {formatRupiah(price)}</Heading>
            {role === 'user' && (
              <Button px={10} onClick={preBooking} colorScheme="blue">
                Booking
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isAlertOpen} onClose={() => setIsAlertOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Alert</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Alert status="warning">
              <AlertIcon />
              You need to login to book
            </Alert>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setIsAlertOpen(false)} colorScheme="blue">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Booking</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to book this property? Total Price to Pay: Rp.{' '}
            {formatRupiah(price)}
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => setIsConfirmationOpen(false)}
              colorScheme="red"
              mr={3}
            >
              No
            </Button>
            <Button onClick={handleBooking} colorScheme="green">
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
