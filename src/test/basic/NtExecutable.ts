import NtExecutable, { type NtExecutableSection } from '@/NtExecutable.js';
import ImageDirectoryEntry from '@/format/ImageDirectoryEntry.js';

// prettier-ignore
const DUMMY_EXECUTABLE_32 = new Uint8Array([
	0x4d,0x5a,0x90,0x00,0x03,0x00,0x00,0x00,0x04,0x00,0x00,0x00,0xff,0xff,0x00,0x00,
	0xb8,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x40,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0xb8,0x00,0x00,0x00,
	0x0e,0x1f,0xba,0x0e,0x00,0xb4,0x09,0xcd,0x21,0xb8,0x01,0x4c,0xcd,0x21,0x54,0x68,
	0x69,0x73,0x20,0x70,0x72,0x6f,0x67,0x72,0x61,0x6d,0x20,0x63,0x61,0x6e,0x6e,0x6f,
	0x74,0x20,0x62,0x65,0x20,0x72,0x75,0x6e,0x20,0x69,0x6e,0x20,0x44,0x4f,0x53,0x20,
	0x6d,0x6f,0x64,0x65,0x2e,0x0d,0x0d,0x0a,0x24,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0xe1,0x74,0xad,0xd8,0xa5,0x15,0xc3,0x8b,0xa5,0x15,0xc3,0x8b,0xa5,0x15,0xc3,0x8b,
	0xa8,0x47,0x18,0x8b,0xa4,0x15,0xc3,0x8b,0x10,0x8b,0x1d,0x8b,0xa4,0x15,0xc3,0x8b,
	0x52,0x69,0x63,0x68,0xa5,0x15,0xc3,0x8b,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x50,0x45,0x00,0x00,0x4c,0x01,0x01,0x00,
	0x6c,0x72,0x12,0x5c,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0xe0,0x00,0x02,0x21,
	0x0b,0x01,0x0c,0x00,0x00,0x00,0x00,0x00,0x00,0x02,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x10,0x00,0x00,0x00,0x10,0x00,0x00,0x00,0x00,0x00,0x10,
	0x00,0x10,0x00,0x00,0x00,0x02,0x00,0x00,0x06,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x06,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x20,0x00,0x00,0x00,0x02,0x00,0x00,
	0x00,0x00,0x00,0x00,0x02,0x00,0x40,0x00,0x00,0x00,0x10,0x00,0x00,0x10,0x00,0x00,
	0x00,0x00,0x10,0x00,0x00,0x10,0x00,0x00,0x00,0x00,0x00,0x00,0x10,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x10,0x00,0x00,0x68,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x2e,0x72,0x73,0x72,0x63,0x00,0x00,0x00,0x68,0x00,0x00,0x00,0x00,0x10,0x00,0x00,
	0x00,0x02,0x00,0x00,0x00,0x02,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x40,0x00,0x00,0x40,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x01,0x00,
	0x11,0x27,0x00,0x00,0x18,0x00,0x00,0x80,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x66,0x00,0x00,0x00,0x30,0x00,0x00,0x80,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x01,0x00,
	0x11,0x04,0x00,0x00,0x48,0x00,0x00,0x00,0x60,0x10,0x00,0x00,0x04,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x12,0x34,0x56,0x78,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
]);

