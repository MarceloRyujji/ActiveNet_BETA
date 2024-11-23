export const fetchTrainers = async (prompt) => {
    try {
      const response = await fetch(`http://localhost:3001/trainers/filter?accountType=trainer&name=${prompt}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch trainers');
      }
  
      const data = await response.json();
      console.log(response)
      return data; 
    } catch (error) {
      throw new Error(error.message);
    }
  };
  