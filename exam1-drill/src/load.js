// Load the course manifest and content into one context, the same order build.py uses.
const fs = require('fs'), vm = require('vm'), path = require('path');
module.exports = function load() {
  const dir = __dirname;
  const build = fs.readFileSync(path.join(dir, 'build.py'), 'utf8');
  const files = JSON.parse(build.match(/DATA_FILES = (\[[^\]]*\])/)[1].replace(/'/g, '"'));
  const pages = JSON.parse(build.match(/PAGES = (\[[^\]]*\])/)[1].replace(/'/g, '"'));
  let src = fs.readFileSync(path.join(dir, 'course.js'), 'utf8') + '\nconst TOPICS=[];const QUESTIONS=[];\n';
  for (const f of files.concat(pages)) src += fs.readFileSync(path.join(dir, f), 'utf8') + '\n';
  src += '\n;({COURSE, TOPICS, QUESTIONS, REFERENCE_HTML: typeof REFERENCE_HTML==="undefined"?"":REFERENCE_HTML, TELL_HTML: typeof TELL_HTML==="undefined"?"":TELL_HTML, GUIDE_HTML: typeof GUIDE_HTML==="undefined"?"":GUIDE_HTML})';
  return vm.runInNewContext(src, {});
};
