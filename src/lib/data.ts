// @ts-ignore
import _data from './data.yaml';

export interface Data {
	name: string;
	profession?: string;
	photo?: string;
	email?: string;
	website?: string;
	location?: string;
	summary?: string;
	socials?: Data.Social[];
	skills?: Record<string, string>;
	experience?: Data.Experience[];
}

export namespace Data {
	export interface Social {
		icon?: string;
		title?: string;
		href: string;
	}

	export interface Experience {
		company: string;
		role: string;
		date: string;
		skills?: string;
	}
}

export const data: Data = _data;
export default data;