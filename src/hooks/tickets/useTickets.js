import { useState } from 'react';
import { useSearch } from '../../hooks/generic/useSearch';

import {
  editTicket,
  deleteTicket,
  fetchTicketsByRiffle,
  raffleById,
} from '../../services/tickets/TicketService';
import {
  errorAlert,
  toast,
  confirmDelete,
  confirmReservation,
} from '../../services/generic/AlertService';
import useAuthStore from '../../stores/auth/useAuthStore';

/**
 * Custom hook to manage ticket-related operations.
 * @returns {Object} Ticket management functions.
 */
export const useTickets = () => {
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState([]);
  const [raffle, setRaffles] = useState([]);
  const { user } = useAuthStore();
  const {
    searchQuery,
    //setSearchQuery,
    //filteredData: filteredTicketss,
  } = useSearch(tickets, ['ticket_number']);

  const [openModal, setOpenModal] = useState(false);

  /**
   * State variable to manage the open/close state.
   * @type {boolean}
   */
  const [open, setOpen] = useState(false);

  /**
   * State to hold the currently selected ticket.
   * @type {[Object|null, Function]} selectedTicket - The selected ticket object or null if no ticket is selected.
   * @type {Function} setSelectedTicket - Function to update the selected ticket state.
   */
  const [selectedTickets, setSelectedTickets] = useState([]);

  const [
    selectedTicket,
    setSelectedTicket,
    selectedButtonIndex,
    setSelectedButtonIndex,
  ] = useState(null);

  /**
   * State variable to keep track of the current index.
   * @type {[number, Function]}
   */
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const selectedTicketNumbers = selectedTickets
    .map((ticket) => ticket.ticket_number)
    .join(', ');

  /**
   * State variable to keep track of the current page number.
   * @type {number}
   */
  const [ticketsPerPage, setTicketsPerPage] = useState(5);

  /**
   * Filters the tickets based on the search query.
   *
   * @param {Array} tickets - The array of ticket objects to filter.
   * @param {string} searchQuery - The search query to filter tickets by.
   * @returns {Array} - The filtered array of tickets that match the search query.
   */
  const filteredTickets = tickets.filter((ticket) => {
    const ticketNumber = ticket.ticket_number?.toString().toLowerCase();
    return ticketNumber.includes(searchQuery.toLowerCase());
  });

  /**
   * Calculates the starting index for the current page of tickets.
   *
   * @constant {number} startIndex - The index at which to start displaying tickets for the current page.
   * @param {number} currentPage - The current page number.
   * @param {number} ticketsPerPage - The number of tickets displayed per page.
   * @returns {number} The starting index for the current page of tickets.
   */
  const startIndex = (currentPage - 1) * ticketsPerPage;

  /**
   * Calculates the ending index for the current page of tickets.
   *
   * @constant {number} endIndex - The index at which the current page of tickets ends.
   */
  const endIndex = startIndex + ticketsPerPage;

  /**
   * A slice of the filtered tickets array representing the current page of tickets.
   *
   * @constant
   * @type {Array}
   */
  const currentTickets = filteredTickets.slice(startIndex, endIndex);

  /**
   * Calculates the total number of pages based on the number of filtered tickets and tickets per page.
   *
   * @constant {number} totalPages - The total number of pages.
   */
  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);

  /**
   * Handles the click event to open a ticket.
   * Sets the selected ticket based on the provided index and opens the dialog.
   *
   * @param {number} index - The index of the ticket to be selected.
   */
  const handleClickOpen = (index) => {
    setSelectedTicket(tickets[index]);
    setOpenModal(true);
  };

  /**
   * Handles the closing of a modal or dialog.
   * Sets the state to close the modal and clears the selected ticket.
   */
  const handleClose = () => {
    setOpen(false);
    setSelectedTicket(null);
  };

  /**
   * Advances to the next ticket in the list.
   * Updates the current index and the selected button index.
   * If the current index is at the end of the list, it wraps around to the beginning.
   */
  const handleNextTicket = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % tickets.length;
      setSelectedButtonIndex(newIndex);
      return newIndex;
    });
  };

  /**
   * Handles the action of reversing the ticket selection.
   * If the current index is greater than 0, it decrements the current index
   * and updates the selected button index accordingly.
   */
  const handleReverseTicket = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => {
        const newIndex = (prevIndex - 1) % tickets.length;
        setSelectedButtonIndex(newIndex);
        return newIndex;
      });
    }
  };

  /**
   * Function variable that handles the selection of a ticket by updating the current index and the selected button index.
   * This function accepts an index parameter and calls two state update functions:
   * - Updates the current index state to match the provided index.
   * - Updates the selected button index state to match the provided index, ensuring consistent UI state.
   *
   * @param {number} index - The index of the ticket to be selected.
   */
  const handleSelectTicket = (index) => {
    const ticket = tickets[index];
    const isSelected = selectedTickets.some((t) => t.id === ticket.id);

    const ticketPrice =
      typeof raffle.price === 'number'
        ? raffle.price
        : parseFloat(raffle.price);

    if (isSelected) {
      setSelectedTickets(selectedTickets.filter((t) => t.id !== ticket.id));
      setTotalPrice((prevTotal) => prevTotal - ticketPrice);
    } else {
      setSelectedTickets([...selectedTickets, ticket]);
      setTotalPrice((prevTotal) => prevTotal + ticketPrice);
    }
  };

  /**
   * A function that handles the pagination logic for moving to the next page.
   * It updates the current page state by incrementing its value by one.
   * Typically used in a paginated component or interface.
   */
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Funcion para devolverse en la navegacion de los tickets por página
  const handlePreviousPage = () => {
    // Actualiza el estado 'currentPage' decrementando en 1 el valor actual

    // pero asegurándose de que no sea menor que 1
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  // Funcion para manejar el cambio de la cantidad de tickets por página
  const handleTicketsPerPageChange = (event) => {
    // Actualiza el estado 'ticketsPerPage' con el valor seleccionado
    setTicketsPerPage(event.target.value);
    setCurrentPage(1); // Resetear a la primera página cuando se cambia el número de tickets por página
  };

  /**
   * Loads tickets for a specific riffle.
   * @param {number} riffleId - The ID of the riffle.
   */
  const loadTickets = async (riffleId) => {
    setLoading(true);
    try {
      const data = await fetchTicketsByRiffle(riffleId);
      setTickets(data);
    } catch {
      errorAlert({ messageKey: 'error_loading_tickets' });
    } finally {
      setLoading(false);
    }
  };

  const searchraffleById = async (riffleId) => {
    setLoading(true);
    try {
      const data = await raffleById(riffleId);
      setRaffles(data);
    } catch {
      errorAlert({ messageKey: 'error_search_raffle' });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Edits a ticket after confirming the reservation.
   * @param {Object} ticketData - The ticket data to edit.
   * @param {number} ticketData.id - The ID of the ticket.
   * @param {number} ticketData.ticketNumber - The ticket number.
   * @param {number} ticketData.riffleId - The associated riffle ID.
   */
  const handleEditTicket = async (ticketData) => {
    const result = await confirmReservation({
      titleKey: 'confirm_reservation_title',
      messageKey: 'confirm_reservation_message',
      ticketNumber: ticketData.ticketNumber,
    });

    if (result.isConfirmed) {
      try {
        const updatedTicketData = {
          ticketNumber: ticketData.ticketNumber,
          riffleId: ticketData.riffleId,
          userId: user.id,
        };
        await editTicket(ticketData.id, updatedTicketData);
        toast({ icon: 'success', titleKey: 'edit_success' });
        await loadTickets(ticketData.riffleId);
      } catch {
        errorAlert({ messageKey: 'error_updating_ticket' });
      }
    }
  };

  /**
   * Deletes a ticket after user confirmation.
   * @param {number} id - The ID of the ticket to delete.
   * @param {number} riffleId - The associated riffle ID.
   */
  const handleDeleteTicket = async (id, riffleId) => {
    const result = await confirmDelete({
      titleKey: 'confirm_delete_title',
      messageKey: 'confirm_delete_message',
    });

    if (result.isConfirmed) {
      try {
        await deleteTicket(id);
        toast({ icon: 'success', titleKey: 'delete_success' });
        await loadTickets(riffleId);
      } catch {
        errorAlert({ messageKey: 'error_deleting_ticket' });
      }
    }
  };

  const handleReservedTickets = async (id) => {
    try {
      await editTicket(id);
      setLoading(true);
      toast({ icon: 'success', titleKey: 'reserve_success' });

      setTimeout(() => {
        setLoading(true);
        window.location.reload();
      }, 3000);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Error reserve ticket';
      errorAlert({ messageKey: errorMessage });
    }
  };

  return {
    tickets,
    raffle,
    loading,
    selectedTicket,
    selectedTickets,
    setSelectedTickets,
    open,
    currentIndex,
    currentPage,
    totalPrice,
    ticketsPerPage,
    selectedButtonIndex,
    filteredTickets,
    startIndex,
    endIndex,
    currentTickets,
    totalPages,
    selectedTicketNumbers,
    openModal,
    setOpenModal,
    loadTickets,
    handleEditTicket,
    handleDeleteTicket,
    searchraffleById,
    handleClickOpen,
    handleClose,
    handleNextTicket,
    handleReverseTicket,
    handleSelectTicket,
    handleNextPage,
    handlePreviousPage,
    handleTicketsPerPageChange,
    handleReservedTickets,
  };
};