// prettier-ignore
const DUMMY_EXECUTABLE_64 = new Uint8Array([
	0x4d,0x5a,0x90,0x00,0x03,0x00,0x00,0x00,0x04,0x00,0x00,0x00,0xff,0xff,0x00,0x00,
	0xb8,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x40,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0xb8,0x00,0x00,0x00,
	0x0e,0x1f,0xba,0x0e,0x00,0xb4,0x09,0xcd,0x21,0xb8,0x01,0x4c,0xcd,0x21,0x54,0x68,
	0x69,0x73,0x20,0x70,0x72,0x6f,0x67,0x72,0x61,0x6d,0x20,0x63,0x61,0x6e,0x6e,0x6f,
	0x74,0x20,0x62,0x65,0x20,0x72,0x75,0x6e,0x20,0x69,0x6e,0x20,0x44,0x4f,0x53,0x20,
	0x6d,0x6f,0x64,0x65,0x2e,0x0d,0x0d,0x0a,0x24,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0xe1,0x74,0xad,0xd8,0xa5,0x15,0xc3,0x8b,0xa5,0x15,0xc3,0x8b,0xa5,0x15,0xc3,0x8b,
	0xa8,0x47,0x18,0x8b,0xa4,0x15,0xc3,0x8b,0x10,0x8b,0x1d,0x8b,0xa4,0x15,0xc3,0x8b,
	0x52,0x69,0x63,0x68,0xa5,0x15,0xc3,0x8b,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x50,0x45,0x00,0x00,0x64,0x86,0x01,0x00,
	0x6d,0x72,0x12,0x5c,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0xf0,0x00,0x22,0x20,
	0x0b,0x02,0x0c,0x00,0x00,0x00,0x00,0x00,0x00,0x02,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x10,0x00,0x00,0x00,0x00,0x00,0x80,0x01,0x00,0x00,0x00,
	0x00,0x10,0x00,0x00,0x00,0x02,0x00,0x00,0x06,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x06,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x20,0x00,0x00,0x00,0x02,0x00,0x00,
	0x00,0x00,0x00,0x00,0x02,0x00,0x60,0x00,0x00,0x00,0x10,0x00,0x00,0x00,0x00,0x00,
	0x00,0x10,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x10,0x00,0x00,0x00,0x00,0x00,
	0x00,0x10,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x10,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x10,0x00,0x00,0x68,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x2e,0x72,0x73,0x72,0x63,0x00,0x00,0x00,0x68,0x00,0x00,0x00,0x00,0x10,0x00,0x00,
	0x00,0x02,0x00,0x00,0x00,0x02,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x40,0x00,0x00,0x40,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x01,0x00,
	0x11,0x27,0x00,0x00,0x18,0x00,0x00,0x80,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x66,0x00,0x00,0x00,0x30,0x00,0x00,0x80,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x01,0x00,
	0x11,0x04,0x00,0x00,0x48,0x00,0x00,0x00,0x60,0x10,0x00,0x00,0x04,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x12,0x34,0x56,0x78,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
]);

// dummy cert (not valid data)
// prettier-ignore
const DUMMY_CERT = [
	0x08,0x00,0x00,0x00,0x00,0x02,0x02,0x00,
];
// prettier-ignore
const DUMMY_EXECUTABLE_64_WITH_DUMMY_CERT = new Uint8Array([
	// DOS header
	0x4d,0x5a,0x90,0x00,0x03,0x00,0x00,0x00,0x04,0x00,0x00,0x00,0xff,0xff,0x00,0x00,
	0xb8,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x40,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0xb8,0x00,0x00,0x00,
	0x0e,0x1f,0xba,0x0e,0x00,0xb4,0x09,0xcd,0x21,0xb8,0x01,0x4c,0xcd,0x21,0x54,0x68,
	0x69,0x73,0x20,0x70,0x72,0x6f,0x67,0x72,0x61,0x6d,0x20,0x63,0x61,0x6e,0x6e,0x6f,
	0x74,0x20,0x62,0x65,0x20,0x72,0x75,0x6e,0x20,0x69,0x6e,0x20,0x44,0x4f,0x53,0x20,
	0x6d,0x6f,0x64,0x65,0x2e,0x0d,0x0d,0x0a,0x24,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0xe1,0x74,0xad,0xd8,0xa5,0x15,0xc3,0x8b,0xa5,0x15,0xc3,0x8b,0xa5,0x15,0xc3,0x8b,
	0xa8,0x47,0x18,0x8b,0xa4,0x15,0xc3,0x8b,0x10,0x8b,0x1d,0x8b,0xa4,0x15,0xc3,0x8b,
	0x52,0x69,0x63,0x68,0xa5,0x15,0xc3,0x8b,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	// (8-) PE header
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x50,0x45,0x00,0x00,0x64,0x86,0x01,0x00,
	0x6d,0x72,0x12,0x5c,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0xf0,0x00,0x22,0x20,
	0x0b,0x02,0x0c,0x00,0x00,0x00,0x00,0x00,0x00,0x02,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x10,0x00,0x00,0x00,0x00,0x00,0x80,0x01,0x00,0x00,0x00,
	0x00,0x10,0x00,0x00,0x00,0x02,0x00,0x00,0x06,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x06,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x20,0x00,0x00,0x00,0x02,0x00,0x00,
	0x00,0x00,0x00,0x00,0x02,0x00,0x60,0x00,0x00,0x00,0x10,0x00,0x00,0x00,0x00,0x00,
	0x00,0x10,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x10,0x00,0x00,0x00,0x00,0x00,
	0x00,0x10,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x10,0x00,0x00,0x00,
	// data directory
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x10,0x00,0x00,0x68,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x04,0x00,0x00,0x08,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	// section header
	0x2e,0x72,0x73,0x72,0x63,0x00,0x00,0x00,0x68,0x00,0x00,0x00,0x00,0x10,0x00,0x00,
	0x00,0x02,0x00,0x00,0x00,0x02,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x40,0x00,0x00,0x40,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	// .rsrc section
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x01,0x00,
	0x11,0x27,0x00,0x00,0x18,0x00,0x00,0x80,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x66,0x00,0x00,0x00,0x30,0x00,0x00,0x80,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x01,0x00,
	0x11,0x04,0x00,0x00,0x48,0x00,0x00,0x00,0x60,0x10,0x00,0x00,0x04,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x12,0x34,0x56,0x78,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	// dummy cert data (not valid data)
	...DUMMY_CERT,
]);

