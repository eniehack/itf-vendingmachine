<script lang="ts">
  const query: string = "[out:json][timeout:25]; \
way(id:183555030); \
map_to_area-> .ulis; \
way(id:183555029); \
map_to_area -> .ut; \
( \
  node(area.ulis)[amenity=vending_machine]; \
  node(area.ut)[amenity=vending_machine]; \
); \
out;";

 const vending = new Map<string, string>([
     ["drinks", "飲料"],
     ["food", "食品"],
     ["ice_cream", "アイスクリーム"],
 ]);

 const find_vendingmachine = async function() {
     let resp = await fetch("https://lz4.overpass-api.de/api/interpreter", {
          method: "POST",
          mode: "cors",
          headers: {
              "Content-Type": "application/x-www-form-urlencode",
          },
          body: query,
      })


     if (resp.ok) {
         let json = await resp.json();
         console.log(json);
         return json;
     } else {
         let text = await resp.text();
         throw new Error(text);
     }
}
</script>

{#await find_vendingmachine()}
    waiting...
{:then result}
{#each result.elements as elem}
    <section>
        <h1>自動販売機</h1>
        <a href="geo:{elem.lat},{elem.lon}">geo URI</a>
        <a href="geo:{elem.lat},{elem.lon}">geo URI</a>
        <p>取り扱っているもの: {vending.get(elem.tags.vending)}
    </section>
{/each}
<p>データは{result.osm3s.timestamp_areas_base}頃のものです</p>
<p>{result.osm3s.copyright}</p>
{:catch error}
<p style="color: red">{error.message}</p>
{/await}
