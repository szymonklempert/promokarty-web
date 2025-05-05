"use server";


export const getFilters = async () => {
    const res = await fetch("http://127.0.0.1:8000/filters")
    return res.json();
}

