// APIClient.js

const BASE_URL = 'https://localhost:7215/api';

/* =============== Hobby ===============*/
export async function fetchHobbies(search, page, pageSize) {
  try {
    const response = await fetch(`${BASE_URL}/hobby?search=${search}&page=${page}&pagesize=${pageSize}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching hobbies:', error);
    throw error;
  }
}

export async function deleteHobby(id) {
  try {
    const response = await fetch(`${BASE_URL}/hobby/${id}`, {
      method: 'DELETE',
      headers: {
        accept: '*/*'
      }
    });

    if (response.status === 204) {
      return true;
    } else {
      throw new Error('Failed to delete hobby');
    }
  } catch (error) {
    console.error('Error deleting hobby:', error);
    throw error;
  }
}

export async function updateHobby(hobby) {
  try {
    const response = await fetch(`${BASE_URL}/hobby/${hobby.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(hobby)
    });

    if (!response.ok) {
      throw new Error('Failed to update hobby');
    }

    return true;
  } catch (error) {
    console.error('Error updating hobby:', error);
    throw error;
  }
}

export async function createHobby(hobby) {
  try {
    const response = await fetch(`${BASE_URL}/hobby`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(hobby)
    });

    if (!response.ok) {
      throw new Error('Failed to create hobby');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating hobby:', error);
    throw error;
  }
}

/* =============== End Hobby ===============*/
