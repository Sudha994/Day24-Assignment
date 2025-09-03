import React, { useState } from 'react';
import './MovieTicketBooking.css';

const MovieTicketBooking = () => {
  // Sample movie data
  const movieData = {
    id: 1,
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival. Directed by Christopher Nolan and starring Matthew McConaughey and Anne Hathaway.",
    duration: "2h 49m",
    genre: "Sci-Fi, Adventure, Drama",
    rating: "PG-13",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    showtimes: ["13:30", "16:45", "20:00", "22:30"]
  };

  // Initial seat layout
  const initialSeats = [];
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  
  for (let i = 0; i < rows.length; i++) {
    for (let j = 1; j <= 10; j++) {
      // Randomly occupy some seats for realism
      const isOccupied = Math.random() < 0.3;
      initialSeats.push({
        id: `${rows[i]}${j}`,
        row: rows[i],
        number: j,
        occupied: isOccupied,
        selected: false
      });
    }
  }

  // State for selected showtime
  const [selectedShowtime, setSelectedShowtime] = useState(movieData.showtimes[0]);
  
  // State for seats
  const [seats, setSeats] = useState(initialSeats);
  
  // State for booking confirmation
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Toggle seat selection
  const toggleSeat = (seatId) => {
    setSeats(seats.map(seat => {
      if (seat.id === seatId && !seat.occupied) {
        return { ...seat, selected: !seat.selected };
      }
      return seat;
    }));
  };

  // Select showtime
  const selectShowtime = (time) => {
    setSelectedShowtime(time);
  };

  // Get selected seats
  const selectedSeats = seats.filter(seat => seat.selected);

  // Calculate total price
  const totalPrice = selectedSeats.length * movieData.price;

  // Handle booking confirmation
  const confirmBooking = () => {
    if (selectedSeats.length > 0) {
      setIsConfirmed(true);
      
      // In a real app, you would send the booking data to a server here
    }
  };

  // Reset booking
  const resetBooking = () => {
    setSeats(initialSeats.map(seat => ({ ...seat, selected: false })));
    setIsConfirmed(false);
  };

  return (
    <div className="container">
      <header>
        <h1 className="app-title">CineMax</h1>
        <p className="app-subtitle">Book your movie tickets in seconds</p>
      </header>
      
      <div className="content">
        <section className="movie-section">
          <h2 className="section-title">
            <i className="fas fa-film section-icon"></i>
            Now Showing
          </h2>
          
          <div className="movie-card">
            <div className="movie-header">
              <img src={movieData.image} alt={movieData.title} className="movie-poster" />
              <div className="movie-info">
                <h3 className="movie-title">{movieData.title}</h3>
                <div className="movie-details">
                  <span className="detail-item"><i className="fas fa-clock"></i> {movieData.duration}</span>
                  <span className="detail-item"><i className="fas fa-ticket-alt"></i> {movieData.genre}</span>
                  <span className="detail-item"><i className="fas fa-certificate"></i> {movieData.rating}</span>
                </div>
                <p className="movie-description">{movieData.description}</p>
              </div>
            </div>
            
            <div className="showtime-selector">
              <span className="showtime-label">Select Showtime:</span>
              <div className="showtime-buttons">
                {movieData.showtimes.map(time => (
                  <button
                    key={time}
                    className={`showtime-btn ${time === selectedShowtime ? 'selected' : ''}`}
                    onClick={() => selectShowtime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="screen-container">
            <div className="screen">SCREEN</div>
            
            <div className="seats-grid">
              {rows.map(row => (
                <React.Fragment key={row}>
                  <div className="seat legend">{row}</div>
                  {seats
                    .filter(seat => seat.row === row)
                    .map(seat => (
                      <div
                        key={seat.id}
                        className={`seat ${seat.selected ? 'selected' : ''} ${seat.occupied ? 'occupied' : ''}`}
                        onClick={() => !seat.occupied && toggleSeat(seat.id)}
                      >
                        <span className="row-label">{seat.row}</span>
                        {seat.number}
                      </div>
                    ))
                  }
                </React.Fragment>
              ))}
            </div>
            
            <div className="legend-container">
              <div className="legend-item">
                <div className="legend-color legend-available"></div>
                <span>Available</span>
              </div>
              <div className="legend-item">
                <div className="legend-color legend-selected"></div>
                <span>Selected</span>
              </div>
              <div className="legend-item">
                <div className="legend-color legend-occupied"></div>
                <span>Occupied</span>
              </div>
            </div>
          </div>
        </section>
        
        <section className="booking-section">
          <div className="booking-container">
            <div className="booking-title">
              <i className="fas fa-ticket-alt booking-icon"></i>
              <span>Booking Summary</span>
            </div>
            
            <div className="booking-details">
              <div className="booking-item">
                <span className="booking-label">Movie:</span>
                <span className="booking-value">{movieData.title}</span>
              </div>
              
              <div className="booking-item">
                <span className="booking-label">Showtime:</span>
                <span className="booking-value">{selectedShowtime}</span>
              </div>
              
              <div className="booking-item">
                <span className="booking-label">Seats:</span>
                <span className="booking-value">
                  {selectedSeats.length > 0 
                    ? selectedSeats.map(seat => seat.id).join(', ') 
                    : 'None selected'}
                </span>
              </div>
              
              <div className="booking-item">
                <span className="booking-label">Tickets:</span>
                <span className="booking-value">{selectedSeats.length}</span>
              </div>
              
              <div className="booking-item">
                <span className="booking-label">Price per ticket:</span>
                <span className="booking-value">${movieData.price.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="booking-total">
              <span className="total-label">Total:</span>
              <span className="total-amount">${totalPrice.toFixed(2)}</span>
            </div>
            
            {!isConfirmed ? (
              <button 
                className="confirm-button"
                onClick={confirmBooking}
                disabled={selectedSeats.length === 0}
              >
                Confirm Booking
              </button>
            ) : (
              <div className="confirmation-message">
                <i className="fas fa-check-circle" style={{fontSize: '2.5rem', marginBottom: '15px', color: '#10b981'}}></i>
                <h3>Booking Confirmed!</h3>
                <p>Your tickets for {movieData.title} at {selectedShowtime} have been booked.</p>
                <p style={{marginTop: '10px', fontWeight: '600'}}>
                  Seats: {selectedSeats.map(seat => seat.id).join(', ')}
                </p>
                <button 
                  className="confirm-button"
                  onClick={resetBooking}
                  style={{marginTop: '15px', background: '#374151'}}
                >
                  Book Another Movie
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MovieTicketBooking;