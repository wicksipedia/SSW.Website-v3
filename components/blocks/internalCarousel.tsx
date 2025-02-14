import * as React from "react";
import Image from "next/image";
import { TinaMarkdown } from "tinacms/dist/rich-text";

import type { Template } from "tinacms";

import { Carousel as CarouselImplementation } from "react-responsive-carousel";

import { Container } from "../util/container";

export const InternalCarousel = ({ data }) => {
	return (
		<Container size="custom" className="px-0 md:w-3/4">
			<CarouselImplementation
				autoPlay={true}
				infiniteLoop={true}
				showArrows={false}
				showThumbs={false}
				showStatus={false}
				stopOnHover={true}
				renderIndicator={createCarouselIndicator}
			>
				{data.items?.map(createCarouselItemImage)}
			</CarouselImplementation>
			{renderBody(data)}
		</Container>
	);
};

const createCarouselItemImage = ({ imgSrc, label }, index: React.Key) => {
	return (
		<div key={index}>
			<Image src={imgSrc} alt={label} height={0} width={0} sizes="100vw" />
			{/* `legend` required so that the carousel works properly */}
			<p className="legend sr-only">{label}</p>
		</div>
	);
};

const createCarouselIndicator = (onClickHandler, isSelected, index, label) => {
	if (isSelected) {
		return (
			<li
				className="mx-1 my-0 inline-block h-6 w-6 bg-sswRed md:h-7 md:w-7"
				aria-label={`Selected: ${label} ${index + 1}`}
				title={`Selected: ${label} ${index + 1}`}
			/>
		);
	}
	return (
		<li
			className="mx-1 my-0 inline-block h-6 w-6 bg-gray-500 md:h-7 md:w-7"
			onClick={onClickHandler}
			onKeyDown={onClickHandler}
			value={index}
			key={index}
			role="button"
			tabIndex={0}
			title={`${label} ${index + 1}`}
			aria-label={`${label} ${index + 1}`}
		/>
	);
};

const renderBody = ({ header, paragraph, website, technologies }) => {
	return (
		<div key={header} className={header ? "" : "hidden"}>
			<div className="mt-2 flex justify-between text-left font-semibold text-sswRed prose-p:py-0">
				<h4>{header}</h4>
				<span className={website ? "" : "hidden"}>
					<a href={website} target="_blank" rel="noopener noreferrer">
						Visit Website
					</a>
				</span>
			</div>
			<div className="text-left prose-p:py-2">
				<TinaMarkdown content={paragraph} />
			</div>
			<div className="flex flex-wrap">{technologies?.map(createTechBlock)}</div>
			<div className="mb-7 mt-3 h-1 w-full bg-sswRed"></div>
		</div>
	);
};

const createTechBlock = ({ name }, index: React.Key) => {
	return (
		<div
			className="my-0.5 mr-1 min-w-fit bg-sswRed px-2 py-1 text-left"
			key={index}
		>
			{name}
		</div>
	);
};

export const internalCarouselBlockSchema: Template = {
	name: "InternalCarousel",
	label: "Internal Carousel",
	ui: {
		previewSrc: "/blocks/hero.png",
		itemProps: (item) => ({ label: item.items.header }),
	},
	fields: [
		{
			label: "Images",
			name: "items",
			type: "object",
			list: true,
			ui: {
				defaultItem: {
					label: "Image description",
				},
				itemProps: (item) => ({ label: item.imgSrc }),
			},
			fields: [
				{
					type: "string",
					label: "Label",
					name: "label",
				},
				{
					type: "image",
					label: "Image",
					name: "imgSrc",
				},
			],
		},
		{
			type: "string",
			label: "Header",
			name: "header",
		},
		{
			type: "rich-text",
			label: "Text",
			name: "paragraph",
			isBody: false,
		},
		{
			type: "string",
			label: "Website",
			name: "website",
		},
		{
			type: "object",
			label: "Technologies",
			name: "technologies",
			list: true,
			ui: {
				itemProps: (item) => {
					return { label: item?.name };
				},
			},
			fields: [
				{
					type: "string",
					label: "Name",
					name: "name",
				},
			],
		},
	],
};
