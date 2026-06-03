/**
 * Regex for the URI used by batch validation
 *
 * The capture group contains the name of document, which should be some kind of id
 */
export const ValidationUriRegex = /^inmemory:\/\/model\/validate\/(.+)\..+$/;

/**
 * Regex for the URI used by the Monaco editors
 *
 * The capture group contains the name of document, which should be some kind of id
 */
export const EditorUriRegex = /^file:\/\/\/monaco\/edit\/(.+)\..+$/;

/**
 * Regex for the URI used by either the batch validation or the Monaco editors
 *
 * The capture groups both contain the name of document, which should be some kind of id,
 * howver only one can match for any input
 */
export const UriRegex = /^(?:inmemory:\/\/model\/validate\/(.+)\..+)|(?:file:\/\/\/monaco\/edit\/(.+)\..+)$/;
