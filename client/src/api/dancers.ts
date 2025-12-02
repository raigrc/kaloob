import axios from "./axios";

export const fetchDancers = async () => {
  try {
    const response = await axios.get("/dancers");

    response.data.sort((a: any, b: any) => (a.name > b.name ? 1 : -1));
    return response;
  } catch (error) {
    console.error("Error fetching dancers", error);
    return null;
  }
};

export const fetchDancerById = async (id: string | undefined) => {
  try {
    const response = await axios.get(`/dancers/${id}`);
    return response;
  } catch (error) {
    console.error(`Error fetching dancer with id: ${id}`, error);
    return null;
  }
};

export const fetchDancerWithHistory = async () => {
  try {
    const response = await axios.get(`/dancers/dist`);
    return response;
  } catch (error) {
    console.error(`Error fetching dancer with history`, error);
    return null;
  }
};
