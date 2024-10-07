export const shuffle = async (arr, starter) => {
  return new Promise((resolve, reject) => {
    try {
      let array = [...arr];
      let element = array[starter];

      array.splice(starter, 1);
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      array.unshift(element);
      resolve(array);
    } catch (error) {
      reject(error);
    }
  });
};
