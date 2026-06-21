import { apiFetch } from "../../lib/apiClient";

const API ="http://localhost:5000/api/stats";

export async function getStats() {
  const response =
    await apiFetch(API);

  const result =
    await response.json();

  return result.data;
}

export async function getHeatmap(){
    const response = await apiFetch(`${API}/heatmap`);

    const result = await response.json();

    return result.data;
}