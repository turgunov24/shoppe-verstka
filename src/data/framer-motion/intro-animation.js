export const introAnimation = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
};
export const alert = {
  hidden: {
    opacity: 0,
    scale: 0.5,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1,
    //   damping: 300,
      type:"tween",
      stiffness: 400,
    },
  },
};
