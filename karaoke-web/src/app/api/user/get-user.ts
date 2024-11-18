import api from "@/app/services/api";
import { IGetShowProps } from "@/interfaces/show";
import { IGetUser } from "@/interfaces/user";
import { toast } from "sonner";

export async function getUser(showId: string){
  try{
    const response = await api.get<IGetUser>('/user/', {
      params: {
        show_id: showId
      }
    });

    return response.data;
  }catch(error: any){
    console.error(
      'Error fetching data:',
      error.response?.data || error.message || error,
    );
    if (error.response.data.message) toast.error(error.response.data.message);

    throw new Error(error.response?.data.message || 'Error fetching data');
  }
}
