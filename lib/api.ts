const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;


export async function register(name: string, email: string, password: string) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data.message)
  return data
}

export async function login(email: string, password: string) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data.message)
  return data
}

export async function getProfile(token: string) {
  const response = await fetch(`${API_URL}/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data.message)
  return data
}

export async function updateProfile(token: string, updates: any) {
  const isFileUpload = updates.image instanceof File

  console.log("updateProfile called with:", {
    hasImage: !!updates.image,
    imageType: updates.image?.constructor.name,
    isFile: isFileUpload,
    updateKeys: Object.keys(updates),
  })  

  let body
  let headers: HeadersInit = {
    Authorization: `Bearer ${token}`,
  }

  if (isFileUpload) {
    const formData = new FormData()
    formData.append("image", updates.image)
    if (updates.name) formData.append("name", updates.name)
    if (updates.password) formData.append("password", updates.password)

    console.log("Sending FormData with file:", updates.image.name)
    body = formData
  } else {
    body = JSON.stringify(updates)
    headers["Content-Type"] = "application/json"
  }

  try {
    const response = await fetch(`${API_URL}/auth/profile`, {
      method: "PATCH",
      headers,
      body,
    })
    
    const data = await response.json()
    
    console.log("[updateProfile response:", {
      status: response.status,
      profileImage: data.user?.profile_image,
      imageUrl: data.user?.imageUrl,
      fullResponse: data,
    })
    
    if (!response.ok) throw new Error(data.message)
    return data
  } catch (error) {
    console.error("updateProfile error:", error)
    throw error
  }
}

export async function addTodo(token: string, todo: any) {
  const response = await fetch(`${API_URL}/todo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(todo),
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data.message)
  return data
}

export async function listTodos(token: string) {
  const response = await fetch(`${API_URL}/todo`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const text = await response.text(); // read raw text once

  // Debug safely
  console.log("RAW TODOS RESPONSE:", response.status, text);

  // Attempt to parse JSON
  let data;
  try {
    data = JSON.parse(text);
  } catch (e) {
    throw new Error("Invalid JSON returned from server");
  }

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch todos");
  }

  return { todos: data };
}

export async function updateTodo(token: string, id: string, updates: any) {
  const response = await fetch(`${API_URL}/todo/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data.message)
  return data
}

export async function markTodoCompleted(token: string, id: string) {
  const response = await fetch(`${API_URL}/todo/${id}/complete`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data.message)
  return data
}

export async function deleteTodo(token: string, id: string) {
  const response = await fetch(`${API_URL}/todo/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data.message)
  return data
}