// extra data (20 bytes)
// prettier-ignore
const DUMMY_EXTRA_DATA = [
	0x01,0x23,0x45,0x67,0x89,0xab,0xcd,0xef,0x00,0x11,0x22,0x33,0x44,0x55,0x66,0x77,
	0x88,0x99,0xaa,0xbb,
];
const DUMMY_EXTRA_DATA_ALIGNED = (() => {
	const alignment = 0x200;
	const newSize =
		Math.floor((DUMMY_EXTRA_DATA.length + alignment - 1) / alignment) *
		alignment;
	return [...Array(newSize)].map((_, i) =>
		i < DUMMY_EXTRA_DATA.length ? DUMMY_EXTRA_DATA[i] : 0
	);
})();
// prettier-ignore
const DUMMY_EXECUTABLE_64_WITH_EXTRA_DATA = new Uint8Array([
	// DOS header
	0x4d,0x5a,0x90,0x00,0x03,0x00,0x00,0x00,0x04,0x00,0x00,0x00,0xff,0xff,0x00,0x00,
	0xb8,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x40,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0xb8,0x00,0x00,0x00,
	0x0e,0x1f,0xba,0x0e,0x00,0xb4,0x09,0xcd,0x21,0xb8,0x01,0x4c,0xcd,0x21,0x54,0x68,
	0x69,0x73,0x20,0x70,0x72,0x6f,0x67,0x72,0x61,0x6d,0x20,0x63,0x61,0x6e,0x6e,0x6f,
	0x74,0x20,0x62,0x65,0x20,0x72,0x75,0x6e,0x20,0x69,0x6e,0x20,0x44,0x4f,0x53,0x20,
	0x6d,0x6f,0x64,0x65,0x2e,0x0d,0x0d,0x0a,0x24,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0xe1,0x74,0xad,0xd8,0xa5,0x15,0xc3,0x8b,0xa5,0x15,0xc3,0x8b,0xa5,0x15,0xc3,0x8b,
	0xa8,0x47,0x18,0x8b,0xa4,0x15,0xc3,0x8b,0x10,0x8b,0x1d,0x8b,0xa4,0x15,0xc3,0x8b,
	0x52,0x69,0x63,0x68,0xa5,0x15,0xc3,0x8b,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	// (8-) PE header
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x50,0x45,0x00,0x00,0x64,0x86,0x01,0x00,
	0x6d,0x72,0x12,0x5c,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0xf0,0x00,0x22,0x20,
	0x0b,0x02,0x0c,0x00,0x00,0x00,0x00,0x00,0x00,0x02,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x10,0x00,0x00,0x00,0x00,0x00,0x80,0x01,0x00,0x00,0x00,
	0x00,0x10,0x00,0x00,0x00,0x02,0x00,0x00,0x06,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x06,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x20,0x00,0x00,0x00,0x02,0x00,0x00,
	0x00,0x00,0x00,0x00,0x02,0x00,0x60,0x00,0x00,0x00,0x10,0x00,0x00,0x00,0x00,0x00,
	0x00,0x10,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x10,0x00,0x00,0x00,0x00,0x00,
	0x00,0x10,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x10,0x00,0x00,0x00,
	// data directory
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x10,0x00,0x00,0x68,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	// section header
	0x2e,0x72,0x73,0x72,0x63,0x00,0x00,0x00,0x68,0x00,0x00,0x00,0x00,0x10,0x00,0x00,
	0x00,0x02,0x00,0x00,0x00,0x02,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x40,0x00,0x00,0x40,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	// .rsrc section
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x01,0x00,
	0x11,0x27,0x00,0x00,0x18,0x00,0x00,0x80,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x66,0x00,0x00,0x00,0x30,0x00,0x00,0x80,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x01,0x00,
	0x11,0x04,0x00,0x00,0x48,0x00,0x00,0x00,0x60,0x10,0x00,0x00,0x04,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x12,0x34,0x56,0x78,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	// extra data
	...DUMMY_EXTRA_DATA,
]);

