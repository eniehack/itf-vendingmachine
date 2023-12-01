<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import "leaflet/dist/leaflet.css";
    import PointImage from "../assets/point.svg";
    import L from "leaflet";
    import { LatLng, type Map as LFMap } from "leaflet";
    import { here } from "../lib/geo";
    import { VendingMachine } from "../lib/vendingMachine";
    import type { OSMObject } from "../pages/api/vm.json";
    import { Map as MLMap, Marker, Popup} from "maplibre-gl";

    export let endpoint: string;
    export let icon: string;

    let map: MLMap;
    let coordWatchID: number;

    onMount(async () => {
        //console.log(data);
        map = new MLMap({
            container: "map",
            style: "https://tile.openstreetmap.jp/styles/osm-bright-ja/style.json",
            center: [140.1019, 36.107],
            zoom: 13,
        });
        /*
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution:
                '&copy; <a href="https://osm.org">OpenStreetMap</a> contributors',
        }).addTo(map);
        let coordBtnControl = L.Control.extend({
            onAdd: (map: LFMap) => {
                const container = L.DomUtil.create("div", "leaflet-bar");
                const btn = L.DomUtil.create("a");
                btn.innerHTML = `<img src="${PointImage}" width="20" height="20"/>`;
                container.appendChild(btn);
                L.DomEvent.on(container, "click", () => {
                    map.flyTo($here);
                });
                return container;
            },
        });
        new coordBtnControl({ position: "topleft" }).addTo(map);
        */
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                //console.debug(position);
                here.set(
                    new LatLng(
                        position.coords.latitude,
                        position.coords.longitude,
                    ),
                );
            });

            coordWatchID = navigator.geolocation.watchPosition((position) => {
                //console.debug(position);
                here.set(
                    new LatLng(
                        position.coords.latitude,
                        position.coords.longitude,
                    ),
                );
            });
        }

        let resp = await fetch(endpoint);
        console.log(resp.ok);
        if (!resp.ok) {
            console.log(
                "自動販売機データの取得に失敗しました,リロードしてください",
            );
            return;
        }
        let data: { nodes: OSMObject[] } = await resp.json();

        let vendingmachines: Array<VendingMachine> = [];
        data.nodes.forEach((elem) => {
            vendingmachines.push(new VendingMachine(elem));
        });
        //console.log(vendingmachines);

        vendingmachines.forEach((vm) => {
            /*
            const el = document.createElement("div");
            el.setAttribute("class", "marker");
            */

            const popup = new Popup()
                .setHTML(vm.generatePopupText());
            //let marker = new Marker({element: el})
            let marker = new Marker()
                .setLngLat(vm.getPosition())
                .setPopup(popup)
                .addTo(map);
        });
    });

    onDestroy(() => {
        navigator.geolocation.clearWatch(coordWatchID);
    });
</script>

<div class="map-container">
    <div id="map" />
</div>

{#await $here}
    <p>位置情報取得中</p>
{:catch error}
    <p>位置情報取得エラー(エラーコード: {error.code}): {error.message}</p>
{/await}

<style lang="scss">
    .marker {
        background-image: url(icon);
        background-size: cover;
    }
    .maplibregl-popup {
        max-width: 200px;
    }
    #map {
        position: absolute;
        top: 0;
        left: 0;
        height: 100% !important;
        width: 100% !important;
    }

    @import "bulma/sass/utilities/mixins.sass";

    @include mobile {
        .map-container {
            position: relative;
            padding-bottom: 205%;
            height: 0;
            overflow: hidden;
        }
    }

    @include tablet-only {
        .map-container {
            position: relative;
            padding-bottom: 125%;
            height: 0;
            overflow: hidden;
        }
    }

    @include desktop {
        .map-container {
            position: relative;
            padding-bottom: 49%;
            height: 0;
            overflow: hidden;
        }
    }
</style>
