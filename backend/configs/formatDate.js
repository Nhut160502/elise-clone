const formatDate = () => {
  const d_t = new Date();

  let year = d_t.getFullYear();
  let month = d_t.getMonth();
  let day = d_t.getDate();
  return `${day}/${month + 1}/${year}`;
};

export default formatDate;
