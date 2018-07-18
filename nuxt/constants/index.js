const METHODS = [
    "GET",
    "POST",
    "PUT",
    "DELETE",
    "HEAD",
    "FETCH",
    "OPTIONS",
    "CONNECT",
    "TRACE"
];

const FORM_TYPES = [
    "application/x-www-form-urlencoded",
    "multipart/form-data",
    "raw"
];

const CONTENT_TYPES = [
    "plain/text",
    "application/json",
    "application/xml",
    "text/html"
];

const FIELD_TYPES = ["String", "Boolean", "Number", "Array", "Object"];

export default {
    METHODS,
    FORM_TYPES,
    CONTENT_TYPES,
    FIELD_TYPES
};
