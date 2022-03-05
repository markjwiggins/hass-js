import glob, { IOptions } from "glob";

const promise = (pattern: string, options: IOptions = {}): Promise<string[]> =>
  new Promise((resolve, reject) => {
    glob(pattern, options, (err, files) => (err === null ? resolve(files) : reject(err)));
  });

const directoryImport = async (path: string) => {
  const res = await promise(`${path}/**/*.ts`);
  const modules = await Promise.all(res.map((file) => import(file.replace(".ts", ""))));
  return modules.map((module) => module.default);
};

export default directoryImport;
