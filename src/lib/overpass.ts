import { z } from 'zod';

const osmObject = z.object({
	type: z.literal('node'),
	id: z.number(),
	lat: z.number(),
	lon: z.number(),
	tags: z.record(z.string())
});

export type OSMObject = z.infer<typeof osmObject>;

const osm3sObject = z.object({
	timestamp_osm_base: z.string(),
	timestamp_areas_base: z.string()
});

export const payload = z.object({
	version: z.number(),
	generator: z.string(),
	osm3s: osm3sObject,
	elements: z.array(osmObject)
});

export type Payload = z.infer<typeof payload>;
