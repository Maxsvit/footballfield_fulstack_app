package com.example.football_booking.Service;

import com.example.football_booking.model.Booking;
import com.example.football_booking.repository.BookingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;

    public BookingServiceImpl(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    @Override
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reservation with ID " + id + " not exist"));
    }

    @Override
    public Booking createBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    @Override
    public Booking updateBooking(Long id, Booking booking) {
        Booking existingBooking = getBookingById(id);
        existingBooking.setUser(booking.getUser());
        existingBooking.setField(booking.getField());
        existingBooking.setDate(booking.getDate());
        existingBooking.setStartTime(booking.getStartTime());
        existingBooking.setDuration(booking.getDuration());
        existingBooking.setStatus(booking.getStatus());
        return bookingRepository.save(existingBooking);
    }

    @Override
    public void deleteBooking(Long id) {
        if (!bookingRepository.existsById(id)) {
            throw new RuntimeException("Reservation with ID " + id + " not exist");
        }
        bookingRepository.deleteById(id);
    }
}
