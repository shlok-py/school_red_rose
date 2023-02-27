function uploadFile(category) {
	let categoryFile;
	if (category == "NEWS") {
		categoryFile = "NEWS";
	}
	if (category == "EVENT") {
		categoryFile = "EVENT";
	}
	if (category == "GALLERY") {
		categoryFile = "GALLERY";
	}
	if (category == "NOTICE") {
		categoryFile = "NOTICE";
	}
	if (category == "DOWNLOAD") {
		categoryFile = "DOWNLOAD";
	}
	return categoryFile;
}
module.exports = uploadFile;
