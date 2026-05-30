let toastRef = null;

export const setToastRef = ref => {
  toastRef = ref;
};

export const toast = {
  show: (message, options = {}) => {
    if (!toastRef) {
      console.warn('Toast ref not set');
      return;
    }

    return toastRef.show(message, options);
  },

  hide: id => {
    toastRef?.hide(id);
  },

  hideAll: () => {
    toastRef?.hideAll();
  },
};
