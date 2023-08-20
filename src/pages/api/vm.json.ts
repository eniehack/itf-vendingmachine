export const prerender = false;

export type OSMObject = {
	type: "node",
	id: number,
	lat: number,
	lon: number,
	tags: Object
}

type Payload = {
	version: number,
	generator: string,
	osm3s: Object,
	elements: OSMObject[]
}

export async function get() {
    const query: string =
		'[out:json][timeout:50]; \
way(id:183555030); \
map_to_area-> .ulis; \
way(id:183555029); \
map_to_area -> .ut; \
( \
  node(area.ulis)[amenity=vending_machine]; \
  node(area.ut)[amenity=vending_machine]; \
); \
out;';
    const endpoint: URL = new URL('https://overpass-api.de/api/interpreter')
    endpoint.searchParams.append("data", query);
    console.log(endpoint.toString())

	let resp = await fetch(endpoint);
    console.log(resp);

    if (!resp.ok) {
		return {
            body: '自動販売機データの取得に失敗しました\nリロードしてください',
            headers: {
                "Content-Type": "text/plain"
            },
            status: 500,
        };
    }

    let json: Payload = await resp.json() satisfies Payload;
    console.log(json);
    return {
        body: JSON.stringify({nodes: json.elements} satisfies {nodes: OSMObject[]}),
        status: 200,
        headers: {
            'Cache-Control': 'max-age=43200, public, s-maxage=300, stale-while-revalidate=300',
            "Content-Type": "application/json"
        }
    };
}