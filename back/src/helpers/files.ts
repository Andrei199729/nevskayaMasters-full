import fsPromises from "fs/promises";

const getDataFromFile = (pathToFile: any) => {
  return fsPromises
    .readFile(pathToFile, { encoding: "utf8" })
    .then((data: string) => JSON.parse(data))
    .catch((err: any) => console.log(err));
};

export default getDataFromFile;