// prettier-ignore
const DUMMY_EXECUTABLE_64_WITH_EXTRA_DATA_AND_DUMMY_CERT = new Uint8Array([
	// DOS header
	0x4d,0x5a,0x90,0x00,0x03,0x00,0x00,0x00,0x04,0x00,0x00,0x00,0xff,0xff,0x00,0x00,
	0xb8,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x40,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0xb8,0x00,0x00,0x00,
	0x0e,0x1f,0xba,0x0e,0x00,0xb4,0x09,0xcd,0x21,0xb8,0x01,0x4c,0xcd,0x21,0x54,0x68,
	0x69,0x73,0x20,0x70,0x72,0x6f,0x67,0x72,0x61,0x6d,0x20,0x63,0x61,0x6e,0x6e,0x6f,
	0x74,0x20,0x62,0x65,0x20,0x72,0x75,0x6e,0x20,0x69,0x6e,0x20,0x44,0x4f,0x53,0x20,
	0x6d,0x6f,0x64,0x65,0x2e,0x0d,0x0d,0x0a,0x24,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0xe1,0x74,0xad,0xd8,0xa5,0x15,0xc3,0x8b,0xa5,0x15,0xc3,0x8b,0xa5,0x15,0xc3,0x8b,
	0xa8,0x47,0x18,0x8b,0xa4,0x15,0xc3,0x8b,0x10,0x8b,0x1d,0x8b,0xa4,0x15,0xc3,0x8b,
	0x52,0x69,0x63,0x68,0xa5,0x15,0xc3,0x8b,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	// (8-) PE header
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x50,0x45,0x00,0x00,0x64,0x86,0x01,0x00,
	0x6d,0x72,0x12,0x5c,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0xf0,0x00,0x22,0x20,
	0x0b,0x02,0x0c,0x00,0x00,0x00,0x00,0x00,0x00,0x02,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x10,0x00,0x00,0x00,0x00,0x00,0x80,0x01,0x00,0x00,0x00,
	0x00,0x10,0x00,0x00,0x00,0x02,0x00,0x00,0x06,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x06,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x20,0x00,0x00,0x00,0x02,0x00,0x00,
	0x00,0x00,0x00,0x00,0x02,0x00,0x60,0x00,0x00,0x00,0x10,0x00,0x00,0x00,0x00,0x00,
	0x00,0x10,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x10,0x00,0x00,0x00,0x00,0x00,
	0x00,0x10,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x10,0x00,0x00,0x00,
	// data directory
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x10,0x00,0x00,0x68,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	// ('Certificate' section size)
	...(() => {
		const ab = new ArrayBuffer(4);
		new DataView(ab).setUint32(0, 0x400 + DUMMY_EXTRA_DATA_ALIGNED.length, true);
		return [].slice.call<any, [], number[]>(new Uint8Array(ab));
	})(),
	                    0x08,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	// section header
	0x2e,0x72,0x73,0x72,0x63,0x00,0x00,0x00,0x68,0x00,0x00,0x00,0x00,0x10,0x00,0x00,
	0x00,0x02,0x00,0x00,0x00,0x02,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x40,0x00,0x00,0x40,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	// .rsrc section
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x01,0x00,
	0x11,0x27,0x00,0x00,0x18,0x00,0x00,0x80,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x66,0x00,0x00,0x00,0x30,0x00,0x00,0x80,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x01,0x00,
	0x11,0x04,0x00,0x00,0x48,0x00,0x00,0x00,0x60,0x10,0x00,0x00,0x04,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x12,0x34,0x56,0x78,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	// extra data (must be aligned)
	...DUMMY_EXTRA_DATA_ALIGNED,
	// dummy cert data (not valid data)
	0x08,0x00,0x00,0x00,0x00,0x02,0x02,0x00,
]);

