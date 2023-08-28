import axios from "axios";
import { IGifData } from "../models/IGif";

const API_KEY = "XUwCPR5mfPzG0QhiVdtV3QNPrj0cdOMm";

export const getRandomGif = async (): Promise<IGifData> => {
  let response = await axios.get<IGifData>(
    `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`,
  );
  return response.data;
};
