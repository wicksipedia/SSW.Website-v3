import type { Collection } from "tinacms";

import * as Schemas from "../../components/blocks";
import { seoSchema } from "../../components/util/seo";

export const pagesSchema: Collection = {
	label: "Pages",
	name: "page",
	format: "mdx",
	path: "content/pages",
	ui: {
		router: ({ document }) => {
			if (document._sys.filename === "home") {
				return `/`;
			}
			return `/${document._sys.filename}`;
		},
	},
	fields: [
		{
			type: "string",
			label: "Title",
			name: "title",
			isTitle: true,
			required: true,
		},
		// @ts-ignore
		seoSchema,
		{
			type: "boolean",
			name: "breadcrumbs",
			label: "Breadcrumbs enabled",
			required: true,
		},
		{
			type: "object",
			list: true,
			name: "beforeBody",
			label: "Before body",
			ui: {
				visualSelector: true,
			},
			templates: [...Schemas.pageBlocks],
		},
		{
			type: "rich-text",
			label: "Body",
			name: "_body",
			templates: [...Schemas.pageBlocks],
			isBody: true,
		},
		{
			type: "object",
			list: true,
			name: "sideBar",
			label: "Side Bar",
			ui: {
				visualSelector: true,
			},
			templates: [...Schemas.pageBlocks],
		},
		{
			type: "object",
			list: true,
			name: "afterBody",
			label: "After body",
			ui: {
				visualSelector: true,
			},
			templates: [...Schemas.pageBlocks],
		},
	],
};
