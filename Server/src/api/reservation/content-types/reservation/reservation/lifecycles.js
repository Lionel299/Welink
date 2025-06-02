module.exports = {
  beforeCreate(event) {
    const { data } = event.params;
    if (new Date(data.startDate) >= new Date(data.endDate)) {
      throw new Error('La date de début doit être antérieure à la date de fin.');
    }
  },
  beforeUpdate(event) {
    const { data } = event.params;
    if (data.startDate && data.endDate && new Date(data.startDate) >= new Date(data.endDate)) {
      throw new Error('La date de début doit être antérieure à la date de fin.');
    }
  },
};
