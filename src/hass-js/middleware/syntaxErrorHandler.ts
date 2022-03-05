export default (err: any, req: any, res: any, next: any) => {
  if (err instanceof SyntaxError) return res.status(400).json({ message: err.message });
  next();
};
