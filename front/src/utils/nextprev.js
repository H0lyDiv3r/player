export const prev = (length, current) => {
  console.log("coming form nextprev", length, current);
  if (current == 0) {
    return length - 1;
  } else {
    return current - 1;
  }
};
export const next = (length, current) => {
  console.log("coming form nextprev", length, current);
  if (current == length - 1) {
    return 0;
  } else {
    return current + 1;
  }
};