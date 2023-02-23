import ArrayFormatBase from './ArrayFormatBase.js';
import FormatBase from './FormatBase.js';
import ImageDataDirectoryArray, {
	type ImageDataDirectory,
} from './ImageDataDirectoryArray.js';
import ImageDirectoryEntry from './ImageDirectoryEntry.js';
import ImageDosHeader from './ImageDosHeader.js';
import ImageFileHeader from './ImageFileHeader.js';
import ImageNtHeaders from './ImageNtHeaders.js';
import ImageOptionalHeader from './ImageOptionalHeader.js';
import ImageOptionalHeader64 from './ImageOptionalHeader64.js';
import ImageSectionHeaderArray, {
	type ImageSectionHeader,
} from './ImageSectionHeaderArray.js';

export {
	ArrayFormatBase,
	FormatBase,
	type ImageDataDirectory,
	ImageDataDirectoryArray,
	ImageDirectoryEntry,
	ImageDosHeader,
	ImageFileHeader,
	ImageNtHeaders,
	ImageOptionalHeader,
	ImageOptionalHeader64,
	type ImageSectionHeader,
	ImageSectionHeaderArray,
};

export function getImageDosHeader(bin: ArrayBuffer): ImageDosHeader {
	return ImageDosHeader.from(bin);
}
export function getImageNtHeadersByDosHeader(
	bin: ArrayBuffer,
	dosHeader: ImageDosHeader
): ImageNtHeaders {
	return ImageNtHeaders.from(bin, dosHeader.newHeaderAddress);
}
export function getImageSectionHeadersByNtHeaders(
	bin: ArrayBuffer,
	dosHeader: ImageDosHeader,
	ntHeaders: ImageNtHeaders
): ImageSectionHeaderArray {
	return ImageSectionHeaderArray.from(
		bin,
		ntHeaders.fileHeader.numberOfSections,
		dosHeader.newHeaderAddress + ntHeaders.byteLength
	);
}
export function findImageSectionBlockByDirectoryEntry(
	bin: ArrayBuffer,
	dosHeader: ImageDosHeader,
	ntHeaders: ImageNtHeaders,
	entryType: ImageDirectoryEntry
): ArrayBuffer | null {
	const arr = ImageSectionHeaderArray.from(
		bin,
		ntHeaders.fileHeader.numberOfSections,
		dosHeader.newHeaderAddress + ntHeaders.byteLength
	);
	const len = arr.length;
	const rva =
		ntHeaders.optionalHeaderDataDirectory.get(entryType).virtualAddress;
	for (let i = 0; i < len; ++i) {
		const sec = arr.get(i);
		const vaEnd = sec.virtualAddress + sec.virtualSize;
		if (rva >= sec.virtualAddress && rva < vaEnd) {
			const ptr = sec.pointerToRawData;
			if (!ptr) {
				return null;
			}
			return bin.slice(ptr, ptr + sec.sizeOfRawData);
		}
		if (rva < sec.virtualAddress) {
			return null;
		}
	}
	return null;
}
