const urlSeparetor = (url) => {
  const lastSegment = url.split("/").pop();
  return lastSegment;
};

export { urlSeparetor };
