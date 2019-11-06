export const TOGGLE_MODAL = "TOGGLE_MODAL";
export const CLOSE_MODALS = 'CLOSE_MODALS';

export const toggleModal = (modalName) => ({
  type: TOGGLE_MODAL,
  modal: modalName
});

// export const CLOSE_MODALS = () => ({
//   type: CLOSE_MODALS
// });