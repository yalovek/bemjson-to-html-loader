const bemjsonToDecl = require('bemjson-to-decl');
const bemdeclToBemhtml = require('bemdecl-to-bemhtml');
const bemxjst = require('bem-xjst');
const fs = require('fs');

module.exports = function(source) {
	if (this.cacheable) {
		this.cacheable();
	}

	const bemjson = this.exec(source);
	const bemdecl = bemjsonToDecl.convert(bemjson);
	const bemhtml = bemdeclToBemhtml.convert(bemdecl, this.options.bem.levels);
	const templates = bemxjst.bemhtml.compile(bemhtml);

	fs.writeFileSync(this.options.output.path + '/index.html', templates.apply(bemjson));

	return source;
};
