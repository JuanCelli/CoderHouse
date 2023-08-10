export async function getProducts(){
    const res = await fetch("/src/data/data.json")
    return await res.json()
}
