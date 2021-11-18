import { csv } from "d3";

const csvUrl = "/erasmus14-19.csv";

export const getData = async () => {
  const data = await csv(csvUrl);

  console.log(data[0]);
  return data;
};
