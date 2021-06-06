export interface File {
  info: {
    path: string,
    type: string,
    size: number
  },
  content: string;
}