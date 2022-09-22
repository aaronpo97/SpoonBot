export interface NameResult {
  name: string;
  input: { cuisine: string; keywords: string[] };
}
export interface ReviewResult {
  review: string;
  input: { name: string; keywords: string[] };
}

export interface MenuResult {
  menu: string;
  input: { name: string; cuisine: string };
}
