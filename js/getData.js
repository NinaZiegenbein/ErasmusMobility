import { csv } from "d3";

const csvUrl = "/test.csv";

export const getData = async () => {
  const data = await csv(csvUrl);
  return data;
};
