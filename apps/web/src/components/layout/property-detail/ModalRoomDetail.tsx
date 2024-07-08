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
import { getDetailRoom } from '@/api/rooms';
import { AvailableRoomTable } from './TabelAvailableRoom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { User } from '@/types';
import dayjs from 'dayjs';

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

export default function ModalRoomDetail({ onClose, isOpen, roomId, dashboard, title, startDate, endDate }: any) {
  const [addSpecialPrice, setAddSpecialPrice] = useState(true);
  const [addAvailableRoom, setaddAvailableRoom] = useState(true);
  const toggleSpecialPrice = () => setAddSpecialPrice(!addSpecialPrice);
  const toggleAvailableRoom = () => setaddAvailableRoom(!addAvailableRoom);
  const [roomDetail, setRoomDetail] = useState<any>();
  const [specialPrice, setSpecialPrice] = useState<any>();
  const [availableRoom, setAvailableRoom] = useState<any>();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [checkIn, setCheckIn] = useState<string>('');
  const [checkOut, setCheckOut] = useState<string>('');
  const [totalPrice, setTotalPrice] = useState<number>(0);

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

  const calculateTotalPrice = (pricePerDay: number, startDate: string, endDate: string): number => {
    const start = dayjs(startDate);
    const end = dayjs(endDate);
    let totalPrice = 0;

    for (let date = start; date.isBefore(end) || date.isSame(end, 'day'); date = date.add(1, 'day')) {
      let dailyPrice = pricePerDay;
      const specialPriceEntry = specialPrice?.find((special: any) =>
        dayjs(special.date).isSame(date, 'day')
      );
      if (specialPriceEntry) {
        dailyPrice = specialPriceEntry.price;
      }
      totalPrice += dailyPrice;
    }
    return totalPrice;
  };

  const handleBooking = async () => {
    if (!userId) {
      setIsAlertOpen(true);
      return;
    }
    const pricePerDay = roomDetail?.price;
    const calculatedTotalPrice = calculateTotalPrice(pricePerDay, checkIn, checkOut);
    setTotalPrice(calculatedTotalPrice);
    setIsConfirmationOpen(true);
  };

  const confirmBooking = async () => {
    try {
      const pricePerDay = roomDetail?.price;
      const totalPrice = calculateTotalPrice(pricePerDay, checkIn, checkOut);
      const response = await axios.post('http://localhost:6570/api/transaction/booking', {
        roomId,
        userId,
        price: totalPrice,
        startDate: checkIn,
        endDate: checkOut,
      });
      console.log("Booking response:", response);
      window.location.href = `/transaction`;
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsConfirmationOpen(false);
    }
  };

  useEffect(() => {
    getDetailsRoom();
    setCheckIn(startDate);
    setCheckOut(endDate);
  }, [isOpen]);

  return (
    <>
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
            <Heading size={'md'}>Rp. {roomDetail?.price} per day</Heading>
            <Button px={10} onClick={handleBooking} colorScheme="blue">
              Booking
            </Button>
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

      <Modal isOpen={isConfirmationOpen} onClose={() => setIsConfirmationOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Booking</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to book this property?
            Total Price to Pay: Rp. {totalPrice}
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setIsConfirmationOpen(false)} colorScheme="red" mr={3}>
              No
            </Button>
            <Button onClick={confirmBooking} colorScheme="green">
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}