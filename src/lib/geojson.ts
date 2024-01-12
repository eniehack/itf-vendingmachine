import z from 'zod';

export const geoJSONFeature = z.object({
	type: z.literal('Feature'),
	properties: z.record(z.string()),
	geometry: z.object({
		coordinates: z.tuple([z.number(), z.number()]),
		type: z.literal('Point')
	})
});

export type GeoJSONFeature = z.infer<typeof geoJSONFeature>;

export const geoJSONRoot = z.object({
	type: z.literal('FeatureCollection'),
	features: z.array(geoJSONFeature)
});

export type GeoJSONRoot = z.infer<typeof geoJSONRoot>;
