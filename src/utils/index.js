export const getCategoryInitial = (category) => {
    switch (category) {
      case 'Swimming':
        return 'S';
      case 'Athletics':
        return 'A';
      case 'Boxing':
        return 'B';
      default:
        return category.charAt(0);
    }
  };

export const convertTo12HrFormat = timeString => {
    let [hours, minutes] = timeString.split(':');
    hours = parseInt(hours, 10);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    minutes = minutes.slice(0, 2);
    const strTime = `${hours}:${minutes} ${ampm}`;
    return strTime;
  }