import { Company, Post, Country } from "@/type/type";

export const countries: Country[] = [
  { code: 1, name: "United States" },
  { code: 2, name: "Germany" },
];

export const companies: Company[] = [
  {
    id: "c1",
    name: "Acme Corp",
    country: "US",
    emissions: [
      { yearMonth: "2024-01", emissions: 120, source: "reported" },
      { yearMonth: "2024-02", emissions: 110, source: "reported" },
    ],
  },
];

const initialPosts: Post[] = [
  {
    id: "p1",
    title: "Sustainability Report",
    resourceUid: "c1",
    dateTime: "2024-02",
    content: "Quarterly CO2 update",
  },
];

type GlobalWithPosts = typeof globalThis & {
  __posts: Post[];
};

const g = globalThis as GlobalWithPosts;

g.__posts = g.__posts ?? [...initialPosts];

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const jitter = () => 200 + Math.random() * 600;

export async function fetchPosts() {
  await delay(jitter());

  // 항상 최신 참조 반환
  return [...g.__posts];
}

export async function createOrUpdatePost(
  p: Omit<Post, "id"> & { id?: string },
) {
  await delay(jitter());

  if (p.id) {
    g.__posts = g.__posts.map((x) => (x.id === p.id ? (p as Post) : x));

    return p;
  }

  const created: Post = {
    ...p,
    id: crypto.randomUUID(),
  };

  g.__posts = [...g.__posts, created];

  return created;
}

export async function fetchCountries() {
  await delay(jitter());
  return countries;
}

export async function fetchCompanies() {
  await delay(jitter());
  return companies;
}
