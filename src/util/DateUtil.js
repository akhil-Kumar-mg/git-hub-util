const getCurrentDate = () => {
  return formatDate(new Date());
};

const getPriorDate = days => {
  let date = new Date();
  return formatDate(new Date(date.setDate(date.getDate() - days)));
};

const formatDate = date => {
  return date.toISOString().split(".")[0] + "Z";
};

export default {
  getCurrentDate,
  getPriorDate
};
