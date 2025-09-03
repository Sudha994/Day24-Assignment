import React, { useState } from 'react';
import './HotelroomReservation.css';

const HotelroomReservation = () => {
  // Sample room data
  const roomsData = [
    {
      id: 1,
      title: "Standard Room",
      description: "Comfortable room with a queen-sized bed, perfect for solo travelers or couples.",
      price: 99,
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      features: ["Wi-Fi", "TV", "Air Conditioning", "1 Bed"]
    },
    {
      id: 2,
      title: "Deluxe Room",
      description: "Spacious room with a king-sized bed and sitting area, ideal for a relaxing stay.",
      price: 149,
      image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      features: ["Wi-Fi", "TV", "Air Conditioning", "Mini Bar", "1 Bed"]
    },
    {
      id: 3,
      title: "Family Suite",
      description: "Large suite with separate living area and two bedrooms, perfect for families.",
      price: 229,
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      features: ["Wi-Fi", "2 TVs", "Air Conditioning", "Mini Kitchen", "2 Beds"]
    }
  ];

  // State for selected room
  const [selectedRoom, setSelectedRoom] = useState(null);
  
  // State for check-in and check-out dates
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  
  // State for booking confirmation
  const [isBooked, setIsBooked] = useState(false);

  // Calculate number of nights
  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const timeDiff = checkOut.getTime() - checkIn.getTime();
    const nights = timeDiff / (1000 * 3600 * 24);
    
    return nights > 0 ? Math.floor(nights) : 0;
  };

  // Calculate total price
  const calculateTotal = () => {
    if (!selectedRoom) return 0;
    
    const nights = calculateNights();
    return selectedRoom.price * nights;
  };

  // Handle room selection
  const selectRoom = (room) => {
    setSelectedRoom(room);
  };

  // Handle booking
  const bookRoom = () => {
    if (selectedRoom && calculateNights() > 0) {
      setIsBooked(true);
    }
  };

  // Reset booking
  const resetBooking = () => {
    setSelectedRoom(null);
    setCheckInDate("");
    setCheckOutDate("");
    setIsBooked(false);
  };

  return (
    <div className="container">
      <header>
        <h1 className="app-title">Luxury Stay</h1>
        <p className="app-subtitle">Book your perfect getaway with ease</p>
      </header>
      
      <div className="content">
        <section className="rooms-section">
          <h2 className="section-title">
            <i className="fas fa-bed section-icon"></i>
            Available Rooms
          </h2>
          
          <div className="date-selector">
            <div className="date-input-group">
              <div className="date-input">
                <label className="date-label">Check-in Date</label>
                <input 
                  type="date" 
                  className="date-field"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div className="date-input">
                <label className="date-label">Check-out Date</label>
                <input 
                  type="date" 
                  className="date-field"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  min={checkInDate || new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>
            
            <div className="nights-count">
              {calculateNights() > 0 ? `${calculateNights()} nights` : "Select dates"}
            </div>
          </div>
          
          <div className="rooms-grid">
            {roomsData.map(room => (
              <div 
                key={room.id} 
                className={`room-card ${selectedRoom?.id === room.id ? 'selected' : ''}`}
              >
                <img src={room.image} alt={room.title} className="room-image" />
                <div className="room-info">
                  <h3 className="room-title">{room.title}</h3>
                  
                  <div className="room-features">
                    {room.features.map((feature, index) => (
                      <span key={index} className="feature">
                        <i className="fas fa-check"></i> {feature}
                      </span>
                    ))}
                  </div>
                  
                  <p className="room-description">{room.description}</p>
                  
                  <div className="room-price">${room.price} / night</div>
                  
                  <button 
                    className={`select-button ${selectedRoom?.id === room.id ? 'selected' : ''}`}
                    onClick={() => selectRoom(room)}
                  >
                    {selectedRoom?.id === room.id ? 'Selected' : 'Select Room'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        <section className="booking-section">
          <div className="booking-container">
            <div className="booking-title">
              <i className="fas fa-receipt booking-icon"></i>
              <span>Booking Summary</span>
            </div>
            
            {!selectedRoom ? (
              <p className="empty-message">Select a room to see booking details</p>
            ) : (
              <>
                <div className="booking-details">
                  <div className="booking-item">
                    <span className="booking-label">Room:</span>
                    <span className="booking-value">{selectedRoom.title}</span>
                  </div>
                  
                  <div className="booking-item">
                    <span className="booking-label">Check-in:</span>
                    <span className="booking-value">
                      {checkInDate ? new Date(checkInDate).toDateString() : "Select date"}
                    </span>
                  </div>
                  
                  <div className="booking-item">
                    <span className="booking-label">Check-out:</span>
                    <span className="booking-value">
                      {checkOutDate ? new Date(checkOutDate).toDateString() : "Select date"}
                    </span>
                  </div>
                  
                  <div className="booking-item">
                    <span className="booking-label">Nights:</span>
                    <span className="booking-value">{calculateNights()}</span>
                  </div>
                  
                  <div className="booking-item">
                    <span className="booking-label">Price per night:</span>
                    <span className="booking-value">${selectedRoom.price}</span>
                  </div>
                </div>
                
                <div className="booking-total">
                  <span className="total-label">Total:</span>
                  <span className="total-amount">${calculateTotal().toFixed(2)}</span>
                </div>
                
                {!isBooked ? (
                  <button 
                    className="book-button"
                    onClick={bookRoom}
                    disabled={calculateNights() === 0}
                  >
                    Book Now
                  </button>
                ) : (
                  <div className="confirmation-message">
                    <i className="fas fa-check-circle" style={{fontSize: '2.5rem', marginBottom: '15px', color: '#10b981'}}></i>
                    <h3>Booking Confirmed!</h3>
                    <p>Your stay at {selectedRoom.title} has been booked.</p>
                    <p style={{marginTop: '10px', fontWeight: '600'}}>
                      Total: ${calculateTotal().toFixed(2)}
                    </p>
                    <button 
                      className="book-button"
                      onClick={resetBooking}
                      style={{marginTop: '15px', background: '#374151'}}
                    >
                      Make Another Booking
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HotelroomReservation;