const DUMMY_SECTION: NtExecutableSection = {
	info: {
		name: '.rsrc',
		virtualSize: 256,
		virtualAddress: 0,
		sizeOfRawData: 256,
		pointerToRawData: 0,
		pointerToRelocations: 0,
		pointerToLineNumbers: 0,
		numberOfRelocations: 0,
		numberOfLineNumbers: 0,
		characteristics: 0x40000040,
	},
	data: new ArrayBuffer(256),
};

describe('NtExecutable', () => {
	describe('32-bit binary', () => {
		it('should be parsed correctly', () => {
			const exe = NtExecutable.from(DUMMY_EXECUTABLE_32);
			const sections = exe.getAllSections();
			expect(exe.is32bit()).toBeTruthy();
			// the following data is specified in DUMMY_EXECUTABLE_32 data
			expect(exe.getSectionAlignment()).toEqual(0x1000);
			expect(exe.getFileAlignment()).toEqual(0x200);
			expect(sections.length).toEqual(1);
			expect(
				exe.getSectionByEntry(ImageDirectoryEntry.Resource)
			).not.toBeNull();
			expect(exe.getExtraData()).toBeNull();
		});
		it('sections should be added', () => {
			const exe = NtExecutable.from(DUMMY_EXECUTABLE_32);
			expect(exe.getSectionByEntry(ImageDirectoryEntry.Debug)).toBeNull();
			exe.setSectionByEntry(ImageDirectoryEntry.Debug, DUMMY_SECTION);
			const afterSec = exe.getSectionByEntry(ImageDirectoryEntry.Debug);
			expect(afterSec).not.toBeNull();
			expect(afterSec!.data!.byteLength).toEqual(
				DUMMY_SECTION.data!.byteLength
			);
			expect(afterSec!.info.name).toEqual(DUMMY_SECTION.info.name);
		});
		it('sections should be replaced', () => {
			const exe = NtExecutable.from(DUMMY_EXECUTABLE_32);
			expect(
				exe.getSectionByEntry(ImageDirectoryEntry.Resource)
			).not.toBeNull();
			exe.setSectionByEntry(ImageDirectoryEntry.Resource, DUMMY_SECTION);
			const afterSec = exe.getSectionByEntry(
				ImageDirectoryEntry.Resource
			);
			expect(afterSec).not.toBeNull();
			expect(afterSec!.data!.byteLength).toEqual(
				DUMMY_SECTION.data!.byteLength
			);
			expect(afterSec!.info.name).toEqual(DUMMY_SECTION.info.name);
		});
		it('sections should be removed', () => {
			const exe = NtExecutable.from(DUMMY_EXECUTABLE_32);
			expect(
				exe.getSectionByEntry(ImageDirectoryEntry.Resource)
			).not.toBeNull();
			exe.setSectionByEntry(ImageDirectoryEntry.Resource, null);
			const afterSec = exe.getSectionByEntry(
				ImageDirectoryEntry.Resource
			);
			expect(afterSec).toBeNull();
		});
	});
	describe('64-bit binary', () => {
		it('should be parsed correctly', () => {
			const exe = NtExecutable.from(DUMMY_EXECUTABLE_64);
			const sections = exe.getAllSections();
			expect(exe.is32bit()).toBeFalsy();
			// the following data is specified in DUMMY_EXECUTABLE_64 data
			expect(exe.getSectionAlignment()).toEqual(0x1000);
			expect(exe.getFileAlignment()).toEqual(0x200);
			expect(sections.length).toEqual(1);
			expect(
				exe.getSectionByEntry(ImageDirectoryEntry.Resource)
			).not.toBeNull();
			expect(exe.getExtraData()).toBeNull();
		});
		it('sections should be added', () => {
			const exe = NtExecutable.from(DUMMY_EXECUTABLE_64);
			expect(exe.getSectionByEntry(ImageDirectoryEntry.Debug)).toBeNull();
			exe.setSectionByEntry(ImageDirectoryEntry.Debug, DUMMY_SECTION);
			const afterSec = exe.getSectionByEntry(ImageDirectoryEntry.Debug);
			expect(afterSec).not.toBeNull();
			expect(afterSec!.data!.byteLength).toEqual(
				DUMMY_SECTION.data!.byteLength
			);
			expect(afterSec!.info.name).toEqual(DUMMY_SECTION.info.name);
		});
		it('sections should be replaced', () => {
			const exe = NtExecutable.from(DUMMY_EXECUTABLE_64);
			expect(
				exe.getSectionByEntry(ImageDirectoryEntry.Resource)
			).not.toBeNull();
			exe.setSectionByEntry(ImageDirectoryEntry.Resource, DUMMY_SECTION);
			const afterSec = exe.getSectionByEntry(
				ImageDirectoryEntry.Resource
			);
			expect(afterSec).not.toBeNull();
			expect(afterSec!.data!.byteLength).toEqual(
				DUMMY_SECTION.data!.byteLength
			);
			expect(afterSec!.info.name).toEqual(DUMMY_SECTION.info.name);
		});
		it('sections should be removed', () => {
			const exe = NtExecutable.from(DUMMY_EXECUTABLE_64);
			expect(
				exe.getSectionByEntry(ImageDirectoryEntry.Resource)
			).not.toBeNull();
			exe.setSectionByEntry(ImageDirectoryEntry.Resource, null);
			const afterSec = exe.getSectionByEntry(
				ImageDirectoryEntry.Resource
			);
			expect(afterSec).toBeNull();
		});
	});
	describe('64-bit binary with (dummy) cert', () => {
		it('should not be parsed if no option is specified', () => {
			expect(() => {
				NtExecutable.from(DUMMY_EXECUTABLE_64_WITH_DUMMY_CERT);
			}).toThrow();
		});
		it('should not be parsed if option.ignoreCert is false', () => {
			expect(() => {
				NtExecutable.from(DUMMY_EXECUTABLE_64_WITH_DUMMY_CERT, {
					ignoreCert: false,
				});
			}).toThrow();
		});
		it('should be parsed correctly if option.ignoreCert is true', () => {
			const exe = NtExecutable.from(DUMMY_EXECUTABLE_64_WITH_DUMMY_CERT, {
				ignoreCert: true,
			});
			const sections = exe.getAllSections();
			expect(exe.is32bit()).toBeFalsy();
			// the following data is specified in DUMMY_EXECUTABLE_64_WITH_DUMMY_CERT data
			expect(exe.getSectionAlignment()).toEqual(0x1000);
			expect(exe.getFileAlignment()).toEqual(0x200);
			expect(sections.length).toEqual(1);
			expect(
				exe.getSectionByEntry(ImageDirectoryEntry.Resource)
			).not.toBeNull();
		});
		it('should eliminate Certificate section on generate', () => {
			const exe = NtExecutable.from(DUMMY_EXECUTABLE_64_WITH_DUMMY_CERT, {
				ignoreCert: true,
			});
			// NOTE: This may be fail if generate process will optimize data.
			const out = new Uint8Array(exe.generate());
			expect(out).toEqual(DUMMY_EXECUTABLE_64);
		});
	});
	describe('64-bit binary with extra data', () => {
		it('should be parsed correctly', () => {
			const exe = NtExecutable.from(DUMMY_EXECUTABLE_64_WITH_EXTRA_DATA);
			const sections = exe.getAllSections();
			expect(exe.is32bit()).toBeFalsy();
			// the following data is specified in DUMMY_EXECUTABLE_64_WITH_EXTRA_DATA data
			expect(exe.getSectionAlignment()).toEqual(0x1000);
			expect(exe.getFileAlignment()).toEqual(0x200);
			expect(sections.length).toEqual(1);
			expect(
				exe.getSectionByEntry(ImageDirectoryEntry.Resource)
			).not.toBeNull();
			// extra data
			const exData = exe.getExtraData();
			expect(exData).not.toBeNull();
			if (exData) {
				expect(new Uint8Array(exData)).toEqual(
					new Uint8Array(DUMMY_EXTRA_DATA)
				);
			}
		});
		it('setExtraData should copy specified binary', () => {
			const exe = NtExecutable.from(DUMMY_EXECUTABLE_64_WITH_EXTRA_DATA);

			const ub = new Uint8Array([1, 2, 3, 4]);
			exe.setExtraData(ub);
			// rewrite specified data
			ub[0] = 5;
			expect(new Uint8Array(exe.getExtraData()!)).toEqual(
				new Uint8Array([1, 2, 3, 4])
			);
		});
		it('should clear extra data on generation when setExtraData is called with null', () => {
			const exe = NtExecutable.from(DUMMY_EXECUTABLE_64_WITH_EXTRA_DATA);
			exe.setExtraData(null);

			const newBin = new Uint8Array(exe.generate());
			const lastData = newBin.subarray(
				newBin.length - DUMMY_EXTRA_DATA.length
			);
			expect(lastData).not.toEqual(new Uint8Array(DUMMY_EXTRA_DATA));
		});
		it('should append extra data on generation when setExtraData is called with non-null', () => {
			const exe = NtExecutable.from(DUMMY_EXECUTABLE_64);
			exe.setExtraData(new Uint8Array(DUMMY_EXTRA_DATA));

			const newBin = new Uint8Array(exe.generate());
			const lastData = newBin.subarray(
				newBin.length - DUMMY_EXTRA_DATA.length
			);
			expect(lastData).toEqual(new Uint8Array(DUMMY_EXTRA_DATA));
		});
	});
	describe('64-bit binary with extra data and (dummy) cert', () => {
		it('should not be parsed if no option is specified', () => {
			expect(() => {
				NtExecutable.from(
					DUMMY_EXECUTABLE_64_WITH_EXTRA_DATA_AND_DUMMY_CERT
				);
			}).toThrow();
		});
		it('should not be parsed if option.ignoreCert is false', () => {
			expect(() => {
				NtExecutable.from(
					DUMMY_EXECUTABLE_64_WITH_EXTRA_DATA_AND_DUMMY_CERT,
					{
						ignoreCert: false,
					}
				);
			}).toThrow();
		});
		it('should be parsed correctly if option.ignoreCert is true', () => {
			const exe = NtExecutable.from(
				DUMMY_EXECUTABLE_64_WITH_EXTRA_DATA_AND_DUMMY_CERT,
				{
					ignoreCert: true,
				}
			);
			const sections = exe.getAllSections();
			expect(exe.is32bit()).toBeFalsy();
			// the following data is specified in DUMMY_EXECUTABLE_64_WITH_EXTRA_DATA_AND_DUMMY_CERT data
			expect(exe.getSectionAlignment()).toEqual(0x1000);
			expect(exe.getFileAlignment()).toEqual(0x200);
			expect(sections.length).toEqual(1);
			expect(
				exe.getSectionByEntry(ImageDirectoryEntry.Resource)
			).not.toBeNull();
			// extra data
			const exData = exe.getExtraData();
			expect(exData).not.toBeNull();
			if (exData) {
				expect(new Uint8Array(exData)).toEqual(
					new Uint8Array(DUMMY_EXTRA_DATA_ALIGNED)
				);
			}
		});
		it('should clear extra data on generation when setExtraData is called with null', () => {
			const exe = NtExecutable.from(
				DUMMY_EXECUTABLE_64_WITH_EXTRA_DATA_AND_DUMMY_CERT,
				{
					ignoreCert: true,
				}
			);
			exe.setExtraData(null);

			// NOTE: This may be fail if generate process will optimize data.
			const out = new Uint8Array(exe.generate());
			expect(out).toEqual(DUMMY_EXECUTABLE_64);
		});
	});
});
