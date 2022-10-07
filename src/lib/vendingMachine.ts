import { LatLng } from "leaflet";
import { readable, type Readable } from "svelte/store";

export class VendingMachine {
    private tags: Map<string, string>;
    public lat: number;
    public lng: number;

   constructor(elem: Object) {
       this.tags = new Map(Object.entries(elem["tags"]));
       this.lat = elem["lat"];
       this.lng = elem["lon"];
   }

    getPosition(): LatLng{
        return new LatLng(this.lat, this.lng);
    }

    getPaymentsType(): string[] {
        let payments = [];
        this.tags.forEach((v, k) => {
            if (k.startsWith("payment:") && v === "yes") {
                payments.push(k.substring(8));
            }
        });
        return payments;
    }

    getVending(): string {
        return this.tags.get("vending");
    }

    toObject(): Object {
        let out = {};
        let tags = {};
        for (let [k, v] of this.tags) tags[k] = v;
        out["lat"] = this.lat;
        out["lon"] = this.lng;
        out["tags"] = tags;

        return out;
    }
}

export const vendingmachine: Readable<VendingMachine[]> = readable(undefined, async (set) => {
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
    const objToVendingMachine = (json : Object): VendingMachine[] => {
        let arr = [];
        json["elements"].forEach(elem => {
            let m = new VendingMachine(elem);
            arr.push(m);
        });
        return arr;
    }

    let vm = localStorage.getItem("vm");
        if (vm !== null) {
            try {
                let json = objToVendingMachine(JSON.parse(vm));
                set(json);
            } catch (e) {
                console.log(e);
                window.alert("自動販売機データの取得に失敗しました\nリロードしてください");
            }
        } else {
            let resp = await fetch("https://lz4.overpass-api.de/api/interpreter", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/x-www-form-urlencode",
                },
                body: query,
            });

            if (resp.ok) {
                let json = await resp.json()
                set(objToVendingMachine(json));
            } else {
                let text = await resp.text();
                window.alert("自動販売機データの取得に失敗しました\nリロードしてください");
                throw new Error(text);
            }
        }
    return () => {};
});
