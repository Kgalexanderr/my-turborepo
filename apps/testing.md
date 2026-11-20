const response = await fetch("/api/websites", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    content: "Hello from WorkOS + Supabase!",
  }),
});

console.log(response.status, await response.json());

////////////////////////

const response = await fetch("/api/websites", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
});

console.log(response.status, await response.json());





const response = await fetch("https://app.ongrapes.com/api/websites", {
  method: "GET",
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
});

console.log(response.status, await response.json());