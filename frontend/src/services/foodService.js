import axios from 'axios';

export const getAll = async () => {
    const {data} = await axios.get('/api/foods');
    return data;
};

export const search = async searchTerm =>
{
    const { data } = await axios.get('/api/foods/search/' + searchTerm);
    return data;
}

export const getById = async foodId =>
{
    const { data} = await axios.get('/api/foods/' + foodId);
    return data;
}
export async function deleteById(foodId) {
    await axios.delete('/api/foods/' + foodId);
  }