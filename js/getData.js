import { csv } from "d3";

const csvUrl = "/erasmus14-19.csv";

// get the data from local file storage with d3
export const getData = async () => {
  const data = await csv(csvUrl);

  console.log(data[0]);
  return data;
};
