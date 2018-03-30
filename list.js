const List = function(sdk) {

  this.run = function(dropboxPath) {
    return sdk
      .filesListFolder({path: '/' + dropboxPath})
      .then(processList, console.error);
  }

  //sdk.filesGetTemporaryLink({ path: path }).then(console.log, console.error);

  function processList(list) {
    return list.entries
      .map((e) => entryToHtml(e))
      .join('<br/>')
  }

  function entryToHtml(e) {
    var onclick = '#'
    if(e['.tag'] == 'file')
      onclick = `download('${e.path_lower}')`
    if(e['.tag'] == 'folder')
      onclick = `changeDir('${e.path_lower}')`

    return `<a onclick="${onclick}">${e.name}</a>`
  }

}

module.exports = List
