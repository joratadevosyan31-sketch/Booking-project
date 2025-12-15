export const loadBookingFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('bookingCard');
        if (!serializedState) {
            return {
                selectedSubservices: [],
                professional: null,
            };
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.error('Error loading from localStorage:', err);
        return {
            selectedSubservices: [],
            professional: null,
            selectedDate: null,
            selectedTime: null,
        };
    }
};


export const saveBookingToLocalStorage = (state) => {
    try {
        localStorage.setItem('bookingCard', JSON.stringify(state));
    } catch (err) {
        console.error('Error saving to localStorage:', err);
    }
};

export const clearBookingFromLocalStorage = () => {
    try {
        localStorage.removeItem('bookingCard');
    } catch (err) {
        console.error('Error clearing localStorage:', err);
    }
};

export const updateBookingInLocalStorage = (newData) => {
    try {
        const oldData = loadBookingFromLocalStorage();

        const updatedData = {
            ...oldData,
            ...newData,
        };

        localStorage.setItem('bookingCard', JSON.stringify(updatedData));
    } catch (err) {
        console.error("Error updating booking in localStorage:", err);
    }
};

