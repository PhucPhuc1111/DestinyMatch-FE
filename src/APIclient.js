// APIClient.js

const BASE_URL = 'https://destiny-match.azurewebsites.net/api';

/* =============== Account ===============*/
/* =============== End Account ===============*/

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
/* =============== Major ===============*/
export async function fetchMajors(search, page, pageSize) {
  try {
    const response = await fetch(`${BASE_URL}/major?search=${search}&page=${page}&pagesize=${pageSize}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching hobbies:', error);
    throw error;
  }
}

export async function deleteMajor(id) {
  try {
    const response = await fetch(`${BASE_URL}/major/${id}`, {
      method: 'DELETE',
      headers: {
        accept: '*/*'
      }
    });

    if (response.status === 204) {
      return true;
    } else {
      throw new Error('Failed to delete major');
    }
  } catch (error) {
    console.error('Error deleting major:', error);
    throw error;
  }
}

export async function updateMajor(major) {
  try {
    const response = await fetch(`${BASE_URL}/major/${major.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(major)
    });

    if (!response.ok) {
      throw new Error('Failed to update major');
    }

    return true;
  } catch (error) {
    console.error('Error updating major:', error);
    throw error;
  }
}

export async function createMajor(major) {
  try {
    const response = await fetch(`${BASE_URL}/major`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(major)
    });

    if (!response.ok) {
      throw new Error('Failed to create major');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating major:', error);
    throw error;
  }
}

/* =============== End Major ===============*/

/* =============== University ===============*/
export async function fetchUniversities(search, page, pageSize) {
  try {
    const response = await fetch(`${BASE_URL}/university?search=${search}&page=${page}&pagesize=${pageSize}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching hobbies:', error);
    throw error;
  }
}

export async function deleteUniversity(id) {
  try {
    const response = await fetch(`${BASE_URL}/university/${id}`, {
      method: 'DELETE',
      headers: {
        accept: '*/*'
      }
    });

    if (response.status === 204) {
      return true;
    } else {
      throw new Error('Failed to delete University');
    }
  } catch (error) {
    console.error('Error deleting University:', error);
    throw error;
  }
}

export async function updateUniversity(University) {
  try {
    const response = await fetch(`${BASE_URL}/university/${University.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(University)
    });

    if (!response.ok) {
      throw new Error('Failed to update University');
    }

    return true;
  } catch (error) {
    console.error('Error updating University:', error);
    throw error;
  }
}

export async function createUniversity(University) {
  try {
    const response = await fetch(`${BASE_URL}/university`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(University)
    });

    if (!response.ok) {
      throw new Error('Failed to create University');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating University:', error);
    throw error;
  }
}

/* =============== End University ===============*/
/* =============== Package ===============*/
export async function fetchPackages(search, page, pageSize) {
  try {
    const response = await fetch(`${BASE_URL}/package?pageIndex=${page}&PageSize=${pageSize}&searchString=${search}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching packages:', error);
    throw error;
  }
}

export async function deletePackage(id) {
  try {
    const response = await fetch(`${BASE_URL}/package/${id}`, {
      method: 'DELETE',
      headers: {
        accept: '*/*'
      }
    });

    if (response.status === 200) {
      return true;
    } else {
      throw new Error('Failed to delete package');
    }
  } catch (error) {
    console.error('Error deleting package:', error);
    throw error;
  }
}

export async function updatePackage(pkg) {
  try {
    const response = await fetch(`${BASE_URL}/package`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pkg)
    });

    if (!response.ok) {
      throw new Error('Failed to update package');
    }

    return true;
  } catch (error) {
    console.error('Error updating package:', error);
    throw error;
  }
}

export async function createPackage(pkg) {
  try {
    const response = await fetch(`${BASE_URL}/package`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pkg)
    });

    if (!response.ok) {
      throw new Error('Failed to create package');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating package:', error);
    throw error;
  }
}

/* =============== End Package ===============*/

/* =============== Member ===============*/
/* =============== End Member ===============*/
