/** Shared Orbit media upload limits (hero video, library). */
export const ORBIT_MAX_UPLOAD_MB = 200;
export const ORBIT_MAX_UPLOAD_BYTES = ORBIT_MAX_UPLOAD_MB * 1024 * 1024;

/** Chunk size for resumable uploads (stays under typical nginx defaults). */
export const ORBIT_UPLOAD_CHUNK_BYTES = 512 * 1024;
