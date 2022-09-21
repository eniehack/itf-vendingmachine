import { LatLng } from "leaflet";

export class VendingMachine {
    private tags: Map<string, string>;
    public lat: number;
    public lng: number;

   constructor(elem: Object) {
       this.tags = new Map(Object.entries(elem["tags"]));
       this.lat = elem["lat"];
       this.lng = elem["lng"];
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
}
