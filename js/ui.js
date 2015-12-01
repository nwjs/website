$(document).ready(function(){
	
  var editor = CodeMirror.fromTextArea($('#indexHTML')[0], {
    lineNumbers: true,
    mode: 'xml',
    htmlMode: true,
    readOnly: true
  });

  editor.setSize(null, 230);

  var editor2 = CodeMirror.fromTextArea($('#packageJSON')[0], {
  	lineNumbers: true,
  	mode: 'javascript',
  	readOnly: true
  });

  editor2.setSize(null, 100);

})