import {
	array,
	block,
	boolean,
	date,
	datetime,
	file,
	geopoint,
	image,
	number,
	object,
	reference,
	slug,
	string,
	text,
	url,
} from './models';

import type { SanitySchema } from './models';

export function schemaToModel(schema: SanitySchema, schemas: SanitySchema[]): string {
	if (schema.type === 'boolean') return boolean(schema);
	else if (schema.type === 'date') return date(schema);
	else if (schema.type === 'datetime') return datetime(schema);
	else if (schema.type === 'number') return number(schema);
	else if (schema.type === 'string') return string(schema);
	else if (schema.type === 'text') return text(schema);
	else if (schema.type === 'url') return url(schema);
	else if (schema.type === 'reference') return reference(schema);
	else if (schema.type === 'document') return object(schema, schemas);
	else if (schema.type === 'slug') return slug(schema);
	else if (schema.type === 'geopoint') return geopoint(schema);
	else if (schema.type === 'image') return image(schema);
	else if (schema.type === 'file') return file(schema);
	else if (schema.type === 'array') return array(schema, schemas);
	else if (schema.type === 'object') return object(schema, schemas);
	else if (schema.type === 'block') return block(schema);
	else {
		const customSchema = schemas.find((s) => s.name === schema.type);
		if (customSchema) {
			const foundSchema = schemaToModel(customSchema, schemas);
			return foundSchema;
		} else {
			return 'z.any().describe("⛔️ This schema type is not being generated by Zodity")';
		}
		// throw new Error(`⛔️ Zodify does not yet support model generation for ${schema.type} schemas`,);
	}
}