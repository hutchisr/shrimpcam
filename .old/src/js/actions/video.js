/**
 * 
 * @param {boolean} value 
 */
export const setCanPlay = value => ({ type: 'VIDEO_CANPLAY_SET', value });
/**
 * 
 * @param {boolean} value 
 */
export const setPaused = value => ({ type: 'VIDEO_PAUSED_SET', value });
/**
 * 
 * @param {string} value One of: [hls,dash]
 */
export const setPlayer = value => ({ type: 'VIDEO_PLAYER_SET', value });
/**
 * 
 * @param {string} value 
 */
export const setChannel = value => ({type: 'VIDEO_CHANNEL_SET', value});
