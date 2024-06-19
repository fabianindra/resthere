import { repoGetBookings } from "@/repository/booking.repository";

export const serviceGetBookings = async (req: any) => {
    const { user_id } = req.params;
    try {
        if (!user_id) {
            throw new Error("User ID is missing"); // Throw an error if userId is missing
        }
        
        const bookings = await repoGetBookings(parseInt(user_id));
        
        // Manipulate data to include room name, property name, and date
        const enhancedBookings = bookings.map(booking => ({
            ...booking,
            room_name: booking.room.name,
            property_name: booking.room.property.name,
            date: booking.check_in // Assuming check_in contains the booking date in Transaction model
        }));
        
        console.log(enhancedBookings, user_id);
        return {
            status: 200,
            success: true,
            message: 'get bookings success',
            data: enhancedBookings,
        };
    } catch (error) {
        return {
            status: 500,
            message: 'server error',
            error: (error as Error).message,
        };
    }
};
